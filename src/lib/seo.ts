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
    text = `${text.replace(/\.$/, "")} Open the tool, upload a PDF, and download your result.`;
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
  const fullTitle = title.includes(site.name)
    ? title
    : `${title} | ${site.name}`;
  const imageUrl = absoluteUrl(
    imagePath ||
      (path.startsWith("/tools/")
        ? `${localePath(locale, path)}/opengraph-image`
        : "/opengraph-image"),
  );

  return {
    title: fullTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: fullTitle,
      description,
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
      description,
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
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url,
    description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    browserRequirements: "Requires JavaScript. Runs in modern browsers.",
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
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function howToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((text, index) => {
      const cleaned = text.replace(/^\s*\d+[\.)]\s*/, "").trim();
      const title =
        cleaned.length > 60
          ? `${cleaned.slice(0, 57).replace(/\s+\S*$/, "")}…`
          : cleaned || `Step ${index + 1}`;
      return {
        "@type": "HowToStep",
        position: index + 1,
        name: title,
        text: cleaned || title,
      };
    }),
  };
}
