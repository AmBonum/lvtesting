"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/provider";
import { ConsentProvider } from "@/lib/ConsentProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <ConsentProvider>{children}</ConsentProvider>
    </I18nProvider>
  );
}
