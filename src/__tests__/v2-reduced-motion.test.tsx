/**
 * Task 8, section C: nothing on /v2 may be left invisible because an
 * entrance animation never ran under `prefers-reduced-motion: reduce`.
 *
 * The harness browser cannot emulate the media query (there is no
 * `Emulation.setEmulatedMedia` in the preview tooling and changing the
 * host's system accessibility settings is out of bounds), so the
 * reduced-motion path is verified here instead: `window.matchMedia` is
 * stubbed to report the reduce preference, which is exactly the signal
 * Framer Motion's `useReducedMotion` reads.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { I18nProvider } from "@/i18n/provider";
import { SectionShell } from "@/components/v2/sections/Shell";
import { TestingV2 } from "@/components/v2/sections/TestingV2";
import { skills } from "@/data/content";

function stubReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({
        matches: query.includes("prefers-reduced-motion") ? matches : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

/**
 * jsdom has no IntersectionObserver, and Framer Motion's `whileInView`
 * constructs one on mount. This stub never reports an intersection, so a
 * section stays in whatever state its `initial` prop put it in — which is
 * precisely the state under test: with motion reduced there must be no
 * such state to be stuck in.
 */
class NoopIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): [] {
    return [];
  }
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
}

beforeEach(() => {
  stubReducedMotion(true);
  vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("prefers-reduced-motion on /v2", () => {
  it("renders a section's content visible instead of holding it at opacity 0", () => {
    render(
      <SectionShell id="hero" kicker="Kicker">
        <h1 id="hero-heading">Headline</h1>
        <p>Body copy</p>
      </SectionShell>,
    );

    const panel = document.querySelector(".v2-text-panel") as HTMLElement;
    expect(panel).toBeTruthy();
    // `initial={false}` means Framer Motion writes no entrance styles at
    // all, so there is no inline opacity/transform to be stuck at.
    expect(panel.style.opacity).not.toBe("0");
    expect(panel.style.transform ?? "").not.toContain("translateY(28");
    expect(screen.getByText("Headline")).toBeVisible();
    expect(screen.getByText("Body copy")).toBeVisible();
  });

  // The control for this file — that the two paths really do differ — lives
  // in v2-motion-default.test.tsx, in its own module so Framer Motion's
  // module-level `prefersReducedMotion` singleton (initialised on the first
  // `useReducedMotion()` call and never re-read) starts from the opposite
  // value.

  it("keeps the section landmark named even with motion disabled", () => {
    render(
      <SectionShell id="work" kicker="Kicker">
        <h2 id="work-heading">Work</h2>
      </SectionShell>,
    );
    const section = document.querySelector("section")!;
    expect(section.getAttribute("aria-labelledby")).toBe("work-heading");
    expect(document.getElementById("work-heading")).toBeTruthy();
  });

  it("shows every skill bar already filled, scaled not widened", () => {
    render(
      <I18nProvider>
        <TestingV2 />
      </I18nProvider>,
    );

    const fills = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".h-1.w-full.overflow-hidden > *",
      ),
    );
    expect(fills).toHaveLength(skills.length);

    fills.forEach((fill, i) => {
      // Already filled: scaleX is the final level, not 0.
      expect(fill.style.transform).toContain(
        `scaleX(${skills[i].level / 100})`,
      );
      // Never a layout property.
      expect(fill.style.width).toBe("");
      expect(fill.className).toContain("w-full");
      expect(fill.className).toContain("origin-left");
    });
  });
});
