import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getGuidesIndexOgContent } from "@/lib/og/page-og-content";

export const alt = "PDF guides";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function GuidesIndexOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await getGuidesIndexOgContent(locale);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
