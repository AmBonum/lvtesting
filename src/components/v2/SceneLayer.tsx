"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import {
  layerRangeForWindow,
  pinnedToFullProgress,
} from "@/lib/v2/scroll-story";
import { PARALLAX_AMPLITUDE, type SceneLayerSpec } from "@/lib/v2/scenes";
import { SCENE_SIZES, SCENE_SRCSET } from "@/lib/v2/scene-srcset";

type Props = {
  layer: SceneLayerSpec;
  /** This layer's scene's window — measured from the section it sits
   * behind, not assumed from its index (see `sceneWindowsFromSections`). */
  range: { start: number; end: number };
  progress: MotionValue<number>;
  alt: string;
  /** The first scene is the LCP image and must not be lazy. */
  priority?: boolean;
  reduceMotion: boolean;
};

export function SceneLayer({
  layer,
  range,
  progress,
  alt,
  priority = false,
  reduceMotion,
}: Props) {
  const travel = layerRangeForWindow(
    range,
    reduceMotion ? 0 : layer.speed,
    PARALLAX_AMPLITUDE,
  );
  // Task 8, Defect A: same pinning as the scene's opacity — a range that
  // stops short of progress 1 lets the native ScrollTimeline animation
  // drift back towards the element's underlying `y` instead of holding at
  // the end of its travel. See pinnedToFullProgress.
  const { input, output } = pinnedToFullProgress(travel.input, travel.output);
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
        <source type="image/avif" srcSet={SCENE_SRCSET(layer.src, "avif")} sizes={SCENE_SIZES} />
        <source type="image/webp" srcSet={SCENE_SRCSET(layer.src, "webp")} sizes={SCENE_SIZES} />
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
