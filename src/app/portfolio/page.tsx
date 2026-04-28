"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

// ─── Tech stack data ──────────────────────────────────────────────────────────
const techStack = [
  {
    name: "React 19",
    url: "https://react.dev",
    icon: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    icon: "https://cdn.simpleicons.org/typescript/60A5FA",
  },
  {
    name: "TanStack",
    url: "https://tanstack.com",
    icon: "https://cdn.simpleicons.org/reactquery/FF4154",
  },
  {
    name: "Vite",
    url: "https://vitejs.dev",
    icon: "https://cdn.simpleicons.org/vite/BD34FE",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    icon: "https://cdn.simpleicons.org/supabase/3ECF8E",
  },
  {
    name: "Cloudflare",
    url: "https://cloudflare.com",
    icon: "https://cdn.simpleicons.org/cloudflare/F38020",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    icon: "https://cdn.simpleicons.org/stripe/9B8DFF",
  },
  {
    name: "Vitest",
    url: "https://vitest.dev",
    icon: "https://cdn.simpleicons.org/vitest/A8D232",
  },
];

// ─── Mobix tech stack ─────────────────────────────────────────────────────────
const mobixTechStack = [
  {
    name: "Flutter",
    url: "https://flutter.dev",
    icon: "https://cdn.simpleicons.org/flutter/54C5F8",
  },
  {
    name: "Dart",
    url: "https://dart.dev",
    icon: "https://cdn.simpleicons.org/dart/0175C2",
  },
  {
    name: "Node.js",
    url: "https://nodejs.org",
    icon: "https://cdn.simpleicons.org/nodedotjs/6DB33F",
  },
  {
    name: "GraphQL",
    url: "https://graphql.org",
    icon: "https://cdn.simpleicons.org/graphql/E10098",
  },
  {
    name: "MySQL",
    url: "https://mysql.com",
    icon: "https://cdn.simpleicons.org/mysql/4479A1",
  },
  {
    name: "Firebase",
    url: "https://firebase.google.com",
    icon: "https://cdn.simpleicons.org/firebase/DD2C00",
  },
  {
    name: "Stripe",
    url: "https://stripe.com",
    icon: "https://cdn.simpleicons.org/stripe/9B8DFF",
  },
  {
    name: "Twilio",
    url: "https://twilio.com",
    icon: "/twilio-icon.svg",
  },
  {
    name: "Playwright",
    url: "https://playwright.dev",
    icon: "/playwright-icon.svg",
  },
];

// ─── Color helper ─────────────────────────────────────────────────────────────
// Appends / alpha) to an oklch() color string: withAlpha("oklch(0.8 0.2 130)", 0.15) → "oklch(0.8 0.2 130 / 0.15)"
function withAlpha(color: string, alpha: number) {
  return color.replace(")", ` / ${alpha})`);
}

// ─── Tech icon with fallback ──────────────────────────────────────────────────
function TechIcon({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-sm bg-white/15 text-[7px] font-bold leading-none text-white/70">
        {alt.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={14}
      height={14}
      className="h-3.5 w-3.5 flex-shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

// ─── Arrow-left icon ──────────────────────────────────────────────────────────
function ArrowLeftIcon() {
  return (
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
  );
}

// ─── External link icon ───────────────────────────────────────────────────────
function ExternalLinkIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ─── Graphic placeholder card ─────────────────────────────────────────────────
function GraphicPlaceholderCard() {
  return (
    <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[var(--color-border-glass)] bg-white/[0.02]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--color-text-muted)] opacity-30"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
  );
}

// ─── Project type ─────────────────────────────────────────────────────────────
interface WebProjectData {
  id: string;
  name: string;
  logo: string;
  year: string;
  tagline: string;
  description: string;
  features: string[];
  visitUrl?: string;
  visitLabel: string;
  subtitle: string;
  techStack: { name: string; url: string; icon: string }[];
  accentColor: string;
  accentColorEnd: string;
  glassAccent: "green" | "teal" | "purple" | "coral" | "yellow";
  ongoing?: boolean;
}

// ─── Collapsed project tile ───────────────────────────────────────────────────
function CollapsedProjectCard({
  project,
  ongoingLabel,
  onClick,
}: {
  project: WebProjectData;
  ongoingLabel: string;
  onClick: () => void;
}) {
  const c = project.accentColor;
  const wa = (alpha: number) => withAlpha(c, alpha);
  return (
    <button
      onClick={onClick}
      className="group/c relative flex w-44 flex-shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300 focus-visible:outline-none"
      style={{
        aspectRatio: "1 / 1",
        background: wa(0.06),
        borderColor: wa(0.2),
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px ${wa(0.35)}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
      }}
      aria-label={`Expand ${project.name}`}
    >
      {project.ongoing && (
        <span
          className="absolute right-2.5 top-2.5 h-2 w-2 animate-pulse rounded-full"
          style={{ background: c }}
          title={ongoingLabel}
        />
      )}
      <Image
        src={project.logo}
        alt={project.name}
        width={120}
        height={32}
        unoptimized
        className="h-8 w-auto max-w-[120px] flex-shrink-0 object-contain"
      />
      <div className="w-full">
        <p className="text-sm font-bold text-[var(--color-text-primary)]">{project.name}</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
          {project.tagline}
        </p>
      </div>
    </button>
  );
}

// ─── Expanded project card ────────────────────────────────────────────────────
function ExpandedProjectCard({
  project,
  ongoingLabel,
}: {
  project: WebProjectData;
  ongoingLabel: string;
}) {
  const c = project.accentColor;
  const cEnd = project.accentColorEnd;
  const wa = (alpha: number) => withAlpha(c, alpha);
  const waEnd = (alpha: number) => withAlpha(cEnd, alpha);
  return (
    <GlassCard
      hover={false}
      className="group relative overflow-hidden p-8 md:p-10"
      style={{
        background: wa(0.15),
        borderColor: wa(0.5),
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: wa(0.12) }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: waEnd(0.1) }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Image
                src={project.logo}
                alt={project.name}
                width={160}
                height={38}
                unoptimized
                className="h-9 w-auto max-w-[180px] object-contain"
              />
              <span
                className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                style={{ borderColor: wa(0.5), color: c }}
              >
                {project.year}
              </span>
              {project.ongoing && (
                <span
                  className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    background: wa(0.12),
                    borderColor: wa(0.35),
                    color: c,
                  }}
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: c }} />
                  {ongoingLabel}
                </span>
              )}
            </div>
            <p className="text-sm font-medium" style={{ color: c }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {project.visitUrl && (
          <a
            href={project.visitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200"
            style={{
              border: `1px solid ${wa(0.6)}`,
              backgroundColor: wa(0.5),
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = c;
              (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.18 0.05 265)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = wa(0.5);
              (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
            }}
          >
            {project.visitLabel}
            <ExternalLinkIcon />
          </a>
        )}
      </div>

      {/* Tagline */}
      <p className="relative z-10 mb-4 text-base leading-relaxed text-[var(--color-text-primary)]">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="relative z-10 mb-6 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {project.description}
      </p>

      {/* Features grid */}
      <div className="relative z-10 mb-8 grid gap-2 sm:grid-cols-2">
        {project.features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]"
          >
            <span
              className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ background: c }}
            />
            {feature}
          </div>
        ))}
      </div>

      {/* Tech stack with logos */}
      <div className="relative z-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)] opacity-60">
          Tech stack
        </p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/tech inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-[var(--color-text-primary)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <TechIcon src={tech.icon} alt={tech.name} />
              {tech.name}
              <ExternalLinkIcon size={10} />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${wa(0.6)}, transparent)`,
        }}
      />
    </GlassCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const { t } = useI18n();
  const p = t.portfolio;
  const [expandedId, setExpandedId] = useState<string>("subenai");

  const webProjects: WebProjectData[] = [
    {
      id: "subenai",
      name: "subenai",
      logo: "/subenai-logo.svg",
      year: p.subenai.year,
      tagline: p.subenai.tagline,
      description: p.subenai.description,
      features: p.subenai.features,
      visitUrl: "https://subenai.sk",
      visitLabel: p.subenai.visitSite,
      subtitle: "Digital Safety · Education · Full-Stack",
      techStack,      accentColor: "oklch(0.88 0.22 130)",
      accentColorEnd: "oklch(0.78 0.18 165)",
      glassAccent: "green",
      ongoing: true,
    },
    {
      id: "mobix",
      name: "Mobix",
      logo: "/mobix-icon.svg",
      year: p.mobix.year,
      tagline: p.mobix.tagline,
      description: p.mobix.description,
      features: p.mobix.features,
      visitLabel: p.mobix.visitSite,
      subtitle: "Taxi Platform \u00b7 Mobile \u00b7 Full-Stack",
      techStack: mobixTechStack,
      accentColor: "rgb(41 144 200)",
      accentColorEnd: "rgb(15 60 113)",
      glassAccent: "teal",
      ongoing: true,    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const expandedProject =
    webProjects.find((pr) => pr.id === expandedId) ?? webProjects[0];
  const collapsedProjects = webProjects.filter((pr) => pr.id !== expandedId);

  return (
    <>
      <Header />
      <main id="main-content" className="mx-auto max-w-6xl px-6 pb-24 pt-28">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-green)]"
        >
          <ArrowLeftIcon />
          {p.backHome}
        </Link>

        {/* Page heading */}
        <ScrollReveal>
          <SectionHeading title={p.heading} size="lg" className="mb-4" />
        </ScrollReveal>

        {/* ── Web Projects ──────────────────────────────────────────────────── */}
        <section className="mt-20">
          {/* <ScrollReveal>
            <SectionHeading
              title={p.webProjects.heading}
              subtitle={p.webProjects.subtitle}
              size="sm"
              className="mb-12"
            />
          </ScrollReveal> */}

          {/* Expanded card */}
          <ScrollReveal delay={0.1}>
            <ExpandedProjectCard project={expandedProject} ongoingLabel={p.ongoingLabel} />
          </ScrollReveal>

          {/* Collapsed cards – horizontally scrollable when there are multiple */}
          {collapsedProjects.length > 0 && (
            <div ref={scrollRef} className="mt-4 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
              {collapsedProjects.map((pr) => (
                <CollapsedProjectCard
                  key={pr.id}
                  project={pr}
                  ongoingLabel={p.ongoingLabel}
                  onClick={() => setExpandedId(pr.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Graphic Design (temporarily hidden) ──────────────────────────── */}
        {/* <section className="mt-24">
          <ScrollReveal>
            <SectionHeading
              title={p.graphicDesigns.heading}
              subtitle={p.graphicDesigns.subtitle}
              size="sm"
              className="mb-12"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <GlassCard accent="teal" className="p-8 md:p-10">
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <GraphicPlaceholderCard key={i} />
                ))}
              </div>
              <p className="text-center text-sm text-[var(--color-text-muted)] opacity-50">
                {p.graphicDesigns.comingSoon}
              </p>
            </GlassCard>
          </ScrollReveal>
        </section> */}
      </main>
      <Footer />
    </>
  );
}
