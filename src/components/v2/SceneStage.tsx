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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
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
