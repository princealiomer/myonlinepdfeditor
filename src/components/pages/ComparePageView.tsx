import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import type { ComparisonPage } from "@/lib/content/comparisons";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function ComparePageView({
  page,
  locale,
  dict,
}: {
  page: ComparisonPage;
  locale: Locale;
  dict: Dictionary;
}) {
  const path = `/vs/${page.slug}`;
  const url = absoluteUrl(localePath(locale, path));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Compare", url: absoluteUrl(localePath(locale, "/vs")) },
          { name: page.competitorName, url },
        ])}
      />
      <JsonLd data={faqJsonLd(page.faqs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: page.title,
          url,
          description: page.description,
          dateModified: page.checked,
          about: [
            { "@type": "SoftwareApplication", name: site.name },
            { "@type": "SoftwareApplication", name: page.competitorName },
          ],
        }}
      />

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        Comparison · checked {page.checked}
      </p>
      <h1 className="display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        {page.h1}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">{page.verdict}</p>

      <section className="mt-10">
        <h2 className="display text-2xl font-semibold">Switching triggers</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-mist">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead className="bg-paper text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-3 font-semibold">Trigger</th>
                <th className="px-3 py-3 font-semibold">{page.competitorName}</th>
                <th className="px-3 py-3 font-semibold">{site.name}</th>
                <th className="px-3 py-3 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {page.rows.map((row) => (
                <tr key={row.trigger} className="border-t border-mist align-top">
                  <td className="px-3 py-3 font-medium text-ink">{row.trigger}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.competitor}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.us}</td>
                  <td className="px-3 py-3">
                    <a
                      href={row.source.startsWith("http") ? row.source : absoluteUrl(row.source)}
                      className="text-teal underline-offset-2 hover:underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Source
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl font-semibold">Pricing math</h2>
        <p className="mt-3 text-sm text-muted">{page.pricingNote}</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-mist">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-paper text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-3 font-semibold">Scenario</th>
                <th className="px-3 py-3 font-semibold">{page.competitorName}</th>
                <th className="px-3 py-3 font-semibold">{site.name}</th>
                <th className="px-3 py-3 font-semibold">Difference</th>
              </tr>
            </thead>
            <tbody>
              {page.pricingRows.map((row) => (
                <tr key={row.scenario} className="border-t border-mist align-top">
                  <td className="px-3 py-3 font-medium">{row.scenario}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.competitor}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.us}</td>
                  <td className="px-3 py-3 text-ink-soft">{row.difference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl font-semibold">
          Switch from {page.competitorName} in minutes
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
          {page.migrationSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl font-semibold">
          Where {page.competitorName} is the better choice
        </h2>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink-soft">
          {page.whereTheyWin.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="display text-2xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-3">
          {page.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-mist bg-paper/70 px-4 py-3"
            >
              <summary className="cursor-pointer font-semibold text-ink">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href={localePath(locale, page.ctaHref)}
          className="btn btn-accent no-underline"
        >
          {page.ctaLabel}
        </Link>
        <Link
          href={localePath(locale, "/pricing")}
          className="btn btn-ghost no-underline"
        >
          {dict.nav.pricing}
        </Link>
        <a
          href={page.competitorUrl}
          className="btn btn-ghost no-underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {page.competitorName} pricing ↗
        </a>
      </div>

      <AdSlot className="mt-10 rounded-xl" />
    </article>
  );
}
