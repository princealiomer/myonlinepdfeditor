import { notFound } from "next/navigation";
import { GuidePageView } from "@/components/pages/GuidePageView";
import { allGuideSlugs, getGuide } from "@/lib/content/guides";
import {
  DEFAULT_LOCALE,
  LOCALES,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allGuideSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const guide = getGuide(slug);
  if (!guide) return {};

  const meta = buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    locale,
  });

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

export default async function GuideSlugPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return <GuidePageView guide={guide} locale={locale} />;
}
