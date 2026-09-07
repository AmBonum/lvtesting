import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { SCENES } from "@/lib/v2/scenes";

const PUBLIC = resolve(__dirname, "../../public");

describe("v2 scene data", () => {
  it("has one scene per section", () => {
    expect(SCENES).toHaveLength(6);
  });

  it("gives every scene a unique id", () => {
    expect(new Set(SCENES.map((s) => s.id)).size).toBe(SCENES.length);
  });

  it("points every plate at a file that exists", () => {
    // `plate.src` is a bare path (e.g. "/images/scenes/01") with no width or
    // extension suffix — the asset pipeline (Task 1) only ever emits
    // suffixed files such as "01-1920.webp". Check the concrete fallback
    // file SceneLayer requests (`${src}-1920.webp`) rather than the bare
    // path, which can never exist as a file on disk.
    const missing = SCENES.map((s) => s.plate.src).filter(
      (src) => !existsSync(resolve(PUBLIC, `${src.replace(/^\//, "")}-1920.webp`)),
    );
    expect(missing).toEqual([]);
  });

  it("describes every scene for assistive technology", () => {
    expect(SCENES.every((s) => s.alt.length > 10)).toBe(true);
  });

  it("keeps plates slower than any foreground layer", () => {
    for (const scene of SCENES) {
      for (const layer of scene.layers) {
        expect(scene.plate.speed).toBeLessThan(layer.speed);
      }
    }
  });
});
