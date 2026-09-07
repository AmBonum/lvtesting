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
        className="text-2xl font-semibold leading-tight text-[var(--v2-text)] sm:text-3xl"
      >
        {t.v2.contact.heading}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-[var(--v2-muted)]">
        {t.v2.contact.body}
      </p>
      {/* `-mx-4` below 1024px cancels the 1rem horizontal padding
          `.v2-text-panel` adds there (Task 8, Finding 1). v1's <Contact/>
          contains an hCaptcha widget with a fixed ~302px width which, plus
          the card's own `p-4`, gives that block a 336px minimum — wider
          than the 295px the padded panel leaves at a 375px viewport.
          Measured: the card's right edge sat 17px past the viewport and was
          clipped by `overflow-x: hidden`; without the panel's padding it
          sits 1px past, exactly as it does on v1's own page. The panel's
          vertical padding is kept, so only the inset the card cannot afford
          is given back. Above 1024px the panel has no padding at all and
          this class does nothing. */}
      <div className="mt-8 max-lg:-mx-4">
        <Contact />
      </div>
    </SectionShell>
  );
}
