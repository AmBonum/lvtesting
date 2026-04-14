"use client";

import { useI18n } from "@/i18n/provider";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-[var(--color-border-glass)]">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          &copy; {new Date().getFullYear()} Lubomir Volcko. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
