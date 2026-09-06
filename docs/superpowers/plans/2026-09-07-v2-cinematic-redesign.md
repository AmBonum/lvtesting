# lvtesting.eu v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a new version of the site at `/v2` whose background tells the story of how software is made — six cinematic scenes driven by scroll — leaving the current site untouched until the new one is approved.

**Architecture:** A single sticky `SceneStage` sits behind the content and holds all six scenes stacked. Content sections scroll over it normally. Scene opacity and layer offsets are derived from the document scroll progress through **pure functions** that return Framer Motion input/output ranges, so no component re-renders per frame and the whole scroll model is unit-testable.

**Tech Stack:** Next.js 16.2.1 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS 4, Framer Motion 12, Vitest 4, sharp (build-time image conversion only).

**Spec:** `docs/superpowers/specs/2026-09-06-v2-cinematic-redesign-design.md`

## Global Constraints

- **Read the docs first.** `AGENTS.md` requires reading the relevant guide under `node_modules/next/dist/docs/` before writing Next.js code. This Next version differs from training data.
- **Never touch the v1 site.** No edits to `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/*.tsx` (root level), or `src/app/globals.css`. All new code lives in `src/app/v2/`, `src/components/v2/`, `src/lib/v2/`.
- **Animate only `transform` and `opacity`.** Never `top`, `margin`, `background-position`, or `background-attachment: fixed`.
- **`overflow-x: hidden` goes on `body`, never on `html`** in the v2 layout — on `html` it breaks `position: sticky`.
- **`/v2` must not be indexed:** `robots: { index: false, follow: false }` in metadata, `Disallow: /v2/` in `public/robots.txt`, and no `/v2` entry in `public/sitemap.xml`.
- **Image budget:** every scene variant ≤ 80 kB in AVIF at 2400px (measured: 65 kB). First-screen total ≤ 1.2 MB.
- **i18n parity is enforced** by `src/__tests__/i18n-completeness.test.ts`. Every key added to one locale must exist in all five: `sk`, `cs`, `en`, `de`, `es`.
- **Every task ends green:** `npx vitest run`, `npx tsc --noEmit`, and `npm run build` must all pass before the commit step.
- **Lint baseline is 42 problems** (19 errors, 23 warnings) inherited from v1. Do not fix them here; do not add new ones.

---

### Task 1: Scene asset pipeline

Convert the six generated PNGs into responsive AVIF and WebP, and lock the result behind a size-budget test.

**Files:**
- Create: `scripts/optimize-scenes.mjs`
- Create: `public/images/scenes/*.avif`, `public/images/scenes/*.webp` (generated)
- Create: `src/__tests__/v2-scene-assets.test.ts`
- Modify: `package.json` (add `sharp` to devDependencies, add script entry)

**Interfaces:**
- Consumes: source PNGs in `assets-src/scenes/01.png` … `06.png` (already present, git-ignored)
- Produces: `public/images/scenes/{01..06}-{1280,1920,2400}.{avif,webp}`, the exact paths Task 5 references

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/v2-scene-assets.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/v2-scene-assets.test.ts`
Expected: FAIL — the first test lists all 36 files as missing.

- [ ] **Step 3: Write the conversion script**

Create `scripts/optimize-scenes.mjs`:

```js
// Converts the generated scene PNGs in assets-src/scenes/ into responsive
// AVIF and WebP under public/images/scenes/.
//
// Next.js runs with images.unoptimized (static export), so nothing optimises
// these at request time — what lands in public/ is what the visitor downloads.
// Run once when scenes change; the output is committed.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets-src/scenes");
const OUT = join(ROOT, "public/images/scenes");
const WIDTHS = [1280, 1920, 2400];

await mkdir(OUT, { recursive: true });

const sources = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
if (sources.length === 0) {
  console.error(`No PNGs found in ${SRC}`);
  process.exit(1);
}

for (const file of sources) {
  const id = file.replace(/\.png$/, "");
  for (const width of WIDTHS) {
    const base = sharp(join(SRC, file)).resize(width);
    const avif = await base
      .clone()
      .avif({ quality: 50, effort: 6 })
      .toFile(join(OUT, `${id}-${width}.avif`));
    const webp = await base
      .clone()
      .webp({ quality: 72 })
      .toFile(join(OUT, `${id}-${width}.webp`));
    console.log(
      `${id} ${width}px  avif ${(avif.size / 1024).toFixed(0)}kB  webp ${(webp.size / 1024).toFixed(0)}kB`,
    );
  }
}
```

- [ ] **Step 4: Declare sharp and the script in package.json**

Add to `devDependencies` (sharp is already physically present as a Next.js transitive dependency; declaring it makes the build reproducible):

```json
"sharp": "^0.34.5"
```

Add to `scripts`:

```json
"scenes": "node scripts/optimize-scenes.mjs"
```

- [ ] **Step 5: Run the conversion**

Run: `npm run scenes`
Expected: 36 lines of output, every AVIF under 80 kB.

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run src/__tests__/v2-scene-assets.test.ts`
Expected: PASS, both tests.

- [ ] **Step 7: Commit**

```bash
git add scripts/optimize-scenes.mjs public/images/scenes src/__tests__/v2-scene-assets.test.ts package.json package-lock.json
git commit -m "feat: add scene image pipeline with responsive AVIF and WebP output"
```

---

### Task 2: Scroll story mathematics

The entire scroll model as pure functions returning Framer Motion ranges. No React, no DOM — so it is fully unit-testable and no component re-renders per frame.

**Files:**
- Create: `src/lib/v2/scroll-story.ts`
- Create: `src/__tests__/v2-scroll-story.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `sceneWindow(index: number, count: number): { start: number; end: number }`
  - `sceneOpacityRange(index: number, count: number): { input: number[]; output: number[] }`
  - `layerRange(index: number, count: number, speed: number, amplitude: number): { input: [number, number]; output: [number, number] }`
  - `BLEND_FRACTION: number`

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/v2-scroll-story.test.ts`:

```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/v2-scroll-story.test.ts`
Expected: FAIL — cannot resolve `@/lib/v2/scroll-story`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/v2/scroll-story.ts`:

```ts
/**
 * The scroll model for the v2 cinematic background.
 *
 * Everything here is a pure function of the document scroll progress (0 → 1)
 * and returns Framer Motion input/output ranges. Components feed these to
 * `useTransform`, so scrolling never triggers a React render — the values are
 * driven on the motion value graph and applied straight to `transform` and
 * `opacity`, which the browser composites off the main thread.
 */

/** How much of a scene's window is spent crossfading into the next one. */
export const BLEND_FRACTION = 0.25;

/** The slice of total scroll progress that belongs to one scene. */
export function sceneWindow(
  index: number,
  count: number,
): { start: number; end: number } {
  const span = 1 / count;
  return { start: index * span, end: (index + 1) * span };
}

/**
 * Opacity keyframes for one scene.
 *
 * A scene fades in over the blend slice before its window and fades out over
 * the blend slice after it, so neighbours always overlap and the background
 * never flashes through. The first and last scenes are clamped to the page
 * edges instead — there is nothing before or after them to blend with.
 */
export function sceneOpacityRange(
  index: number,
  count: number,
): { input: number[]; output: number[] } {
  const { start, end } = sceneWindow(index, count);
  const blend = (end - start) * BLEND_FRACTION;

  const isFirst = index === 0;
  const isLast = index === count - 1;

  const fadeInStart = isFirst ? 0 : start - blend;
  const fadeInEnd = isFirst ? 0 : start + blend;
  const fadeOutStart = isLast ? 1 : end - blend;
  const fadeOutEnd = isLast ? 1 : end + blend;

  return {
    input: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    output: [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
  };
}

/**
 * Vertical travel for one layer across its scene's window.
 *
 * The layer starts half an amplitude below its resting place and ends half an
 * amplitude above it, scaled by `speed`. A distant layer (speed 0.1) barely
 * moves; a foreground layer (speed 1) moves the full amplitude. That
 * difference in rate — not the number of layers — is what reads as depth.
 */
export function layerRange(
  index: number,
  count: number,
  speed: number,
  amplitude: number,
): { input: [number, number]; output: [number, number] } {
  const { start, end } = sceneWindow(index, count);
  const travel = (speed * amplitude) / 2;
  return { input: [start, end], output: [travel, -travel] };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/__tests__/v2-scroll-story.test.ts`
Expected: PASS, all tests.

- [ ] **Step 5: Verify types and commit**

```bash
npx tsc --noEmit
git add src/lib/v2/scroll-story.ts src/__tests__/v2-scroll-story.test.ts
git commit -m "feat: add pure scroll-story maths for the v2 background"
```

---

### Task 3: The /v2 route, kept out of the index

An empty but real `/v2` page that builds, renders, and is invisible to search engines.

**Files:**
- Create: `src/app/v2/layout.tsx`
- Create: `src/app/v2/page.tsx`
- Create: `src/app/v2/v2.css`
- Create: `src/__tests__/v2-noindex.test.ts`
- Modify: `public/robots.txt`

**Interfaces:**
- Consumes: `I18nProvider` from `@/i18n/provider`, `ConsentProvider` from `@/lib/ConsentProvider` (both already used by v1 — reuse, do not fork)
- Produces: the `/v2` route that Tasks 4–8 render into

- [ ] **Step 1: Read the Next.js docs**

Read `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` (the `robots` section) and `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`. Confirm the `robots` metadata shape before writing it.

- [ ] **Step 2: Write the failing test**

Create `src/__tests__/v2-noindex.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("/v2 stays out of search engines while it is a preview", () => {
  it("declares noindex in its layout metadata", () => {
    const layout = read("src/app/v2/layout.tsx");
    expect(layout).toMatch(/robots:\s*\{[^}]*index:\s*false/s);
    expect(layout).toMatch(/follow:\s*false/);
  });

  it("is disallowed in robots.txt", () => {
    expect(read("public/robots.txt")).toMatch(/^Disallow:\s*\/v2\/$/m);
  });

  it("is absent from the sitemap", () => {
    expect(read("public/sitemap.xml")).not.toContain("/v2");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/__tests__/v2-noindex.test.ts`
Expected: FAIL — `src/app/v2/layout.tsx` does not exist.

- [ ] **Step 4: Create the v2 stylesheet**

Create `src/app/v2/v2.css`:

```css
@import "tailwindcss";

/* v2 owns its palette so tuning it can never disturb the live site. */
@theme inline {
  --color-v2-ink: #05060B;
  --color-v2-surface: #0B0D16;
  --color-v2-text: #F4F5FA;
  --color-v2-muted: #A9AEC2;
  --color-v2-amber: #F0A64A;
  --color-v2-teal: #4ECDC4;
  --color-v2-violet: #6C63FF;
  --font-sans: var(--font-inter);
}

/* overflow-x belongs on body, never on html: on html it silently breaks
   position: sticky, which the whole scene stage depends on. */
html.v2-root {
  scroll-behavior: smooth;
}

body.v2-body {
  overflow-x: hidden;
  background: var(--color-v2-ink);
  color: var(--color-v2-text);
  font-family: var(--font-inter, system-ui, sans-serif);
}

@media (prefers-reduced-motion: reduce) {
  html.v2-root {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 5: Create the layout**

Create `src/app/v2/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "lvtesting.eu — v2 preview",
  description: "Preview of the next version of lvtesting.eu.",
  // This preview must never compete with the live site for the same
  // keywords in five languages. Removed when v2 is promoted to production.
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="v2-body min-h-screen">{children}</div>;
}
```

- [ ] **Step 6: Create the placeholder page**

Create `src/app/v2/page.tsx`:

```tsx
"use client";

export default function V2Page() {
  return (
    <main id="main-content" className="min-h-screen">
      <h1 className="sr-only">lvtesting.eu v2</h1>
    </main>
  );
}
```

- [ ] **Step 7: Disallow /v2 in robots.txt**

Add to `public/robots.txt`, directly under the existing `User-agent: *` block:

```
Disallow: /v2/
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/__tests__/v2-noindex.test.ts`
Expected: PASS, all three tests.

- [ ] **Step 9: Verify the route builds**

Run: `npm run build`
Expected: the route list includes `/v2`.

- [ ] **Step 10: Commit**

```bash
git add src/app/v2 public/robots.txt src/__tests__/v2-noindex.test.ts
git commit -m "feat: add the /v2 preview route, excluded from search indexing"
```

---

### Task 4: Scene data and the stage

The sticky stage that renders all six scenes and moves their layers.

**Files:**
- Create: `src/lib/v2/scenes.ts`
- Create: `src/components/v2/SceneLayer.tsx`
- Create: `src/components/v2/SceneStage.tsx`
- Create: `src/__tests__/v2-scenes.test.ts`
- Modify: `src/app/v2/page.tsx`

**Interfaces:**
- Consumes: `sceneWindow`, `sceneOpacityRange`, `layerRange`, `BLEND_FRACTION` from Task 2; the asset paths from Task 1
- Produces:
  - `type SceneLayerSpec = { src: string; speed: number }`
  - `type Scene = { id: string; alt: string; plate: SceneLayerSpec; layers: SceneLayerSpec[] }`
  - `SCENES: Scene[]` (length 6)
  - `<SceneStage />` — the sticky background, takes no props

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/v2-scenes.test.ts`:

```ts
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
    const missing = SCENES.map((s) => s.plate.src).filter(
      (src) => !existsSync(resolve(PUBLIC, src.replace(/^\//, ""))),
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/__tests__/v2-scenes.test.ts`
Expected: FAIL — cannot resolve `@/lib/v2/scenes`.

- [ ] **Step 3: Write the scene data**

Create `src/lib/v2/scenes.ts`:

```ts
/**
 * The six scenes, in scroll order, tracing how software gets made.
 *
 * A scene is data, not code: swapping an image never touches the animation
 * logic. `speed` is the layer's parallax rate — 0.1 is nearly still (far
 * away), 1 moves the full amplitude (close to the viewer).
 */

export type SceneLayerSpec = {
  /** Path under public/, without the width and extension suffix. */
  src: string;
  speed: number;
};

export type Scene = {
  id: string;
  alt: string;
  plate: SceneLayerSpec;
  layers: SceneLayerSpec[];
};

export const SCENES: Scene[] = [
  {
    id: "idea",
    alt: "A notebook of hand-drawn wireframes under a desk lamp at night, city lights blurred beyond the window.",
    plate: { src: "/images/scenes/01", speed: 0.12 },
    layers: [],
  },
  {
    id: "spec",
    alt: "A whiteboard of architecture diagrams and sticky notes in a dark meeting room.",
    plate: { src: "/images/scenes/02", speed: 0.15 },
    layers: [],
  },
  {
    id: "build",
    alt: "Two monitors glowing with code and a wireframe mockup above a keyboard and the same open notebook.",
    plate: { src: "/images/scenes/03", speed: 0.18 },
    layers: [],
  },
  {
    id: "test",
    alt: "A rack of mounted phones and tablets running the same app, green status lights along the shelves.",
    plate: { src: "/images/scenes/04", speed: 0.15 },
    layers: [],
  },
  {
    id: "release",
    alt: "A server room corridor receding into darkness, amber and green status lights along the racks.",
    plate: { src: "/images/scenes/05", speed: 0.1 },
    layers: [],
  },
  {
    id: "production",
    alt: "Hands holding a phone showing the finished app, city rooftops at sunrise beyond.",
    plate: { src: "/images/scenes/06", speed: 0.14 },
    layers: [],
  },
];

/** Pixels of travel a layer at speed 1 covers across its scene window. */
export const PARALLAX_AMPLITUDE = 220;
```

- [ ] **Step 4: Write the layer component**

Create `src/components/v2/SceneLayer.tsx`:

```tsx
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { layerRange } from "@/lib/v2/scroll-story";
import { PARALLAX_AMPLITUDE, type SceneLayerSpec } from "@/lib/v2/scenes";

type Props = {
  layer: SceneLayerSpec;
  sceneIndex: number;
  sceneCount: number;
  progress: MotionValue<number>;
  alt: string;
  /** The first scene is the LCP image and must not be lazy. */
  priority?: boolean;
  reduceMotion: boolean;
};

const WIDTHS = [1280, 1920, 2400] as const;

const srcSet = (src: string, ext: string) =>
  WIDTHS.map((w) => `${src}-${w}.${ext} ${w}w`).join(", ");

export function SceneLayer({
  layer,
  sceneIndex,
  sceneCount,
  progress,
  alt,
  priority = false,
  reduceMotion,
}: Props) {
  const { input, output } = layerRange(
    sceneIndex,
    sceneCount,
    reduceMotion ? 0 : layer.speed,
    PARALLAX_AMPLITUDE,
  );
  const y = useTransform(progress, input, output);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ y }}
      aria-hidden="true"
    >
      {/* The layer is scaled past the viewport so its parallax travel never
          exposes an edge. */}
      <picture>
        <source type="image/avif" srcSet={srcSet(layer.src, "avif")} sizes="100vw" />
        <source type="image/webp" srcSet={srcSet(layer.src, "webp")} sizes="100vw" />
        <img
          src={`${layer.src}-1920.webp`}
          alt={alt}
          className="h-[125%] w-full -translate-y-[10%] object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </motion.div>
  );
}
```

- [ ] **Step 5: Write the stage**

Create `src/components/v2/SceneStage.tsx`:

```tsx
"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { sceneOpacityRange } from "@/lib/v2/scroll-story";
import { SCENES } from "@/lib/v2/scenes";
import { SceneLayer } from "./SceneLayer";

function Scene({
  index,
  progress,
  reduceMotion,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const scene = SCENES[index];
  const { input, output } = sceneOpacityRange(index, SCENES.length);
  const opacity = useTransform(progress, input, output);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <SceneLayer
        layer={scene.plate}
        sceneIndex={index}
        sceneCount={SCENES.length}
        progress={progress}
        alt={scene.alt}
        priority={index === 0}
        reduceMotion={reduceMotion}
      />
      {/* Keeps text legible over any frame: the scenes were composed with an
          empty dark left third, and this deepens it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,6,11,0.92)_0%,rgba(5,6,11,0.72)_38%,rgba(5,6,11,0.30)_70%,rgba(5,6,11,0.55)_100%)]"
      />
    </motion.div>
  );
}

export function SceneStage() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {SCENES.map((scene, index) => (
        <Scene
          key={scene.id}
          index={index}
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Mount the stage on the page**

Replace `src/app/v2/page.tsx` with:

```tsx
"use client";

import { SceneStage } from "@/components/v2/SceneStage";
import { SCENES } from "@/lib/v2/scenes";

export default function V2Page() {
  return (
    <>
      <SceneStage />
      <main id="main-content">
        <h1 className="sr-only">lvtesting.eu v2</h1>
        {/* Temporary scaffold: one full viewport per scene, so the stage can
            be scrolled and judged before the real sections exist.
            Replaced in Tasks 5–7. */}
        {SCENES.map((scene) => (
          <section
            key={scene.id}
            className="flex min-h-screen items-center px-8"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-v2-muted">
              {scene.id}
            </p>
          </section>
        ))}
      </main>
    </>
  );
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run src/__tests__/v2-scenes.test.ts`
Expected: PASS, all five tests.

- [ ] **Step 8: Look at it in a browser**

Run: `npm run dev`, open `http://localhost:3000/v2/`, scroll slowly top to bottom.
Expected: six scenes crossfade into each other with no black gaps, plates drift slower than the page scrolls, and no horizontal scrollbar appears at any width. Then set the OS to "reduce motion" and reload: scenes still crossfade but no longer drift.

- [ ] **Step 9: Commit**

```bash
npx tsc --noEmit && npm run build
git add src/lib/v2/scenes.ts src/components/v2 src/app/v2/page.tsx src/__tests__/v2-scenes.test.ts
git commit -m "feat: add the sticky scene stage with parallax layers"
```

---

### Task 5: v2 copy in five languages

The v2 sections need their own words. This task adds the `v2` namespace to the translation type and all five locales, with nothing rendering it yet — so the completeness test guards the structure before any component depends on it.

**Files:**
- Modify: `src/i18n/types.ts`
- Modify: `src/i18n/en.ts`, `src/i18n/sk.ts`, `src/i18n/cs.ts`, `src/i18n/de.ts`, `src/i18n/es.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `t.v2` with the shape below, consumed by Tasks 6 and 7

- [ ] **Step 1: Run the existing completeness test to confirm the current baseline**

Run: `npx vitest run src/__tests__/i18n-completeness.test.ts`
Expected: PASS. This test is what will catch a locale missing a new key.

- [ ] **Step 2: Add the type**

Add to the `Translations` interface in `src/i18n/types.ts`, before the closing brace:

```ts
  // v2 preview
  v2: {
    hero: { kicker: string; headline: string; sub: string; cta: string; ctaSecondary: string };
    process: { kicker: string; heading: string; body: string; steps: string[] };
    work: { kicker: string; heading: string; body: string };
    testing: { kicker: string; heading: string; body: string };
    track: { kicker: string; heading: string; body: string };
    contact: { kicker: string; heading: string; body: string };
  };
```

- [ ] **Step 3: Add the English copy**

Add to `src/i18n/en.ts`, before the closing brace of the exported object:

```ts
  v2: {
    hero: {
      kicker: "QA automation & full-stack engineering",
      headline: "I build software that survives contact with real users.",
      sub: "Five years testing systems where failure costs money — and building the systems too, from API to app store.",
      cta: "Start a conversation",
      ctaSecondary: "See the work",
    },
    process: {
      kicker: "How I work",
      heading: "An idea only counts once it survives production.",
      body: "Every project runs the same road: understand the problem, agree what done means, build it, prove it works, then ship it and watch it.",
      steps: [
        "Understand the problem before proposing a solution",
        "Agree what done looks like, in writing",
        "Build in small pieces that each work on their own",
        "Prove it with tests, not with confidence",
        "Ship it, then watch it in production",
      ],
    },
    work: {
      kicker: "The work",
      heading: "Built, tested, and still running.",
      body: "Enterprise test automation, a full-stack product, and the site you are reading right now.",
    },
    testing: {
      kicker: "How I prove it",
      heading: "Finding the bug before your customer does.",
      body: "Playwright, Appium, Cypress and CI pipelines — the tooling matters less than knowing what is worth testing.",
    },
    track: {
      kicker: "Where it ran",
      heading: "Six years, six companies, one habit.",
      body: "Enterprise platforms, medical software, telematics and mobility — different domains, the same insistence that it actually works.",
    },
    contact: {
      kicker: "Production",
      heading: "Tell me what you are building.",
      body: "A short description of the problem is enough to start. I reply to everything.",
    },
  },
```

- [ ] **Step 4: Add the Slovak copy**

Add to `src/i18n/sk.ts`, before the closing brace of the exported object:

```ts
  v2: {
    hero: {
      kicker: "QA automatizácia a full-stack vývoj",
      headline: "Staviam softvér, ktorý prežije stretnutie so skutočnými používateľmi.",
      sub: "Päť rokov testujem systémy, kde chyba stojí peniaze — a tie systémy aj sám staviam, od API po App Store.",
      cta: "Napíš mi",
      ctaSecondary: "Pozri prácu",
    },
    process: {
      kicker: "Ako pracujem",
      heading: "Nápad platí až vtedy, keď prežije produkciu.",
      body: "Každý projekt ide tou istou cestou: pochopiť problém, dohodnúť sa, čo znamená hotovo, postaviť to, dokázať že to funguje, nasadiť a sledovať.",
      steps: [
        "Najprv pochopiť problém, až potom navrhovať riešenie",
        "Písomne sa dohodnúť, čo znamená hotovo",
        "Stavať po malých častiach, z ktorých každá funguje sama",
        "Dokazovať testami, nie presvedčením",
        "Nasadiť a potom to v produkcii sledovať",
      ],
    },
    work: {
      kicker: "Práca",
      heading: "Postavené, otestované a stále beží.",
      body: "Podniková testová automatizácia, full-stack produkt a stránka, ktorú práve čítaš.",
    },
    testing: {
      kicker: "Čím to overujem",
      heading: "Nájsť chybu skôr, než ju nájde tvoj zákazník.",
      body: "Playwright, Appium, Cypress a CI pipeline — na nástrojoch záleží menej než na tom, vedieť čo sa oplatí testovať.",
    },
    track: {
      kicker: "Kde to bežalo",
      heading: "Šesť rokov, šesť firiem, jeden návyk.",
      body: "Podnikové platformy, zdravotnícky softvér, telematika a mobilita — iné domény, tá istá tvrdohlavosť, že to musí naozaj fungovať.",
    },
    contact: {
      kicker: "Produkcia",
      heading: "Povedz mi, čo staviaš.",
      body: "Na začiatok stačí krátky popis problému. Odpovedám na všetko.",
    },
  },
```

- [ ] **Step 5: Add the same block to cs.ts, de.ts and es.ts**

Translate the Slovak block above into Czech (`cs.ts`), German (`de.ts`) and Spanish (`es.ts`). Keep the key structure and the array lengths identical — five entries in `process.steps` in every locale. Match the tone of the existing translations in each file: direct, first person, no marketing superlatives. German uses the formal "Sie", consistent with the rest of `de.ts`.

- [ ] **Step 6: Run the completeness test**

Run: `npx vitest run src/__tests__/i18n-completeness.test.ts`
Expected: PASS. A missing or misspelled key in any locale fails here with the exact key path.

- [ ] **Step 7: Commit**

```bash
npx tsc --noEmit
git add src/i18n
git commit -m "feat: add v2 copy in all five languages"
```

---

### Task 6: Hero, Process and Work sections

The first three content sections, rendered over the stage.

**Files:**
- Create: `src/components/v2/sections/Shell.tsx`
- Create: `src/components/v2/sections/HeroV2.tsx`
- Create: `src/components/v2/sections/ProcessV2.tsx`
- Create: `src/components/v2/sections/WorkV2.tsx`
- Modify: `src/app/v2/page.tsx`

**Interfaces:**
- Consumes: `t.v2` from Task 5, `SCENES` from Task 4, `projects` from `@/data/content`
- Produces: `<SectionShell>`, `<HeroV2 />`, `<ProcessV2 />`, `<WorkV2 />`

- [ ] **Step 1: Write the shared section shell**

Create `src/components/v2/sections/Shell.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Every v2 section is one viewport tall and keeps its text in the left
 * column — that is where all six scenes were composed to be empty and dark.
 */
export function SectionShell({
  id,
  kicker,
  children,
}: {
  id: string;
  kicker: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id={id}
      className="flex min-h-screen items-center px-6 py-24 sm:px-10 lg:px-16"
    >
      <motion.div
        className="w-full max-w-xl"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-v2-amber">
          {kicker}
        </p>
        {children}
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Write the hero**

Create `src/components/v2/sections/HeroV2.tsx`:

```tsx
"use client";

import { useI18n } from "@/i18n/provider";
import { SectionShell } from "./Shell";

export function HeroV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="hero" kicker={t.v2.hero.kicker}>
      <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-v2-text sm:text-4xl lg:text-5xl">
        {t.v2.hero.headline}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-v2-muted sm:text-lg">
        {t.v2.hero.sub}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#contact"
          className="rounded-full bg-v2-amber px-7 py-3 text-sm font-semibold text-v2-ink transition-transform duration-200 hover:scale-[1.03]"
        >
          {t.v2.hero.cta}
        </a>
        <a
          href="#work"
          className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-v2-text transition-colors duration-200 hover:bg-white/10"
        >
          {t.v2.hero.ctaSecondary}
        </a>
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 3: Write the process section**

Create `src/components/v2/sections/ProcessV2.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { SectionShell } from "./Shell";

export function ProcessV2() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SectionShell id="process" kicker={t.v2.process.kicker}>
      <h2 className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl">
        {t.v2.process.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.process.body}
      </p>
      <ol className="mt-9 space-y-4">
        {t.v2.process.steps.map((step, i) => (
          <motion.li
            key={step}
            className="flex gap-4 text-sm text-v2-muted sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="mt-0.5 font-mono text-xs text-v2-teal">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
```

- [ ] **Step 4: Write the work section**

Create `src/components/v2/sections/WorkV2.tsx`:

```tsx
"use client";

import { useI18n } from "@/i18n/provider";
import { projects } from "@/data/content";
import { SectionShell } from "./Shell";

export function WorkV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="work" kicker={t.v2.work.kicker}>
      <h2 className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl">
        {t.v2.work.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.work.body}
      </p>
      <div className="mt-9 space-y-5">
        {projects.map((project, i) => {
          const translated = t.projects.items[i];
          return (
            <article
              key={project.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-v2-text">
                {translated?.title ?? project.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-v2-teal">
                {translated?.subtitle ?? project.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-v2-muted">
                {translated?.description ?? project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-v2-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 5: Mount the three sections**

Replace the temporary scaffold in `src/app/v2/page.tsx`:

```tsx
"use client";

import { SceneStage } from "@/components/v2/SceneStage";
import { HeroV2 } from "@/components/v2/sections/HeroV2";
import { ProcessV2 } from "@/components/v2/sections/ProcessV2";
import { WorkV2 } from "@/components/v2/sections/WorkV2";

export default function V2Page() {
  return (
    <>
      <SceneStage />
      <main id="main-content">
        <HeroV2 />
        <ProcessV2 />
        <WorkV2 />
      </main>
    </>
  );
}
```

- [ ] **Step 6: Verify in a browser**

Run: `npm run dev`, open `http://localhost:3000/v2/`.
Expected: three sections, each one viewport tall, text sitting in the dark left column of its scene, scenes crossfading as you scroll. Check at 375px wide too — no horizontal scrollbar, text still readable.

- [ ] **Step 7: Commit**

```bash
npx vitest run && npx tsc --noEmit && npm run build
git add src/components/v2/sections src/app/v2/page.tsx
git commit -m "feat: add hero, process and work sections to v2"
```

---

### Task 7: Testing, Track and Contact sections

The last three sections, including the merged experience-and-companies section and the working contact form.

**Files:**
- Create: `src/components/v2/sections/TestingV2.tsx`
- Create: `src/components/v2/sections/TrackV2.tsx`
- Create: `src/components/v2/sections/ContactV2.tsx`
- Modify: `src/app/v2/page.tsx`

**Interfaces:**
- Consumes: `t.v2` from Task 5, `skills`, `experience`, `companies` from `@/data/content`, the existing `Contact` component from `@/components/Contact`
- Produces: `<TestingV2 />`, `<TrackV2 />`, `<ContactV2 />`

- [ ] **Step 1: Write the testing section**

Create `src/components/v2/sections/TestingV2.tsx`. The skill bars fill as the section is scrolled — the section demonstrates a test run rather than describing one:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { skills } from "@/data/content";
import { SectionShell } from "./Shell";

function SkillBar({
  label,
  level,
  index,
}: {
  label: string;
  level: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", `${level}%`]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between text-xs text-v2-muted">
        <span className="font-mono">{String(index + 1).padStart(2, "0")} {label}</span>
        <span className="font-mono text-v2-teal">{level}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-v2-teal to-v2-amber"
          style={reduceMotion ? { width: `${level}%` } : { width }}
        />
      </div>
    </div>
  );
}

export function TestingV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="testing" kicker={t.v2.testing.kicker}>
      <h2 className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl">
        {t.v2.testing.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.testing.body}
      </p>
      <div className="mt-9 space-y-4">
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.category}
            label={t.skills.categories[i] ?? skill.category}
            level={skill.level}
            index={i}
          />
        ))}
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 2: Write the merged track section**

Create `src/components/v2/sections/TrackV2.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { experience, companies } from "@/data/content";
import { SectionShell } from "./Shell";

export function TrackV2() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SectionShell id="track" kicker={t.v2.track.kicker}>
      <h2 className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl">
        {t.v2.track.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.track.body}
      </p>

      <ol className="mt-9 border-l border-white/15 pl-5">
        {experience.map((item, i) => {
          const translated = t.experience.items[i];
          return (
            <motion.li
              key={`${item.company}-${item.period}`}
              className="relative pb-7 last:pb-0"
              initial={reduceMotion ? false : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <span className="absolute -left-[23px] top-1.5 h-1.5 w-1.5 rounded-full bg-v2-teal" />
              <p className="font-mono text-[11px] text-v2-muted/70">
                {translated?.period ?? item.period}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-v2-text">
                {translated?.role ?? item.role}
              </p>
              <p className="text-xs text-v2-amber">
                {translated?.company ?? item.company}
              </p>
            </motion.li>
          );
        })}
      </ol>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
        {companies.map((company) => (
          <li key={company.name}>
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-v2-muted/70 transition-colors hover:text-v2-text"
            >
              {company.name}
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
```

- [ ] **Step 3: Write the contact section**

Create `src/components/v2/sections/ContactV2.tsx`. The form itself is reused unchanged — it is tested, has hCaptcha and consent handling, and there is no reason to fork it:

```tsx
"use client";

import { useI18n } from "@/i18n/provider";
import Contact from "@/components/Contact";
import { SectionShell } from "./Shell";

export function ContactV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="contact" kicker={t.v2.contact.kicker}>
      <h2 className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl">
        {t.v2.contact.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.contact.body}
      </p>
      <div className="mt-8">
        <Contact />
      </div>
    </SectionShell>
  );
}
```

- [ ] **Step 4: Mount all six sections**

Replace `src/app/v2/page.tsx`:

```tsx
"use client";

import { SceneStage } from "@/components/v2/SceneStage";
import { HeroV2 } from "@/components/v2/sections/HeroV2";
import { ProcessV2 } from "@/components/v2/sections/ProcessV2";
import { WorkV2 } from "@/components/v2/sections/WorkV2";
import { TestingV2 } from "@/components/v2/sections/TestingV2";
import { TrackV2 } from "@/components/v2/sections/TrackV2";
import { ContactV2 } from "@/components/v2/sections/ContactV2";

export default function V2Page() {
  return (
    <>
      <SceneStage />
      <main id="main-content">
        <HeroV2 />
        <ProcessV2 />
        <WorkV2 />
        <TestingV2 />
        <TrackV2 />
        <ContactV2 />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Check the section-to-scene alignment**

Run: `npm run dev`, open `http://localhost:3000/v2/`, scroll slowly.
Expected: six sections and six scenes advance together — the device-lab scene is behind the testing section, the server corridor behind the track section, the dawn rooftop behind the contact form. If a scene lags its section, the section heights are uneven; make every section exactly `min-h-screen` with equal padding rather than adjusting the maths.

- [ ] **Step 6: Verify the contact form still works**

In the browser, submit the form with an empty message.
Expected: the existing validation and hCaptcha behave exactly as on the live site.

- [ ] **Step 7: Commit**

```bash
npx vitest run && npx tsc --noEmit && npm run build
git add src/components/v2/sections src/app/v2/page.tsx
git commit -m "feat: add testing, track and contact sections to v2"
```

---

### Task 8: Performance and accessibility pass

Prove the page is fast and usable, rather than assuming it.

**Files:**
- Create: `src/__tests__/v2-budget.test.ts`
- Modify: `src/app/v2/layout.tsx`

**Interfaces:**
- Consumes: the built `out/` directory and the scene assets from Task 1
- Produces: a build-output budget test

- [ ] **Step 1: Write the failing test**

Create `src/__tests__/v2-budget.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(__dirname, "../../out");
const FIRST_SCREEN_BUDGET = 1.2 * 1024 * 1024;

const describeIfBuilt = existsSync(OUT) ? describe : describe.skip;

describeIfBuilt("v2 first-screen weight", () => {
  it("keeps the first scene plus its formats inside the budget", () => {
    const scenes = join(OUT, "images/scenes");
    const firstScreen = readdirSync(scenes)
      .filter((f) => f.startsWith("01-"))
      .map((f) => statSync(join(scenes, f)).size)
      .reduce((a, b) => a + b, 0);

    expect(firstScreen).toBeLessThan(FIRST_SCREEN_BUDGET);
  });

  it("ships the v2 page as static HTML", () => {
    expect(existsSync(join(OUT, "v2/index.html"))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the build and the test**

Run: `npm run build && npx vitest run src/__tests__/v2-budget.test.ts`
Expected: PASS. If the budget test fails, lower the AVIF quality in `scripts/optimize-scenes.mjs` from 50 to 42 and re-run `npm run scenes`.

- [ ] **Step 3: Preload the first scene**

Add to `src/app/v2/layout.tsx`, inside the returned JSX above the children:

```tsx
      {/* The first scene's plate is the LCP element. Preloading the exact
          AVIF the browser will pick removes a round-trip from first paint. */}
      <link
        rel="preload"
        as="image"
        href="/images/scenes/01-1920.avif"
        type="image/avif"
        fetchPriority="high"
      />
```

- [ ] **Step 4: Check reduced motion end to end**

On macOS: System Settings → Accessibility → Display → Reduce motion, on. Reload `/v2/`.
Expected: scenes still crossfade between sections, no layer drifts, skill bars appear already filled, section reveals are instant. Nothing is missing or unreadable.

- [ ] **Step 5: Check keyboard and contrast**

Tab through the whole page from the top.
Expected: focus reaches both hero buttons, every company link, and every contact field, in visual order, with a visible focus ring on each. Then check the body text against the scene behind it with a contrast checker at three scroll positions.
Expected: at least 4.5:1. If any position fails, deepen the gradient overlay in `SceneStage.tsx` rather than lightening the text.

- [ ] **Step 6: Commit**

```bash
npx vitest run && npx tsc --noEmit && npm run build
git add src/__tests__/v2-budget.test.ts src/app/v2/layout.tsx
git commit -m "feat: add v2 performance budget test and preload the first scene"
```

---

### Task 9: Review checkpoint

Stop and get a human verdict before anything is promoted.

- [ ] **Step 1: Build and report**

Run: `npm run build`
Report to the user: the `/v2/` URL to open, the measured first-screen weight, and the full test count.

- [ ] **Step 2: Do not promote without approval**

Promotion — moving `app/v2/page.tsx` to `app/page.tsx`, moving `components/v2/` into place, deleting the v1 components, removing the `noindex`, removing `Disallow: /v2/`, and restoring the sitemap — happens only after the user has seen `/v2/` and approved it. That work is a separate plan.

---

## Self-Review

**Spec coverage**

| Spec section | Task |
|---|---|
| 2 Nosná myšlienka (six scenes, carried object) | 1, 4 |
| 3 Štruktúra sekcií (six sections) | 6, 7 |
| 4 Vizuálny smer a pôvod obrazov | 1, 4 |
| 5.1–5.3 Javisko, tok dát, scéna ako dáta | 2, 4 |
| 5.4 Hranice modulov | 2, 4, 6, 7 |
| 5.5 Výkon (transform/opacity, AVIF, srcset, LCP) | 1, 4, 8 |
| 5.6 Prístupnosť (reduced motion, contrast, focus) | 4, 6, 8 |
| 6 Stratégia /v2 (noindex, robots, sitemap, promotion) | 3, 9 |
| 7 Odstránenie Mobixu | **already done** — commits `3a33a8a`, `1f6a439` |
| 8 Overenie | 1, 2, 3, 4, 8 |

Two spec items are deliberately deferred and named as such: `/v2/portfolio` (spec section 6, second stage) and the promotion itself (Task 9, separate plan).

**Deviation from the spec, recorded here rather than hidden:** the spec set the per-plate budget at 200 kB in AVIF. Measurement on the real scenes gave 65 kB at 2400px, so Task 1 enforces 80 kB instead. Tightening a budget after measuring it is the point of measuring.

**Placeholder scan:** no TBDs. Task 5 Step 5 asks for translation into three languages rather than printing all of it — the key structure is fully specified, the source strings are printed in full in Steps 3 and 4, and `i18n-completeness.test.ts` mechanically enforces the result.

**Type consistency:** `SceneLayerSpec`, `Scene`, `SCENES`, `PARALLAX_AMPLITUDE` (Task 4) match their uses in `SceneLayer` and `SceneStage`. `sceneWindow`, `sceneOpacityRange`, `layerRange`, `BLEND_FRACTION` (Task 2) match their uses in Task 4. `t.v2` (Task 5) matches every field read in Tasks 6 and 7.
