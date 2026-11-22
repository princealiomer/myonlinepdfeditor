import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISONS, allComparisonSlugs } from "@/lib/content/comparisons";
import {
  DEFAULT_LOCALE,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/vs">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const meta = buildMetadata({
    title: `${site.name} vs popular PDF tools`,
    description: `Honest comparisons of ${site.name} with iLovePDF, Smallpdf, and more — pricing, limits, and when to switch.`,
    path: "/vs",
    locale,
    keywords: ["ilovepdf alternative", "smallpdf alternative", "free pdf editor comparison"],
  });
  if (locale !== DEFAULT_LOCALE) {
    return {
      ...meta,
      robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      },
    };
  }
  return meta;
}

export default async function CompareIndexPage({
  params,
}: PageProps<"/[locale]/vs">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">
        {site.name} vs other PDF tools
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Side-by-side pages with sourced pricing and limits. We name where the
        competitor wins — not just where we do.
      </p>
      <ul className="mt-8 space-y-4">
        {allComparisonSlugs().map((slug) => {
          const page = COMPARISONS[slug];
          return (
            <li key={slug}>
              <Link
                href={localePath(locale, `/vs/${slug}`)}
                className="block rounded-2xl border border-mist bg-paper/80 p-5 no-underline transition hover:border-teal"
              >
                <p className="text-lg font-semibold text-ink">{page.h1}</p>
                <p className="mt-2 text-sm text-muted">{page.verdict}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
