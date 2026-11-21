import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";
import { ToolCopySections } from "@/components/tools/ToolCopySections";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  getLocalizedTool,
  getLocalizedToolCopy,
  getLocalizedTools,
  localePath,
} from "@/lib/i18n";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  toolMetaDescription,
  webApplicationJsonLd,
} from "@/lib/seo";

export function ToolPageView({
  slug,
  locale,
  dict,
}: {
  slug: string;
  locale: Locale;
  dict: Dictionary;
}) {
  const tool = getLocalizedTool(slug, locale);
  if (!tool) return null;

  const copy = getLocalizedToolCopy(slug, locale, dict);
  const related = getLocalizedTools(locale)
    .filter((item) => item.category === tool.category && item.slug !== tool.slug)
    .slice(0, 4);

  const howToSteps =
    copy?.howToUse.map((step) => `${step.title}: ${step.detail}`) || tool.howTo;

  const categoryLabel = dict.categories[tool.category] || tool.category;
  const toolPath = localePath(locale, `/tools/${tool.slug}`);
  const toolUrl = absoluteUrl(toolPath);
  const description = toolMetaDescription({
    name: tool.name,
    summary: tool.summary,
    description: tool.description,
    headline: copy?.headline,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={webApplicationJsonLd({
          name: tool.name,
          description,
          url: toolUrl,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          {
            name: dict.common.breadcrumbTools,
            url: absoluteUrl(localePath(locale, "/tools")),
          },
          { name: tool.name, url: toolUrl },
        ])}
      />
      <JsonLd
        data={howToJsonLd({
          name: fillHowTo(dict, tool.name),
          description: copy?.whatItIs || tool.description,
          steps: howToSteps,
        })}
      />
      {copy?.faqs?.length ? <JsonLd data={faqJsonLd(copy.faqs)} /> : null}

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link
          href={localePath(locale, "/tools")}
          className="no-underline hover:text-teal"
        >
          {dict.common.breadcrumbTools}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{tool.shortName}</span>
      </nav>

      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          {categoryLabel}
          {tool.availability === "guide" ? " · Guide" : null}
        </p>
        <h1 className="display mt-2 text-[1.85rem] font-semibold leading-tight sm:text-4xl md:text-5xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
          {copy?.headline || tool.description}
        </p>
        {tool.availability === "guide" ? (
          <p className="mt-3 rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink-soft">
            This page is a conversion guide, not an in-browser converter. Download
            the guidance note for desktop steps, then continue with a supported
            PDF tool.
          </p>
        ) : null}
      </header>

      <AdSlot className="my-8 rounded-xl" />

      {/* Client island: deferred PDF engine — H1 above is the LCP candidate */}
      <div className="min-h-[28rem]">
        <ToolWorkspace tool={tool} dict={dict} locale={locale} />
      </div>

      {copy ? (
        <ToolCopySections tool={tool} copy={copy} labels={dict.toolPage} />
      ) : null}

      <section className="mt-12 surface rounded-2xl p-6">
        <h2 className="text-xl font-semibold">{dict.toolPage.relatedTitle}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={localePath(locale, `/tools/${item.slug}`)}
                className="font-medium text-teal no-underline"
              >
                {item.name}
              </Link>
              <p className="text-sm text-muted">{item.summary}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function fillHowTo(dict: Dictionary, name: string) {
  return dict.toolPage.howToUse.replace("{name}", name);
}
