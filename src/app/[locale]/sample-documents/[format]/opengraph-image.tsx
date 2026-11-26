import { allSampleFormatIds } from "@/lib/catalog";
import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getSampleFormatOgContent } from "@/lib/og/page-og-content";

export const alt = "Sample format";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allSampleFormatIds().map((format) => ({ locale, format })),
  );
}

export default async function SampleFormatOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; format: string }>;
}) {
  const { locale, format } = await params;
  const content = await getSampleFormatOgContent(locale, format);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
