"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  sceneOpacityRangeForWindow,
  sceneWindow,
  sceneWindowsFromSections,
} from "@/lib/v2/scroll-story";
import { SCENES } from "@/lib/v2/scenes";
import { SceneLayer } from "./SceneLayer";

/** Stable DOM ids of the six sections, in scroll order — see page.tsx. */
const SECTION_IDS = ["hero", "process", "work", "testing", "track", "contact"] as const;

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

function Scene({
  index,
  range,
  progress,
  reduceMotion,
}: {
  index: number;
  range: SceneWindow;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const scene = SCENES[index];
  const { input, output } = sceneOpacityRangeForWindow(
    range,
    index === 0,
    index === SCENES.length - 1,
  );
  const opacity = useTransform(progress, input, output);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <SceneLayer
        layer={scene.plate}
        range={range}
        progress={progress}
        alt={scene.alt}
        priority={index === 0}
        reduceMotion={reduceMotion}
      />
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {SCENES.map((scene, index) => (
        <Scene
          key={scene.id}
          index={index}
          range={windows[index]}
          progress={scrollYProgress}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
