import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { en } from "./dictionaries/en";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => en,
  es: async () => (await import("./dictionaries/es")).es,
  de: async () => (await import("./dictionaries/de")).de,
  fr: async () => (await import("./dictionaries/fr")).fr,
  "pt-BR": async () => (await import("./dictionaries/pt-BR")).ptBR,
  ja: async () => (await import("./dictionaries/ja")).ja,
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    return await loaders[locale]();
  } catch {
    return en;
  }
}

export function getDictionarySync(locale: Locale): Dictionary {
  if (locale === "en") return en;
  // Sync fallback used only where async is unavailable; prefer getDictionary.
  return en;
}
