import { notFound } from "next/navigation";
import { SampleFileView } from "@/components/pages/SampleFileView";
import {
  SAMPLE_FORMATS,
  getSampleFile,
} from "@/lib/catalog/sample-documents";
import {
  LOCALES,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; format: string; slug: string }>;
}) {
  const { locale: raw, format: formatId, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const hit = getSampleFile(formatId, slug);
  if (!hit) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.samplesPage.fileTitle.replace(
      "{name}",
      `${hit.format.shortName} ${hit.file.label}`,
    ),
    description: dict.samplesPage.fileIntro.replace(
      "{ext}",
      hit.format.extension.toUpperCase(),
    ),
    path: `/sample-documents/${hit.format.id}/${hit.file.slug}`,
    locale,
  });
}

export default async function SampleFilePage({
  params,
}: {
  params: Promise<{ locale: string; format: string; slug: string }>;
}) {
  const { locale: raw, format: formatId, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const hit = getSampleFile(formatId, slug);
  if (!hit) notFound();
  const dict = await getDictionary(locale);
  return (
    <SampleFileView
      format={hit.format}
      file={hit.file}
      locale={locale}
      dict={dict}
    />
  );
}
