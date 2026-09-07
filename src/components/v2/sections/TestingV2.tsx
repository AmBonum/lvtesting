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
  // Global constraint: animate only transform/opacity, never layout
  // properties like `width`. The fill is a full-width node scaled down with
  // `scaleX`; its border-radius is deliberately omitted (see below) so the
  // transform can't stretch a circular corner into an ellipse.
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, level / 100]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between text-xs text-v2-muted">
        <span className="font-mono">
          {String(index + 1).padStart(2, "0")} {label}
        </span>
        <span className="font-mono text-v2-teal">{level}%</span>
      </div>
      {/* The pill radius lives on the track (unscaled) and clips the fill
          via overflow-hidden. Putting the radius on the scaled fill instead
          would squash it into an ellipse at low scaleX values. */}
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-v2-teal to-v2-amber"
          style={reduceMotion ? { scaleX: level / 100 } : { scaleX }}
        />
      </div>
    </div>
  );
}

export function TestingV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="testing" kicker={t.v2.testing.kicker}>
      <h2
        id="testing-heading"
        className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl"
      >
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
