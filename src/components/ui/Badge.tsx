import { type ReactNode } from "react";

const filledStyles = {
  purple: "bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]",
  coral: "bg-[var(--color-accent-coral)]/20 text-[var(--color-accent-coral)]",
  teal: "bg-[var(--color-accent-teal)]/20 text-[var(--color-accent-teal)]",
  yellow: "bg-[var(--color-accent-yellow)]/20 text-[var(--color-accent-yellow)]",
  green: "bg-[var(--color-accent-green-muted)] text-[var(--color-accent-green)]",
} as const;

const outlineStyles = {
  purple: "border-[var(--color-accent-purple)] text-[var(--color-accent-purple)]",
  coral: "border-[var(--color-accent-coral)] text-[var(--color-accent-coral)]",
  teal: "border-[var(--color-accent-teal)] text-[var(--color-accent-teal)]",
  yellow: "border-[var(--color-accent-yellow)] text-[var(--color-accent-yellow)]",
  green: "border-[var(--color-accent-green)] text-[var(--color-accent-green)]",
} as const;

type Accent = keyof typeof filledStyles;

interface BadgeProps {
  children: ReactNode;
  variant?: "filled" | "outline";
  accent?: Accent;
  className?: string;
}

export function Badge({
  children,
  variant = "filled",
  accent = "purple",
  className = "",
}: BadgeProps) {
  const variantClasses =
    variant === "filled"
      ? filledStyles[accent]
      : `bg-transparent border ${outlineStyles[accent]}`;

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
