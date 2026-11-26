import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { LinkedText } from "@/components/LinkedText";
import type { Guide } from "@/lib/content/guides";
import { getOtherGuides } from "@/lib/content/guides";
import { getLocalizedTool, localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

export function GuidePageView({
  guide,
  locale,
}: {
  guide: Guide;
  locale: Locale;
}) {
  const path = `/guides/${guide.slug}`;
  const url = absoluteUrl(localePath(locale, path));
  const siblings = getOtherGuides(guide.slug);
  const faqs = guide.sections.slice(0, 3).map((section) => ({
    question: section.heading,
    answer: section.paragraphs[0]?.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, "$1") || "",
  }));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          {
            name: "Guides",
            url: absoluteUrl(localePath(locale, "/guides")),
          },
          { name: guide.title, url },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs, { url, name: guide.title })} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          dateModified: guide.updated,
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: url,
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link
          href={localePath(locale, "/guides")}
          className="no-underline hover:text-teal"
        >
          Guides
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{guide.title}</span>
      </nav>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
        Guide · updated {guide.updated}
      </p>
      <h1 className="display mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">{guide.intro}</p>

      <div className="mt-10 space-y-8">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="display text-2xl font-semibold">{section.heading}</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed text-ink-soft">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <LinkedText text={paragraph} locale={locale} />
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 surface rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Related tools</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {guide.relatedTools.map((slug) => {
            const tool = getLocalizedTool(slug, locale);
            if (!tool) return null;
            return (
              <li key={slug}>
                <Link
                  href={localePath(locale, `/tools/${slug}`)}
                  className="font-semibold text-teal no-underline"
                >
                  {tool.name}
                </Link>
                <span className="text-muted"> — {tool.summary}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {siblings.length > 0 ? (
        <section className="mt-8 surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold">More guides</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link
                  href={localePath(locale, `/guides/${item.slug}`)}
                  className="font-semibold text-teal no-underline"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-muted">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <AdSlot className="mt-10 rounded-xl" />
    </article>
  );
}
