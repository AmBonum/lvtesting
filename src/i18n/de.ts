import type { Translations } from "./types";

export const de: Translations = {
  nav: {
    about: "Über mich",
    projects: "Projekte",
    skills: "Fähigkeiten",
    experience: "Erfahrung",
    contact: "Kontakt",
    portfolio: "Portfolio",
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

  consent: {
    banner: {
      title: "Ihre Privatsphäre ist uns wichtig",
      description: "Wir verwenden Cookies, um den Website-Traffic zu analysieren und Ihr Erlebnis zu optimieren. Sie können wählen, welche Cookies Sie zulassen möchten.",
      privacyLink: "Datenschutzerklärung",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Alle ablehnen",
      customize: "Anpassen",
    },
    settings: {
      title: "Cookie-Einstellungen",
      description: "Wählen Sie, welche Cookies Sie zulassen möchten. Sie können diese Einstellungen jederzeit über die Fußzeile ändern.",
      necessary: {
        title: "Notwendig",
        description: "Essenziell für die Funktion der Website. Speichert Ihre Spracheinstellung. Es werden keine personenbezogenen Daten erhoben.",
      },
      analytics: {
        title: "Analyse",
        description: "Helfen uns zu verstehen, wie Besucher unsere Website nutzen. Wir verwenden Google Analytics mit anonymisierten IP-Adressen.",
      },
      marketing: {
        title: "Marketing",
        description: "Werden verwendet, um relevante Werbung anzuzeigen und die Wirksamkeit von Kampagnen zu messen. Derzeit nicht in Verwendung.",
      },
      required: "Erforderlich",
      savePreferences: "Einstellungen speichern",
      acceptAll: "Alle akzeptieren",
      rejectAll: "Alle ablehnen",
    },
    footerLinks: {
      cookieSettings: "Cookie-Einstellungen",
      privacyPolicy: "Datenschutzerklärung",
    },
  },

  privacy: {
    title: "Datenschutzerklärung",
    lastUpdated: "Zuletzt aktualisiert: 14. April 2026",
    backHome: "Zurück zur Startseite",
    sections: {
      controller: {
        heading: "Verantwortlicher",
        content: [
          "Lubomir Volcko (\"wir\", \"uns\", \"unser\")",
          "Website: https://lvtesting.eu",
          "E-Mail: segnities@gmail.com",
          "Standort: Slowakei, Europäische Union",
        ],
      },
      dataCollection: {
        heading: "Welche Daten wir erheben und warum",
        content: [
          "Wir erheben Daten, um Ihr Erlebnis auf unserer Website zu verbessern und zu verstehen, wie Besucher mit unseren Inhalten interagieren.",
          "Spracheinstellung — wird lokal in Ihrem Browser (localStorage) gespeichert, um Ihre gewählte Sprache zu merken. Dies ist eine notwendige Funktion und erfordert keine Einwilligung.",
          "Analysedaten — werden über Google Analytics 4 (GA4) erst nach Ihrer ausdrücklichen Einwilligung erhoben. Dazu gehören: besuchte Seiten, Verweildauer, Scrolltiefe, angesehene Abschnitte, Klicks auf wichtige Elemente, ungefährer Standort (Länderebene aus anonymisierter IP), Gerätetyp und Browser. IP-Adressen werden vor der Verarbeitung anonymisiert.",
          "Marketing-Daten — werden derzeit nicht erhoben. Diese Kategorie dient als Platzhalter für zukünftige Werbeintegrationen (z. B. Facebook Pixel, Google Ads). Marketing-Cookies werden erst nach Ihrer ausdrücklichen Einwilligung aktiviert.",
        ],
      },
      cookies: {
        heading: "Von uns verwendete Cookies",
        intro: "Nachfolgend finden Sie eine detaillierte Auflistung der auf dieser Website verwendeten Cookies:",
        table: {
          name: "Cookie-Name",
          provider: "Anbieter",
          purpose: "Zweck",
          duration: "Speicherdauer",
        },
        necessary: {
          name: "locale (localStorage)",
          description: "Speichert Ihre Spracheinstellung. Kein Ablaufdatum — bleibt bestehen, bis Sie die Browserdaten löschen.",
        },
        analytics: {
          name: "_ga, _ga_*, _gid",
          description: "Google Analytics 4 — erfasst anonyme Nutzungsdaten. _ga läuft nach 2 Jahren ab, _gid nach 24 Stunden. Wird erst nach Einwilligung gesetzt.",
        },
        marketing: {
          name: "Derzeit keine",
          description: "Es werden derzeit keine Marketing-Cookies verwendet. Dieser Abschnitt wird aktualisiert, sobald Marketing-Tools hinzugefügt werden.",
        },
      },
      usage: {
        heading: "Wie wir Ihre Daten verwenden",
        content: [
          "Analysedaten werden ausschließlich verwendet, um zu verstehen, wie Besucher mit unserer Website interagieren, und um deren Inhalte und Nutzererlebnis zu verbessern.",
          "Wir verkaufen, vermieten oder teilen Ihre personenbezogenen Daten nicht mit Dritten — außer mit Google Analytics (das Daten gemäß seiner eigenen Datenschutzerklärung verarbeitet).",
          "Alle Analysedaten werden mit anonymisierten IP-Adressen erhoben, sodass eine Identifizierung einzelner Nutzer nicht möglich ist.",
        ],
      },
      rights: {
        heading: "Ihre Rechte gemäß der DSGVO",
        content: [
          "Gemäß der Datenschutz-Grundverordnung (EU 2016/679) und dem slowakischen Gesetz 18/2018 Z.z. stehen Ihnen folgende Rechte zu:",
          "Auskunftsrecht — Sie können eine Kopie der über Sie gespeicherten Daten anfordern.",
          "Recht auf Berichtigung — Sie können die Korrektur unrichtiger Daten verlangen.",
          "Recht auf Löschung — Sie können die Löschung Ihrer Daten verlangen (\"Recht auf Vergessenwerden\").",
          "Recht auf Einschränkung der Verarbeitung — Sie können verlangen, dass wir die Nutzung Ihrer Daten einschränken.",
          "Recht auf Datenübertragbarkeit — Sie können Ihre Daten in einem maschinenlesbaren Format anfordern.",
          "Widerspruchsrecht — Sie können der Verarbeitung auf Grundlage berechtigter Interessen widersprechen.",
          "Recht auf Widerruf der Einwilligung — Sie können Ihre Cookie-Einwilligung jederzeit über den Link \"Cookie-Einstellungen\" in der Fußzeile widerrufen. Dies berührt nicht die Rechtmäßigkeit der Verarbeitung vor dem Widerruf.",
        ],
      },
      contact: {
        heading: "So üben Sie Ihre Rechte aus",
        content: [
          "Um eines dieser Rechte auszuüben, kontaktieren Sie uns bitte unter: segnities@gmail.com",
          "Wir werden Ihre Anfrage innerhalb von 30 Tagen beantworten, wie es die DSGVO vorschreibt.",
        ],
      },
      authority: {
        heading: "Aufsichtsbehörde",
        content: [
          "Wenn Sie der Ansicht sind, dass Ihre Datenschutzrechte verletzt wurden, haben Sie das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen:",
          "Úrad na ochranu osobných údajov Slovenskej republiky (Amt zum Schutz personenbezogener Daten der Slowakischen Republik)",
          "Hraničná 12, 820 07 Bratislava 27, Slowakei",
          "Website: https://dataprotection.gov.sk",
          "Telefon: +421 2 3231 3214",
        ],
      },
      changes: {
        heading: "Änderungen dieser Datenschutzerklärung",
        content: [
          "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Bei wesentlichen Änderungen wird das Einwilligungsbanner erneut angezeigt, damit Sie Ihre Einstellungen überprüfen und aktualisieren können.",
          "Das Datum \"Zuletzt aktualisiert\" oben auf dieser Seite gibt die letzten Änderungen wieder.",
        ],
      },
    },
  },

  errors: {
    notFound: {
      title: "Seite nicht gefunden",
      description: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
      backHome: "Zurück zur Startseite",
    },
    serverError: {
      title: "Etwas ist schiefgelaufen",
      description: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.",
      tryAgain: "Erneut versuchen",
      backHome: "Zurück zur Startseite",
    },
    criticalError: {
      title: "Kritischer Fehler",
      description: "Die Anwendung hat einen kritischen Fehler festgestellt. Bitte lade die Seite neu.",
      reload: "Neu laden",
      backHome: "Zurück zur Startseite",
    },
  },

  portfolio: {
    title: "Portfolio — LV Testing",
    seoDescription:
      "Portfolio von Lubomir Volcko — Full-Stack-Entwickler und QA-Ingenieur. Webanwendungen, mobile Apps und Grafikarbeiten, erstellt mit React, TypeScript, Flutter und mehr.",
    copyright:
      "Alle Projekte und Designs sind geistiges Eigentum von Lubomir Volcko. Alle Rechte vorbehalten.",
    heading: "Portfolio",
    subtitle: "Eine Auswahl meiner Arbeiten",
    backHome: "Zurück zur Startseite",
    webProjects: {
      heading: "Web-Projekte",
      subtitle: "Full-Stack-Anwendungen von Grund auf gebaut",
    },
    graphicDesigns: {
      heading: "Grafikdesign",
      subtitle: "Visuelles Design und Branding",
      comingSoon: "Arbeitsbeispiele bald verfügbar",
    },
    subenai: {
      tagline:
        "subenai ist eine Full-Stack-Lern-Webanwendung, die auf React, TypeScript, Supabase und Cloudflare basiert und Nutzern beibringt, Online-Betrug durch interaktive Tests, Lernmodule und messbare Ergebnisse zu erkennen.",
      description:
        "Eine Webanwendung für digitale Sicherheit. Hilft Nutzern, Online-Bedrohungen wie Phishing, betrügerische SMS, gefälschte Online-Shops und Social Engineering durch interaktive Tests und Lernmodule zu erkennen.",
      tech:
        "React 19 · TypeScript · TanStack Start/Router/Query · Vite · Tailwind CSS v4 · Radix UI · Supabase · Cloudflare Pages · Stripe · Vitest",
      visitSite: "Website besuchen",
      features: [
        "Interaktive Betrugserkennungs-Quizze",
        "Thematische und branchenspezifische Test-Pakete",
        "Lernseiten zu spezifischen Angriffstypen",
        "Detaillierte Antwortauswertung und Ergebnis-Scoring",
        "Ergebnis-Sharing und Social-Media-Bildgenerierung",
        "Sponsor-/Unterstützungsbereich mit Stripe-Zahlungen",
        "Cookie-Consent und datenschutzkonforme Analytics",
        "SEO-Grundlage mit Sitemap und Meta-Tags",
      ],
      year: "2025",
    },
    ongoingLabel: "Laufend",
    mobix: {
      tagline:
        "Mobix ist eine produktionsreife Full-Stack-Taxi-Plattform auf Node.js, GraphQL, Flutter und Firebase, die Fahrgäste und Fahrer in Echtzeit über automatischen Dispatch, GPS-Tracking und Multi-Channel-Zahlungen verbindet.",
      description:
        "Eine vollständige Taxi-Plattform für den slowakischen Markt, bestehend aus drei verbundenen Systemen: einer Fahrgast-App, einer Fahrer-App und einem Backend mit Admin-Panel. Deckt den gesamten Fahrt-Lebenszyklus ab — von der Buchung über Echtzeit-GPS-Tracking bis zur Zahlung und Bewertung.",
      visitSite: "Privates Projekt",
      features: [
        "Fahrtbuchung — sofortig und im Voraus geplant",
        "Waterfall Dispatch mit automatischer Fahrerzuweisung und Fallback-Logik",
        "Echtzeit-GPS-Verfolgung über WebSocket + Google Maps",
        "OTP-Telefon-Verifizierung über Twilio (Fahrgäste und Fahrer)",
        "Mehrere Zahlungsmethoden: Bargeld, Karte (Stripe), Google Pay, Paystack, Wallet",
        "Fahrer-Verdienstübersicht — täglich / wöchentlich / monatlich",
        "Firebase-Push-Benachrichtigungen und In-App-Hinweise für beide Nutzertypen",
        "Admin-Panel mit Übersicht über Fahrten, Fahrer, Zahlungen und Analytik",
        "Mehrsprachige Unterstützung (SK, EN und weitere Lokale)",
      ],
      year: "2024",
    },
  },

  footer: {
    rights: "Alle Rechte vorbehalten.",
  },
};
