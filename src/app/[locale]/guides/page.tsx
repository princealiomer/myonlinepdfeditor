import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES } from "@/lib/content/guides";
import {
  DEFAULT_LOCALE,
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const meta = buildMetadata({
    title: "PDF guides — privacy, merge, e-sign, free vs paid",
    description: `Original guides from ${site.name}: browser PDF privacy, merging without mistakes, e-sign checklists, and free vs paid editors.`,
    path: "/guides",
    locale,
    keywords: [
      "pdf guides",
      "browser pdf privacy",
      "how to merge pdf",
      "esign pdf checklist",
    ],
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

export default async function GuidesIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">PDF guides</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Long-form help for real document jobs—not just tool buttons. Each guide
        is written for {site.name} users who want privacy-minded, free browser
        workflows.
      </p>
      <ul className="mt-8 space-y-4">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={localePath(locale, `/guides/${guide.slug}`)}
              className="block rounded-2xl border border-mist bg-paper/80 p-5 no-underline transition hover:border-teal"
            >
              <p className="text-lg font-semibold text-ink">{guide.title}</p>
              <p className="mt-2 text-sm text-muted">{guide.description}</p>
              <p className="mt-3 text-xs text-teal">Updated {guide.updated}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
