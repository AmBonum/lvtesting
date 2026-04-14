"use client";

import { projects } from "@/data/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

const dotColors = {
  purple: "bg-accent-purple",
  coral: "bg-accent-coral",
} as const;

const glowStyles = {
  purple: "glow-purple",
  coral: "glow-coral",
} as const;

export default function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            title={t.projects.heading}
            subtitle={t.projects.subtitle}
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={0.1 + i * 0.15}
              direction={i === 0 ? "left" : "right"}
            >
              <GlassCard
                className="group relative h-full overflow-hidden p-8"
                accent={project.accent}
              >
                {/* Decorative corner glow */}
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40 ${
                    dotColors[project.accent]
                  }`}
                />

                {/* Floating accent badge */}
                <div className="absolute right-6 top-6">
                  <Badge
                    variant="outline"
                    accent={project.accent}
                    className="text-xs opacity-60"
                  >
                    {project.accent === "purple" ? t.projects.badgeQA : t.projects.badgeDev}
                  </Badge>
                </div>

                {/* Title block */}
                <div className="relative z-10 mb-4">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    {t.projects.items[i]?.title ?? project.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      project.accent === "purple"
                        ? "text-accent-purple"
                        : "text-accent-coral"
                    }`}
                  >
                    {t.projects.items[i]?.subtitle ?? project.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="relative z-10 mb-6 leading-relaxed text-[var(--color-text-muted)]">
                  {t.projects.items[i]?.description ?? project.description}
                </p>

                {/* Highlights list */}
                <ul className="relative z-10 mb-6 space-y-2">
                  {(t.projects.items[i]?.highlights ?? project.highlights).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
                    >
                      <span
                        className={`mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                          dotColors[project.accent]
                        }`}
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="relative z-10 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} accent={project.accent} className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Bottom edge glow line */}
                <div
                  className={`absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    glowStyles[project.accent]
                  }`}
                />
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
