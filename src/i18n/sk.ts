import type { Translations } from "./types";

export const sk: Translations = {
  nav: {
    about: "O mne",
    projects: "Projekty",
    skills: "Zručnosti",
    experience: "Skúsenosti",
    contact: "Kontakt",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    skipToContent: "Preskočiť na obsah",
  },

  hero: {
    headline:
      "Navrhujem, vyvíjam a testujem spoľahlivé webové a mobilné aplikácie — od nápadu po produkciu",
    subheadline:
      "Full-stack vývoj + QA v jednom. Navrhujem, budujem a validujem systémy tak, aby skutočne fungovali v reálnych podmienkach.",
    offers: [
      "Webové aplikácie a admin panely",
      "Mobilné aplikácie (Flutter — iOS & Android)",
      "Backend API a architektúra systémov",
      "UX/UI dizajn (Figma)",
      "Automatizované testovanie a QA (Playwright)",
    ],
    credibility:
      "Pracoval som na komplexných systémoch vrátane interných podnikových nástrojov a kompletných platforiem pre mobilitu (web + mobil + backend).",
    badges: ["Web Appky", "Mobilné Appky", "QA Automatizácia", "UX/UI Dizajn"],
    ctaPrimary: "Začať projekt",
    ctaSecondary: "Pozrieť si práce",
  },

  about: {
    heading: "O mne",
    subtitle: "Spoznajte ma",
    paragraphs: [
      "Som QA Automation Engineer s viac ako 5-ročnými skúsenosťami v dodávaní kvalitného softvéru naprieč podnikovými platformami, mobilnými aplikáciami a webovými aplikáciami. Moja cesta začala v profesionálnom športe — kde sa disciplína, precíznosť a neúnavné zlepšovanie stali druhou prirodzenosťou.",
      "Dnes prinášam rovnaký prístup k kvalite softvéru. Špecializujem sa na budovanie robustných frameworkov pre testovú automatizáciu s Playwright, navrhovanie komplexných testovacích stratégií a zabezpečenie, že každé vydanie spĺňa najvyššie štandardy.",
      "Popritom som zapálený full-stack vývojár. Tvorím produkčné mobilné a webové aplikácie — od architektúry po nasadenie. Je to hobby, ktoré beriem vážne, a poskytuje mi unikátnu perspektívu: softvér nielen testujem, ale rozumiem tomu, ako je postavený.",
      "Okrem inžinierstva mám viac ako 7 rokov skúseností v grafickom dizajne so silným zameraním na UX/UI dizajn a Figmu. Moje dizajnérske pozadie zahŕňa tvorbu propagačných materiálov, plagátov, bilbordov a digitálneho obsahu, ktorý efektívne kombinuje funkčnosť s estetikou.",
    ],
    stats: [
      { value: "5+", label: "Rokov v QA" },
      { value: "100+", label: "Testových sád" },
      { value: "6", label: "Firiem" },
      { value: "∞", label: "Opravených bugov" },
    ],
  },

  projects: {
    heading: "Projekty",
    subtitle: "Na čom som pracoval",
    badgeQA: "QA",
    badgeDev: "Dev",
    items: [
      {
        title: "QA Automatizácia @ Caterpillar",
        subtitle: "Testovanie podnikovej platformy · cez Moxymind",
        description:
          "Podieľam sa na testovej automatizácii internej platformy spracúvajúcej dynamické inšpekčné formuláre a pracovné postupy. Budujem testovacie sady v Playwright, píšem testovacie plány a prípady a zlepšujem QA procesy modernými nástrojmi.",
        highlights: [
          "Automatizované testovanie s Playwright",
          "Návrh testovacích plánov a prípadov",
          "CI/CD integrácia cez Azure DevOps",
          "AI-asistovaný vývoj s Copilot",
        ],
      },
      {
        title: "Platforma mobiX",
        subtitle: "End-to-End mobilný ekosystém",
        description:
          "Prevzal som existujúcu mobilnú platformu a prispôsobil ju požiadavkám klienta. Prepracoval som mobilné aplikácie, pridal novú funkcionalitu a opravil existujúce funkcie naprieč celým stackom — backend API, admin webová platforma, mobilné aplikácie pre jazdcov a vodičov.",
        highlights: [
          "Real-time komunikácia (WebSockets)",
          "Platobné integrácie (Stripe, Google/Apple Pay)",
          "Mapy, geolokácia a logika jázd",
          "Kompletný životný cyklus mobilnej aplikácie",
          "Produkčný monitoring a ladenie",
        ],
      },
    ],
  },

  skills: {
    heading: "Zručnosti a nástroje",
    subtitle: "Môj technický arzenál",
    categories: [
      "Testová automatizácia",
      "Manuálne testovanie",
      "Mobilný vývoj",
      "Webový vývoj",
      "DevOps a nástroje",
      "Bug tracking a QA",
    ],
  },

  experience: {
    heading: "Skúsenosti",
    subtitle: "Moja profesionálna cesta",
    items: [
      {
        role: "QA Automation Engineer",
        company: "Caterpillar Slovakia · cez Moxymind",
        period: "Aug 2024 – Súčasnosť",
        description:
          "Budujem automatizované testy pre internú platformu spracúvajúcu dynamické inšpekčné formuláre a pracovné postupy. Podieľam sa na zlepšovaní QA procesov modernými nástrojmi.",
      },
      {
        role: "Flutter Engineer & Designer",
        company: "Freelance",
        period: "2024 – Súčasnosť",
        description:
          "Navrhujem a tvorím produkčné mobilné aplikácie. Kompletný životný cyklus — od Figma prototypov po nasadenie do App Store.",
      },
      {
        role: "Bolt vodič & osobná prestávka",
        company: "Samostatne zárobkovo činný",
        period: "Aug 2022 – Dec 2023",
        description:
          "Vedome som si dal prestávku od IT, aby som si oddýchol a získal iný pohľad. Pracoval som ako Bolt vodič, pričom som skúmal nové záujmy a prehodnocoval kariérne ciele.",
      },
      {
        role: "QA Engineer",
        company: "GlobalLogic Slovakia",
        period: "Jan 2022 – Júl 2022",
        description:
          "Automatizované testovanie medicínskych webových aplikácií. Zabezpečenie súladu a spoľahlivosti vo vysoko regulovanom prostredí.",
      },
      {
        role: "QA Engineer",
        company: "Ness KE",
        period: "Jún 2019 – Dec 2021",
        description:
          "Manuálne a automatizované testovanie telematických manažérskych aplikácií. Budovanie a údržba testových sád naprieč mobilom a webom.",
      },
      {
        role: "Grafický dizajnér",
        company: "IAESTE Slovensko",
        period: "Júl 2019 – Feb 2021",
        description:
          "Tvorba dizajnov pre sociálne médiá a tlačové materiály. Vývoj propagačného obsahu, plagátov a digitálnej grafiky kombinujúcej funkčnosť s estetikou.",
      },
      {
        role: "Trainee mobilný vývojár",
        company: "GlobalLogic Slovakia",
        period: "Mar 2019 – Jún 2019",
        description:
          "Vývoj PoC mobilnej aplikácie 'Bethesda' zameranej na starostlivosť o seniorov v domovoch dôchodcov — organizácia liekov, sledovanie krvného tlaku a denná starostlivosť.",
      },
    ],
  },

  companies: {
    heading: "Spolupracoval som s",
  },

  contact: {
    heading: "Spojme sa",
    subtitle: "Pripravení spolupracovať?",
    intro:
      "Či už potrebujete QA experta na zabezpečenie vašich vydaní, vývojára na realizáciu vášho nápadu, alebo dizajnéra na vylepšenie vášho produktu — poďme sa porozprávať.",
    nameLabel: "Meno",
    namePlaceholder: "Vaše meno",
    emailLabel: "Email",
    emailPlaceholder: "vas@email.com",
    serviceLabel: "Mám záujem o",
    serviceHint: "(vyberte všetky, ktoré sa hodia)",
    budgetLabel: "Rozpočet",
    budgetPlaceholder: "Vyberte rozsah",
    budgetOptions: [
      "< 1 000 €",
      "1 000 – 5 000 €",
      "5 000 – 15 000 €",
      "15 000+ €",
      "Poďme sa dohodnúť",
    ],
    messageLabel: "Správa",
    messagePlaceholder: "Povedzte mi o vašom projekte...",
    send: "Odoslať správu",
    sending: "Odosielam...",
    successTitle: "Správa odoslaná!",
    successMessage: "Ozvem sa vám čo najskôr.",
    sendAnother: "Poslať ďalšiu správu",
    errorMessage:
      "Niečo sa pokazilo. Skúste to znova alebo sa ozvite cez LinkedIn.",
    orFindMe: "Alebo ma nájdete na",
    serviceOptions: [
      "Chcem mobilnú appku",
      "Chcem webovú appku",
      "Chcem web aj mobil",
      "Neviem, čo potrebujem",
      "Presne viem, čo chcem",
    ],
    iKnowExactly: "Presne viem, čo chcem",
    detailedServiceOptions: [
      "QA / Testová automatizácia",
      "Vývoj mobilných aplikácií",
      "Webový vývoj",
      "Backend / API vývoj",
      "UX/UI dizajn",
      "Konzultácie",
    ],
  },

  footer: {
    rights: "Všetky práva vyhradené.",
  },
};
