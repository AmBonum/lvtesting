"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Every v2 section is one viewport tall and keeps its text in the left
 * column — that is where all six scenes were composed to be empty and dark.
 */
export function SectionShell({
  id,
  kicker,
  children,
}: {
  id: string;
  kicker: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      // px-[var(--v2-pad)] replaces the old literal `px-6 sm:px-10
      // lg:px-16` — --v2-pad (defined once in v2.css, on .v2-body) is now
      // the only place that breakpoint ladder is written down. v2.css's
      // `.v2-scene-scrim` derives --v2-text-edge from this same variable,
      // so the scrim can never drift out from under this column again
      // (Task 8, Finding 5).
      className="flex min-h-screen items-center px-[var(--v2-pad)] py-24"
    >
      <motion.div
        // max-w-[var(--v2-max)] replaces the old literal `max-w-xl` for the
        // same reason. `v2-text-panel` gives this block its own legibility
        // guarantee below 1024px — see the comment on .v2-scene-scrim in
        // v2.css (Task 8, Finding 1); it is a no-op above 1024px.
        className="v2-text-panel w-full max-w-[var(--v2-max)]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[var(--v2-amber)]">
          {kicker}
        </p>
        {children}
      </motion.div>
    </section>
  );
}
