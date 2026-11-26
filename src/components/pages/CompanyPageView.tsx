import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import type { CompanyPage, CompanyPageId } from "@/lib/content/company-pages";
import { COMPANY_PAGE_PATHS } from "@/lib/content/company-pages";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

function mailtoize(text: string) {
  const email = site.supportEmail;
  if (!text.includes(email)) return text;
  const parts = text.split(email);
  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? (
        <a className="font-semibold text-teal" href={`mailto:${email}`}>
          {email}
        </a>
      ) : null}
    </span>
  ));
}

export function CompanyPageView({
  id,
  page,
  locale,
  dict,
}: {
  id: CompanyPageId;
  page: CompanyPage;
  locale: Locale;
  dict: Dictionary;
}) {
  const path = COMPANY_PAGE_PATHS[id];
  const url = absoluteUrl(localePath(locale, path));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: page.title, url }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": id === "about" ? "AboutPage" : "WebPage",
          name: page.title,
          url,
          description: page.description,
          dateModified: page.updated,
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, email: site.supportEmail },
        }}
      />

      <h1 className="display text-4xl font-semibold">{page.title}</h1>
      <p className="mt-4 text-muted">
        {dict.footer.lastUpdated}: {page.updated}
      </p>

      {page.intro ? (
        <p className="mt-8 text-base leading-relaxed text-ink-soft">
          {mailtoize(page.intro)}
        </p>
      ) : null}

      <div className="mt-8 space-y-8 text-base leading-relaxed text-ink-soft">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.heading}-${index}`}>{mailtoize(paragraph)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <nav
        aria-label={dict.footer.company}
        className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-mist pt-6 text-sm"
      >
        {(
          [
            ["about", dict.footer.about],
            ["contact", dict.footer.contact],
            ["privacy", dict.footer.privacy],
            ["disclaimer", dict.footer.disclaimer],
            ["terms", dict.footer.terms],
          ] as const
        ).map(([pageId, label]) => (
          <Link
            key={pageId}
            href={localePath(locale, COMPANY_PAGE_PATHS[pageId])}
            className={
              pageId === id
                ? "font-semibold text-teal no-underline"
                : "text-muted no-underline hover:text-teal"
            }
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Ads only on longer policy/about pages — skip thin contact/disclaimer. */}
      {id === "about" || id === "privacy" || id === "terms" ? (
        <AdSlot className="mt-10 rounded-xl" />
      ) : null}
    </article>
  );
}
