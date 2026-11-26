import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import {
  getDictionary,
  isLocale,
  localePath,
  type Locale,
} from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/pricing">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: "Pricing — free forever PDF tools",
    description:
      dict.meta.descriptionPricing ||
      `${site.name} is free forever. No paid plans, no signup wall for core PDF tools. Ads keep the toolkit open.`,
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
  const pricingUrl = absoluteUrl(localePath(locale, "/pricing"));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([{ name: dict.nav.pricing, url: pricingUrl }])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Pricing — free forever",
          url: pricingUrl,
          description: dict.meta.descriptionPricing,
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: site.name,
          description: site.description,
          brand: { "@type": "Brand", name: site.name },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: pricingUrl,
          },
        }}
      />

      <h1 className="display text-4xl font-semibold">Free forever</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">
        {site.name} does not sell seats, Premium tiers, or unlock codes for the
        core PDF catalog. Every listed tool stays available without an account.
        Display advertising funds hosting and continued development.
      </p>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-ink-soft">
        <h2 className="display text-2xl font-semibold">What you get at $0</h2>
        <p>
          Edit, sign, merge, split, compress, convert common office and image
          formats, organize pages, and more. Ordinary workflows run in your
          browser so files do not need to be uploaded to our servers for those
          jobs. You download the result when you finish.
        </p>
        <p>
          There is no free trial that expires, no daily download counter on the
          catalog tools, and no paywall after three files. If a format is only
          documented as a guide (desktop steps), we label it clearly instead of
          pretending a conversion finished in the tab.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-ink-soft">
        <h2 className="display text-2xl font-semibold">What we do not sell</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Monthly or annual Premium subscriptions</li>
          <li>Per-seat Team or Business plans</li>
          <li>SSO, desktop installers, or mobile apps</li>
          <li>Certificate-backed enterprise e-sign custody</li>
        </ul>
        <p>
          If you need those features, a paid suite may be a better fit. See our{" "}
          <Link
            href={localePath(locale, "/vs/ilovepdf")}
            className="font-semibold text-teal no-underline"
          >
            iLovePDF comparison
          </Link>{" "}
          and{" "}
          <Link
            href={localePath(locale, "/vs/smallpdf")}
            className="font-semibold text-teal no-underline"
          >
            Smallpdf comparison
          </Link>{" "}
          for sourced differences.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-base leading-relaxed text-ink-soft">
        <h2 className="display text-2xl font-semibold">How ads keep tools free</h2>
        <p>
          Ads appear after the main explanations on content-rich pages. We do
          not put ad units on empty shells or unfinished stubs. You can use an
          ad blocker; the tools still work. Blocking ads simply means you are
          not helping fund the free catalog that day.
        </p>
        <p>
          Questions about privacy or billing (there is no billing) go to{" "}
          <a className="font-semibold text-teal" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
          .
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href={localePath(locale, "/tools")}
          className="btn btn-accent no-underline"
        >
          {dict.home.easyCta}
        </Link>
        <Link
          href={localePath(locale, "/guides")}
          className="btn btn-ghost no-underline"
        >
          Read PDF guides
        </Link>
      </div>

      <AdSlot className="mt-12 rounded-xl" />
    </div>
  );
}