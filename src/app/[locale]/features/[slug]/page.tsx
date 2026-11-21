import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { allFeatureSlugs, getFeature, getTool } from "@/lib/catalog";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    allFeatureSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/features/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const feature = getFeature(slug);
  if (!feature) return {};
  const translated = locale === DEFAULT_LOCALE;
  return {
    ...buildMetadata({
      title: `${feature.name} — how it works`,
      description: translated
        ? feature.description
        : `${feature.name}: browser PDF workflow. Open the matching tool to edit files on your device.`,
      path: `/features/${feature.slug}`,
      locale,
    }),
    // Feature copy is English-only today — avoid indexing thin locale duplicates.
    robots: translated
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function FeaturePage({
  params,
}: PageProps<"/[locale]/features/[slug]">) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const feature = getFeature(slug);
  if (!feature) notFound();
  const tool = getTool(feature.toolSlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link
          href={localePath(locale, "/features")}
          className="no-underline hover:text-teal"
        >
          {dict.nav.features}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{feature.name}</span>
      </nav>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        {feature.category}
      </p>
      <h1 className="display mt-2 text-4xl font-semibold">{feature.name}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {feature.description}
      </p>
      <AdSlot className="my-8 rounded-xl" />
      {tool ? (
        <div className="surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold">{dict.home.easyCta}</h2>
          <p className="mt-2 text-sm text-muted">{tool.summary}</p>
          <Link
            href={localePath(locale, `/tools/${tool.slug}`)}
            className="btn btn-accent mt-5 no-underline"
          >
            {tool.shortName}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
