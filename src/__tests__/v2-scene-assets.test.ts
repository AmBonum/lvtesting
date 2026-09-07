import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "node:fs";
import sharp from "sharp";
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

  /* Existence + byte size alone would pass a 10x10 placeholder named
     "01-2400.avif" — the two checks around this one constrain the file's
     name and its weight, but nothing about the pixels. That matters here
     because the browser cannot help us notice: with a w-descriptor
     srcset the HTML spec density-CORRECTS intrinsic size, so a 2400px
     plate reports naturalWidth 1280 in devtools (confirmed in Task 4 and
     recorded in the ledger so it is not re-opened as a bug). Reading the
     real dimensions off disk with sharp is the only place the actual
     width is observable. */
  it("encodes every asset at its declared width, in the declared format", async () => {
    const wrong: string[] = [];
    for (const id of SCENE_IDS) {
      for (const w of WIDTHS) {
        for (const ext of ["avif", "webp"] as const) {
          const name = `${id}-${w}.${ext}`;
          const meta = await sharp(join(SCENES_DIR, name)).metadata();
          if (meta.width !== w) wrong.push(`${name} is ${meta.width}px wide, expected ${w}`);
          /* AVIF is a HEIF-family container (ISOBMFF), so libvips reports
             format "heif" for it and identifies the actual codec in
             `compression`. Asserting av1 rather than just the container is
             the stronger check: it also rejects a HEIC file renamed .avif,
             which browsers would refuse to decode. */
          const okFormat =
            ext === "avif"
              ? meta.format === "heif" && meta.compression === "av1"
              : meta.format === "webp";
          if (!okFormat) {
            wrong.push(`${name} is ${meta.format}/${meta.compression ?? "-"}, expected ${ext}`);
          }
        }
      }
    }
    expect(wrong).toEqual([]);
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
