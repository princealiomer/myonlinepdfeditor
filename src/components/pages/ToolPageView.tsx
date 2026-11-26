import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ToolIcons8Icon } from "@/components/Icons8Icon";
import { JsonLd } from "@/components/JsonLd";
import { ToolCopySections } from "@/components/tools/ToolCopySections";
import { UploadShell } from "@/components/tools/UploadShell";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { usesUploadShell } from "@/lib/catalog/uses-upload-shell";
import type { Dictionary, Locale } from "@/lib/i18n";
import {
  getLocalizedTool,
  getLocalizedToolCopy,
  getLocalizedTools,
  localePath,
} from "@/lib/i18n";
import { getGuidesForTool } from "@/lib/content/guides";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  toolConverterJsonLd,
  toolMetaDescription,
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
  const relatedGuides = getGuidesForTool(tool.slug);

  const howToSteps =
    copy?.howToUse.map((step) => ({
      name: step.title,
      text: step.detail,
    })) ||
    tool.howTo.map((step, index) => ({
      name: dict.synthesize.howToUseTitles[
        Math.min(index, dict.synthesize.howToUseTitles.length - 1)
      ],
      text: step,
    }));

  const faqs = copy?.faqs?.length ? copy.faqs : dict.synthesize.faqs;

  const categoryLabel = dict.categories[tool.category] || tool.category;
  const toolPath = localePath(locale, `/tools/${tool.slug}`);
  const toolUrl = absoluteUrl(toolPath);
  const description = toolMetaDescription({
    name: tool.name,
    summary: tool.summary,
    description: tool.description,
    headline: copy?.headline,
  });
  const ogImage = absoluteUrl(`${toolPath}/opengraph-image`);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd
        data={toolConverterJsonLd({
          name: tool.name,
          description,
          url: toolUrl,
          image: ogImage,
          locale,
          featureList: [
            tool.summary,
            ...(copy?.whyUse?.slice(0, 4) || []),
            dict.common.freeForever,
            dict.common.trustBrowser,
          ],
          howToName: fillHowTo(dict, tool.name),
          howToDescription: copy?.whatItIs || tool.description,
          howToSteps,
          faqs,
          faqName: dict.toolPage.faqs.replace("{name}", tool.name),
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

      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link
          href={localePath(locale, "/tools")}
          className="no-underline hover:text-teal"
        >
          {dict.common.breadcrumbTools}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{tool.name}</span>
      </nav>

      <header className="max-w-3xl">
        <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
          <ToolIcons8Icon tool={tool} size={22} />
          {categoryLabel}
          {tool.availability === "guide" || tool.engine === "format-advice" ? (
            <span className="rounded-md bg-mist/80 px-2 py-0.5 text-[0.65rem] tracking-wide text-muted">
              Guide
            </span>
          ) : null}
        </p>
        <h1 className="display mt-2 text-[1.85rem] font-semibold leading-tight sm:text-4xl md:text-5xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
          {copy?.headline || tool.description}
        </p>
        {tool.availability !== "guide" && tool.engine !== "format-advice" ? (
          <p className="mt-3 text-sm font-medium text-teal">
            {dict.common.trustBrowser}
          </p>
        ) : (
          <p className="mt-3 rounded-xl border border-mist bg-paper px-4 py-3 text-sm text-ink-soft">
            {dict.toolPage.guideOnlyBanner}
          </p>
        )}
      </header>

      {/* SSR upload shell for LCP; client island replaces it after hydration. */}
      <div className="relative min-h-[28rem]">
        {usesUploadShell(tool) ? (
          <div data-tool-ssr-shell>
            <UploadShell
              tool={tool}
              dict={dict}
              trustLine={dict.common.trustBrowser}
            />
          </div>
        ) : null}
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

      {relatedGuides.length > 0 ? (
        <section className="mt-8 surface rounded-2xl p-6">
          <h2 className="text-xl font-semibold">
            {dict.toolPage.relatedGuidesTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {relatedGuides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={localePath(locale, `/guides/${guide.slug}`)}
                  className="font-medium text-teal no-underline"
                >
                  {guide.title}
                </Link>
                <p className="text-sm text-muted">{guide.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Ads only after substantial publisher copy — never on guide/stub tools. */}
      {tool.availability !== "guide" && tool.engine !== "format-advice" ? (
        <AdSlot className="my-10 rounded-xl" />
      ) : null}
    </div>
  );
}

function fillHowTo(dict: Dictionary, name: string) {
  return dict.toolPage.howToUse.replace("{name}", name);
}
