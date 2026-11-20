import { notFound } from "next/navigation";
import { HomePageView } from "@/components/pages/HomePageView";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.meta.titleHome,
    description: dict.meta.descriptionHome,
    path: "/",
    keywords: dict.meta.keywordsHome,
    locale,
  });
}

export default async function LocalizedHomePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return <HomePageView locale={locale} dict={dict} />;
}
