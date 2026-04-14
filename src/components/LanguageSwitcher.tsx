"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { locales, type Locale } from "@/i18n";

interface LanguageSwitcherProps {
  /** Open dropdown upward instead of downward (useful when near bottom of screen) */
  dropUp?: boolean;
}

export default function LanguageSwitcher({ dropUp = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full border border-[var(--color-border-glass)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent-purple)] hover:text-[var(--color-text-primary)]"
        aria-label="Change language"
      >
        <span>{locales[locale].flag}</span>
        <span className="hidden sm:inline">{locale.toUpperCase()}</span>
        <svg
          className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 min-w-[140px] overflow-hidden rounded-xl border border-[var(--color-border-glass)] bg-[var(--color-bg-card)] shadow-xl backdrop-blur-xl ${
              dropUp
                ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
                : "top-full mt-2 right-0"
            }`}
          >
            {(Object.keys(locales) as Locale[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setLocale(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  key === locale
                    ? "bg-[var(--color-accent-purple)]/10 text-[var(--color-accent-purple)]"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-primary)]"
                }`}
              >
                <span>{locales[key].flag}</span>
                <span>{locales[key].label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
