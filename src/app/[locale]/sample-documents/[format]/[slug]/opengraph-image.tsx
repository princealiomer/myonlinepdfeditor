import { SAMPLE_FORMATS } from "@/lib/catalog/sample-documents";
import { LOCALES } from "@/lib/i18n";
import {
  ogContentType,
  ogSize,
  renderPageOpenGraphImage,
} from "@/lib/og/page-image";
import { getSampleFileOgContent } from "@/lib/og/page-og-content";

export const alt = "Sample file";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    SAMPLE_FORMATS.flatMap((format) =>
      format.files.map((file) => ({
        locale,
        format: format.id,
        slug: file.slug,
      })),
    ),
  );
}

export default async function SampleFileOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; format: string; slug: string }>;
}) {
  const { locale, format, slug } = await params;
  const content = await getSampleFileOgContent(locale, format, slug);
  return renderPageOpenGraphImage({
    locale,
    title: content.title,
    summary: content.summary,
    footer: content.footer,
  });
}
