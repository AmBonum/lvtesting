export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_VERSION = "1.0";

export interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentRecord {
  preferences: ConsentPreferences;
  timestamp: string;
  version: string;
  locale: string;
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function getStoredConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const record: ConsentRecord = JSON.parse(raw);
    if (record.version !== CONSENT_VERSION) return null;
    return record;
  } catch {
    return null;
  }
}

export function saveConsent(
  preferences: ConsentPreferences,
  locale: string
): ConsentRecord {
  const record: ConsentRecord = {
    preferences,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
    locale,
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}

export function clearConsent(): void {
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

export function hasValidConsent(): boolean {
  return getStoredConsent() !== null;
}

export function hasConsentFor(category: "analytics" | "marketing"): boolean {
  const record = getStoredConsent();
  return record?.preferences[category] ?? false;
}

export function getDefaultPreferences(): ConsentPreferences {
  return { ...DEFAULT_PREFERENCES };
}
