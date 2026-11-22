import type { Metadata } from "next";
import { site } from "@/lib/site";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
  localePath,
} from "@/lib/i18n";

export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_LABELS[locale].hreflang] = absoluteUrl(
      localePath(locale, path),
    );
  }
  languages["x-default"] = absoluteUrl(localePath(DEFAULT_LOCALE, path));
  return languages;
}

/**
 * SERP title for a tool page (before brand suffix).
 * Puts a clear free/online modifier on English money pages without stuffing
 * locales that already bake intent into the localized name.
 */
export function toolSerpTitle(
  name: string,
  locale: Locale = DEFAULT_LOCALE,
  primaryKeyword?: string,
): string {
  if (
    /\b(free|gratis|gratuit|kostenlos|無料|grátis|online)\b/i.test(name)
  ) {
    return name;
  }
  if (locale !== DEFAULT_LOCALE) return name;
  // Prefer a sharper query when the display name is brand-y ("PDF Editor").
  const keyword = primaryKeyword?.trim();
  if (
    keyword &&
    keyword.length >= 6 &&
    keyword.length <= 40 &&
    !/^pdf editor$/i.test(keyword)
  ) {
    const base = /pdf/i.test(keyword) ? keyword : `${keyword} PDF`;
    if (!/\b(free|online)\b/i.test(base)) return `${base} Free Online`;
    return base;
  }
  return `${name} Free Online`;
}

/** Build a ~140–160 character meta description for a tool page. */
export function toolMetaDescription(input: {
  name: string;
  summary?: string;
  description?: string;
  headline?: string;
}): string {
  const seed = (
    input.headline ||
    input.summary ||
    input.description ||
    input.name
  )
    .replace(/\s+/g, " ")
    .trim();

  const extras = [
    "Free",
    "no signup",
    "files stay in your browser",
  ].filter((phrase) => !new RegExp(phrase, "i").test(seed));

  let text = seed.replace(/\.$/, "");
  if (extras.length) {
    text = `${text}. ${extras.join(", ")}.`;
  } else if (!/\.$/.test(text)) {
    text = `${text}.`;
  }

  if (text.length < 140) {
    text = `${text.replace(/\.$/, "")}. Use ${input.name} free on ${site.name}.`;
  }
  if (text.length < 140) {
    text = `${text.replace(/\.$/, "")} Upload a file, run the tool in your browser, and download the result.`;
  }

  if (text.length > 160) {
    text = `${text.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  }

  return text;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  locale = DEFAULT_LOCALE,
  imagePath,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  locale?: Locale;
  /** Absolute or site-relative OG image path. Defaults to opengraph-image route. */
  imagePath?: string;
}): Metadata {
  const localizedPath = localePath(locale, path);
  const url = absoluteUrl(localizedPath);
  // Keep titles near ~60 chars: trim the page title before appending the brand.
  const brandSuffix = ` | ${site.name}`;
  let pageTitle = title.includes(site.name) ? title : title;
  if (!title.includes(site.name)) {
    const maxPage = Math.max(24, 60 - brandSuffix.length);
    if (pageTitle.length > maxPage) {
      pageTitle = `${pageTitle.slice(0, maxPage - 1).replace(/\s+\S*$/, "")}…`;
    }
  }
  const fullTitle = title.includes(site.name)
    ? pageTitle
    : `${pageTitle}${brandSuffix}`;
  const imageUrl = absoluteUrl(
    imagePath ||
      (path.startsWith("/tools/")
        ? `${localePath(locale, path)}/opengraph-image`
        : locale === DEFAULT_LOCALE
          ? "/opengraph-image"
          : `${localePath(locale, "/")}/opengraph-image`),
  );

  const trimmedDescription =
    description.length > 160
      ? `${description.slice(0, 157).replace(/\s+\S*$/, "")}…`
      : description;

  return {
    title: fullTitle,
    description: trimmedDescription,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description: trimmedDescription,
      url,
      siteName: site.name,
      type: "website",
      locale: LOCALE_LABELS[locale].og,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: trimmedDescription,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.supportEmail,
    logo: absoluteUrl("/icon.png"),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/tools")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/** @deprecated Prefer organizationJsonLd + websiteJsonLd on the homepage only. */
export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: site.description,
    url: site.url,
  };
}

export function webApplicationJsonLd({
  name,
  description,
  url,
  image,
  featureList,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  featureList?: string[];
  locale?: Locale;
}) {
  const id = `${url}#webapp`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": id,
    name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "PDFConverter",
    operatingSystem: "Any",
    url,
    description,
    image: image || absoluteUrl("/opengraph-image"),
    screenshot: image || absoluteUrl("/opengraph-image"),
    inLanguage: locale ? LOCALE_LABELS[locale].hreflang : "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Runs in modern browsers.",
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    ...(featureList?.length
      ? { featureList: featureList.slice(0, 12) }
      : {}),
    potentialAction: {
      "@type": "ConsumeAction",
      target: url,
      name: `Use ${name}`,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(
  items: { question: string; answer: string }[],
  opts?: { url?: string; name?: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(opts?.url ? { "@id": `${opts.url}#faq`, url: opts.url } : {}),
    ...(opts?.name ? { name: opts.name } : {}),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type HowToStepInput =
  | string
  | {
      name: string;
      text: string;
    };

export function howToJsonLd({
  name,
  description,
  steps,
  url,
}: {
  name: string;
  description: string;
  steps: HowToStepInput[];
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    ...(url ? { "@id": `${url}#howto`, url } : {}),
    name,
    description,
    step: steps.map((step, index) => {
      if (typeof step === "string") {
        const cleaned = step.replace(/^\s*\d+[\.)]\s*/, "").trim();
        const title =
          cleaned.length > 60
            ? `${cleaned.slice(0, 57).replace(/\s+\S*$/, "")}…`
            : cleaned || `Step ${index + 1}`;
        return {
          "@type": "HowToStep",
          position: index + 1,
          name: title,
          text: cleaned || title,
          ...(url ? { url } : {}),
        };
      }
      return {
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text || step.name,
        ...(url ? { url } : {}),
      };
    }),
  };
}

/** Combined WebApplication + HowTo + FAQPage for a tool converter page. */
export function toolConverterJsonLd({
  name,
  description,
  url,
  image,
  featureList,
  locale,
  howToName,
  howToDescription,
  howToSteps,
  faqs,
  faqName,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  featureList?: string[];
  locale?: Locale;
  howToName: string;
  howToDescription: string;
  howToSteps: HowToStepInput[];
  faqs: { question: string; answer: string }[];
  faqName?: string;
}) {
  const webApp = webApplicationJsonLd({
    name,
    description,
    url,
    image,
    featureList,
    locale,
  });
  // Nested nodes inside @graph should not repeat @context.
  const { "@context": _c1, ...webAppNode } = webApp as Record<string, unknown> & {
    "@context": string;
  };
  const howTo = howToJsonLd({
    name: howToName,
    description: howToDescription,
    steps: howToSteps,
    url,
  });
  const { "@context": _c2, ...howToNode } = howTo as Record<string, unknown> & {
    "@context": string;
  };
  const faq = faqJsonLd(faqs, { url, name: faqName });
  const { "@context": _c3, ...faqNode } = faq as Record<string, unknown> & {
    "@context": string;
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      webAppNode,
      {
        ...howToNode,
        mainEntityOfPage: { "@id": `${url}#webapp` },
      },
      faqNode,
    ],
  };
}
