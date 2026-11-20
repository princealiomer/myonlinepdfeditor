import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pricing">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.nav.pricing,
    description: dict.meta.descriptionHome,
    path: "/pricing",
    locale,
  });
}

export default async function LocalizedPricingPage({
  params,
}: PageProps<"/[locale]/pricing">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">{dict.nav.pricing}</h1>
      <p className="mt-3 text-lg text-muted">{dict.home.categoriesBody}</p>
      <AdSlot className="my-8 rounded-xl" />

      <div className="surface rounded-[1.5rem] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal">
          {dict.nav.pricing}
        </p>
        <p className="display mt-3 text-3xl font-semibold sm:text-4xl">
          {dict.home.categoriesTitle}
        </p>
        <ul className="mt-6 space-y-3 text-sm leading-relaxed">
          {dict.home.pillars.map((p) => (
            <li key={p.title}>
              <strong>{p.title}:</strong> {p.body}
            </li>
          ))}
        </ul>
        <Link
          href={localePath(locale, "/tools")}
          className="btn btn-accent mt-8 no-underline"
        >
          {dict.home.easyCta}
        </Link>
      </div>
    </div>
  );
}
