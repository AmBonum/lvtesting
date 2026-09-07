import { describe, it, expect } from "vitest";
import {
  sceneWindow,
  sceneOpacityRange,
  layerRange,
  sceneWindowsFromSections,
  BLEND_FRACTION,
} from "@/lib/v2/scroll-story";

describe("sceneWindow", () => {
  it("splits the scroll evenly across scenes", () => {
    expect(sceneWindow(0, 6)).toEqual({ start: 0, end: 1 / 6 });
    expect(sceneWindow(5, 6)).toEqual({ start: 5 / 6, end: 1 });
  });

  it("produces windows that touch without gaps or overlap", () => {
    for (let i = 0; i < 5; i++) {
      expect(sceneWindow(i, 6).end).toBeCloseTo(sceneWindow(i + 1, 6).start, 10);
    }
  });
});

describe("sceneOpacityRange", () => {
  it("holds the first scene visible from the very top of the page", () => {
    const { input, output } = sceneOpacityRange(0, 6);
    expect(input[0]).toBe(0);
    expect(output[0]).toBe(1);
  });

  it("fades a middle scene in before its window and out after it", () => {
    const { input, output } = sceneOpacityRange(2, 6);
    expect(output).toEqual([0, 1, 1, 0]);
    expect(input[0]).toBeLessThan(input[1]);
    expect(input[1]).toBeLessThan(input[2]);
    expect(input[2]).toBeLessThan(input[3]);
  });

  it("holds the last scene visible to the very bottom of the page", () => {
    const { input, output } = sceneOpacityRange(5, 6);
    expect(input[input.length - 1]).toBe(1);
    expect(output[output.length - 1]).toBe(1);
  });

  it("overlaps neighbouring scenes so one is always fully opaque somewhere", () => {
    const a = sceneOpacityRange(1, 6);
    const b = sceneOpacityRange(2, 6);
    // scene 2 starts fading in before scene 1 has finished fading out
    expect(b.input[0]).toBeLessThan(a.input[a.input.length - 1]);
  });

  it("returns a strictly increasing input for every scene, including the edges", () => {
    // useTransform requires a strictly monotonically increasing input array.
    // Edge scenes (0 and count - 1) clamp to the page boundary, and that
    // clamp point coincides with the adjacent fade keyframe — so they must
    // drop the redundant point (a 3-point range) rather than repeat a value
    // (which a middle scene's 4-point range never does).
    for (let i = 0; i < 6; i++) {
      const { input, output } = sceneOpacityRange(i, 6);
      expect(output.length).toBe(input.length);
      for (let j = 1; j < input.length; j++) {
        expect(input[j]).toBeGreaterThan(input[j - 1]);
      }
    }
  });
});

describe("layerRange", () => {
  it("moves a layer by its speed across the scene window", () => {
    const { input, output } = layerRange(0, 6, 1, 200);
    expect(input).toEqual([0, 1 / 6]);
    expect(output).toEqual([100, -100]);
  });

  it("moves a slow layer less than a fast one", () => {
    const slow = layerRange(2, 6, 0.1, 200);
    const fast = layerRange(2, 6, 1, 200);
    expect(Math.abs(slow.output[0])).toBeLessThan(Math.abs(fast.output[0]));
  });

  it("keeps a zero-speed layer still", () => {
    expect(layerRange(3, 6, 0, 200).output).toEqual([0, 0]);
  });

  it("spans exactly the scene's own window", () => {
    const { input } = layerRange(4, 6, 0.5, 200);
    const window = sceneWindow(4, 6);
    expect(input[0]).toBeCloseTo(window.start, 10);
    expect(input[1]).toBeCloseTo(window.end, 10);
  });
});

describe("BLEND_FRACTION", () => {
  it("is a sane crossfade slice of a scene", () => {
    expect(BLEND_FRACTION).toBeGreaterThan(0);
    expect(BLEND_FRACTION).toBeLessThan(0.5);
  });
});

describe("sceneWindowsFromSections", () => {
  it("reproduces the equal-window split exactly for equal-height sections", () => {
    // `sceneWindow`'s pure `index / count` split implicitly assumes a page
    // with no viewport-sized overhang left at the bottom (see the
    // doc-comment on sceneWindowsFromSections) — i.e. it is only exactly
    // recovered when viewportHeight is 0. That isn't a hack: it is the one
    // point at which "equal-height sections" and "equal split of scroll
    // progress" are mathematically the same statement. This is still the
    // key regression guard, because it proves the new geometry-driven path
    // collapses to the old assumption's own numbers instead of some
    // unrelated formula that only looks right by eyeballing it.
    const count = 6;
    const height = 900;
    const sections = Array.from({ length: count }, (_, i) => ({
      top: i * height,
      height,
    }));
    const docHeight = count * height;

    const windows = sceneWindowsFromSections(sections, docHeight, 0);

    for (let i = 0; i < count; i++) {
      expect(windows[i].start).toBeCloseTo(sceneWindow(i, count).start, 10);
      expect(windows[i].end).toBeCloseTo(sceneWindow(i, count).end, 10);
    }
  });

  it("shrinks the window of sections that occupy less of the document, without changing sections it doesn't touch", () => {
    // Three sections: a normal one, a hero-sized one, and a normal one
    // again — modelling e.g. Testing / Track / Contact where the middle
    // one (Track/Contact-like) balloons in height. The flanking sections'
    // windows should track their own real share of the document, not get
    // dragged off it by their oversized neighbour.
    const sections = [
      { top: 0, height: 100 },
      { top: 100, height: 500 },
      { top: 600, height: 100 },
    ];
    const docHeight = 700;
    const windows = sceneWindowsFromSections(sections, docHeight, 0);

    // Flanking sections keep their own proportional share (100 / 700),
    // not an equal 1/3 each the way the old assumption would have given
    // them.
    expect(windows[0].end - windows[0].start).toBeCloseTo(100 / 700, 10);
    expect(windows[2].end - windows[2].start).toBeCloseTo(100 / 700, 10);
    // The oversized middle section correctly claims the rest.
    expect(windows[1].end - windows[1].start).toBeCloseTo(500 / 700, 10);
    // None of this matches "one oversized section pushes the others off
    // their equal thirds":
    expect(windows[0].end - windows[0].start).not.toBeCloseTo(1 / 3, 2);
  });

  it("always starts the first window at 0 and ends the last window at 1", () => {
    const sections = [
      { top: 0, height: 250 },
      { top: 250, height: 900 },
      { top: 1150, height: 300 },
      { top: 1450, height: 1800 },
    ];
    const windows = sceneWindowsFromSections(sections, 3250, 800);
    expect(windows[0].start).toBe(0);
    expect(windows[windows.length - 1].end).toBe(1);
  });

  it("returns strictly increasing boundaries, touching with no gaps or overlaps", () => {
    const sections = [
      { top: 0, height: 400 },
      { top: 400, height: 1600 },
      { top: 2000, height: 700 },
    ];
    const windows = sceneWindowsFromSections(sections, 2700, 500);
    for (const w of windows) {
      expect(w.end).toBeGreaterThan(w.start);
    }
    for (let i = 0; i < windows.length - 1; i++) {
      expect(windows[i].end).toBeCloseTo(windows[i + 1].start, 10);
    }
  });

  it("is total for a single section", () => {
    expect(sceneWindowsFromSections([{ top: 0, height: 800 }], 800, 0)).toEqual(
      [{ start: 0, end: 1 }],
    );
  });

  it("is total for an empty section list", () => {
    expect(sceneWindowsFromSections([], 1000, 800)).toEqual([]);
  });

  it("is total for a zero-height section, never producing NaN or a repeated boundary", () => {
    const sections = [
      { top: 0, height: 300 },
      { top: 300, height: 0 },
      { top: 300, height: 300 },
    ];
    const windows = sceneWindowsFromSections(sections, 600, 100);
    for (const w of windows) {
      expect(Number.isNaN(w.start)).toBe(false);
      expect(Number.isNaN(w.end)).toBe(false);
      expect(w.end).toBeGreaterThan(w.start);
    }
  });

  it("is total for sections shorter than the viewport", () => {
    const sections = [
      { top: 0, height: 50 },
      { top: 50, height: 60 },
      { top: 110, height: 40 },
    ];
    const windows = sceneWindowsFromSections(sections, 150, 900);
    expect(windows).toHaveLength(3);
    for (const w of windows) {
      expect(Number.isNaN(w.start)).toBe(false);
      expect(Number.isNaN(w.end)).toBe(false);
    }
  });

  it("falls back to the equal split when the document is no taller than the viewport", () => {
    const sections = [
      { top: 0, height: 200 },
      { top: 200, height: 200 },
    ];
    const windows = sceneWindowsFromSections(sections, 400, 900);
    expect(windows).toEqual([sceneWindow(0, 2), sceneWindow(1, 2)]);
  });
});
