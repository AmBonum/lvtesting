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

  consent: {
    banner: {
      title: "Vážime si vaše súkromie",
      description: "Používame cookies na analýzu návštevnosti a optimalizáciu vášho zážitku. Môžete si vybrať, ktoré cookies povolíte.",
      privacyLink: "Zásady ochrany osobných údajov",
      acceptAll: "Prijať všetky",
      rejectAll: "Odmietnuť všetky",
      customize: "Prispôsobiť",
    },
    settings: {
      title: "Nastavenia cookies",
      description: "Vyberte si, ktoré cookies chcete povoliť. Tieto nastavenia môžete kedykoľvek zmeniť v pätičke stránky.",
      necessary: {
        title: "Nevyhnutné",
        description: "Nevyhnutné pre fungovanie webovej stránky. Ukladajú vašu jazykovú preferenciu. Žiadne osobné údaje sa nezbierajú.",
      },
      analytics: {
        title: "Analytické",
        description: "Pomáhajú nám pochopiť, ako návštevníci používajú našu webovú stránku. Používame Google Analytics s anonymizovanými IP adresami.",
      },
      marketing: {
        title: "Marketingové",
        description: "Používajú sa na zobrazovanie relevantnej reklamy a sledovanie účinnosti kampaní. Momentálne sa nepoužívajú.",
      },
      required: "Povinné",
      savePreferences: "Uložiť preferencie",
      acceptAll: "Prijať všetky",
      rejectAll: "Odmietnuť všetky",
    },
    footerLinks: {
      cookieSettings: "Nastavenia cookies",
      privacyPolicy: "Zásady ochrany osobných údajov",
    },
  },

  privacy: {
    title: "Zásady ochrany osobných údajov",
    lastUpdated: "Posledná aktualizácia: 14. apríla 2026",
    backHome: "Späť na úvod",
    sections: {
      controller: {
        heading: "Prevádzkovateľ",
        content: [
          "Lubomír Volčko (\"my\", \"nás\", \"náš\")",
          "Webová stránka: https://lvtesting.eu",
          "E-mail: segnities@gmail.com",
          "Sídlo: Slovensko, Európska únia",
        ],
      },
      dataCollection: {
        heading: "Aké údaje zbierame a prečo",
        content: [
          "Zbierame údaje na zlepšenie vášho zážitku na našej webovej stránke a na pochopenie toho, ako návštevníci interagujú s naším obsahom.",
          "Jazyková preferencia — ukladá sa lokálne vo vašom prehliadači (localStorage) na zapamätanie zvoleného jazyka. Ide o nevyhnutnú funkciu, ktorá nevyžaduje súhlas.",
          "Analytické údaje — zbierajú sa prostredníctvom Google Analytics 4 (GA4) iba po udelení vášho výslovného súhlasu. Zahŕňajú: navštívené stránky, čas strávený na stránke, hĺbku posúvania, zobrazené sekcie, kliknutia na kľúčové prvky, približnú polohu (na úrovni krajiny z anonymizovanej IP adresy), typ zariadenia a prehliadač. IP adresy sú pred spracovaním anonymizované.",
          "Marketingové údaje — momentálne sa nezbierajú. Táto kategória existuje ako zástupný priestor pre budúce reklamné integrácie (napr. Facebook Pixel, Google Ads). Marketingové cookies sa aktivujú iba po vašom výslovnom súhlase.",
        ],
      },
      cookies: {
        heading: "Cookies, ktoré používame",
        intro: "Nižšie je podrobný zoznam cookies používaných na tejto webovej stránke:",
        table: {
          name: "Názov cookie",
          provider: "Poskytovateľ",
          purpose: "Účel",
          duration: "Trvanie",
        },
        necessary: {
          name: "locale (localStorage)",
          description: "Ukladá vašu jazykovú preferenciu. Bez expirácie — uchováva sa, kým nevymažete údaje prehliadača.",
        },
        analytics: {
          name: "_ga, _ga_*, _gid",
          description: "Google Analytics 4 — sleduje anonymné údaje o používaní. _ga expiruje po 2 rokoch, _gid po 24 hodinách. Nastavuje sa iba po udelení súhlasu.",
        },
        marketing: {
          name: "Momentálne žiadne",
          description: "Žiadne marketingové cookies sa momentálne nepoužívajú. Táto sekcia bude aktualizovaná, ak budú v budúcnosti pridané marketingové nástroje.",
        },
      },
      usage: {
        heading: "Ako používame vaše údaje",
        content: [
          "Analytické údaje sa používajú výhradne na pochopenie toho, ako návštevníci interagujú s našou webovou stránkou, a na zlepšenie jej obsahu a používateľského zážitku.",
          "Vaše osobné údaje nepredávame, neprenajímame ani nezdieľame so žiadnymi tretími stranami okrem Google Analytics (ktorý spracúva údaje podľa vlastných zásad ochrany osobných údajov).",
          "Všetky analytické údaje sa zbierajú s anonymizovanými IP adresami, čo znemožňuje identifikáciu jednotlivých používateľov.",
        ],
      },
      rights: {
        heading: "Vaše práva podľa GDPR",
        content: [
          "Podľa Všeobecného nariadenia o ochrane údajov (EÚ 2016/679) a zákona č. 18/2018 Z. z. o ochrane osobných údajov máte nasledujúce práva:",
          "Právo na prístup — Môžete požiadať o kópiu údajov, ktoré o vás uchovávame.",
          "Právo na opravu — Môžete nás požiadať o opravu nepresných údajov.",
          "Právo na vymazanie — Môžete nás požiadať o vymazanie vašich údajov (\"právo byť zabudnutý\").",
          "Právo na obmedzenie spracúvania — Môžete nás požiadať o obmedzenie spôsobu, akým používame vaše údaje.",
          "Právo na prenosnosť údajov — Môžete požiadať o vaše údaje v strojovo čitateľnom formáte.",
          "Právo namietať — Môžete namietať proti spracúvaniu na základe oprávneného záujmu.",
          "Právo odvolať súhlas — Súhlas s cookies môžete kedykoľvek odvolať prostredníctvom odkazu \"Nastavenia cookies\" v pätičke. Odvolanie nemá vplyv na zákonnosť spracúvania pred jeho odvolaním.",
        ],
      },
      contact: {
        heading: "Ako uplatniť svoje práva",
        content: [
          "Na uplatnenie ktoréhokoľvek z týchto práv nás kontaktujte na: segnities@gmail.com",
          "Na vašu žiadosť odpovieme do 30 dní v súlade s požiadavkami GDPR.",
        ],
      },
      authority: {
        heading: "Dozorný orgán",
        content: [
          "Ak sa domnievate, že vaše práva na ochranu údajov boli porušené, máte právo podať sťažnosť dozornému orgánu:",
          "Úrad na ochranu osobných údajov Slovenskej republiky",
          "Hraničná 12, 820 07 Bratislava 27, Slovensko",
          "https://dataprotection.gov.sk",
          "+421 2 3231 3214",
        ],
      },
      changes: {
        heading: "Zmeny týchto zásad",
        content: [
          "Tieto zásady ochrany osobných údajov môžeme príležitostne aktualizovať. Pri podstatných zmenách sa znova zobrazí banner so súhlasom, aby ste mohli skontrolovať a aktualizovať svoje preferencie.",
          "Dátum \"Posledná aktualizácia\" na začiatku tejto stránky odráža najnovšie zmeny.",
        ],
      },
    },
  },

  errors: {
    notFound: {
      title: "Stránka nenájdená",
      description: "Stránka, ktorú hľadáte, neexistuje alebo bola presunutá.",
      backHome: "Späť na úvod",
    },
    serverError: {
      title: "Niečo sa pokazilo",
      description: "Vyskytla sa neočakávaná chyba. Skúste to prosím znova.",
      tryAgain: "Skúsiť znova",
      backHome: "Späť na úvod",
    },
    criticalError: {
      title: "Kritická chyba",
      description: "Aplikácia narazila na kritickú chybu. Skúste prosím obnoviť stránku.",
      reload: "Obnoviť",
      backHome: "Späť na úvod",
    },
  },

  footer: {
    rights: "Všetky práva vyhradené.",
  },
};
