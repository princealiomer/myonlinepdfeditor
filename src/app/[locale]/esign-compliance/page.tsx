import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, localePath, type Locale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/esign-compliance">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  return buildMetadata({
    title: dict.footer.esign,
    description: dict.meta.descriptionEsign,
    path: "/esign-compliance",
    locale,
  });
}

export default async function EsignCompliancePage({
  params,
}: PageProps<"/[locale]/esign-compliance">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="display text-4xl font-semibold">{dict.footer.esign}</h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
        <p>
          {site.name} lets you type, draw, or upload a signature image onto a PDF in your
          browser. In many jurisdictions, electronic signatures can be enforceable when
          parties intend to sign and consent to do business electronically (for example,
          under the U.S. ESIGN Act and UETA frameworks).
        </p>
        <p>
          myonlinepdfeditor.com is not a law firm and does not provide legal advice. Requirements vary by
          document type and country. Some records still need wet-ink signatures or specific
          trust services.
        </p>
        <p>
          For stronger evidence trails, keep the final PDF, note signer identity, and retain
          communication that shows consent. Enterprise certificate-based signing and
          managed multi-party cloud workflows are outside the current free browser toolkit.
        </p>
        <p>
          Before you place a signature, use the{" "}
          <Link
            href={localePath(locale, "/guides/esign-pdf-checklist")}
            className="font-semibold text-teal no-underline"
          >
            e-sign PDF checklist
          </Link>{" "}
          for consent, appearance, and download hygiene—then open{" "}
          <Link
            href={localePath(locale, "/tools/sign-pdf")}
            className="font-semibold text-teal no-underline"
          >
            Sign PDF
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
