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
  teal: "bg-accent-teal",
} as const;

const subtitleColors = {
  purple: "text-accent-purple",
  coral: "text-accent-coral",
  teal: "text-accent-teal",
} as const;

const glowStyles = {
  purple: "glow-purple",
  coral: "glow-coral",
  teal: "glow-teal",
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

        {/* Below lg the projects are a swipeable carousel: each card takes
            most of the width so the next one peeks in and shows there is
            more. From lg up they sit three abreast in a grid.

            The track reveals as one unit rather than card by card.
            ScrollReveal fires on viewport intersection with a -100px margin,
            so a card parked to the side of the carousel would stay at
            opacity 0 — and the peeking edge that makes the carousel
            discoverable would be invisible.

            The cards hold nothing focusable, so the track itself takes
            focus; that is what lets keyboard users scroll it with the arrow
            keys. */}
        <ScrollReveal delay={0.1}>
          <div
            role="region"
            aria-label={t.projects.heading}
            tabIndex={0}
            className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-6 overflow-x-auto px-6 pb-4 pt-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-purple)] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0 lg:pt-0"
          >
            {projects.map((project, i) => (
              <GlassCard
                key={project.title}
                className="group relative flex w-[85%] flex-shrink-0 snap-start flex-col overflow-hidden p-8 sm:w-[70%] md:w-[55%] lg:w-auto lg:p-6"
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

                {/* Title block — right padding keeps a title that wraps in a
                    narrow three-column card from running under the badge. */}
                <div className="relative z-10 mb-4 pr-14">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                    {t.projects.items[i]?.title ?? project.title}
                  </h3>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      subtitleColors[project.accent]
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

                {/* Tags — pinned to the bottom of the card. The three cards
                    share one row height, set by whichever has the most text;
                    mt-auto puts the slack above the tags instead of leaving a
                    hole under them, so the tag rows line up across cards. */}
                <div className="relative z-10 mt-auto flex flex-wrap gap-2">
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
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
