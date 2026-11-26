import { allComparisonSlugs } from "@/lib/content/comparisons";
import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getVsOgContent } from "@/lib/og/page-og-content";

export const alt = "Comparison preview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allComparisonSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function VsOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await getVsOgContent(locale, slug);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
