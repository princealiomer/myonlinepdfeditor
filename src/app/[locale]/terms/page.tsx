import { notFound } from "next/navigation";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/terms">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.footer.terms,
    description: dict.meta.descriptionTerms,
    path: "/terms",
    locale,
  });
}

export default async function TermsPage({
  params,
}: PageProps<"/[locale]/terms">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">{dict.footer.terms}</h1>
      <p className="mt-4 text-muted">Last updated: November 16, 2026</p>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          By using {site.name}, you agree to use the tools lawfully and responsibly. The
          service is provided free of charge and &quot;as is&quot; without warranties of any kind.
        </p>
        <p>
          You are responsible for the documents you process and for verifying that outputs
          meet your legal, business, or archival needs. Electronic signatures created with
          myonlinepdfeditor.com do not automatically create a binding contract; consent and applicable law
          still matter.
        </p>
        <p>
          We may show third-party advertisements. We are not responsible for advertiser
          content or destinations.
        </p>
        <p>
          Contact:{" "}
          <a className="text-teal" href={`mailto:${site.supportEmail}`}>
            {site.supportEmail}
          </a>
        </p>
      </div>
    </article>
  );
}
