import { type ReactNode } from "react";

const accentBorderColors = {
  purple: "hover:border-[var(--color-accent-purple)] hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]",
  coral: "hover:border-[var(--color-accent-coral)] hover:shadow-[0_0_20px_rgba(255,107,107,0.3)]",
  teal: "hover:border-[var(--color-accent-teal)] hover:shadow-[0_0_20px_rgba(78,205,196,0.3)]",
  yellow: "hover:border-[var(--color-accent-yellow)] hover:shadow-[0_0_20px_rgba(255,217,61,0.3)]",
} as const;

type Accent = keyof typeof accentBorderColors;

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  accent,
  hover = true,
}: GlassCardProps) {
  const hoverClasses = hover
    ? `transition-all duration-300 ease-out hover:scale-[1.02] ${
        accent ? accentBorderColors[accent] : ""
      }`
    : "";

  return (
    <div className={`glass overflow-hidden rounded-2xl ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
