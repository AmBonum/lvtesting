"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  pinnedToFullProgress,
  sceneOpacityRangeForWindow,
  sceneWindow,
  sceneWindowsFromSections,
} from "@/lib/v2/scroll-story";
import { SCENES } from "@/lib/v2/scenes";
import { SceneLayer } from "./SceneLayer";

/** Stable DOM ids of the six sections, in scroll order — see page.tsx. */
const SECTION_IDS = ["hero", "process", "work", "testing", "track", "get-in-touch"] as const;

type SceneWindow = { start: number; end: number };

/** The equal split, used until real measurements land (and if they never can). */
function fallbackWindows(): SceneWindow[] {
  return SECTION_IDS.map((_, index) => sceneWindow(index, SECTION_IDS.length));
}

/**
 * Reads each section's `offsetTop`/`offsetHeight` off the DOM, plus the
 * document and viewport heights, and turns them into scene windows via
 * `sceneWindowsFromSections`. Returns `null` if any section isn't in the
 * DOM yet (e.g. mid-hydration) so the caller can keep the equal-split
 * fallback rather than compute windows from partial data.
 */
function measureSceneWindows(): SceneWindow[] | null {
  if (typeof document === "undefined") return null;

  const sections = SECTION_IDS.map((id) => {
    const el = document.getElementById(id);
    return el ? { top: el.offsetTop, height: el.offsetHeight } : null;
  });
  if (sections.some((s) => s === null)) return null;

  const docHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  return sceneWindowsFromSections(
    sections as { top: number; height: number }[],
    docHeight,
    viewportHeight,
  );
}

/**
 * Measures scene windows from the real DOM on mount and on resize — never
 * per scroll frame. A scroll-driven re-measure would re-render React on
 * every frame and defeat the point of driving the animation off motion
 * values; layout only actually changes on mount, on resize, or when a
 * section's own content reflows (e.g. a locale swap changing text length),
 * which a ResizeObserver on the sections themselves catches without
 * needing to listen to scroll at all.
 */
function useSceneWindows(): SceneWindow[] {
  const [windows, setWindows] = useState<SceneWindow[] | null>(null);

  useEffect(() => {
    const measure = () => setWindows(measureSceneWindows());
    measure();

    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  return windows ?? fallbackWindows();
}

/**
 * Task 8, Finding 3: every scene plate downloaded on first paint, because
 * `loading="lazy"` is inert on this stage — the stage is `position: fixed`
 * covering the whole viewport, so every scene's `<img>` is always
 * "intersecting" by the browser's native lazy-loading heuristic the
 * instant it exists in the DOM, regardless of which scene is actually
 * visible. Measured at HEAD d4e5143, before this fix: a 1280x720 load
 * fetched all six plates, 250,081 bytes of AVIF (the six `*-2400.avif`
 * files, summed from disk), and a 375x812 load fetched seven scene
 * requests — the six plates plus the redundant scene-01 fetch of Finding
 * 4. Inside the 1.2MB first-screen budget, but not something a
 * scroll-driven story should front-load. After: two requests, 96,510
 * bytes at 1280x720 (task-8-report.md, "Finding 3").
 *
 * Fix: the story streams in. A scene's `<picture>` isn't rendered in the
 * DOM at all — so the browser has nothing to request — until an
 * IntersectionObserver on its own section reports it within reach, using
 * a generous 50%-viewport rootMargin so the image has a full half-screen
 * of scroll to finish downloading and decoding before its crossfade
 * begins (a scene's fade-in starts a quarter of its window *before* the
 * section officially arrives — see BLEND_FRACTION in scroll-story.ts — so
 * this margin comfortably covers that with room to spare). Scene 0 (the
 * hero) is exempt: it is the LCP image and stays eager from the first
 * render, exactly as `priority` already made it.
 *
 * This is a one-shot reveal per scene (the observer disconnects once a
 * scene unlocks — a locked scene never re-locks), not a per-scroll-frame
 * subscription: it fires a handful of times total across the whole page,
 * the same category of DOM-driven, coarse-grained state change
 * `useSceneWindows` above already uses (ResizeObserver), not the
 * scroll-listener anti-pattern the architecture forbids.
 */
function useUnlockedScenes(count: number): boolean[] {
  // The initial state must NOT branch on `typeof IntersectionObserver`.
  // This component is server-rendered, and `IntersectionObserver` is always
  // undefined on the server — so a fail-open check here unlocked all six
  // scenes in the static HTML, which is the exact opposite of the fix: the
  // browser's preload scanner would find six <picture> elements and
  // download every plate before a line of JS ran, then hydration would
  // throw five of them away. That is exactly the pre-fix behaviour that was
  // measured at HEAD d4e5143 — out/v2/index.html carried all six scenes'
  // srcsets and a 375x812 first load fetched 6/6 plates (task-8-report.md,
  // "Finding 3"). Server and first client render therefore agree on
  // "scene 0 only", which is both the correct streaming behaviour and a
  // hydration match; the built out/v2/index.html now contains scene 01's
  // srcset and no other scene's.
  const [unlocked, setUnlocked] = useState<boolean[]>(() =>
    Array.from({ length: count }, (_, i) => i === 0),
  );

  useEffect(() => {
    // No `typeof IntersectionObserver === "undefined"` guard, deliberately.
    // The check cannot live in the initial state (see above), and putting a
    // fail-open `setUnlocked(...)` here is a synchronous setState in an
    // effect, which this repo's lint baseline rejects. It would also be
    // inconsistent with `useSceneWindows` twelve lines up, which constructs
    // a `ResizeObserver` with no guard at all: a browser without
    // IntersectionObserver (pre-2019) has no ResizeObserver either, so it
    // has already lost the scene-window measurement — and Framer Motion's
    // scroll driver on top of that. In such a browser /v2 degrades to the
    // first scene held static behind readable text, which is a reasonable
    // floor rather than a crash.
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id, index) => {
      if (index === 0) return; // already unlocked, priority-loaded
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setUnlocked((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.disconnect();
          }
        },
        { rootMargin: "50% 0px 50% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      for (const o of observers) o.disconnect();
    };
  }, [count]);

  return unlocked;
}

function Scene({
  index,
  range,
  progress,
  reduceMotion,
  unlocked,
}: {
  index: number;
  range: SceneWindow;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
  unlocked: boolean;
}) {
  const scene = SCENES[index];
  const keyframes = sceneOpacityRangeForWindow(
    range,
    index === 0,
    index === SCENES.length - 1,
  );
  // Task 8, Defect A: pinned to the full 0→1 progress span so the native
  // ScrollTimeline animation Framer Motion compiles this into cannot
  // synthesise an implicit trailing keyframe back to the element's
  // underlying `opacity: 1` — see pinnedToFullProgress.
  const { input, output } = pinnedToFullProgress(
    keyframes.input,
    keyframes.output,
  );
  const opacity = useTransform(progress, input, output);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      {/* Task 8, Finding 3: nothing renders (no <picture>, no request) for
          a locked scene — see useUnlockedScenes above. Its own scrim div
          below still paints (a plain colour, not an image, costs nothing
          to render), so a locked scene reads as dark rather than as a
          layout hole if it's ever visible before it unlocks. */}
      {unlocked && (
        <SceneLayer
          layer={scene.plate}
          range={range}
          progress={progress}
          alt={scene.alt}
          priority={index === 0}
          reduceMotion={reduceMotion}
        />
      )}
      {/* Keeps text legible over any frame: the scenes were composed with an
          empty dark left third, and this deepens it. Sized off the text
          column's own length (see .v2-scene-scrim in v2.css), not a
          percentage of the viewport, so the dark plateau covers the text at
          every width instead of drifting out from under it. */}
      <div aria-hidden="true" className="v2-scene-scrim absolute inset-0" />
    </motion.div>
  );
}

export function SceneStage() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion() ?? false;
  const windows = useSceneWindows();
  const unlocked = useUnlockedScenes(SCENES.length);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {SCENES.map((scene, index) => (
        <Scene
          // Framer Motion builds the native ScrollTimeline animation for a
          // scene when its motion value is first bound to the element, and
          // never rebuilds it — a later render carrying a different window
          // leaves the running animation on the old keyframes. Measured in
          // the browser before this key existed: every scene animated on the
          // equal-1/6 fallback split even after `useSceneWindows` had
          // measured the real geometry, putting scene boundaries up to 8.3
          // percentage points away from their sections (task-8-report.md,
          // "Defect B"). Keying each scene on its own window remounts it
          // exactly once, when the measurement lands, so the animation is
          // rebuilt from the measured geometry. The key is the window's
          // numbers, not the array identity, so a re-measure that finds the
          // same layout (the ResizeObserver's initial callback, a resize
          // that changes nothing) does not remount anything.
          key={`${scene.id}:${windows[index].start}:${windows[index].end}`}
          index={index}
          range={windows[index]}
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
          unlocked={unlocked[index]}
        />
      ))}
    </div>
  );
}
