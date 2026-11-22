import { notFound } from "next/navigation";
import { CompanyPageView } from "@/components/pages/CompanyPageView";
import { getCompanyPage } from "@/lib/content/company-pages";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/disclaimer">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const page = getCompanyPage("disclaimer", locale);
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: "/disclaimer",
    locale,
  });
}

export default async function DisclaimerPage({
  params,
}: PageProps<"/[locale]/disclaimer">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const page = getCompanyPage("disclaimer", locale);
  return (
    <CompanyPageView id="disclaimer" page={page} locale={locale} dict={dict} />
  );
}
