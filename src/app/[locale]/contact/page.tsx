import { notFound } from "next/navigation";
import { CompanyPageView } from "@/components/pages/CompanyPageView";
import { getCompanyPage } from "@/lib/content/company-pages";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const page = getCompanyPage("contact", locale);
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: "/contact",
    locale,
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const page = getCompanyPage("contact", locale);
  return <CompanyPageView id="contact" page={page} locale={locale} dict={dict} />;
}
