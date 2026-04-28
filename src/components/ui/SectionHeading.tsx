interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
  size = "md",
}: SectionHeadingProps) {
  const sizeClass = {
    sm: "text-xl font-semibold tracking-tight sm:text-2xl",
    md: "text-3xl font-bold tracking-tight sm:text-4xl",
    lg: "text-5xl font-bold tracking-tight sm:text-6xl",
  }[size];

  return (
    <div className={`text-center ${className}`}>
      <h2 className={`gradient-text ${sizeClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 inline-flex items-center gap-2 text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
