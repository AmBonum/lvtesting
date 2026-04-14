"use client";

import { companies } from "@/data/content";
import { useI18n } from "@/i18n/provider";

export default function Companies() {
  const { t } = useI18n();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
          {t.companies.heading}
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent" />

        <div className="animate-marquee flex w-max items-center gap-0">
          {[...companies, ...companies].map((company, index) => (
            <span key={`${company.name}-${index}`} className="flex items-center">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-8 text-2xl font-semibold text-[var(--color-text-muted)]/50 transition-colors hover:text-[var(--color-accent-purple)] sm:text-3xl"
              >
                {company.name}
              </a>
              <span className="text-[var(--color-text-muted)]/30">&#x2022;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
