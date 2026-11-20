import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { TOOLS } from "@/lib/catalog";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.nav.about,
    description: dict.meta.descriptionHome,
    path: "/about",
    locale,
  });
}

export default async function LocalizedAboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">
        {dict.nav.about} {site.name}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>{dict.home.whatBody.replace("{count}", String(TOOLS.length))}</p>
        <p>{dict.home.worldBody}</p>
        <p>{dict.footer.blurb}</p>
        <p>
          <a
            className="font-semibold text-teal"
            href={`mailto:${site.supportEmail}`}
          >
            {site.supportEmail}
          </a>
        </p>
      </div>
      <AdSlot className="mt-8 rounded-xl" />
    </div>
  );
}
