/**
 * The control for v2-reduced-motion.test.tsx. Framer Motion reads the
 * reduced-motion preference once into a module-level singleton, so the two
 * preferences cannot be exercised in one test module — this file is
 * deliberately separate and stubs nothing: jsdom has no `matchMedia`, which
 * Framer Motion treats as "motion allowed".
 *
 * Without this, the reduced-motion assertions would be vacuous: a section
 * that never sets an entrance opacity under either preference would pass
 * them for the wrong reason.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { SectionShell } from "@/components/v2/sections/Shell";

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
  vi.stubGlobal("IntersectionObserver", NoopIntersectionObserver);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("motion allowed (control for the reduced-motion suite)", () => {
  it("holds a section at opacity 0 until it scrolls into view", () => {
    render(
      <SectionShell id="process" kicker="Kicker">
        <h2 id="process-heading">Process</h2>
      </SectionShell>,
    );
    const panel = document.querySelector(".v2-text-panel") as HTMLElement;
    expect(panel.style.opacity).toBe("0");
  });
});
