import { en } from "./en";
import { sk } from "./sk";
import { cs } from "./cs";
import { es } from "./es";
import { de } from "./de";
import type { Locale, Translations } from "./types";

export type { Locale, Translations };

export const locales: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English", flag: "🇬🇧" },
  sk: { label: "Slovenčina", flag: "🇸🇰" },
  cs: { label: "Čeština", flag: "🇨🇿" },
  es: { label: "Español", flag: "🇪🇸" },
  de: { label: "Deutsch", flag: "🇩🇪" },
};

export const translations: Record<Locale, Translations> = { en, sk, cs, es, de };

export const defaultLocale: Locale = "en";
