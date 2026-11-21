import { notFound } from "next/navigation";
import { SamplesHubView } from "@/components/pages/SamplesHubView";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.samplesPage.title,
    description: dict.samplesPage.intro.slice(0, 160),
    path: "/sample-documents",
    locale,
  });
}

export default async function SampleDocumentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return <SamplesHubView locale={locale} dict={dict} />;
}
