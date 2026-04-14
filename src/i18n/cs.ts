import type { Translations } from "./types";

export const cs: Translations = {
  nav: {
    about: "O mně",
    projects: "Projekty",
    skills: "Dovednosti",
    experience: "Zkušenosti",
    contact: "Kontakt",
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

  footer: {
    rights: "Všechna práva vyhrazena.",
  },
};
