"use client";

import { useI18n } from "@/i18n/provider";
import { SectionShell } from "./Shell";

export function HeroV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="hero" kicker={t.v2.hero.kicker}>
      <h1
        id="hero-heading"
        className="text-3xl font-semibold leading-[1.1] tracking-tight text-[var(--v2-text)] sm:text-4xl lg:text-5xl"
      >
        {t.v2.hero.headline}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[var(--v2-muted)] sm:text-lg">
        {t.v2.hero.sub}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#get-in-touch"
          className="rounded-full bg-[var(--v2-amber)] px-7 py-3 text-sm font-semibold text-[var(--v2-ink)] transition-transform duration-200 hover:scale-[1.03]"
        >
          {t.v2.hero.cta}
        </a>
        <a
          href="#work"
          className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-[var(--v2-text)] transition-colors duration-200 hover:bg-white/10"
        >
          {t.v2.hero.ctaSecondary}
        </a>
      </div>
    </SectionShell>
  );
}
