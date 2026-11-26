import { notFound } from "next/navigation";
import { SampleFormatView } from "@/components/pages/SampleFormatView";
import {
  allSampleFormatIds,
  getSampleFormat,
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
    allSampleFormatIds().map((format) => ({ locale, format })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; format: string }>;
}) {
  const { locale: raw, format: formatId } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const format = getSampleFormat(formatId);
  if (!format) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.samplesPage.formatTitle.replace("{format}", format.shortName),
    description: dict.samplesPage.formatIntro
      .replace("{format}", format.shortName)
      .replace("{ext}", format.extension.toUpperCase()),
    path: `/sample-documents/${format.id}`,
    locale,
  });
}

export default async function SampleFormatPage({
  params,
}: {
  params: Promise<{ locale: string; format: string }>;
}) {
  const { locale: raw, format: formatId } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const format = getSampleFormat(formatId);
  if (!format) notFound();
  const dict = await getDictionary(locale);
  return <SampleFormatView format={format} locale={locale} dict={dict} />;
}
