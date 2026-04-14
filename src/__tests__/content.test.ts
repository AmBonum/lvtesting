import { describe, it, expect } from "vitest";
import {
  siteConfig,
  heroContent,
  aboutContent,
  projects,
  skills,
  experience,
  companies,
} from "@/data/content";

describe("siteConfig", () => {
  it("has required fields", () => {
    expect(siteConfig.name).toBe("Lubomir Volcko");
    expect(siteConfig.url).toBe("https://lvtesting.eu");
    expect(siteConfig.email).toBeTruthy();
    expect(siteConfig.socials.linkedin).toContain("linkedin.com");
    expect(siteConfig.socials.github).toContain("github.com");
  });
});

describe("heroContent", () => {
  it("has CTA buttons with valid anchors", () => {
    expect(heroContent.cta.primary.href).toMatch(/^#/);
    expect(heroContent.cta.secondary.href).toMatch(/^#/);
  });

  it("has at least one badge", () => {
    expect(heroContent.badges.length).toBeGreaterThan(0);
  });
});

describe("aboutContent", () => {
  it("has paragraphs and stats", () => {
    expect(aboutContent.paragraphs.length).toBeGreaterThan(0);
    expect(aboutContent.stats.length).toBeGreaterThan(0);
  });
});

describe("projects", () => {
  it("each project has required fields", () => {
    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.highlights.length).toBeGreaterThan(0);
    }
  });
});

describe("skills", () => {
  it("each skill has category, tools, and valid level", () => {
    for (const skill of skills) {
      expect(skill.category).toBeTruthy();
      expect(skill.tools.length).toBeGreaterThan(0);
      expect(skill.level).toBeGreaterThanOrEqual(0);
      expect(skill.level).toBeLessThanOrEqual(100);
    }
  });
});

describe("experience", () => {
  it("is ordered with most recent first", () => {
    expect(experience[0].period).toContain("Present");
  });

  it("each entry has required fields", () => {
    for (const entry of experience) {
      expect(entry.role).toBeTruthy();
      expect(entry.company).toBeTruthy();
      expect(entry.period).toBeTruthy();
      expect(entry.description).toBeTruthy();
      expect(entry.stack.length).toBeGreaterThan(0);
    }
  });
});

describe("companies", () => {
  it("each company has name and valid URL", () => {
    for (const company of companies) {
      expect(company.name).toBeTruthy();
      expect(company.url).toMatch(/^https?:\/\//);
    }
  });
});
