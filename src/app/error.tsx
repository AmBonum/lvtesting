"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/provider";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <div className="glass glow-coral mx-auto max-w-lg rounded-2xl p-10">
        <p className="text-8xl font-black tracking-tighter text-accent-coral">500</p>
        <h1 className="mt-4 text-2xl font-bold text-text-primary">
          {t.errors.serverError.title}
        </h1>
        <p className="mt-3 text-text-muted">
          {t.errors.serverError.description}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-accent-coral px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-coral/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            {t.errors.serverError.tryAgain}
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border-glass px-6 py-3 text-sm font-semibold text-text-muted transition-all duration-300 hover:scale-105 hover:text-text-primary"
          >
            {t.errors.serverError.backHome}
          </a>
        </div>
      </div>
    </div>
  );
}
