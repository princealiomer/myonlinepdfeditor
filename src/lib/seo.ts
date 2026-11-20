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

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  locale = DEFAULT_LOCALE,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  locale?: Locale;
}): Metadata {
  const localizedPath = localePath(locale, path);
  const url = absoluteUrl(localizedPath);
  const fullTitle = title.includes(site.name)
    ? title
    : `${title} | ${site.name}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

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
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  };
}
