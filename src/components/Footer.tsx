"use client";

import { useI18n } from "@/i18n/provider";
import { useConsent } from "@/lib/ConsentProvider";

export default function Footer() {
  const { t } = useI18n();
  const { resetConsent } = useConsent();

  return (
    <footer className="border-t border-[var(--color-border-glass)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6">
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          <button
            type="button"
            onClick={resetConsent}
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            {t.consent.footerLinks.cookieSettings}
          </button>
          <span className="opacity-30">|</span>
          <a
            href="/privacy"
            className="transition-colors hover:text-[var(--color-text-primary)]"
          >
            {t.consent.footerLinks.privacyPolicy}
          </a>
        </div>
        <p className="text-center text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} LV Testing. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
