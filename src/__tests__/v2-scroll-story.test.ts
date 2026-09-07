import { describe, it, expect } from "vitest";
import {
  sceneWindow,
  sceneOpacityRange,
  layerRange,
  sceneWindowsFromSections,
  layerRangeForWindow,
  pinnedToFullProgress,
  sceneOpacityRangeForWindow,
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

  it("fades a middle scene in across its start boundary and then holds it", () => {
    // Deliberately NOT [0, 1, 1, 0]: a scene never fades out, because the
    // next one arriving on top is what hides it. Fading out at the same
    // time would uncover the near-black ground behind them both — see the
    // "scene stack never lets the ground show through" suite below.
    const { input, output } = sceneOpacityRange(2, 6);
    expect(output).toEqual([0, 1, 1]);
    expect(input[0]).toBeLessThan(input[1]);
    expect(input[1]).toBeLessThan(input[2]);
    expect(input[input.length - 1]).toBe(1);
  });

  it("never decreases a scene's opacity once it has arrived", () => {
    // The property the fix rests on, stated for every scene at once.
    for (let i = 0; i < 6; i++) {
      const { output } = sceneOpacityRange(i, 6);
      for (let j = 1; j < output.length; j++) {
        expect(output[j]).toBeGreaterThanOrEqual(output[j - 1]);
      }
    }
  });

  it("holds the last scene visible to the very bottom of the page", () => {
    const { input, output } = sceneOpacityRange(5, 6);
    expect(input[input.length - 1]).toBe(1);
    expect(output[output.length - 1]).toBe(1);
  });

  it("starts a scene's fade-in while the one beneath it is still fully opaque", () => {
    const a = sceneOpacityRange(1, 6);
    const b = sceneOpacityRange(2, 6);
    // Scene 1 is at 1 from its own arrival all the way to the bottom of the
    // page, so scene 2 always fades in over something fully opaque. That is
    // what keeps the ground covered through the whole transition.
    expect(b.input[0]).toBeLessThan(a.input[a.input.length - 1]);
    expect(a.output[a.output.length - 1]).toBe(1);
  });

  it("returns a strictly increasing input for every scene, including the edges", () => {
    // useTransform requires a strictly monotonically increasing input array.
    // The first scene collapses to a 2-point [0, 1] range and every other
    // scene to a 3-point one ending at 1; neither repeats a value, which is
    // the failure mode that bit this module once already (see the
    // pinnedToFullProgress suite for the same trap on the accelerated path).
    for (let i = 0; i < 6; i++) {
      const { input, output } = sceneOpacityRange(i, 6);
      expect(output.length).toBe(input.length);
      for (let j = 1; j < input.length; j++) {
        expect(input[j]).toBeGreaterThan(input[j - 1]);
      }
    }
  });
});

/* The ground behind the scenes is near-black (#05060B). If two adjacent
   scenes crossfade by ramping their opacities independently, both sit near
   0.5 at the midpoint and (1 - 0.5) * (1 - 0.5) = 25% of that ground shows
   through the stack — measured live at up to 29.3% before this was fixed,
   which reads as two photographs superimposed and dimmed toward black.

   Scenes are stacked in DOM order and later ones paint over earlier ones,
   so a scene never has to fade OUT: it only has to fade IN over the one
   beneath it. These tests pin that invariant down directly, in the terms
   that actually matter on screen — how much ground is visible — rather than
   by asserting a particular keyframe shape. */
describe("scene stack never lets the ground show through", () => {
  const evalAt = (input: number[], output: number[], at: number) => {
    if (at <= input[0]) return output[0];
    if (at >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 1; i < input.length; i++) {
      if (at <= input[i]) {
        const span = input[i] - input[i - 1];
        const t = span === 0 ? 0 : (at - input[i - 1]) / span;
        return output[i - 1] + (output[i] - output[i - 1]) * t;
      }
    }
    return output[output.length - 1];
  };

  /* What the compositor actually does: each scene paints over the ones
     below it, so the fraction of ground still visible is the product of
     (1 - opacity) across the whole stack. */
  const groundVisibleAt = (
    ranges: { input: number[]; output: number[] }[],
    at: number,
  ) => ranges.reduce((acc, r) => acc * (1 - evalAt(r.input, r.output, at)), 1);

  const SAMPLE_POINTS = Array.from({ length: 1001 }, (_, i) => i / 1000);

  it("keeps the ground fully covered at every scroll position, for equal windows", () => {
    for (let count = 1; count <= 8; count++) {
      const ranges = Array.from({ length: count }, (_, i) =>
        sceneOpacityRange(i, count),
      );
      for (const at of SAMPLE_POINTS) {
        expect(
          groundVisibleAt(ranges, at),
          `count=${count} at=${at} leaked ${groundVisibleAt(ranges, at)}`,
        ).toBeCloseTo(0, 6);
      }
    }
  });

  it("keeps the ground fully covered for measured windows of unequal height", () => {
    // The real page: contact is roughly twice the height of a hero section.
    const sections = [
      { top: 0, height: 900 },
      { top: 900, height: 900 },
      { top: 1800, height: 900 },
      { top: 2700, height: 900 },
      { top: 3600, height: 1806 },
      { top: 5406, height: 1662 },
    ];
    const windows = sceneWindowsFromSections(sections, 7068, 900);
    const ranges = windows.map((w, i) =>
      sceneOpacityRangeForWindow(w, i === 0),
    );
    for (const at of SAMPLE_POINTS) {
      expect(
        groundVisibleAt(ranges, at),
        `at=${at} leaked ${groundVisibleAt(ranges, at)}`,
      ).toBeCloseTo(0, 6);
    }
  });

  it("still covers the ground after pinning to full progress", () => {
    const count = 6;
    const ranges = Array.from({ length: count }, (_, i) => {
      const r = sceneOpacityRange(i, count);
      return pinnedToFullProgress(r.input, r.output);
    });
    for (const at of SAMPLE_POINTS) {
      expect(groundVisibleAt(ranges, at)).toBeCloseTo(0, 6);
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

describe("pinnedToFullProgress", () => {
  /** The clamped interpolation `useTransform` performs by default. */
  const clampedAt = (input: number[], output: number[], at: number) => {
    if (at <= input[0]) return output[0];
    if (at >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 1; i < input.length; i++) {
      if (at <= input[i]) {
        const span = input[i] - input[i - 1];
        const t = span === 0 ? 0 : (at - input[i - 1]) / span;
        return output[i - 1] + (output[i] - output[i - 1]) * t;
      }
    }
    return output[output.length - 1];
  };

  const SAMPLES = Array.from({ length: 101 }, (_, i) => i / 100);

  it("extends a range that stops short of 1, holding its last output", () => {
    const { input, output } = pinnedToFullProgress([0, 0.1, 0.2], [1, 1, 0]);
    expect(input).toEqual([0, 0.1, 0.2, 1]);
    expect(output).toEqual([1, 1, 0, 0]);
  });

  it("extends a range that starts after 0, holding its first output", () => {
    const { input, output } = pinnedToFullProgress([0.8, 0.9, 1], [0, 1, 1]);
    expect(input).toEqual([0, 0.8, 0.9, 1]);
    expect(output).toEqual([0, 0, 1, 1]);
  });

  it("extends both ends of a middle scene's range", () => {
    const { input, output } = pinnedToFullProgress(
      [0.3, 0.4, 0.5, 0.6],
      [0, 1, 1, 0],
    );
    expect(input).toEqual([0, 0.3, 0.4, 0.5, 0.6, 1]);
    expect(output).toEqual([0, 0, 1, 1, 0, 0]);
  });

  it("leaves a range that already spans 0 to 1 untouched", () => {
    const { input, output } = pinnedToFullProgress([0, 0.5, 1], [1, 0, 1]);
    expect(input).toEqual([0, 0.5, 1]);
    expect(output).toEqual([1, 0, 1]);
  });

  it("is a no-op on an empty range", () => {
    expect(pinnedToFullProgress([], [])).toEqual({ input: [], output: [] });
  });

  it("never mutates its arguments", () => {
    const input = [0.2, 0.8];
    const output = [4, -4];
    pinnedToFullProgress(input, output);
    expect(input).toEqual([0.2, 0.8]);
    expect(output).toEqual([4, -4]);
  });

  it("always spans exactly 0 to 1 and stays strictly increasing", () => {
    const count = 6;
    for (let index = 0; index < count; index++) {
      const raw = sceneOpacityRange(index, count);
      const { input } = pinnedToFullProgress(raw.input, raw.output);
      expect(input[0]).toBe(0);
      expect(input[input.length - 1]).toBe(1);
      for (let i = 1; i < input.length; i++) {
        expect(input[i]).toBeGreaterThan(input[i - 1]);
      }
    }
  });

  it("produces the same value as the clamped original at every sample", () => {
    const count = 6;
    for (let index = 0; index < count; index++) {
      const opacity = sceneOpacityRange(index, count);
      const pinnedOpacity = pinnedToFullProgress(
        opacity.input,
        opacity.output,
      );
      const travel = layerRange(index, count, 0.6, 120);
      const pinnedTravel = pinnedToFullProgress(travel.input, travel.output);

      for (const at of SAMPLES) {
        expect(
          clampedAt(pinnedOpacity.input, pinnedOpacity.output, at),
        ).toBeCloseTo(clampedAt(opacity.input, opacity.output, at), 12);
        expect(
          clampedAt(pinnedTravel.input, pinnedTravel.output, at),
        ).toBeCloseTo(clampedAt(travel.input, travel.output, at), 12);
      }
    }
  });

  it("spans 0 to 1 for measured windows too, not just the equal split", () => {
    const sections = [
      { top: 0, height: 900 },
      { top: 900, height: 900 },
      { top: 1800, height: 900 },
      { top: 2700, height: 900 },
      { top: 3600, height: 1806 },
      { top: 5406, height: 1662 },
    ];
    const windows = sceneWindowsFromSections(sections, 7068, 900);

    windows.forEach((window, index) => {
      const opacity = sceneOpacityRangeForWindow(window, index === 0);
      const pinned = pinnedToFullProgress(opacity.input, opacity.output);
      expect(pinned.input[0]).toBe(0);
      expect(pinned.input[pinned.input.length - 1]).toBe(1);

      const travel = layerRangeForWindow(window, 0.4, 120);
      const pinnedTravel = pinnedToFullProgress(travel.input, travel.output);
      expect(pinnedTravel.input[0]).toBe(0);
      expect(pinnedTravel.input[pinnedTravel.input.length - 1]).toBe(1);
    });
  });
});
