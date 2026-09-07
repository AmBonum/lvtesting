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
