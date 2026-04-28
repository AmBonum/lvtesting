import { type ReactNode, type CSSProperties } from "react";

const accentBorderColors = {
  purple: "hover:border-[var(--color-accent-purple)] hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]",
  coral: "hover:border-[var(--color-accent-coral)] hover:shadow-[0_0_20px_rgba(255,107,107,0.3)]",
  teal: "hover:border-[var(--color-accent-teal)] hover:shadow-[0_0_20px_rgba(78,205,196,0.3)]",
  yellow: "hover:border-[var(--color-accent-yellow)] hover:shadow-[0_0_20px_rgba(255,217,61,0.3)]",
  green: "hover:border-[var(--color-accent-green)]",
} as const;

const accentBgTints: Partial<Record<keyof typeof accentBorderColors, string>> = {};

type Accent = keyof typeof accentBorderColors;

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  accent?: Accent;
  hover?: boolean;
  style?: CSSProperties;
}

export function GlassCard({
  children,
  className = "",
  accent,
  hover = true,
  style,
}: GlassCardProps) {
  const hoverClasses = hover
    ? `transition-all duration-300 ease-out hover:scale-[1.02] ${
        accent ? accentBorderColors[accent] : ""
      }`
    : "";

  const bgTint = accent && accentBgTints[accent] ? accentBgTints[accent] : "";

  return (
    <div
      className={`glass overflow-hidden rounded-2xl ${bgTint} ${hoverClasses} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
