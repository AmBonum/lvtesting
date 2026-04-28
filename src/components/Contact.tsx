"use client";

import { useRef, useState, type FormEvent } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { siteConfig } from "@/data/content";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useI18n } from "@/i18n/provider";

const socials = [
  {
    label: "LinkedIn",
    href: siteConfig.socials.linkedin,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  // {
  //   label: "GitHub",
  //   href: siteConfig.socials.github,
  //   icon: (
  //     <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
  //       <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  //     </svg>
  //   ),
  // },
];

const WEB3FORMS_KEY = "97715316-29bc-4431-b889-b48f1c2d04be";
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

export default function Contact() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDetailed, setShowDetailed] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check — bots fill hidden fields
    if (formData.get("botcheck")) {
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setStatus("error");
      return;
    }

    formData.set("h-captcha-response", captchaToken);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setSelectedServices([]);
        setShowDetailed(false);
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="overflow-hidden py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeading
            title={t.contact.heading}
            subtitle={t.contact.subtitle}
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid gap-8">
          {/* Intro */}
          <ScrollReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
              {t.contact.intro}
            </p>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={0.2}>
            <GlassCard hover={false} className="glow-purple p-4 sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent-teal)]/20">
                    <svg className="h-8 w-8 text-[var(--color-accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {t.contact.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 text-sm font-medium text-[var(--color-accent-purple)] transition-colors hover:text-[var(--color-accent-purple)]/80"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Web3Forms config */}
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value="New inquiry from lvtesting.eu" />
                  <input type="hidden" name="from_name" value="LV Testing Contact Form" />

                  {/* Honeypot — hidden from users, catches bots */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Email row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-text-muted)]">
                        {t.contact.nameLabel}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder={t.contact.namePlaceholder}
                        className="w-full rounded-xl border border-[var(--color-border-glass)] bg-white/5 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 outline-none transition-colors focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)]"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-text-muted)]">
                        {t.contact.emailLabel}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full rounded-xl border border-[var(--color-border-glass)] bg-white/5 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 outline-none transition-colors focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)]"
                      />
                    </div>
                  </div>

                  {/* Service — two-tier select */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                      {t.contact.serviceLabel}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {t.contact.serviceOptions.map((service) => {
                        const isExactly = service === t.contact.iKnowExactly;
                        const isSelected = isExactly
                          ? showDetailed
                          : selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              if (isExactly) {
                                setShowDetailed((prev) => !prev);
                                if (showDetailed) {
                                  // Collapse: clear detailed selections
                                  setSelectedServices((prev) =>
                                    prev.filter(
                                      (s) => !t.contact.detailedServiceOptions.includes(s)
                                    )
                                  );
                                }
                              } else {
                                setSelectedServices((prev) =>
                                  isSelected
                                    ? prev.filter((s) => s !== service)
                                    : [...prev, service]
                                );
                              }
                            }}
                            aria-pressed={isSelected}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                              isSelected
                                ? "border-[var(--color-accent-purple)] bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]"
                                : "border-[var(--color-border-glass)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]/50 hover:text-[var(--color-text-primary)]"
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed options — shown when "I know exactly" is selected */}
                    {showDetailed && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {t.contact.detailedServiceOptions.map((service) => {
                          const isSelected = selectedServices.includes(service);
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() =>
                                setSelectedServices((prev) =>
                                  isSelected
                                    ? prev.filter((s) => s !== service)
                                    : [...prev, service]
                                )
                              }
                              aria-pressed={isSelected}
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                                isSelected
                                  ? "border-[var(--color-accent-teal)] bg-[var(--color-accent-teal)]/20 text-[var(--color-accent-teal)]"
                                  : "border-[var(--color-border-glass)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)]/50 hover:text-[var(--color-text-primary)]"
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <input type="hidden" name="service" value={selectedServices.join(", ")} />
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-[var(--color-text-muted)]">
                      {t.contact.budgetLabel}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-[var(--color-border-glass)] bg-white/5 px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)]"
                    >
                      <option value="" disabled className="bg-[#0F0F1A]">
                        {t.contact.budgetPlaceholder}
                      </option>
                      {t.contact.budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0F0F1A]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-text-muted)]">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full resize-none rounded-xl border border-[var(--color-border-glass)] bg-white/5 px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 outline-none transition-colors focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)]"
                    />
                  </div>

                  {/* hCaptcha */}
                  <div className="flex justify-center overflow-hidden">
                    <HCaptcha
                      key={locale}
                      sitekey={HCAPTCHA_SITEKEY}
                      reCaptchaCompat={false}
                      theme="dark"
                      languageOverride={locale}
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken(null)}
                      ref={captchaRef}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !captchaToken}
                    className="glow-purple mt-2 w-full rounded-xl bg-[var(--color-accent-purple)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === "sending" ? t.contact.sending : t.contact.send}
                  </button>

                  <div aria-live="polite">
                    {status === "error" && (
                      <p className="text-center text-sm text-[var(--color-accent-coral)]">
                        {t.contact.errorMessage}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </GlassCard>
          </ScrollReveal>

          {/* Socials */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col items-center gap-4 pt-4">
              <p className="text-sm text-[var(--color-text-muted)]">{t.contact.orFindMe}</p>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-glass)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent-purple)] hover:text-[var(--color-accent-purple)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
