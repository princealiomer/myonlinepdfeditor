export {
  LOCALES,
  LOCALIZED_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  isLocale,
  isLocalizedLocale,
  type Locale,
  type LocalizedLocale,
} from "./config";

export { localePath, stripLocalePrefix, switchLocalePath } from "./paths";
export { getDictionary } from "./get-dictionary";
export {
  getLocalizedTool,
  getLocalizedTools,
  getLocalizedToolCopy,
} from "./localize-tool";
export {
  getLocalizedFeature,
  getLocalizedFeatures,
  hasFeatureTranslations,
} from "./localize-feature";
export type {
  Dictionary,
  FeatureLocaleFields,
  FeaturesLocaleMap,
  ToolLocaleFields,
  ToolsLocaleMap,
} from "./types";
