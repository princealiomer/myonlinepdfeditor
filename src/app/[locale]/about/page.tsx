import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { TOOLS } from "@/lib/catalog";
import { getDictionary, isLocale, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
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
    description: dict.meta.descriptionAbout,
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

  const aboutUrl = absoluteUrl(localePath(locale, "/about"));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.nav.about, url: aboutUrl },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `${dict.nav.about} ${site.name}`,
          url: aboutUrl,
          description: dict.meta.descriptionAbout,
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />
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
