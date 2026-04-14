"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  getStoredConsent,
  saveConsent,
  getDefaultPreferences,
  type ConsentPreferences,
} from "@/lib/consent";
import { initGA4, teardownGA4, updateMarketingConsent } from "@/lib/analytics";
import { useI18n } from "@/i18n/provider";

interface ConsentContextValue {
  showBanner: boolean;
  showSettings: boolean;
  preferences: ConsentPreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (prefs: Omit<ConsentPreferences, "necessary">) => void;
  openSettings: () => void;
  closeSettings: () => void;
  resetConsent: () => void;
}

const ConsentContext = createContext<ConsentContextValue>({
  showBanner: false,
  showSettings: false,
  preferences: getDefaultPreferences(),
  acceptAll: () => {},
  rejectAll: () => {},
  saveCustom: () => {},
  openSettings: () => {},
  closeSettings: () => {},
  resetConsent: () => {},
});

export function ConsentProvider({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    getDefaultPreferences()
  );

  // On mount: check stored consent
  useEffect(() => {
    const record = getStoredConsent();
    if (record) {
      setPreferences(record.preferences);
      if (record.preferences.analytics) {
        initGA4();
      }
      if (record.preferences.marketing) {
        updateMarketingConsent(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const applyPreferences = useCallback(
    (prefs: ConsentPreferences) => {
      setPreferences(prefs);
      saveConsent(prefs, locale);

      if (prefs.analytics) {
        initGA4();
      } else {
        teardownGA4();
      }
      updateMarketingConsent(prefs.marketing);
    },
    [locale]
  );

  const acceptAll = useCallback(() => {
    applyPreferences({ necessary: true, analytics: true, marketing: true });
    setShowBanner(false);
    setShowSettings(false);
  }, [applyPreferences]);

  const rejectAll = useCallback(() => {
    applyPreferences({ necessary: true, analytics: false, marketing: false });
    setShowBanner(false);
    setShowSettings(false);
  }, [applyPreferences]);

  const saveCustom = useCallback(
    (prefs: Omit<ConsentPreferences, "necessary">) => {
      applyPreferences({ necessary: true, ...prefs });
      setShowBanner(false);
      setShowSettings(false);
    },
    [applyPreferences]
  );

  const openSettings = useCallback(() => {
    setShowBanner(true);
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  const resetConsent = useCallback(() => {
    setShowBanner(true);
    setShowSettings(true);
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        showBanner,
        showSettings,
        preferences,
        acceptAll,
        rejectAll,
        saveCustom,
        openSettings,
        closeSettings,
        resetConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
