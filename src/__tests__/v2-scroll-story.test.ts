import { describe, it, expect } from "vitest";
import {
  sceneWindow,
  sceneOpacityRange,
  layerRange,
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
