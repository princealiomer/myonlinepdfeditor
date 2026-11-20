import { notFound } from "next/navigation";
import { ToolsIndexView } from "@/components/pages/ToolsIndexView";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tools">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.toolsIndex.title,
    description: dict.toolsIndex.description,
    path: "/tools",
    locale,
  });
}

export default async function LocalizedToolsIndexPage({
  params,
}: PageProps<"/[locale]/tools">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return <ToolsIndexView locale={locale} dict={dict} />;
}
