import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { ToolCard } from "@/components/ToolCard";
import { TOOLS } from "@/lib/catalog";
import { NAV_TOOL_GROUPS } from "@/lib/catalog/nav-tools";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";
import {
  faqJsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/site";

const FEATURED = [
  "edit-pdf",
  "sign-pdf",
  "merge-pdf",
  "word-to-pdf",
  "split-pdf",
  "jpg-to-pdf",
];

export function HomePageView({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const featured = FEATURED.map((slug) => getLocalizedTool(slug, locale)).filter(
    Boolean,
  ) as NonNullable<ReturnType<typeof getLocalizedTool>>[];

  const h = dict.home;

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={faqJsonLd(h.faqs)} />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-12 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal">
              {h.eyebrow || site.name}
            </p>
            <h1 className="display mt-3 max-w-2xl text-[2.15rem] font-semibold leading-[1.08] text-ink sm:text-5xl md:text-6xl">
              {h.headline}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              {h.subhead}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href={localePath(locale, "/tools/edit-pdf")}
                className="btn btn-accent w-full no-underline sm:w-auto"
              >
                {h.ctaEdit}
              </Link>
              <Link
                href={localePath(locale, "/tools")}
                className="btn btn-ghost w-full no-underline sm:w-auto"
              >
                {h.ctaBrowse}
              </Link>
            </div>
          </div>

          <div className="surface relative rounded-[1.5rem] p-5 sm:p-6">
            <div
              className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-brand-wine via-brand-rose to-brand-dust"
              aria-hidden="true"
            />
            <p className="text-sm font-semibold text-teal">{h.howTitle}</p>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
              {h.howSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-6 text-xs uppercase tracking-[0.14em] text-muted">
              {h.howFoot}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AdSlot className="mb-12 rounded-xl" />
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="display text-3xl font-semibold">{h.whatTitle}</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
          {h.whatBody.replace("{count}", String(TOOLS.length))}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {h.pillars.map((item) => (
            <div key={item.title} className="surface rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-mist bg-white/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="display text-3xl font-semibold">{h.worldTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            {h.worldBody}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {h.worldUses.map((item) => (
              <div key={item.where} className="surface rounded-2xl p-5">
                <h3 className="text-lg font-semibold">{item.where}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl font-semibold">{h.popularTitle}</h2>
            <p className="mt-2 text-muted">{h.popularBody}</p>
          </div>
          <Link
            href={localePath(locale, "/tools")}
            className="text-sm font-semibold text-teal no-underline"
          >
            {h.viewCatalog}
          </Link>
        </div>
        <div className="tool-grid">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} dict={dict} />
          ))}
        </div>
      </section>

      <section className="border-y border-mist bg-white/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="display text-3xl font-semibold">{h.extensionsTitle}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            {h.extensionsBody}
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-mist text-ink">
                  {h.extensionsHeaders.map((header) => (
                    <th key={header} className="py-3 pr-4 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {h.extensions.map((row) => (
                  <tr key={row.ext} className="border-b border-mist/80 align-top">
                    <td className="py-3 pr-4 font-semibold text-teal">{row.ext}</td>
                    <td className="py-3 pr-4 text-ink-soft">{row.meaning}</td>
                    <td className="py-3 text-muted">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted">{h.extensionsFoot}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="display text-3xl font-semibold">{h.easyTitle}</h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
          {h.easyBody}
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {h.easyItems.map((item) => (
            <li key={item.title} className="surface rounded-2xl p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href={localePath(locale, "/tools")}
            className="btn btn-accent no-underline"
          >
            {h.easyCta}
          </Link>
        </div>
      </section>

      <section className="border-y border-mist bg-white/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="display text-3xl font-semibold">{h.categoriesTitle}</h2>
          <p className="mt-2 max-w-2xl text-muted">{h.categoriesBody}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {NAV_TOOL_GROUPS.map((group) => {
              const first = group.items[0];
              const cat = first
                ? getLocalizedTool(first.slug, locale)?.category
                : undefined;
              const label =
                (cat && dict.categories[cat]) || group.label;
              return (
                <div key={group.label} className="surface rounded-2xl p-5">
                  <h3 className="text-lg font-semibold">{label}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {group.items.map((item) => {
                      const tool = getLocalizedTool(item.slug, locale);
                      return (
                        <li key={item.slug}>
                          <Link
                            href={localePath(locale, `/tools/${item.slug}`)}
                            className="text-ink-soft no-underline hover:text-teal"
                          >
                            {tool?.name || item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="display text-3xl font-semibold">{h.faqsTitle}</h2>
        <div className="mt-6 grid gap-4">
          {h.faqs.map((faq) => (
            <details key={faq.question} className="surface rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
