import { describe, it, expect } from "vitest";
import { translations, locales, defaultLocale } from "@/i18n";
import type { Locale, Translations } from "@/i18n/types";

const ALL_LOCALES = Object.keys(translations) as Locale[];
const REFERENCE_LOCALE: Locale = "en";
const reference = translations[REFERENCE_LOCALE];

/**
 * Recursively collects all leaf key paths from an object.
 * Example: { a: { b: "x", c: ["y"] } } → ["a.b", "a.c"]
 */
function getLeafPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  const paths: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      paths.push(...getLeafPaths(value as Record<string, unknown>, path));
    } else {
      paths.push(path);
    }
  }
  return paths;
}

/** Access a deeply nested property by dot path */
function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

// ─── Structural completeness ────────────────────────────────────

describe("i18n: structural completeness", () => {
  const referenceKeys = getLeafPaths(reference as unknown as Record<string, unknown>);

  it("reference locale (en) has leaf keys", () => {
    expect(referenceKeys.length).toBeGreaterThan(50);
  });

  for (const locale of ALL_LOCALES) {
    if (locale === REFERENCE_LOCALE) continue;

    describe(`locale "${locale}"`, () => {
      const t = translations[locale];
      const localeKeys = getLeafPaths(t as unknown as Record<string, unknown>);

      it("has all keys from the reference locale", () => {
        const missing = referenceKeys.filter((k) => !localeKeys.includes(k));
        expect(missing, `Missing keys in ${locale}: ${missing.join(", ")}`).toEqual([]);
      });

      it("has no extra keys not in the reference locale", () => {
        const extra = localeKeys.filter((k) => !referenceKeys.includes(k));
        expect(extra, `Extra keys in ${locale}: ${extra.join(", ")}`).toEqual([]);
      });
    });
  }
});

// ─── No empty strings ──────────────────────────────────────────

describe("i18n: no empty translation strings", () => {
  for (const locale of ALL_LOCALES) {
    const t = translations[locale];
    const leafPaths = getLeafPaths(t as unknown as Record<string, unknown>);

    it(`locale "${locale}" has no empty string values`, () => {
      const empties: string[] = [];
      for (const path of leafPaths) {
        const value = getByPath(t, path);
        if (typeof value === "string" && value.trim() === "") {
          empties.push(path);
        }
      }
      expect(empties, `Empty translations in ${locale}: ${empties.join(", ")}`).toEqual([]);
    });
  }
});

// ─── Array length consistency ──────────────────────────────────

describe("i18n: array lengths match across locales", () => {
  const arrayPaths = [
    "hero.offers",
    "hero.badges",
    "about.paragraphs",
    "about.stats",
    "projects.items",
    "skills.categories",
    "experience.items",
    "contact.budgetOptions",
    "contact.serviceOptions",
    "contact.detailedServiceOptions",
    "privacy.sections.controller.content",
    "privacy.sections.dataCollection.content",
    "privacy.sections.usage.content",
    "privacy.sections.rights.content",
    "privacy.sections.contact.content",
    "privacy.sections.authority.content",
    "privacy.sections.changes.content",
  ];

  for (const path of arrayPaths) {
    const refValue = getByPath(reference, path);
    if (!Array.isArray(refValue)) continue;
    const refLength = refValue.length;

    for (const locale of ALL_LOCALES) {
      if (locale === REFERENCE_LOCALE) continue;

      it(`${locale}.${path} has same length as reference (${refLength})`, () => {
        const value = getByPath(translations[locale], path);
        expect(Array.isArray(value), `${locale}.${path} should be an array`).toBe(true);
        expect(
          (value as unknown[]).length,
          `${locale}.${path} has ${(value as unknown[]).length} items, expected ${refLength}`
        ).toBe(refLength);
      });
    }
  }
});

// ─── consent section ───────────────────────────────────────────

describe("i18n: consent translations", () => {
  for (const locale of ALL_LOCALES) {
    const t = translations[locale];

    it(`locale "${locale}" has complete consent.banner`, () => {
      expect(t.consent.banner.title).toBeTruthy();
      expect(t.consent.banner.description).toBeTruthy();
      expect(t.consent.banner.privacyLink).toBeTruthy();
      expect(t.consent.banner.acceptAll).toBeTruthy();
      expect(t.consent.banner.rejectAll).toBeTruthy();
      expect(t.consent.banner.customize).toBeTruthy();
    });

    it(`locale "${locale}" has complete consent.settings`, () => {
      expect(t.consent.settings.title).toBeTruthy();
      expect(t.consent.settings.description).toBeTruthy();
      expect(t.consent.settings.necessary.title).toBeTruthy();
      expect(t.consent.settings.necessary.description).toBeTruthy();
      expect(t.consent.settings.analytics.title).toBeTruthy();
      expect(t.consent.settings.analytics.description).toBeTruthy();
      expect(t.consent.settings.marketing.title).toBeTruthy();
      expect(t.consent.settings.marketing.description).toBeTruthy();
      expect(t.consent.settings.required).toBeTruthy();
      expect(t.consent.settings.savePreferences).toBeTruthy();
      expect(t.consent.settings.acceptAll).toBeTruthy();
      expect(t.consent.settings.rejectAll).toBeTruthy();
    });

    it(`locale "${locale}" has complete consent.footerLinks`, () => {
      expect(t.consent.footerLinks.cookieSettings).toBeTruthy();
      expect(t.consent.footerLinks.privacyPolicy).toBeTruthy();
    });
  }
});

// ─── privacy section ───────────────────────────────────────────

describe("i18n: privacy translations", () => {
  for (const locale of ALL_LOCALES) {
    const t = translations[locale];

    it(`locale "${locale}" has privacy page metadata`, () => {
      expect(t.privacy.title).toBeTruthy();
      expect(t.privacy.lastUpdated).toBeTruthy();
      expect(t.privacy.backHome).toBeTruthy();
    });

    it(`locale "${locale}" has all privacy sections`, () => {
      const sections = t.privacy.sections;
      const requiredSections = [
        "controller",
        "dataCollection",
        "cookies",
        "usage",
        "rights",
        "contact",
        "authority",
        "changes",
      ] as const;

      for (const section of requiredSections) {
        expect(
          sections[section],
          `Missing privacy section: ${section} in ${locale}`
        ).toBeTruthy();
      }
    });

    it(`locale "${locale}" has cookie table with all categories`, () => {
      const cookies = t.privacy.sections.cookies;
      expect(cookies.heading).toBeTruthy();
      expect(cookies.intro).toBeTruthy();
      expect(cookies.table.name).toBeTruthy();
      expect(cookies.table.provider).toBeTruthy();
      expect(cookies.table.purpose).toBeTruthy();
      expect(cookies.necessary.name).toBeTruthy();
      expect(cookies.necessary.description).toBeTruthy();
      expect(cookies.analytics.name).toBeTruthy();
      expect(cookies.analytics.description).toBeTruthy();
      expect(cookies.marketing.name).toBeTruthy();
      expect(cookies.marketing.description).toBeTruthy();
    });
  }
});

// ─── errors section ────────────────────────────────────────────

describe("i18n: error page translations", () => {
  for (const locale of ALL_LOCALES) {
    const t = translations[locale];

    it(`locale "${locale}" has notFound translations`, () => {
      expect(t.errors.notFound.title).toBeTruthy();
      expect(t.errors.notFound.description).toBeTruthy();
      expect(t.errors.notFound.backHome).toBeTruthy();
    });

    it(`locale "${locale}" has serverError translations`, () => {
      expect(t.errors.serverError.title).toBeTruthy();
      expect(t.errors.serverError.description).toBeTruthy();
      expect(t.errors.serverError.tryAgain).toBeTruthy();
      expect(t.errors.serverError.backHome).toBeTruthy();
    });

    it(`locale "${locale}" has criticalError translations`, () => {
      expect(t.errors.criticalError.title).toBeTruthy();
      expect(t.errors.criticalError.description).toBeTruthy();
      expect(t.errors.criticalError.reload).toBeTruthy();
      expect(t.errors.criticalError.backHome).toBeTruthy();
    });
  }
});

// ─── locale registry ──────────────────────────────────────────

describe("i18n: locale registry", () => {
  it("has metadata for every translation locale", () => {
    for (const locale of ALL_LOCALES) {
      expect(locales[locale], `Missing metadata for locale ${locale}`).toBeTruthy();
      expect(locales[locale].label).toBeTruthy();
      expect(locales[locale].flag).toBeTruthy();
    }
  });

  it("default locale exists in translations", () => {
    expect(translations[defaultLocale]).toBeTruthy();
  });

  it("has exactly 5 locales", () => {
    expect(ALL_LOCALES.length).toBe(5);
    expect(ALL_LOCALES).toContain("en");
    expect(ALL_LOCALES).toContain("sk");
    expect(ALL_LOCALES).toContain("cs");
    expect(ALL_LOCALES).toContain("de");
    expect(ALL_LOCALES).toContain("es");
  });
});
