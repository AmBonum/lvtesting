"use client";

import { useI18n } from "@/i18n/provider";
import { projects } from "@/data/content";
import { SectionShell } from "./Shell";

export function WorkV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="work" kicker={t.v2.work.kicker}>
      <h2
        id="work-heading"
        className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl"
      >
        {t.v2.work.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.work.body}
      </p>
      <div className="mt-9 space-y-5">
        {projects.map((project, i) => {
          const translated = t.projects.items[i];
          return (
            <article
              key={project.title}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-v2-text">
                {translated?.title ?? project.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-v2-teal">
                {translated?.subtitle ?? project.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-v2-muted">
                {translated?.description ?? project.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-v2-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </SectionShell>
  );
}
