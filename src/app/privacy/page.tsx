"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import Footer from "@/components/Footer";

function Section({
  heading,
  content,
}: {
  heading: string;
  content: string[];
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-lg font-bold text-text-primary">{heading}</h2>
      {content.map((paragraph, i) => (
        <p key={i} className="mb-2 text-sm leading-relaxed text-text-muted">
          {paragraph}
        </p>
      ))}
    </section>
  );
}

function CookieTable({
  table,
  necessary,
  analytics,
  marketing,
}: {
  table: { name: string; provider: string; purpose: string; duration: string };
  necessary: { name: string; description: string };
  analytics: { name: string; description: string };
  marketing: { name: string; description: string };
}) {
  const rows = [
    {
      name: necessary.name,
      provider: "Local",
      purpose: necessary.description,
      category: "Necessary",
    },
    {
      name: analytics.name,
      provider: "Google",
      purpose: analytics.description,
      category: "Analytics",
    },
    {
      name: marketing.name,
      provider: "—",
      purpose: marketing.description,
      category: "Marketing",
    },
  ];

  return (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border-glass">
            <th className="px-3 py-2 font-semibold text-text-primary">
              {table.name}
            </th>
            <th className="px-3 py-2 font-semibold text-text-primary">
              {table.provider}
            </th>
            <th className="px-3 py-2 font-semibold text-text-primary">
              {table.purpose}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.category} className="border-b border-white/5">
              <td className="px-3 py-2 font-mono text-accent-purple">
                {row.name}
              </td>
              <td className="px-3 py-2 text-text-muted">{row.provider}</td>
              <td className="px-3 py-2 text-text-muted">{row.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PrivacyPage() {
  const { t } = useI18n();
  const s = t.privacy.sections;

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 pb-16 pt-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent-purple"
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
          {t.privacy.backHome}
        </Link>

        <h1 className="gradient-text mb-2 text-3xl font-black tracking-tight sm:text-4xl">
          {t.privacy.title}
        </h1>
        <p className="mb-10 text-sm text-text-muted">{t.privacy.lastUpdated}</p>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <Section heading={s.controller.heading} content={s.controller.content} />
          <Section heading={s.dataCollection.heading} content={s.dataCollection.content} />

          <section className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-text-primary">
              {s.cookies.heading}
            </h2>
            <p className="mb-4 text-sm text-text-muted">{s.cookies.intro}</p>
            <CookieTable
              table={s.cookies.table}
              necessary={s.cookies.necessary}
              analytics={s.cookies.analytics}
              marketing={s.cookies.marketing}
            />
          </section>

          <Section heading={s.usage.heading} content={s.usage.content} />
          <Section heading={s.rights.heading} content={s.rights.content} />
          <Section heading={s.contact.heading} content={s.contact.content} />
          <Section heading={s.authority.heading} content={s.authority.content} />
          <Section heading={s.changes.heading} content={s.changes.content} />
        </div>
      </main>
      <Footer />
    </>
  );
}
