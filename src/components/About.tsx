"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

const statAccents = ["purple", "coral", "teal", "yellow"] as const;

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            title={t.about.heading}
            subtitle={t.about.subtitle}
            className="mb-14"
          />
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Bio card — spans 2 columns on desktop */}
          <ScrollReveal className="md:col-span-2" delay={0.1}>
            <GlassCard className="h-full p-8" accent="purple">
              <div className="space-y-5">
                {t.about.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="leading-relaxed text-[var(--color-text-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>

          {/* Stats — 2x2 grid on the right */}
          <div className="grid grid-cols-2 gap-4">
            {t.about.stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={0.15 + i * 0.1}>
                <GlassCard
                  className="group relative flex h-full flex-col items-center justify-center overflow-hidden p-6 text-center"
                  accent={statAccents[i % statAccents.length]}
                >
                  {/* Decorative background glow */}
                  <div
                    className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40 ${
                      i % 2 === 0 ? "bg-accent-purple" : "bg-accent-coral"
                    }`}
                  />

                  <span className="gradient-text relative z-10 text-3xl font-bold tracking-tight sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="relative z-10 mt-1 text-sm text-[var(--color-text-muted)]">
                    {stat.label}
                  </span>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
