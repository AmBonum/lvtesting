import { describe, it, expect } from "vitest";
import { projects, experience } from "@/data/content";
import { translations } from "@/i18n";
import type { Locale } from "@/i18n/types";

const LOCALES = Object.keys(translations) as Locale[];

describe("Monitor zo slovenčiny as a project", () => {
  it("is the third project card, after Caterpillar and this site", () => {
    expect(projects.map((p) => p.title)).toEqual([
      "QA Automation @ Caterpillar",
      "lvtesting.eu",
      "Full-Stack Development @ Monitor zo slovenčiny",
    ]);
  });

  it.each(LOCALES)("%s shows it as the third project", (locale) => {
    const items = translations[locale].projects.items;
    expect(items).toHaveLength(3);
    expect(items[2].title).toContain("Monitor zo slovenčiny");
  });

  it.each(LOCALES)("%s has a portfolio entry for it, dated 2026", (locale) => {
    const monitor = translations[locale].portfolio.monitor;
    expect(monitor.year).toBe("2026");
    expect(monitor.tagline).toContain("Monitor zo slovenčiny");
    expect(monitor.features).toHaveLength(11);
  });
});

describe("experience timeline", () => {
  /* The component reads timeline text from the locale files by index and only
     falls back to content.ts, so every assertion is made against both. */
  const PRESENT = {
    en: "Present",
    sk: "Súčasnosť",
    cs: "Současnost",
    de: "Gegenwart",
    es: "Presente",
  } satisfies Record<Locale, string>;

  const JUNE_2026 = {
    en: "June 2026",
    sk: "júna 2026",
    cs: "června 2026",
    de: "Juni 2026",
    es: "junio de 2026",
  } satisfies Record<Locale, string>;

  it("opens with the ongoing Monitor engagement, started September 2026", () => {
    expect(experience[0].company).toContain("Monitor zo slovenčiny");
    expect(experience[0].period).toBe("Sep 2026 – Present");
  });

  it.each(LOCALES)("%s opens with the same ongoing entry", (locale) => {
    const first = translations[locale].experience.items[0];
    expect(first.company).toContain("Monitor zo slovenčiny");
    expect(first.period).toContain("2026");
    expect(first.period).toContain(PRESENT[locale]);
  });

  it("dates the end of the mobility platform work to June 2026", () => {
    const freelance = experience.find((e) => e.company === "Freelance");
    expect(freelance?.description).toContain("June 2026");
    expect(freelance?.description).not.toContain("May 2026");
  });

  it.each(LOCALES)("%s dates the mobility work to June 2026 too", (locale) => {
    const freelance = translations[locale].experience.items.find(
      (e) => e.company === "Freelance",
    );
    expect(freelance?.description).toContain(JUNE_2026[locale]);
  });
});

describe("this site's case study", () => {
  /* The lvtesting.eu card must describe the site that is actually deployed.
     The scroll-driven cinematic background and its scene image pipeline live
     on the unreleased v2 branch; claiming them here would publish features a
     visitor cannot see. */
  const V2_ONLY =
    /parallax|GPU|cinematic|kinematick|filmisch|cinematográfico|image optimi|optimalizáci|optimalizac|Bildoptimierung|optimización de imágenes/i;

  const caseText = (item: { description: string; highlights: string[] }) =>
    [item.description, ...item.highlights].join(" ");

  it("claims no v2-only features in the fallback content", () => {
    const site = projects.find((p) => p.title === "lvtesting.eu");
    expect(site).toBeDefined();
    expect(caseText(site!)).not.toMatch(V2_ONLY);
  });

  it.each(LOCALES)("%s claims no v2-only features either", (locale) => {
    const site = translations[locale].projects.items.find(
      (p) => p.title === "lvtesting.eu",
    );
    expect(site).toBeDefined();
    expect(caseText(site!)).not.toMatch(V2_ONLY);
  });
});
