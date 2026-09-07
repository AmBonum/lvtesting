import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const SCENES_DIR = resolve(__dirname, "../../public/images/scenes");
const SCENE_IDS = ["01", "02", "03", "04", "05", "06"] as const;
const WIDTHS = [1280, 1920, 2400] as const;
const MAX_AVIF_BYTES = 80 * 1024;
const MAX_WEBP_BYTES = 180 * 1024;

describe("v2 scene assets", () => {
  it("has every scene in every width and format", () => {
    const missing: string[] = [];
    for (const id of SCENE_IDS) {
      for (const w of WIDTHS) {
        for (const ext of ["avif", "webp"]) {
          const file = join(SCENES_DIR, `${id}-${w}.${ext}`);
          if (!existsSync(file)) missing.push(`${id}-${w}.${ext}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("keeps every asset inside its size budget", () => {
    const overBudget: string[] = [];
    for (const id of SCENE_IDS) {
      for (const w of WIDTHS) {
        const avif = statSync(join(SCENES_DIR, `${id}-${w}.avif`)).size;
        if (avif > MAX_AVIF_BYTES) overBudget.push(`${id}-${w}.avif ${avif}B`);
        const webp = statSync(join(SCENES_DIR, `${id}-${w}.webp`)).size;
        if (webp > MAX_WEBP_BYTES) overBudget.push(`${id}-${w}.webp ${webp}B`);
      }
    }
    expect(overBudget).toEqual([]);
  });
});
