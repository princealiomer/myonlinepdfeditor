import { notFound } from "next/navigation";
import { ComparePageView } from "@/components/pages/ComparePageView";
import {
  allComparisonSlugs,
  getComparison,
} from "@/lib/content/comparisons";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allComparisonSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/vs/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const page = getComparison(slug);
  if (!page) return {};

  const meta = buildMetadata({
    title: page.title,
    description: page.description,
    path: `/vs/${page.slug}`,
    locale,
    keywords: [
      `${page.competitorName} alternative`,
      `${site.name} vs ${page.competitorName}`,
      "free pdf editor",
    ],
  });

  // Avoid thin translated duplicates until comparison copy is localized.
  if (locale !== DEFAULT_LOCALE) {
    return {
      ...meta,
      robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      },
    };
  }
  return meta;
}

export default async function CompareSlugPage({
  params,
}: PageProps<"/[locale]/vs/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const page = getComparison(slug);
  if (!page) notFound();
  const dict = await getDictionary(locale);
  return <ComparePageView page={page} locale={locale} dict={dict} />;
}
