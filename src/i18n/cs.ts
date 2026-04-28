import type { Translations } from "./types";

export const cs: Translations = {
  nav: {
    about: "O mně",
    projects: "Projekty",
    skills: "Dovednosti",
    experience: "Zkušenosti",
    contact: "Kontakt",
    portfolio: "Portfolio",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    skipToContent: "Přeskočit na obsah",
  },

  hero: {
    headline:
      "Navrhuji, vyvíjím a testuji spolehlivé webové a mobilní aplikace — od nápadu po produkci",
    subheadline:
      "Full-stack vývoj + QA v jednom. Navrhuji, stavím a validuji systémy tak, aby skutečně fungovaly v reálných podmínkách.",
    offers: [
      "Webové aplikace a admin panely",
      "Mobilní aplikace (Flutter — iOS & Android)",
      "Backend API a architektura systémů",
      "UX/UI design (Figma)",
      "Automatizované testování a QA (Playwright)",
    ],
    credibility:
      "Pracoval jsem na komplexních systémech včetně interních podnikových nástrojů a kompletních platforem pro mobilitu (web + mobil + backend).",
    badges: ["Web Appky", "Mobilní Appky", "QA Automatizace", "UX/UI Design"],
    ctaPrimary: "Začít projekt",
    ctaSecondary: "Prohlédnout práce",
  },

  about: {
    heading: "O mně",
    subtitle: "Poznejte mě",
    paragraphs: [
      "Jsem QA Automation Engineer s více než 5 lety praktických zkušeností v dodávání kvalitního softwaru napříč podnikovými platformami, mobilními aplikacemi a webovými aplikacemi. Moje cesta začala v profesionálním sportu — kde se disciplína, přesnost a neúnavné zlepšování staly druhou přirozeností.",
      "Dnes přináším stejný přístup ke kvalitě softwaru. Specializuji se na budování robustních frameworků pro testovou automatizaci s Playwright, navrhování komplexních testovacích strategií a zajištění, že každé vydání splňuje nejvyšší standardy.",
      "Vedle toho jsem zapálený full-stack vývojář. Tvořím produkční mobilní a webové aplikace — od architektury po nasazení. Je to hobby, které beru vážně, a poskytuje mi unikátní perspektivu: software nejen testuji, ale rozumím tomu, jak je postavený.",
      "Kromě inženýrství mám více než 7 let zkušeností v grafickém designu se silným zaměřením na UX/UI design a Figmu. Moje designérské pozadí zahrnuje tvorbu propagačních materiálů, plakátů, billboardů a digitálního obsahu, který efektivně kombinuje funkčnost s estetikou.",
    ],
    stats: [
      { value: "5+", label: "Let v QA" },
      { value: "100+", label: "Testových sad" },
      { value: "6", label: "Firem" },
      { value: "∞", label: "Opravených bugů" },
    ],
  },

  projects: {
    heading: "Projekty",
    subtitle: "Na čem jsem pracoval",
    badgeQA: "QA",
    badgeDev: "Dev",
    items: [
      {
        title: "QA Automatizace @ Caterpillar",
        subtitle: "Testování podnikové platformy · přes Moxymind",
        description:
          "Podílím se na testové automatizaci interní platformy zpracovávající dynamické inspekční formuláře a pracovní postupy. Buduji testovací sady v Playwright, píšu testovací plány a případy a zlepšuji QA procesy moderními nástroji.",
        highlights: [
          "Automatizované testování s Playwright",
          "Návrh testovacích plánů a případů",
          "CI/CD integrace přes Azure DevOps",
          "AI-asistovaný vývoj s Copilot",
        ],
      },
      {
        title: "Platforma mobiX",
        subtitle: "End-to-End mobilní ekosystém",
        description:
          "Převzal jsem existující mobilní platformu a přizpůsobil ji požadavkům klienta. Přepracoval jsem mobilní aplikace, přidal novou funkcionalitu a opravil existující funkce napříč celým stackem — backend API, admin webová platforma, mobilní aplikace pro jezdce a řidiče.",
        highlights: [
          "Real-time komunikace (WebSockets)",
          "Platební integrace (Stripe, Google/Apple Pay)",
          "Mapy, geolokace a logika jízd",
          "Kompletní životní cyklus mobilní aplikace",
          "Produkční monitoring a ladění",
        ],
      },
    ],
  },

  skills: {
    heading: "Dovednosti a nástroje",
    subtitle: "Můj technický arzenál",
    categories: [
      "Testová automatizace",
      "Manuální testování",
      "Mobilní vývoj",
      "Webový vývoj",
      "DevOps a nástroje",
      "Bug tracking a QA",
    ],
  },

  experience: {
    heading: "Zkušenosti",
    subtitle: "Moje profesionální cesta",
    items: [
      {
        role: "QA Automation Engineer",
        company: "Caterpillar Slovakia · přes Moxymind",
        period: "Srp 2024 – Současnost",
        description:
          "Buduji automatizované testy pro interní platformu zpracovávající dynamické inspekční formuláře a pracovní postupy. Podílím se na zlepšování QA procesů moderními nástroji.",
      },
      {
        role: "Flutter Engineer & Designer",
        company: "Freelance",
        period: "2024 – Současnost",
        description:
          "Navrhuji a tvořím produkční mobilní aplikace. Kompletní životní cyklus — od Figma prototypů po nasazení do App Store.",
      },
      {
        role: "Bolt řidič & osobní přestávka",
        company: "Samostatně výdělečně činný",
        period: "Srp 2022 – Pro 2023",
        description:
          "Vědomě jsem si dal přestávku od IT, abych si odpočinul a získal jiný pohled. Pracoval jsem jako Bolt řidič, přičemž jsem zkoumal nové zájmy a přehodnocoval kariérní cíle.",
      },
      {
        role: "QA Engineer",
        company: "GlobalLogic Slovakia",
        period: "Led 2022 – Čvc 2022",
        description:
          "Automatizované testování medicínských webových aplikací. Zajištění souladu a spolehlivosti ve vysoce regulovaném prostředí.",
      },
      {
        role: "QA Engineer",
        company: "Ness KE",
        period: "Čvn 2019 – Pro 2021",
        description:
          "Manuální a automatizované testování telematických manažerských aplikací. Budování a údržba testových sad napříč mobilem a webem.",
      },
      {
        role: "Grafický designér",
        company: "IAESTE Slovensko",
        period: "Čvc 2019 – Úno 2021",
        description:
          "Tvorba designů pro sociální média a tiskové materiály. Vývoj propagačního obsahu, plakátů a digitální grafiky kombinující funkčnost s estetikou.",
      },
      {
        role: "Trainee mobilní vývojář",
        company: "GlobalLogic Slovakia",
        period: "Bře 2019 – Čvn 2019",
        description:
          "Vývoj PoC mobilní aplikace 'Bethesda' zaměřené na péči o seniory v domovech důchodců — organizace léků, sledování krevního tlaku a denní péče.",
      },
    ],
  },

  companies: {
    heading: "Spolupracoval jsem s",
  },

  contact: {
    heading: "Spojme se",
    subtitle: "Připraveni spolupracovat?",
    intro:
      "Ať už potřebujete QA experta na zabezpečení vašich vydání, vývojáře na realizaci vašeho nápadu, nebo designéra na vylepšení vašeho produktu — pojďme si promluvit.",
    nameLabel: "Jméno",
    namePlaceholder: "Vaše jméno",
    emailLabel: "Email",
    emailPlaceholder: "vas@email.com",
    serviceLabel: "Mám zájem o",
    serviceHint: "(vyberte všechny, které se hodí)",
    budgetLabel: "Rozpočet",
    budgetPlaceholder: "Vyberte rozsah",
    budgetOptions: [
      "< 1 000 €",
      "1 000 – 5 000 €",
      "5 000 – 15 000 €",
      "15 000+ €",
      "Pojďme se dohodnout",
    ],
    messageLabel: "Zpráva",
    messagePlaceholder: "Řekněte mi o vašem projektu...",
    send: "Odeslat zprávu",
    sending: "Odesílám...",
    successTitle: "Zpráva odeslána!",
    successMessage: "Ozvu se vám co nejdříve.",
    sendAnother: "Poslat další zprávu",
    errorMessage:
      "Něco se pokazilo. Zkuste to znovu nebo se ozvěte přes LinkedIn.",
    orFindMe: "Nebo mě najdete na",
    serviceOptions: [
      "Chci mobilní appku",
      "Chci webovou appku",
      "Chci web i mobil",
      "Nevím, co potřebuji",
      "Přesně vím, co chci",
    ],
    iKnowExactly: "Přesně vím, co chci",
    detailedServiceOptions: [
      "QA / Testová automatizace",
      "Vývoj mobilních aplikací",
      "Webový vývoj",
      "Backend / API vývoj",
      "UX/UI design",
      "Konzultace",
    ],
  },

  consent: {
    banner: {
      title: "Vážíme si vašeho soukromí",
      description: "Používáme cookies k analýze návštěvnosti a optimalizaci vašeho zážitku. Můžete si zvolit, které cookies povolíte.",
      privacyLink: "Zásady ochrany osobních údajů",
      acceptAll: "Přijmout vše",
      rejectAll: "Odmítnout vše",
      customize: "Přizpůsobit",
    },
    settings: {
      title: "Nastavení cookies",
      description: "Zvolte si, které cookies chcete povolit. Tato nastavení můžete kdykoliv změnit v patičce stránky.",
      necessary: {
        title: "Nezbytné",
        description: "Nezbytné pro fungování webové stránky. Ukládají vaši jazykovou preferenci. Žádné osobní údaje se neshromažďují.",
      },
      analytics: {
        title: "Analytické",
        description: "Pomáhají nám porozumět tomu, jak návštěvníci používají naši webovou stránku. Používáme Google Analytics s anonymizovanými IP adresami.",
      },
      marketing: {
        title: "Marketingové",
        description: "Slouží k zobrazování relevantní reklamy a sledování účinnosti kampaní. Momentálně se nepoužívají.",
      },
      required: "Povinné",
      savePreferences: "Uložit předvolby",
      acceptAll: "Přijmout vše",
      rejectAll: "Odmítnout vše",
    },
    footerLinks: {
      cookieSettings: "Nastavení cookies",
      privacyPolicy: "Zásady ochrany osobních údajů",
    },
  },

  privacy: {
    title: "Zásady ochrany osobních údajů",
    lastUpdated: "Poslední aktualizace: 14. dubna 2026",
    backHome: "Zpět na úvod",
    sections: {
      controller: {
        heading: "Správce údajů",
        content: [
          "Lubomír Volčko (\"my\", \"nás\", \"náš\")",
          "Webová stránka: https://lvtesting.eu",
          "E-mail: segnities@gmail.com",
          "Sídlo: Slovensko, Evropská unie",
        ],
      },
      dataCollection: {
        heading: "Jaké údaje shromažďujeme a proč",
        content: [
          "Shromažďujeme údaje za účelem zlepšení vašeho zážitku na naší webové stránce a porozumění tomu, jak návštěvníci interagují s naším obsahem.",
          "Jazyková preference — ukládá se lokálně ve vašem prohlížeči (localStorage) pro zapamatování zvoleného jazyka. Jedná se o nezbytnou funkci, která nevyžaduje souhlas.",
          "Analytické údaje — shromažďovány prostřednictvím Google Analytics 4 (GA4) pouze po udělení vašeho výslovného souhlasu. Zahrnují: navštívené stránky, čas strávený na stránce, hloubku posouvání, zobrazené sekce, kliknutí na klíčové prvky, přibližnou polohu (na úrovni země z anonymizované IP adresy), typ zařízení a prohlížeč. IP adresy jsou před zpracováním anonymizovány.",
          "Marketingové údaje — momentálně se neshromažďují. Tato kategorie existuje jako zástupné místo pro budoucí reklamní integrace (např. Facebook Pixel, Google Ads). Marketingové cookies se aktivují pouze po vašem výslovném souhlasu.",
        ],
      },
      cookies: {
        heading: "Cookies, které používáme",
        intro: "Níže je podrobný seznam cookies používaných na této webové stránce:",
        table: {
          name: "Název cookie",
          provider: "Poskytovatel",
          purpose: "Účel",
          duration: "Doba trvání",
        },
        necessary: {
          name: "locale (localStorage)",
          description: "Ukládá vaši jazykovou preferenci. Bez expirace — uchovává se, dokud nevymažete data prohlížeče.",
        },
        analytics: {
          name: "_ga, _ga_*, _gid",
          description: "Google Analytics 4 — sleduje anonymní údaje o používání. _ga expiruje po 2 letech, _gid po 24 hodinách. Nastavuje se pouze po udělení souhlasu.",
        },
        marketing: {
          name: "Momentálně žádné",
          description: "Žádné marketingové cookies se momentálně nepoužívají. Tato sekce bude aktualizována, pokud budou v budoucnu přidány marketingové nástroje.",
        },
      },
      usage: {
        heading: "Jak používáme vaše údaje",
        content: [
          "Analytické údaje slouží výhradně k porozumění tomu, jak návštěvníci interagují s naší webovou stránkou, a ke zlepšení jejího obsahu a uživatelského zážitku.",
          "Vaše osobní údaje neprodáváme, nepronajímáme ani nesdílíme s žádnými třetími stranami kromě Google Analytics (který zpracovává údaje podle vlastních zásad ochrany osobních údajů).",
          "Všechny analytické údaje se shromažďují s anonymizovanými IP adresami, což znemožňuje identifikaci jednotlivých uživatelů.",
        ],
      },
      rights: {
        heading: "Vaše práva podle GDPR",
        content: [
          "Podle Obecného nařízení o ochraně osobních údajů (EU 2016/679) a zákona č. 110/2019 Sb. o zpracování osobních údajů máte následující práva:",
          "Právo na přístup — Můžete požádat o kopii údajů, které o vás uchováváme.",
          "Právo na opravu — Můžete nás požádat o opravu nepřesných údajů.",
          "Právo na výmaz — Můžete nás požádat o vymazání vašich údajů (\"právo být zapomenut\").",
          "Právo na omezení zpracování — Můžete nás požádat o omezení způsobu, jakým používáme vaše údaje.",
          "Právo na přenositelnost údajů — Můžete požádat o vaše údaje ve strojově čitelném formátu.",
          "Právo vznést námitku — Můžete vznést námitku proti zpracování na základě oprávněného zájmu.",
          "Právo odvolat souhlas — Souhlas s cookies můžete kdykoliv odvolat prostřednictvím odkazu \"Nastavení cookies\" v patičce. Odvolání nemá vliv na zákonnost zpracování před jeho odvoláním.",
        ],
      },
      contact: {
        heading: "Jak uplatnit svá práva",
        content: [
          "Pro uplatnění kteréhokoliv z těchto práv nás kontaktujte na: segnities@gmail.com",
          "Na vaši žádost odpovíme do 30 dnů v souladu s požadavky GDPR.",
        ],
      },
      authority: {
        heading: "Dozorový úřad",
        content: [
          "Pokud se domníváte, že vaše práva na ochranu údajů byla porušena, máte právo podat stížnost u dozorového úřadu:",
          "Úřad pro ochranu osobních údajů",
          "Pplk. Sochora 27, 170 00 Praha 7, Česká republika",
          "https://www.uoou.cz",
          "+420 234 665 111",
        ],
      },
      changes: {
        heading: "Změny těchto zásad",
        content: [
          "Tyto zásady ochrany osobních údajů můžeme příležitostně aktualizovat. Při podstatných změnách se znovu zobrazí banner se souhlasem, abyste mohli zkontrolovat a aktualizovat své předvolby.",
          "Datum \"Poslední aktualizace\" na začátku této stránky odráží nejnovější změny.",
        ],
      },
    },
  },

  errors: {
    notFound: {
      title: "Stránka nenalezena",
      description: "Stránka, kterou hledáte, neexistuje nebo byla přesunuta.",
      backHome: "Zpět na úvod",
    },
    serverError: {
      title: "Něco se pokazilo",
      description: "Došlo k neočekávané chybě. Zkuste to prosím znovu.",
      tryAgain: "Zkusit znovu",
      backHome: "Zpět na úvod",
    },
    criticalError: {
      title: "Kritická chyba",
      description: "Aplikace narazila na kritickou chybu. Zkuste prosím obnovit stránku.",
      reload: "Obnovit",
      backHome: "Zpět na úvod",
    },
  },

  portfolio: {
    title: "Portfolio — LV Testing",
    seoDescription:
      "Portfolio Lubomíra Volcka — full-stack vývojář a QA inženýr. Webové aplikace, mobilní aplikace a grafické práce vytvořené v Reactu, TypeScriptu, Flutteru a dalších technologiích.",
    copyright:
      "Všechny projekty a designy jsou duševním vlastnictvím Lubomíra Volcka. Všechna práva vyhrazena.",
    heading: "Portfolio",
    subtitle: "Výber z mojích prací",
    backHome: "Zpět na hlavní stránku",
    webProjects: {
      heading: "Webové projekty",
      subtitle: "Full-stack aplikace postavené od základů",
    },
    graphicDesigns: {
      heading: "Grafické práce",
      subtitle: "Vizuální design a branding",
      comingSoon: "Ukázky prací brzy",
    },
    subenai: {
      tagline:
        "subenai je full-stack edukační webová aplikace postavená na Reactu, TypeScriptu, Supabase a Cloudflare, která učí uživatele rozpoznávat online podvody přes interaktivní testy, obsahové lekce a měřitelné výsledky.",
      description:
        "Webová aplikace zaměřená na digitální bezpečnost. Pomáhá uživatelům rozpoznávat online hrozby jako phishing, podvodné SMS, falešné e-shopy a sociální inženýrství prostřednictvím interaktivních testů a edukačního obsahu.",
      tech:
        "React 19 · TypeScript · TanStack Start/Router/Query · Vite · Tailwind CSS v4 · Radix UI · Supabase · Cloudflare Pages · Stripe · Vitest",
      visitSite: "Navštívit stránku",
      features: [
        "Interaktivní testy na odhalíování podvodů",
        "Tematické a odvětvové testové balíčky",
        "Vzdělávací stránky s vysvětleními typů útoky",
        "Detailní vyhodnocení odpovědí a výsledné skóre",
        "Sdílení výsledků a generování vizuálu pro sociální sítě",
        "Sponzorská sekce s platbami přes Stripe",
        "Cookie consent respektující volbu uživatele",
        "SEO základ se sitemapou a meta daty",
      ],
      year: "2026",
    },
    ongoingLabel: "Probíhá",
    mobix: {
      tagline:
        "Mobix je produkční full-stack taxi platforma postavená na Node.js, GraphQL, Flutteru a Firebase, která v reálném čase propojuje cestující s řidiči přes automatický dispatch, GPS sledování a vícekanálové platby.",
      description:
        "Kompletní taxi platforma pro slovenský trh tvořená třemi vzájemně propojenými systémy: mobilní aplikací pro cestující, mobilní aplikací pro řidiče a backendem s administračním panelem. Pokrývá celý životní cyklus jízdy od objednávky přes GPS sledování až po platbu a hodnocení.",
      visitSite: "Soukromý projekt",
      features: [
        "Rezervace jízdy — okamžitá i plánovaná s časovým předstihem",
        "Waterfall dispatch — automatické přiřazování řidičů s fallback logikou",
        "GPS sledování jízdy v reálném čase přes WebSocket + Google Maps",
        "OTP ověření telefonu přes Twilio (cestující i řidič)",
        "Více platebních metod: hotovost, karta (Stripe), Google Pay, Paystack, peněženka",
        "Přehled výdělků řidiče — denní / týdenní / měsíční",
        "Firebase push notifikace a in-app upozornění pro oba typy uživatelů",
        "Administrační panel s přehledem jízd, řidičů, plateb a analytiky",
        "Vícejazyčná podpora (SK, EN a další lokály)",
      ],
      year: "2025",
    },
  },

  footer: {
    rights: "Všechna práva vyhrazena.",
  },
};
