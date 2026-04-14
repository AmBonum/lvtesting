"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/content";
import { useI18n } from "@/i18n/provider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="relative z-50">
          <span className="gradient-text text-2xl font-bold tracking-tight">
            {siteConfig.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
        >
          <div className="flex w-6 flex-col items-end gap-1.5">
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 6, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              transition={{ duration: 0.25 }}
              className="block h-0.5 rounded-full bg-text-primary"
              style={{ originX: 0.5 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-4 rounded-full bg-text-primary"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -6, width: 24 }
                  : { rotate: 0, y: 0, width: 18 }
              }
              transition={{ duration: 0.25 }}
              className="block h-0.5 rounded-full bg-text-primary"
              style={{ originX: 0.5 }}
            />
          </div>
        </button>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed inset-0 z-40 flex min-h-svh flex-col items-center justify-center gap-8 bg-[rgba(10,10,20,0.92)] backdrop-blur-2xl md:hidden"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  className="text-2xl font-semibold text-text-primary transition-colors hover:text-accent-purple"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * navLinks.length, duration: 0.3 }}
              >
                <LanguageSwitcher dropUp />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
