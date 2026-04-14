"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/i18n/provider";
import { useConsent } from "@/lib/ConsentProvider";

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-accent-purple" : "bg-white/10"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingsModal() {
  const { t } = useI18n();
  const { preferences, saveCustom, acceptAll, rejectAll, closeSettings } =
    useConsent();
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [marketing, setMarketing] = useState(preferences.marketing);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && closeSettings()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-label={t.consent.settings.title}
        className="glass glow-purple w-full max-w-lg rounded-2xl p-6 sm:p-8"
      >
        <h2 className="text-xl font-bold text-text-primary">
          {t.consent.settings.title}
        </h2>
        <p className="mt-2 text-sm text-text-muted">
          {t.consent.settings.description}
        </p>

        <div className="mt-6 space-y-4">
          {/* Necessary */}
          <div className="flex items-start justify-between gap-4 rounded-xl bg-white/[0.03] p-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-primary">
                  {t.consent.settings.necessary.title}
                </span>
                <span className="rounded-full bg-accent-purple/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-purple">
                  {t.consent.settings.required}
                </span>
              </div>
              <p className="mt-1 text-xs text-text-muted">
                {t.consent.settings.necessary.description}
              </p>
            </div>
            <Toggle checked disabled onChange={() => {}} />
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4 rounded-xl bg-white/[0.03] p-4">
            <div className="min-w-0">
              <span className="text-sm font-semibold text-text-primary">
                {t.consent.settings.analytics.title}
              </span>
              <p className="mt-1 text-xs text-text-muted">
                {t.consent.settings.analytics.description}
              </p>
            </div>
            <Toggle checked={analytics} onChange={setAnalytics} />
          </div>

          {/* Marketing */}
          <div className="flex items-start justify-between gap-4 rounded-xl bg-white/[0.03] p-4">
            <div className="min-w-0">
              <span className="text-sm font-semibold text-text-primary">
                {t.consent.settings.marketing.title}
              </span>
              <p className="mt-1 text-xs text-text-muted">
                {t.consent.settings.marketing.description}
              </p>
            </div>
            <Toggle checked={marketing} onChange={setMarketing} />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={rejectAll}
            className="rounded-full border border-border-glass px-5 py-2.5 text-sm font-semibold text-text-muted transition-all duration-200 hover:text-text-primary"
          >
            {t.consent.settings.rejectAll}
          </button>
          <button
            onClick={() => saveCustom({ analytics, marketing })}
            className="rounded-full border border-accent-purple/50 px-5 py-2.5 text-sm font-semibold text-accent-purple transition-all duration-200 hover:bg-accent-purple/10"
          >
            {t.consent.settings.savePreferences}
          </button>
          <button
            onClick={acceptAll}
            className="rounded-full bg-accent-purple px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-accent-purple/25"
          >
            {t.consent.settings.acceptAll}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CookieConsent() {
  const { t } = useI18n();
  const { showBanner, showSettings, acceptAll, rejectAll, openSettings } =
    useConsent();

  return (
    <AnimatePresence>
      {showBanner && !showSettings && (
        <motion.div
          key="banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[60] p-4"
        >
          <div className="glass-strong mx-auto max-w-5xl rounded-2xl border border-border-glass p-5 shadow-2xl sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 sm:max-w-[55%]">
                <p className="text-sm font-semibold text-text-primary">
                  {t.consent.banner.title}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {t.consent.banner.description}{" "}
                  <a
                    href="/privacy"
                    className="underline transition-colors hover:text-accent-purple"
                  >
                    {t.consent.banner.privacyLink}
                  </a>
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  onClick={rejectAll}
                  className="rounded-full border border-border-glass px-5 py-2.5 text-sm font-semibold text-text-muted transition-all duration-200 hover:text-text-primary"
                >
                  {t.consent.banner.rejectAll}
                </button>
                <button
                  onClick={openSettings}
                  className="rounded-full border border-border-glass px-5 py-2.5 text-sm font-semibold text-text-muted transition-all duration-200 hover:text-text-primary"
                >
                  {t.consent.banner.customize}
                </button>
                <button
                  onClick={acceptAll}
                  className="rounded-full bg-accent-purple px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-accent-purple/25"
                >
                  {t.consent.banner.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {showSettings && <SettingsModal key="settings" />}
    </AnimatePresence>
  );
}
