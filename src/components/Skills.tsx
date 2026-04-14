"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

const accentColors = {
  purple: "bg-[var(--color-accent-purple)]",
  coral: "bg-[var(--color-accent-coral)]",
  teal: "bg-[var(--color-accent-teal)]",
  yellow: "bg-[var(--color-accent-yellow)]",
} as const;

const accentTrackColors = {
  purple: "bg-[var(--color-accent-purple)]/20",
  coral: "bg-[var(--color-accent-coral)]/20",
  teal: "bg-[var(--color-accent-teal)]/20",
  yellow: "bg-[var(--color-accent-yellow)]/20",
} as const;

function ProgressBar({ level, accent }: { level: number; accent: keyof typeof accentColors }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={`h-1.5 w-full rounded-full ${accentTrackColors[accent]}`}>
      <motion.div
        className={`h-full rounded-full ${accentColors[accent]}`}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  );
}

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            title={t.skills.heading}
            subtitle={t.skills.subtitle}
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <ScrollReveal key={skill.category} delay={index * 0.1}>
              <GlassCard accent={skill.accent} className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {t.skills.categories[index] ?? skill.category}
                  </h3>
                </div>

                <ProgressBar level={skill.level} accent={skill.accent} />
                <span className="mt-1 block text-right text-xs text-[var(--color-text-muted)]">
                  {skill.level}%
                </span>

                <div className="mt-4 flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <Badge key={tool} variant="outline" accent={skill.accent} className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
