import { getLocalizedFeature } from "@/lib/i18n/localize-feature";
import { getLocalizedTool } from "@/lib/i18n/localize-tool";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getCompanyPage, type CompanyPageId } from "@/lib/content/company-pages";
import { getGuide } from "@/lib/content/guides";
import { getComparison } from "@/lib/content/comparisons";
import {
  getSampleFile,
  getSampleFormat,
} from "@/lib/catalog/sample-documents";
import { site } from "@/lib/site";

export type PageOgContent = {
  title: string;
  summary: string;
  footer?: string;
};

function asLocale(raw: string): Locale {
  return isLocale(raw) ? raw : "en";
}

async function withTrust(locale: Locale, content: PageOgContent): Promise<PageOgContent> {
  const dict = await getDictionary(locale);
  return {
    ...content,
    footer:
      content.footer ||
      `${dict.common.freeForever} · ${dict.common.trustBrowser}`,
  };
}

export async function getHomeOgContent(localeRaw: string): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: dict.home.headline,
    summary: dict.home.subhead || dict.meta.descriptionHome,
  });
}

export async function getToolsIndexOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: dict.toolsIndex.title,
    summary: dict.toolsIndex.description,
  });
}

export async function getToolOgContent(
  localeRaw: string,
  slug: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  const tool = getLocalizedTool(slug, locale);
  return withTrust(locale, {
    title: tool?.name || slug,
    summary: tool?.summary || dict.meta.descriptionHome,
  });
}

export async function getFeaturesIndexOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: dict.nav.features,
    summary: dict.meta.descriptionFeatures,
  });
}

export async function getFeatureOgContent(
  localeRaw: string,
  slug: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  const feature = getLocalizedFeature(slug, locale);
  return withTrust(locale, {
    title: feature?.name || slug,
    summary: feature?.description || dict.meta.descriptionFeatures,
  });
}

export async function getGuidesIndexOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  return withTrust(locale, {
    title: "PDF guides — privacy, merge, e-sign, free vs paid",
    summary: `Original guides from ${site.name}: browser PDF privacy, merging without mistakes, e-sign checklists, and free vs paid editors.`,
  });
}

export async function getGuideOgContent(
  localeRaw: string,
  slug: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const guide = getGuide(slug);
  return withTrust(locale, {
    title: guide?.title || slug,
    summary: guide?.description || `Guide from ${site.name}`,
  });
}

export async function getVsIndexOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  return withTrust(locale, {
    title: `${site.name} vs popular PDF tools`,
    summary: `Honest comparisons of ${site.name} with iLovePDF, Smallpdf, and more — pricing, limits, and when to switch.`,
  });
}

export async function getVsOgContent(
  localeRaw: string,
  slug: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const page = getComparison(slug);
  return withTrust(locale, {
    title: page?.title || slug,
    summary: page?.description || `${site.name} comparison`,
  });
}

export async function getPricingOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: "Pricing — free forever PDF tools",
    summary:
      dict.meta.descriptionPricing ||
      `${site.name} is free forever. No paid plans, no signup wall for core PDF tools.`,
  });
}

export async function getCompanyOgContent(
  localeRaw: string,
  id: CompanyPageId,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const page = getCompanyPage(id, locale);
  return withTrust(locale, {
    title: page.title,
    summary: page.description,
  });
}

export async function getEsignOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: dict.footer.esign,
    summary: dict.meta.descriptionEsign,
  });
}

export async function getSamplesIndexOgContent(
  localeRaw: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  return withTrust(locale, {
    title: dict.samplesPage.title,
    summary: dict.samplesPage.intro,
  });
}

export async function getSampleFormatOgContent(
  localeRaw: string,
  formatId: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  const format = getSampleFormat(formatId);
  const formatName = format?.shortName || formatId;
  return withTrust(locale, {
    title: dict.samplesPage.formatTitle.replace("{format}", formatName),
    summary: dict.samplesPage.formatIntro
      .replace("{format}", formatName)
      .replace("{ext}", (format?.extension || formatId).toUpperCase()),
  });
}

export async function getSampleFileOgContent(
  localeRaw: string,
  formatId: string,
  slug: string,
): Promise<PageOgContent> {
  const locale = asLocale(localeRaw);
  const dict = await getDictionary(locale);
  const hit = getSampleFile(formatId, slug);
  if (!hit) {
    return withTrust(locale, {
      title: dict.samplesPage.title,
      summary: dict.samplesPage.intro,
    });
  }
  return withTrust(locale, {
    title: dict.samplesPage.fileTitle.replace(
      "{name}",
      `${hit.format.shortName} ${hit.file.label}`,
    ),
    summary: dict.samplesPage.fileIntro.replace(
      "{ext}",
      hit.format.extension.toUpperCase(),
    ),
  });
}
