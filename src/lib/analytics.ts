const GA_MEASUREMENT_ID = "G-1JV7VZFWW0";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

export function initGA4(): void {
  if (isInitialized) return;
  if (typeof window === "undefined") return;

  // Set default consent state (denied until explicitly granted)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer.push(args);
  };

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  // Inject gtag script
  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    cookie_flags: "SameSite=Lax;Secure",
  });

  // Update consent to granted
  gtag("consent", "update", {
    analytics_storage: "granted",
  });

  isInitialized = true;
}

export function teardownGA4(): void {
  if (typeof window === "undefined") return;

  // Remove script
  const script = document.getElementById("ga4-script");
  if (script) script.remove();

  // Clear GA cookies
  const cookies = document.cookie.split(";");
  const domain = window.location.hostname;
  for (const cookie of cookies) {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga") || name === "_gid" || name === "_gat") {
      const expiry = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = `${name}=;${expiry};path=/;domain=${domain}`;
      document.cookie = `${name}=;${expiry};path=/;domain=.${domain}`;
      document.cookie = `${name}=;${expiry};path=/`;
    }
  }

  // Clear dataLayer
  window.dataLayer = [];
  isInitialized = false;
}

export function updateMarketingConsent(granted: boolean): void {
  if (typeof window === "undefined" || !isInitialized) return;
  gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}

export function trackPageView(path: string, title: string): void {
  if (!isInitialized) return;
  gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
): void {
  if (!isInitialized) return;
  gtag("event", eventName, params);
}

export function trackScrollDepth(depth: number): void {
  if (!isInitialized) return;
  gtag("event", "scroll", { percent_scrolled: depth });
}

export function trackSectionView(sectionId: string): void {
  if (!isInitialized) return;
  gtag("event", "section_view", { section_id: sectionId });
}

export function trackClick(elementId: string, elementText: string): void {
  if (!isInitialized) return;
  gtag("event", "click", {
    element_id: elementId,
    element_text: elementText,
  });
}

export function isGA4Initialized(): boolean {
  return isInitialized;
}
