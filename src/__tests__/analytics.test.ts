import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  initGA4,
  teardownGA4,
  trackPageView,
  trackEvent,
  trackScrollDepth,
  trackSectionView,
  trackClick,
  isGA4Initialized,
  updateMarketingConsent,
} from "@/lib/analytics";

describe("analytics (GA4)", () => {
  beforeEach(() => {
    // Clean DOM and global state
    document.getElementById("ga4-script")?.remove();
    window.dataLayer = [];
    // teardown resets isInitialized
    teardownGA4();
  });

  afterEach(() => {
    teardownGA4();
  });

  // ─── initGA4 ─────────────────────────────────────────────────────

  describe("initGA4", () => {
    it("injects a script tag with the correct src into <head>", () => {
      initGA4();
      const script = document.getElementById("ga4-script") as HTMLScriptElement;
      expect(script).toBeTruthy();
      expect(script.tagName).toBe("SCRIPT");
      expect(script.src).toContain("googletagmanager.com/gtag/js");
      expect(script.async).toBe(true);
    });

    it("sets isGA4Initialized to true", () => {
      expect(isGA4Initialized()).toBe(false);
      initGA4();
      expect(isGA4Initialized()).toBe(true);
    });

    it("does NOT double-inject scripts on repeated calls", () => {
      initGA4();
      initGA4();
      initGA4();
      const scripts = document.querySelectorAll("#ga4-script");
      expect(scripts.length).toBe(1);
    });

    it("pushes consent default + config + consent update to dataLayer", () => {
      initGA4();
      // dataLayer should have: consent default, js, config, consent update
      expect(window.dataLayer.length).toBeGreaterThanOrEqual(4);

      // First entry: consent default with denied
      const consentDefault = window.dataLayer[0] as unknown[];
      expect(consentDefault[0]).toBe("consent");
      expect(consentDefault[1]).toBe("default");
      expect(consentDefault[2]).toHaveProperty("analytics_storage", "denied");

      // Last entry should be consent update with granted
      const consentUpdate = window.dataLayer[window.dataLayer.length - 1] as unknown[];
      expect(consentUpdate[0]).toBe("consent");
      expect(consentUpdate[1]).toBe("update");
      expect(consentUpdate[2]).toHaveProperty("analytics_storage", "granted");
    });

    it("configures GA4 with anonymize_ip and secure cookies", () => {
      initGA4();
      const configEntry = window.dataLayer.find(
        (entry) => Array.isArray(entry) && entry[0] === "config"
      ) as unknown[] | undefined;
      expect(configEntry).toBeTruthy();
      expect(configEntry![2]).toHaveProperty("anonymize_ip", true);
      expect(configEntry![2]).toHaveProperty("cookie_flags", "SameSite=Lax;Secure");
    });
  });

  // ─── teardownGA4 ─────────────────────────────────────────────────

  describe("teardownGA4", () => {
    it("removes the GA4 script from DOM", () => {
      initGA4();
      expect(document.getElementById("ga4-script")).toBeTruthy();
      teardownGA4();
      expect(document.getElementById("ga4-script")).toBeNull();
    });

    it("resets isGA4Initialized to false", () => {
      initGA4();
      expect(isGA4Initialized()).toBe(true);
      teardownGA4();
      expect(isGA4Initialized()).toBe(false);
    });

    it("clears the dataLayer", () => {
      initGA4();
      expect(window.dataLayer.length).toBeGreaterThan(0);
      teardownGA4();
      expect(window.dataLayer).toEqual([]);
    });

    it("allows re-initialization after teardown", () => {
      initGA4();
      teardownGA4();
      expect(isGA4Initialized()).toBe(false);

      initGA4();
      expect(isGA4Initialized()).toBe(true);
      expect(document.getElementById("ga4-script")).toBeTruthy();
    });
  });

  // ─── tracking functions guard: must not fire before consent ──────

  describe("tracking guards (no tracking without initialization)", () => {
    it("trackPageView does nothing when not initialized", () => {
      window.dataLayer = [];
      trackPageView("/test", "Test");
      expect(window.dataLayer).toEqual([]);
    });

    it("trackEvent does nothing when not initialized", () => {
      window.dataLayer = [];
      trackEvent("test_event", { key: "value" });
      expect(window.dataLayer).toEqual([]);
    });

    it("trackScrollDepth does nothing when not initialized", () => {
      window.dataLayer = [];
      trackScrollDepth(50);
      expect(window.dataLayer).toEqual([]);
    });

    it("trackSectionView does nothing when not initialized", () => {
      window.dataLayer = [];
      trackSectionView("about");
      expect(window.dataLayer).toEqual([]);
    });

    it("trackClick does nothing when not initialized", () => {
      window.dataLayer = [];
      trackClick("btn-1", "Click me");
      expect(window.dataLayer).toEqual([]);
    });
  });

  // ─── tracking functions fire after init ──────────────────────────

  describe("tracking functions (after initialization)", () => {
    beforeEach(() => {
      initGA4();
      // Clear dataLayer of init events so we can test just the tracking calls
      window.dataLayer = [];
    });

    it("trackPageView pushes page_view event with path and title", () => {
      trackPageView("/#about", "About");
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("event");
      expect(entry[1]).toBe("page_view");
      expect(entry[2]).toEqual({ page_path: "/#about", page_title: "About" });
    });

    it("trackEvent pushes custom event with params", () => {
      trackEvent("cta_click", { button: "start_project" });
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("event");
      expect(entry[1]).toBe("cta_click");
      expect(entry[2]).toEqual({ button: "start_project" });
    });

    it("trackScrollDepth pushes scroll event with percentage", () => {
      trackScrollDepth(75);
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("event");
      expect(entry[1]).toBe("scroll");
      expect(entry[2]).toEqual({ percent_scrolled: 75 });
    });

    it("trackSectionView pushes section_view with id", () => {
      trackSectionView("skills");
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("event");
      expect(entry[1]).toBe("section_view");
      expect(entry[2]).toEqual({ section_id: "skills" });
    });

    it("trackClick pushes click event with element details", () => {
      trackClick("nav-contact", "Contact");
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("event");
      expect(entry[1]).toBe("click");
      expect(entry[2]).toEqual({
        element_id: "nav-contact",
        element_text: "Contact",
      });
    });
  });

  // ─── updateMarketingConsent ──────────────────────────────────────

  describe("updateMarketingConsent", () => {
    it("does nothing when not initialized", () => {
      window.dataLayer = [];
      updateMarketingConsent(true);
      expect(window.dataLayer).toEqual([]);
    });

    it("grants ad_storage/ad_user_data/ad_personalization when true", () => {
      initGA4();
      window.dataLayer = [];
      updateMarketingConsent(true);
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[0]).toBe("consent");
      expect(entry[1]).toBe("update");
      expect(entry[2]).toHaveProperty("ad_storage", "granted");
      expect(entry[2]).toHaveProperty("ad_user_data", "granted");
      expect(entry[2]).toHaveProperty("ad_personalization", "granted");
    });

    it("denies ad_storage/ad_user_data/ad_personalization when false", () => {
      initGA4();
      window.dataLayer = [];
      updateMarketingConsent(false);
      const entry = window.dataLayer[0] as unknown[];
      expect(entry[2]).toHaveProperty("ad_storage", "denied");
      expect(entry[2]).toHaveProperty("ad_user_data", "denied");
      expect(entry[2]).toHaveProperty("ad_personalization", "denied");
    });
  });

  // ─── GDPR: no tracking before consent scenario ──────────────────

  describe("GDPR: full consent lifecycle", () => {
    it("no events fire before initGA4, events fire after, stop after teardown", () => {
      // Phase 1: no consent yet
      window.dataLayer = [];
      trackPageView("/", "Home");
      trackSectionView("hero");
      expect(window.dataLayer).toEqual([]);

      // Phase 2: user consents
      initGA4();
      window.dataLayer = [];
      trackPageView("/", "Home");
      expect(window.dataLayer.length).toBe(1);

      // Phase 3: user revokes consent
      teardownGA4();
      window.dataLayer = [];
      trackPageView("/", "Home");
      expect(window.dataLayer).toEqual([]);
    });
  });
});
