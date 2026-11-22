import { notFound } from "next/navigation";
import { CompanyPageView } from "@/components/pages/CompanyPageView";
import { getCompanyPage } from "@/lib/content/company-pages";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const page = getCompanyPage("about", locale);
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: "/about",
    locale,
  });
}

export default async function LocalizedAboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const page = getCompanyPage("about", locale);
  return <CompanyPageView id="about" page={page} locale={locale} dict={dict} />;
}
