"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/data/content";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/i18n/provider";

const badgeAccents = ["purple", "coral", "teal", "yellow"] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple/10 blur-[120px]" />
        <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-accent-coral/8 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-accent-teal/6 blur-[90px]" />
      </div>

      {/* Floating decorative circles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[20%] h-16 w-16 rounded-full bg-accent-purple/20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[35%] h-12 w-12 rounded-full bg-accent-coral/20 blur-lg"
        />
        <motion.div
          animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[25%] bottom-[25%] h-20 w-20 rounded-full bg-accent-teal/15 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -6, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[20%] bottom-[15%] h-10 w-10 rounded-full bg-accent-yellow/15 blur-lg"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[40%] top-[15%] h-8 w-8 rounded-full bg-accent-purple/15 blur-md"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="mb-5 text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl"
        >
          {t.hero.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mb-8 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg"
        >
          {t.hero.subheadline}
        </motion.p>

        {/* What I deliver — offer bullets */}
        <motion.ul
          variants={itemVariants}
          className="mb-8 grid gap-2 text-left sm:grid-cols-2"
        >
          {t.hero.offers.map((offer) => (
            <li
              key={offer}
              className="flex items-start gap-2 text-sm text-text-muted sm:text-base"
            >
              <svg
                className="mt-1 h-4 w-4 shrink-0 text-accent-teal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {offer}
            </li>
          ))}
        </motion.ul>

        {/* Badges */}
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-wrap justify-center gap-3"
        >
          {t.hero.badges.map((badge, i) => (
            <Badge
              key={badge}
              accent={badgeAccents[i % badgeAccents.length]}
              variant="filled"
            >
              {badge}
            </Badge>
          ))}
        </motion.div>

        {/* Credibility line */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-xl text-xs leading-relaxed text-text-muted/70 italic"
        >
          {t.hero.credibility}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={"#contact"}
            className="glow-purple inline-flex items-center gap-2 rounded-full bg-accent-purple px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
          >
            {t.hero.ctaPrimary}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
          <a
            href={"#projects"}
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5"
        >
          {/* LinkedIn */}
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted transition-colors duration-200 hover:text-accent-purple"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted transition-colors duration-200 hover:text-accent-purple"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* Contact */}
          <a
            href="#contact"
            aria-label="Contact"
            className="text-text-muted transition-colors duration-200 hover:text-accent-purple"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
