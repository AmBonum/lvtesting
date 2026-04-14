export type Locale = "en" | "sk" | "cs" | "es" | "de";

export interface Translations {
  // Navigation
  nav: {
    about: string;
    projects: string;
    skills: string;
    experience: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
  };

  // Hero
  hero: {
    headline: string;
    subheadline: string;
    offers: string[];
    credibility: string;
    badges: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };

  // About
  about: {
    heading: string;
    subtitle: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };

  // Projects
  projects: {
    heading: string;
    subtitle: string;
    badgeQA: string;
    badgeDev: string;
    items: {
      title: string;
      subtitle: string;
      description: string;
      highlights: string[];
    }[];
  };

  // Skills
  skills: {
    heading: string;
    subtitle: string;
    categories: string[];
  };

  // Experience
  experience: {
    heading: string;
    subtitle: string;
    items: {
      role: string;
      company: string;
      period: string;
      description: string;
    }[];
  };

  // Companies
  companies: {
    heading: string;
  };

  // Contact
  contact: {
    heading: string;
    subtitle: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    serviceLabel: string;
    serviceHint: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    budgetOptions: string[];
    messageLabel: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
    errorMessage: string;
    orFindMe: string;
    serviceOptions: string[];
    iKnowExactly: string;
    detailedServiceOptions: string[];
  };

  // Consent
  consent: {
    banner: {
      title: string;
      description: string;
      privacyLink: string;
      acceptAll: string;
      rejectAll: string;
      customize: string;
    };
    settings: {
      title: string;
      description: string;
      necessary: { title: string; description: string };
      analytics: { title: string; description: string };
      marketing: { title: string; description: string };
      required: string;
      savePreferences: string;
      acceptAll: string;
      rejectAll: string;
    };
    footerLinks: {
      cookieSettings: string;
      privacyPolicy: string;
    };
  };

  // Privacy
  privacy: {
    title: string;
    lastUpdated: string;
    backHome: string;
    sections: {
      controller: { heading: string; content: string[] };
      dataCollection: { heading: string; content: string[] };
      cookies: {
        heading: string;
        intro: string;
        table: {
          name: string;
          provider: string;
          purpose: string;
          duration: string;
        };
        necessary: { name: string; description: string };
        analytics: { name: string; description: string };
        marketing: { name: string; description: string };
      };
      usage: { heading: string; content: string[] };
      rights: { heading: string; content: string[] };
      contact: { heading: string; content: string[] };
      authority: { heading: string; content: string[] };
      changes: { heading: string; content: string[] };
    };
  };

  // Errors
  errors: {
    notFound: {
      title: string;
      description: string;
      backHome: string;
    };
    serverError: {
      title: string;
      description: string;
      tryAgain: string;
      backHome: string;
    };
    criticalError: {
      title: string;
      description: string;
      reload: string;
      backHome: string;
    };
  };

  // Footer
  footer: {
    rights: string;
  };
}
