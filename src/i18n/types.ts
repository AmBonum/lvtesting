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

  // Footer
  footer: {
    rights: string;
  };
}
