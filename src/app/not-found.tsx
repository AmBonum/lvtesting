"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <div className="glass glow-purple mx-auto max-w-lg rounded-2xl p-10">
        <p className="gradient-text text-8xl font-black tracking-tighter">404</p>
        <h1 className="mt-4 text-2xl font-bold text-text-primary">
          {t.errors.notFound.title}
        </h1>
        <p className="mt-3 text-text-muted">
          {t.errors.notFound.description}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-purple px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-purple/25"
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          {t.errors.notFound.backHome}
        </Link>
      </div>
    </div>
  );
}
