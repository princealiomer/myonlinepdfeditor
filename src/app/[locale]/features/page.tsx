import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { FEATURES } from "@/lib/catalog";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/features">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.nav.features,
    description: dict.toolsIndex.description,
    path: "/features",
    locale,
  });
}

export default async function LocalizedFeaturesPage({
  params,
}: PageProps<"/[locale]/features">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">{dict.nav.features}</h1>
      <p className="mt-3 max-w-2xl text-muted">{dict.toolsIndex.intro}</p>
      <AdSlot className="my-8 rounded-xl" />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <li key={feature.slug}>
            <Link
              href={localePath(locale, `/features/${feature.slug}`)}
              className="surface block rounded-xl p-4 no-underline transition hover:border-teal/40"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-teal">
                {feature.category}
              </span>
              <span className="mt-2 block font-semibold text-ink">
                {feature.name}
              </span>
              <span className="mt-2 block text-sm text-muted">
                {feature.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
