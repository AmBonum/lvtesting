"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { SectionShell } from "./Shell";

export function ProcessV2() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <SectionShell id="process" kicker={t.v2.process.kicker}>
      <h2
        id="process-heading"
        className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl"
      >
        {t.v2.process.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.process.body}
      </p>
      <ol className="mt-9 space-y-4">
        {t.v2.process.steps.map((step, i) => (
          <motion.li
            key={step}
            className="flex gap-4 text-sm text-v2-muted sm:text-base"
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <span className="mt-0.5 font-mono text-xs text-v2-teal">
              {String(i + 1).padStart(2, "0")}
            </span>
            {step}
          </motion.li>
        ))}
      </ol>
    </SectionShell>
  );
}
