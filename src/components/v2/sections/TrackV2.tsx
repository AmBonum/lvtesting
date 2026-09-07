"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { experience, companies } from "@/data/content";
import { SectionShell } from "./Shell";

export function TrackV2() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SectionShell id="track" kicker={t.v2.track.kicker}>
      <h2
        id="track-heading"
        className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl"
      >
        {t.v2.track.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.track.body}
      </p>

      <ol className="mt-9 border-l border-white/15 pl-5">
        {experience.map((item, i) => {
          // Translated copy wins when present; `content.ts` is only the
          // fallback (matches `Experience.tsx`'s own
          // `t.experience.items[index]?.description ?? item.description`
          // precedence, so all five locales stay in control of this text).
          const translated = t.experience.items[i];
          return (
            <motion.li
              key={`${item.company}-${item.period}`}
              className="relative pb-7 last:pb-0"
              initial={reduceMotion ? false : { opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <span className="absolute -left-[23px] top-1.5 h-1.5 w-1.5 rounded-full bg-v2-teal" />
              <p className="font-mono text-[11px] text-v2-muted/70">
                {translated?.period ?? item.period}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-v2-text">
                {translated?.role ?? item.role}
              </p>
              <p className="text-xs text-v2-amber">
                {translated?.company ?? item.company}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-v2-muted">
                {translated?.description ?? item.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] text-v2-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>

      <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-v2-muted/70">
        {t.companies.heading}
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {companies.map((company) => (
          <li key={company.name}>
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-v2-muted/70 transition-colors hover:text-v2-text"
            >
              {company.name}
            </a>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
