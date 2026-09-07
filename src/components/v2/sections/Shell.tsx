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
      className="flex min-h-screen items-center px-6 py-24 sm:px-10 lg:px-16"
    >
      <motion.div
        className="w-full max-w-xl"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-v2-amber">
          {kicker}
        </p>
        {children}
      </motion.div>
    </section>
  );
}
