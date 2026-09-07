"use client";

import { useI18n } from "@/i18n/provider";
import Contact from "@/components/Contact";
import { SectionShell } from "./Shell";

export function ContactV2() {
  const { t } = useI18n();

  return (
    <SectionShell id="contact" kicker={t.v2.contact.kicker}>
      <h2
        id="contact-heading"
        className="text-2xl font-semibold leading-tight text-v2-text sm:text-3xl"
      >
        {t.v2.contact.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-v2-muted">
        {t.v2.contact.body}
      </p>
      <div className="mt-8">
        <Contact />
      </div>
    </SectionShell>
  );
}
