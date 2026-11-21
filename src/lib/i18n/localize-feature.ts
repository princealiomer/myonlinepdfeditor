import { FEATURES, getFeature, type Feature } from "@/lib/catalog/features";
import type { Locale } from "./config";
import type { FeatureLocaleFields, FeaturesLocaleMap } from "./types";

import esFeatures from "./features/es.json";
import deFeatures from "./features/de.json";
import frFeatures from "./features/fr.json";
import ptBRFeatures from "./features/pt-BR.json";
import jaFeatures from "./features/ja.json";

const FEATURE_LOCALES: Partial<Record<Locale, FeaturesLocaleMap>> = {
  es: esFeatures as FeaturesLocaleMap,
  de: deFeatures as FeaturesLocaleMap,
  fr: frFeatures as FeaturesLocaleMap,
  "pt-BR": ptBRFeatures as FeaturesLocaleMap,
  ja: jaFeatures as FeaturesLocaleMap,
};

export function hasFeatureTranslations(locale: Locale): boolean {
  if (locale === "en") return true;
  const map = FEATURE_LOCALES[locale];
  if (!map) return false;
  return FEATURES.every((f) => {
    const row = map[f.slug];
    return Boolean(row?.name && row?.summary && row?.description);
  });
}

export function getLocalizedFeature(
  slug: string,
  locale: Locale,
): Feature | undefined {
  const base = getFeature(slug);
  if (!base) return undefined;
  if (locale === "en") return base;

  const overlay = FEATURE_LOCALES[locale]?.[slug] as
    | FeatureLocaleFields
    | undefined;
  if (!overlay) return base;

  return {
    ...base,
    name: overlay.name,
    summary: overlay.summary,
    description: overlay.description,
  };
}

export function getLocalizedFeatures(locale: Locale): Feature[] {
  return FEATURES.map(
    (feature) => getLocalizedFeature(feature.slug, locale) || feature,
  );
}
