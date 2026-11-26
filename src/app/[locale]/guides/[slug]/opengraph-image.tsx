import { allGuideSlugs } from "@/lib/content/guides";
import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getGuideOgContent } from "@/lib/og/page-og-content";

export const alt = "Guide preview";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allGuideSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function GuideOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = await getGuideOgContent(locale, slug);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
