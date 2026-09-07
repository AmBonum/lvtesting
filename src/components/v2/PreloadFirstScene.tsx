"use client";

import ReactDOM from "react-dom";
import { SCENE_SRCSET, SCENE_SIZES } from "@/lib/v2/scene-srcset";
import { SCENES } from "@/lib/v2/scenes";

/**
 * Starts the first scene plate's fetch from the document <head> rather
 * than when the parser reaches the stage.
 *
 * NOT because that plate is the LCP element — measured, it is not. With
 * `largest-contentful-paint` observed on a real load of /v2, the LCP
 * element is the hero <h1> at both 375x812 and 1440x900 (task-8-report.md,
 * "Finding 4"); the scene plates never won a candidacy. The task brief
 * called for preloading the first scene and this is the correct way to do
 * it, but its benefit is a slightly earlier scene fetch, not a better LCP.
 *
 * Why `ReactDOM.preload` and not a plain `<link rel="preload">` in the
 * layout's JSX: Next.js lists `<link rel="preload">` as unsupported
 * metadata and points at exactly this API instead — see
 * node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md,
 * the "Unsupported Metadata" table and the "Resource hints" section. It
 * does emit into the static <head>: verified in out/v2/index.html, which
 * carries this link inside <head> with `imagesrcset`/`imagesizes` and no
 * `href` (React omits `href` when a responsive candidate list is given,
 * which is what the HTML spec wants).
 *
 * `imageSrcSet`/`imageSizes` (rather than a fixed `href`) make the preload
 * run the same responsive-image selection as SceneLayer's <picture> —
 * identical srcset, identical `sizes`, so the candidate it fetches is the
 * one the <img> would have fetched anyway. A fixed-width preload (the task
 * brief's original `href="/images/scenes/01-1920.avif"`) would fetch 1920
 * *plus* the real pick on every viewport that resolves to 1280 or 2400.
 * Measured on a cold cache: exactly one scene-01 request at 375, 1280 and
 * 1920px viewport widths (task-8-report.md, "Finding 4").
 */
export function PreloadFirstScene() {
  const plate = SCENES[0].plate.src;
  ReactDOM.preload(`${plate}-1920.avif`, {
    as: "image",
    type: "image/avif",
    imageSrcSet: SCENE_SRCSET(plate, "avif"),
    imageSizes: SCENE_SIZES,
    fetchPriority: "high",
  });
  return null;
}
