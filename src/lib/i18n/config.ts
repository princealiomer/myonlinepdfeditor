export const LOCALES = ["en", "es", "de", "fr", "pt-BR", "ja"] as const;

export type Locale = (typeof LOCALES)[number];

/** Locales that use a URL prefix. English stays at the root. */
export const LOCALIZED_LOCALES = ["es", "de", "fr", "pt-BR", "ja"] as const;

export type LocalizedLocale = (typeof LOCALIZED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<
  Locale,
  { native: string; english: string; hreflang: string; og: string }
> = {
  en: { native: "English", english: "English", hreflang: "en", og: "en_US" },
  es: { native: "Español", english: "Spanish", hreflang: "es", og: "es_ES" },
  de: { native: "Deutsch", english: "German", hreflang: "de", og: "de_DE" },
  fr: { native: "Français", english: "French", hreflang: "fr", og: "fr_FR" },
  "pt-BR": {
    native: "Português",
    english: "Portuguese (Brazil)",
    hreflang: "pt-BR",
    og: "pt_BR",
  },
  ja: { native: "日本語", english: "Japanese", hreflang: "ja", og: "ja_JP" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isLocalizedLocale(value: string): value is LocalizedLocale {
  return (LOCALIZED_LOCALES as readonly string[]).includes(value);
}
