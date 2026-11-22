import { getTool, TOOLS, type Tool } from "@/lib/catalog/tools";
import type { ToolCopy } from "@/lib/catalog/tool-copy";
import { getToolCopy as getEnglishToolCopy } from "@/lib/catalog/tool-copy";
import type { Locale } from "./config";
import type { Dictionary, ToolsLocaleMap } from "./types";

import esTools from "./tools/es.json";
import deTools from "./tools/de.json";
import frTools from "./tools/fr.json";
import ptBRTools from "./tools/pt-BR.json";
import jaTools from "./tools/ja.json";

const TOOL_LOCALES: Partial<Record<Locale, ToolsLocaleMap>> = {
  es: esTools as ToolsLocaleMap,
  de: deTools as ToolsLocaleMap,
  fr: frTools as ToolsLocaleMap,
  "pt-BR": ptBRTools as ToolsLocaleMap,
  ja: jaTools as ToolsLocaleMap,
};

export function getLocalizedTool(
  slug: string,
  locale: Locale,
): Tool | undefined {
  const base = getTool(slug);
  if (!base) return undefined;
  if (locale === "en") return base;

  const overlay = TOOL_LOCALES[locale]?.[slug];
  if (!overlay) return base;

  // Many locale overlays leave shortName in English ("Merge PDFs") while
  // translating name. Prefer the localized name so H2s, upload chrome, and
  // breadcrumbs do not leak English into non-EN pages.
  const shortName =
    overlay.shortName === base.shortName && overlay.name !== base.name
      ? overlay.name
      : overlay.shortName;

  return {
    ...base,
    name: overlay.name,
    shortName,
    summary: overlay.summary,
    description: overlay.description,
    howTo: overlay.howTo,
    keywords: overlay.keywords,
  };
}

export function getLocalizedTools(locale: Locale): Tool[] {
  return TOOLS.map((tool) => getLocalizedTool(tool.slug, locale) || tool);
}

function synthesizeLocalizedCopy(
  tool: Tool,
  dict: Dictionary,
): ToolCopy {
  const titles = dict.synthesize.howToUseTitles;
  const details = dict.synthesize.howToUseDetails;
  const howToUse =
    tool.howTo.length > 0
      ? tool.howTo.map((step, index) => ({
          title: titles[Math.min(index, titles.length - 1)] || titles[0],
          detail: step,
        }))
      : titles.map((title, index) => ({
          title,
          detail: details[index],
        }));

  return {
    slug: tool.slug,
    headline: tool.summary,
    whatItIs: tool.description,
    whyUse: dict.synthesize.whyUse,
    howToUse,
    howToExport: dict.synthesize.howToExport,
    whyBest: dict.synthesize.whyBest,
    tidbits: dict.synthesize.tidbits,
    faqs: dict.synthesize.faqs,
  };
}

export function getLocalizedToolCopy(
  slug: string,
  locale: Locale,
  dict: Dictionary,
): ToolCopy | undefined {
  const tool = getLocalizedTool(slug, locale);
  if (!tool) return undefined;

  if (locale === "en") {
    return getEnglishToolCopy(slug) || synthesizeLocalizedCopy(tool, dict);
  }

  return synthesizeLocalizedCopy(tool, dict);
}
