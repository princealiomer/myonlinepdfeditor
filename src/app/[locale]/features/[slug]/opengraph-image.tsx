import { allFeatureSlugs } from "@/lib/catalog";
import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getFeatureOgContent } from "@/lib/og/page-og-content";

export const alt = "Feature preview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allFeatureSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function FeatureOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await getFeatureOgContent(locale, slug);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
