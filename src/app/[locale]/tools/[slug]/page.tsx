import { notFound } from "next/navigation";
import { ToolPageView } from "@/components/pages/ToolPageView";
import { allToolSlugs } from "@/lib/catalog";
import {
  LOCALES,
  getDictionary,
  getLocalizedTool,
  getLocalizedToolCopy,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata, toolMetaDescription } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = allToolSlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/tools/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const tool = getLocalizedTool(slug, locale);
  const copy = getLocalizedToolCopy(slug, locale, dict);
  if (!tool) return {};

  const description = toolMetaDescription({
    name: tool.name,
    summary: tool.summary,
    description: tool.description,
    headline: copy?.headline,
  });

  const meta = buildMetadata({
    title: tool.name,
    description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
    locale,
  });
  if (tool.availability === "guide") {
    return {
      ...meta,
      robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
    };
  }
  return meta;
}

export default async function LocalizedToolPage({
  params,
}: PageProps<"/[locale]/tools/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const tool = getLocalizedTool(slug, locale);
  if (!tool) notFound();
  const dict = await getDictionary(locale);
  return <ToolPageView slug={slug} locale={locale} dict={dict} />;
}
