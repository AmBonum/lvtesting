import type { Translations } from "./types";

export const de: Translations = {
  nav: {
    about: "Über mich",
    projects: "Projekte",
    skills: "Fähigkeiten",
    experience: "Erfahrung",
    contact: "Kontakt",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    skipToContent: "Zum Inhalt springen",
  },

  hero: {
    headline:
      "Ich entwickle und teste zuverlässige Web- & Mobile-Anwendungen — von der Idee bis zur Produktion",
    subheadline:
      "Full-Stack-Entwicklung + QA in einem Workflow. Ich designe, baue und validiere Systeme, damit sie unter realen Bedingungen tatsächlich funktionieren.",
    offers: [
      "Webanwendungen & Admin-Panels",
      "Mobile Apps (Flutter — iOS & Android)",
      "Backend-APIs & Systemarchitektur",
      "UX/UI-Design (Figma)",
      "Automatisiertes Testing & QA (Playwright)",
    ],
    credibility:
      "Erfahrung mit komplexen Systemen, darunter interne Unternehmenstools und vollständige Mobilitätsplattformen (Web + Mobil + Backend).",
    badges: ["Web Apps", "Mobile Apps", "QA Automation", "UX/UI Design"],
    ctaPrimary: "Projekt starten",
    ctaSecondary: "Meine Arbeiten",
  },

  about: {
    heading: "Über mich",
    subtitle: "Lerne mich kennen",
    paragraphs: [
      "Ich bin QA Automation Engineer mit über 5 Jahren praktischer Erfahrung in der Bereitstellung hochwertiger Software für Unternehmensplattformen, mobile Apps und Webanwendungen. Mein Weg begann in der professionellen Leichtathletik — wo Disziplin, Präzision und unermüdliche Iteration zur zweiten Natur wurden.",
      "Heute bringe ich diese Denkweise in die Softwarequalität ein. Ich spezialisiere mich auf den Aufbau robuster Testautomatisierungs-Frameworks mit Playwright, die Gestaltung umfassender Teststrategien und die Sicherstellung, dass jedes Release höchsten Standards entspricht.",
      "Nebenbei bin ich ein leidenschaftlicher Full-Stack-Entwickler. Ich baue produktionsreife mobile und Web-Anwendungen — von der Architektur bis zum Deployment. Es ist ein Hobby, das ich ernst nehme, und es gibt mir eine einzigartige Perspektive: Ich teste Software nicht nur, ich verstehe, wie sie gebaut ist.",
      "Über das Engineering hinaus habe ich mehr als 7 Jahre Erfahrung im Grafikdesign mit starkem Fokus auf UX/UI-Design und Figma. Mein Design-Hintergrund umfasst die Erstellung von Werbematerialien, Postern, Plakatwänden und digitalen Inhalten, die Funktionalität effektiv mit Ästhetik verbinden.",
    ],
    stats: [
      { value: "5+", label: "Jahre in QA" },
      { value: "100+", label: "Test-Suites" },
      { value: "6", label: "Unternehmen" },
      { value: "∞", label: "Bugs behoben" },
    ],
  },

  projects: {
    heading: "Projekte",
    subtitle: "Woran ich gearbeitet habe",
    badgeQA: "QA",
    badgeDev: "Dev",
    items: [
      {
        title: "QA Automatisierung @ Caterpillar",
        subtitle: "Enterprise-Plattform-Tests · über Moxymind",
        description:
          "Beitrag zur Testautomatisierung einer internen Plattform für dynamische Inspektionsformulare und Arbeitsabläufe. Aufbau von Playwright-Test-Suites, Erstellen von Testplänen und Testfällen und Verbesserung von QA-Prozessen mit modernen Tools.",
        highlights: [
          "Automatisierte Tests mit Playwright",
          "Testpläne & Testfall-Design",
          "CI/CD-Integration über Azure DevOps",
          "KI-unterstützte Entwicklung mit Copilot",
        ],
      },
      {
        title: "mobiX Plattform",
        subtitle: "End-to-End Mobilitäts-Ökosystem",
        description:
          "Übernahme einer bestehenden Mobilitätsplattform und Anpassung an Kundenanforderungen. Neugestaltung der mobilen Apps, Hinzufügen neuer Funktionalität und Behebung bestehender Features im gesamten Stack — Backend-API, Admin-Webplattform, Fahrgast- und Fahrer-Apps.",
        highlights: [
          "Echtzeit-Kommunikation (WebSockets)",
          "Zahlungsintegrationen (Stripe, Google/Apple Pay)",
          "Karten, Geolokalisierung & Fahrtlogik",
          "Vollständiger Mobile-App-Lebenszyklus",
          "Produktionsüberwachung & Debugging",
        ],
      },
    ],
  },

  skills: {
    heading: "Fähigkeiten & Tools",
    subtitle: "Mein technisches Werkzeugset",
    categories: [
      "Testautomatisierung",
      "Manuelles Testen",
      "Mobile Entwicklung",
      "Webentwicklung",
      "DevOps & Tools",
      "Bug-Tracking & QA",
    ],
  },

  experience: {
    heading: "Erfahrung",
    subtitle: "Mein beruflicher Werdegang",
    items: [
      {
        role: "QA Automation Engineer",
        company: "Caterpillar Slovakia · über Moxymind",
        period: "Aug 2024 – Gegenwart",
        description:
          "Aufbau automatisierter Tests für eine interne Plattform zur Verarbeitung dynamischer Inspektionsformulare und Arbeitsabläufe. Beitrag zu QA-Prozessverbesserungen mit modernen Tools.",
      },
      {
        role: "Flutter Engineer & Designer",
        company: "Freelance",
        period: "2024 – Gegenwart",
        description:
          "Gestaltung und Entwicklung produktionsreifer mobiler Anwendungen. Vollständiger Lebenszyklus — von Figma-Prototypen bis zum App-Store-Deployment.",
      },
      {
        role: "Bolt-Fahrer & persönliche Pause",
        company: "Selbstständig",
        period: "Aug 2022 – Dez 2023",
        description:
          "Bewusste Pause von der IT, um aufzutanken und eine andere Perspektive zu gewinnen. Arbeitete als Bolt-Fahrer und erkundete neue Interessen und Karriereziele.",
      },
      {
        role: "QA Engineer",
        company: "GlobalLogic Slovakia",
        period: "Jan 2022 – Jul 2022",
        description:
          "Automatisierte Tests für medizinische Webanwendungen. Sicherstellung von Compliance und Zuverlässigkeit in einem hochregulierten Bereich.",
      },
      {
        role: "QA Engineer",
        company: "Ness KE",
        period: "Jun 2019 – Dez 2021",
        description:
          "Manuelle und automatisierte Tests für Telematik-Management-Anwendungen. Aufbau und Pflege von Test-Suites für Mobile und Web.",
      },
      {
        role: "Grafikdesigner",
        company: "IAESTE Slovakia",
        period: "Jul 2019 – Feb 2021",
        description:
          "Erstellung von Designs für Social Media und Printmaterialien. Entwicklung von Werbeinhalten, Postern und digitalen Grafiken, die Funktionalität mit Ästhetik verbinden.",
      },
      {
        role: "Trainee Mobile-Entwickler",
        company: "GlobalLogic Slovakia",
        period: "Mär 2019 – Jun 2019",
        description:
          "Entwicklung einer PoC-Mobilanwendung 'Bethesda' für die Altenpflege in Pflegeheimen — Medikamentenorganisation, Blutdrucküberwachung und tägliche Pflegeverwaltung.",
      },
    ],
  },

  companies: {
    heading: "Vertraut von",
  },

  contact: {
    heading: "Kontakt aufnehmen",
    subtitle: "Bereit zusammenzuarbeiten?",
    intro:
      "Ob du einen QA-Experten brauchst, um deine Releases abzusichern, einen Entwickler, um deine Idee umzusetzen, oder einen Designer, um dein Produkt zu verfeinern — lass uns reden.",
    nameLabel: "Name",
    namePlaceholder: "Dein Name",
    emailLabel: "E-Mail",
    emailPlaceholder: "deine@email.com",
    serviceLabel: "Ich interessiere mich für",
    serviceHint: "(alle zutreffenden auswählen)",
    budgetLabel: "Budgetrahmen",
    budgetPlaceholder: "Bereich auswählen",
    budgetOptions: [
      "< 1.000 €",
      "1.000 – 5.000 €",
      "5.000 – 15.000 €",
      "15.000+ €",
      "Lass uns besprechen",
    ],
    messageLabel: "Nachricht",
    messagePlaceholder: "Erzähl mir von deinem Projekt...",
    send: "Nachricht senden",
    sending: "Wird gesendet...",
    successTitle: "Nachricht gesendet!",
    successMessage: "Ich melde mich so schnell wie möglich.",
    sendAnother: "Weitere Nachricht senden",
    errorMessage:
      "Etwas ist schiefgelaufen. Bitte versuche es erneut oder kontaktiere mich über LinkedIn.",
    orFindMe: "Oder finde mich auf",
    serviceOptions: [
      "Ich möchte eine Mobile App",
      "Ich möchte eine Web App",
      "Ich möchte Web & Mobile App",
      "Ich weiß nicht, was ich brauche",
      "Ich weiß genau, was ich will",
    ],
    iKnowExactly: "Ich weiß genau, was ich will",
    detailedServiceOptions: [
      "QA / Testautomatisierung",
      "Mobile App-Entwicklung",
      "Webentwicklung",
      "Backend / API-Entwicklung",
      "UX/UI-Design",
      "Beratung",
    ],
  },

  footer: {
    rights: "Alle Rechte vorbehalten.",
  },
};
