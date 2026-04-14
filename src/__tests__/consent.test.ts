import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getStoredConsent,
  saveConsent,
  clearConsent,
  hasValidConsent,
  hasConsentFor,
  getDefaultPreferences,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  type ConsentPreferences,
  type ConsentRecord,
} from "@/lib/consent";

describe("consent utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ─── getDefaultPreferences ───────────────────────────────────────

  describe("getDefaultPreferences", () => {
    it("returns necessary=true, analytics=false, marketing=false", () => {
      const prefs = getDefaultPreferences();
      expect(prefs).toEqual({
        necessary: true,
        analytics: false,
        marketing: false,
      });
    });

    it("returns a new object each call (no shared reference mutation bug)", () => {
      const a = getDefaultPreferences();
      const b = getDefaultPreferences();
      expect(a).not.toBe(b);
      a.analytics = true;
      expect(b.analytics).toBe(false);
    });
  });

  // ─── saveConsent ─────────────────────────────────────────────────

  describe("saveConsent", () => {
    it("persists a valid ConsentRecord to localStorage", () => {
      const prefs: ConsentPreferences = {
        necessary: true,
        analytics: true,
        marketing: false,
      };
      const record = saveConsent(prefs, "sk");

      expect(record.preferences).toEqual(prefs);
      expect(record.version).toBe(CONSENT_VERSION);
      expect(record.locale).toBe("sk");
      expect(record.timestamp).toBeTruthy();

      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      expect(raw).toBeTruthy();
      expect(JSON.parse(raw!)).toEqual(record);
    });

    it("stores an ISO-8601 timestamp", () => {
      const record = saveConsent(getDefaultPreferences(), "en");
      expect(() => new Date(record.timestamp)).not.toThrow();
      expect(new Date(record.timestamp).toISOString()).toBe(record.timestamp);
    });

    it("overwrites previous consent on re-save", () => {
      saveConsent({ necessary: true, analytics: false, marketing: false }, "en");
      saveConsent({ necessary: true, analytics: true, marketing: true }, "de");

      const stored = getStoredConsent();
      expect(stored!.preferences.analytics).toBe(true);
      expect(stored!.preferences.marketing).toBe(true);
      expect(stored!.locale).toBe("de");
    });
  });

  // ─── getStoredConsent ────────────────────────────────────────────

  describe("getStoredConsent", () => {
    it("returns null when nothing is stored", () => {
      expect(getStoredConsent()).toBeNull();
    });

    it("returns null for corrupted JSON", () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, "not-json{{{");
      expect(getStoredConsent()).toBeNull();
    });

    it("returns null for valid JSON with wrong version (forces re-consent)", () => {
      const stale: ConsentRecord = {
        preferences: { necessary: true, analytics: true, marketing: true },
        timestamp: new Date().toISOString(),
        version: "0.9",
        locale: "en",
      };
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stale));
      expect(getStoredConsent()).toBeNull();
    });

    it("returns the record when version matches", () => {
      const record: ConsentRecord = {
        preferences: { necessary: true, analytics: false, marketing: false },
        timestamp: new Date().toISOString(),
        version: CONSENT_VERSION,
        locale: "cs",
      };
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));

      const result = getStoredConsent();
      expect(result).toEqual(record);
    });

    it("returns null for empty string", () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, "");
      expect(getStoredConsent()).toBeNull();
    });

    it("returns null for JSON null literal", () => {
      localStorage.setItem(CONSENT_STORAGE_KEY, "null");
      expect(getStoredConsent()).toBeNull();
    });
  });

  // ─── clearConsent ────────────────────────────────────────────────

  describe("clearConsent", () => {
    it("removes stored consent", () => {
      saveConsent(getDefaultPreferences(), "en");
      expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeTruthy();

      clearConsent();
      expect(localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();
    });

    it("does not throw when nothing is stored", () => {
      expect(() => clearConsent()).not.toThrow();
    });
  });

  // ─── hasValidConsent ─────────────────────────────────────────────

  describe("hasValidConsent", () => {
    it("returns false when no consent stored", () => {
      expect(hasValidConsent()).toBe(false);
    });

    it("returns true after saving consent", () => {
      saveConsent(getDefaultPreferences(), "en");
      expect(hasValidConsent()).toBe(true);
    });

    it("returns false when stored version is outdated", () => {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          preferences: { necessary: true, analytics: true, marketing: true },
          timestamp: new Date().toISOString(),
          version: "0.0.1",
          locale: "en",
        })
      );
      expect(hasValidConsent()).toBe(false);
    });

    it("returns false after clearConsent()", () => {
      saveConsent(getDefaultPreferences(), "en");
      clearConsent();
      expect(hasValidConsent()).toBe(false);
    });
  });

  // ─── hasConsentFor ───────────────────────────────────────────────

  describe("hasConsentFor", () => {
    it("returns false when no consent stored", () => {
      expect(hasConsentFor("analytics")).toBe(false);
      expect(hasConsentFor("marketing")).toBe(false);
    });

    it("returns correct value per category", () => {
      saveConsent(
        { necessary: true, analytics: true, marketing: false },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(true);
      expect(hasConsentFor("marketing")).toBe(false);
    });

    it("returns false for category when version is stale", () => {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({
          preferences: { necessary: true, analytics: true, marketing: true },
          timestamp: new Date().toISOString(),
          version: "old",
          locale: "en",
        })
      );
      expect(hasConsentFor("analytics")).toBe(false);
    });
  });

  // ─── GDPR integration scenarios ─────────────────────────────────

  describe("GDPR scenarios", () => {
    it("reject-all flow: no category is consented", () => {
      saveConsent(
        { necessary: true, analytics: false, marketing: false },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(false);
      expect(hasConsentFor("marketing")).toBe(false);
      expect(hasValidConsent()).toBe(true);
    });

    it("accept-all flow: all categories are consented", () => {
      saveConsent(
        { necessary: true, analytics: true, marketing: true },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(true);
      expect(hasConsentFor("marketing")).toBe(true);
    });

    it("partial consent: only analytics", () => {
      saveConsent(
        { necessary: true, analytics: true, marketing: false },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(true);
      expect(hasConsentFor("marketing")).toBe(false);
    });

    it("consent withdrawal: update from accept-all to reject-all", () => {
      saveConsent(
        { necessary: true, analytics: true, marketing: true },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(true);

      saveConsent(
        { necessary: true, analytics: false, marketing: false },
        "en"
      );
      expect(hasConsentFor("analytics")).toBe(false);
      expect(hasConsentFor("marketing")).toBe(false);
    });

    it("version bump invalidates previous consent (forces re-consent)", () => {
      // Simulate a user who consented with an older version
      const oldRecord: ConsentRecord = {
        preferences: { necessary: true, analytics: true, marketing: true },
        timestamp: new Date().toISOString(),
        version: "0.5",
        locale: "en",
      };
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(oldRecord));

      // Current code should treat this as invalid
      expect(hasValidConsent()).toBe(false);
      expect(getStoredConsent()).toBeNull();
      expect(hasConsentFor("analytics")).toBe(false);
    });
  });
});
