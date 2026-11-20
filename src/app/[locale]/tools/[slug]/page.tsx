import { Suspense } from "react";
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
import { buildMetadata } from "@/lib/seo";

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
  return buildMetadata({
    title: tool.name,
    description: copy?.headline || tool.description,
    path: `/tools/${tool.slug}`,
    keywords: tool.keywords,
    locale,
  });
}

export default function LocalizedToolPage({
  params,
}: PageProps<"/[locale]/tools/[slug]">) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-muted">…</p>
        </div>
      }
    >
      <LocalizedToolPageContent params={params} />
    </Suspense>
  );
}

async function LocalizedToolPageContent({
  params,
}: {
  params: PageProps<"/[locale]/tools/[slug]">["params"];
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const tool = getLocalizedTool(slug, locale);
  if (!tool) notFound();
  const dict = await getDictionary(locale);
  return <ToolPageView slug={slug} locale={locale} dict={dict} />;
}
