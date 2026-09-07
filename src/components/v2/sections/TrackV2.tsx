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
            </motion.li>
          );
        })}
      </ol>

      <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
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
