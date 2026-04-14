"use client";

import { experience } from "@/data/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

const dotGlowColors = {
  purple: "bg-[var(--color-accent-purple)] shadow-[0_0_12px_rgba(108,99,255,0.6)]",
  coral: "bg-[var(--color-accent-coral)] shadow-[0_0_12px_rgba(255,107,107,0.6)]",
  teal: "bg-[var(--color-accent-teal)] shadow-[0_0_12px_rgba(78,205,196,0.6)]",
  yellow: "bg-[var(--color-accent-yellow)] shadow-[0_0_12px_rgba(255,217,61,0.6)]",
} as const;

export default function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <SectionHeading
            title={t.experience.heading}
            subtitle={t.experience.subtitle}
            className="mb-16"
          />
        </ScrollReveal>

        <div className="relative">
          {/* Center timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[var(--color-accent-purple)] via-[var(--color-accent-coral)] to-[var(--color-accent-teal)] md:left-1/2 md:block md:-translate-x-px" />
          {/* Mobile timeline line */}
          <div className="absolute left-4 top-0 block h-full w-px bg-gradient-to-b from-[var(--color-accent-purple)] via-[var(--color-accent-coral)] to-[var(--color-accent-teal)] md:hidden" />

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <ScrollReveal
                  key={`${item.company}-${item.period}`}
                  delay={index * 0.15}
                  direction={isLeft ? "left" : "right"}
                >
                  <div className="relative flex items-start md:justify-center">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full md:left-1/2 ${dotGlowColors[item.accent]}`}
                    />

                    {/* Card positioning */}
                    <div
                      className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                      }`}
                    >
                      <GlassCard accent={item.accent} className="p-6">
                        <span className="text-sm font-medium text-[var(--color-text-muted)]">
                          {t.experience.items[index]?.period ?? item.period}
                        </span>
                        <h3 className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">
                          {t.experience.items[index]?.role ?? item.role}
                        </h3>
                        <p className="text-sm font-medium text-[var(--color-accent-purple)]">
                          {t.experience.items[index]?.company ?? item.company}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                          {t.experience.items[index]?.description ?? item.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.stack.map((tech) => (
                            <Badge key={tech} accent={item.accent} className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
