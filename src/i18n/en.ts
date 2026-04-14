import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skipToContent: "Skip to content",
  },

  hero: {
    headline:
      "I build and test reliable web & mobile applications — from idea to production",
    subheadline:
      "Full-stack development + QA in one workflow. I design, build, and validate systems so they actually work in real-world conditions.",
    offers: [
      "Web applications & admin panels",
      "Mobile apps (Flutter — iOS & Android)",
      "Backend APIs & system architecture",
      "UX/UI design (Figma)",
      "Automated testing & QA (Playwright)",
    ],
    credibility:
      "Worked on complex systems including internal enterprise tools and full mobility platforms (web + mobile + backend).",
    badges: ["Web Apps", "Mobile Apps", "QA Automation", "UX/UI Design"],
    ctaPrimary: "Start a Project",
    ctaSecondary: "View My Work",
  },

  about: {
    heading: "About Me",
    subtitle: "Get to know me",
    paragraphs: [
      "I'm a QA Automation Engineer with over 5 years of hands-on experience shipping quality software across enterprise platforms, mobile apps, and web applications. My journey started in professional athletics — where discipline, precision, and relentless iteration became second nature.",
      "Today, I bring that same mindset to software quality. I specialize in building robust test automation frameworks with Playwright, designing comprehensive test strategies, and ensuring that every release meets the highest standards.",
      "On the side, I'm a passionate full-stack developer. I build production-grade mobile and web applications — from architecture to deployment. It's a hobby I take seriously, and it gives me a unique perspective: I don't just test software, I understand how it's built.",
      "Beyond engineering, I have over 7 years of experience in graphic design, with a strong focus on UX/UI design and Figma. My design background includes creating promotional materials, posters, billboards, and digital content that effectively combine functionality with aesthetics.",
    ],
    stats: [
      { value: "5+", label: "Years in QA" },
      { value: "100+", label: "Test Suites Built" },
      { value: "6", label: "Companies Served" },
      { value: "∞", label: "Bugs Squashed" },
    ],
  },

  projects: {
    heading: "Projects",
    subtitle: "What I've been building",
    badgeQA: "QA",
    badgeDev: "Dev",
    items: [
      {
        title: "QA Automation @ Caterpillar",
        subtitle: "Enterprise Platform Testing · via Moxymind",
        description:
          "Contributing to test automation for an internal platform handling dynamic inspection forms and inspection workflows. Building Playwright test suites, writing test plans and test cases, and improving QA processes with modern tooling.",
        highlights: [
          "Automated testing with Playwright",
          "Test plans & test case design",
          "CI/CD integration via Azure DevOps",
          "AI-assisted development with Copilot",
        ],
      },
      {
        title: "mobiX Platform",
        subtitle: "End-to-End Mobility Ecosystem",
        description:
          "Took over an existing mobility platform and adapted it to client requirements. Redesigned the mobile apps, added new functionality, and fixed existing features across the full stack — backend API, admin web platform, rider and driver mobile apps.",
        highlights: [
          "Real-time communication (WebSockets)",
          "Payment integrations (Stripe, Google/Apple Pay)",
          "Maps, geolocation & ride logic",
          "Full mobile app lifecycle",
          "Production monitoring & debugging",
        ],
      },
    ],
  },

  skills: {
    heading: "Skills & Tools",
    subtitle: "My technical toolkit",
    categories: [
      "Test Automation",
      "Manual Testing",
      "Mobile Development",
      "Web Development",
      "DevOps & Tools",
      "Bug Tracking & QA",
    ],
  },

  experience: {
    heading: "Experience",
    subtitle: "My professional journey",
    items: [
      {
        role: "QA Automation Engineer",
        company: "Caterpillar Slovakia · via Moxymind",
        period: "Aug 2024 – Present",
        description:
          "Building automated tests for an internal platform handling dynamic inspection forms and workflows. Contributing to QA process improvements with modern tooling.",
      },
      {
        role: "Flutter Engineer & Designer",
        company: "Freelance",
        period: "2024 – Present",
        description:
          "Designing and building production mobile applications. Full lifecycle — from Figma prototypes to App Store deployment.",
      },
      {
        role: "Bolt Driver & Personal Break",
        company: "Self-employed",
        period: "Aug 2022 – Dec 2023",
        description:
          "Took a deliberate break from IT to recharge and gain a different perspective. Worked as a Bolt driver while exploring new interests and refocusing career goals.",
      },
      {
        role: "QA Engineer",
        company: "GlobalLogic Slovakia",
        period: "Jan 2022 – Jul 2022",
        description:
          "Automated testing for medical web applications. Ensured compliance and reliability in a highly regulated domain.",
      },
      {
        role: "QA Engineer",
        company: "Ness KE",
        period: "Jun 2019 – Dec 2021",
        description:
          "Manual and automated testing for telematics management applications. Built and maintained test suites across mobile and web.",
      },
      {
        role: "Graphic Designer",
        company: "IAESTE Slovakia",
        period: "Jul 2019 – Feb 2021",
        description:
          "Creating designs for social media and print materials. Developed promotional content, posters, and digital graphics combining functionality with aesthetics.",
      },
      {
        role: "Trainee Mobile Developer",
        company: "GlobalLogic Slovakia",
        period: "Mar 2019 – Jun 2019",
        description:
          "Developed a PoC mobile application 'Bethesda' focused on eldercare in retirement homes — pill organization, blood pressure tracking, and daily care management.",
      },
    ],
  },

  companies: {
    heading: "Trusted By",
  },

  contact: {
    heading: "Let's Connect",
    subtitle: "Ready to work together?",
    intro:
      "Whether you need a QA expert to bulletproof your releases, a developer to bring your idea to life, or a designer to polish your product — let's talk.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    serviceLabel: "I'm interested in",
    serviceHint: "(select all that apply)",
    budgetLabel: "Budget range",
    budgetPlaceholder: "Select a range",
    budgetOptions: [
      "< €1,000",
      "€1,000 – €5,000",
      "€5,000 – €15,000",
      "€15,000+",
      "Let's discuss",
    ],
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project...",
    send: "Send Message",
    sending: "Sending...",
    successTitle: "Message sent!",
    successMessage: "I'll get back to you as soon as possible.",
    sendAnother: "Send another message",
    errorMessage:
      "Something went wrong. Please try again or reach out on LinkedIn.",
    orFindMe: "Or find me on",
    serviceOptions: [
      "I want a mobile app",
      "I want a web app",
      "I want a web & mobile app",
      "I don't know what I need",
      "I know exactly what I want",
    ],
    iKnowExactly: "I know exactly what I want",
    detailedServiceOptions: [
      "QA / Test Automation",
      "Mobile App Development",
      "Web Development",
      "Backend / API Development",
      "UX/UI Design",
      "Consulting",
    ],
  },

  consent: {
    banner: {
      title: "We value your privacy",
      description: "We use cookies to analyze site traffic and optimize your experience. You can choose which cookies to allow.",
      privacyLink: "Privacy Policy",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
    },
    settings: {
      title: "Cookie Settings",
      description: "Choose which cookies you want to allow. You can change these settings at any time from the footer.",
      necessary: {
        title: "Necessary",
        description: "Essential for the website to function. Stores your language preference. No personal data is collected.",
      },
      analytics: {
        title: "Analytics",
        description: "Help us understand how visitors use our website. We use Google Analytics with anonymized IP addresses.",
      },
      marketing: {
        title: "Marketing",
        description: "Used to deliver relevant advertisements and track campaign effectiveness. Currently not in use.",
      },
      required: "Required",
      savePreferences: "Save preferences",
      acceptAll: "Accept all",
      rejectAll: "Reject all",
    },
    footerLinks: {
      cookieSettings: "Cookie Settings",
      privacyPolicy: "Privacy Policy",
    },
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: April 14, 2026",
    backHome: "Back to home",
    sections: {
      controller: {
        heading: "Data Controller",
        content: [
          "Lubomir Volcko (\"we\", \"us\", \"our\")",
          "Website: https://lvtesting.eu",
          "Email: segnities@gmail.com",
          "Location: Slovakia, European Union",
        ],
      },
      dataCollection: {
        heading: "What data do we collect and why",
        content: [
          "We collect data to improve your experience on our website and to understand how visitors interact with our content.",
          "Language preference — stored locally in your browser (localStorage) to remember your chosen language. This is a necessary function and does not require consent.",
          "Analytics data — collected via Google Analytics 4 (GA4) only after you give explicit consent. This includes: pages visited, time spent on site, scroll depth, sections viewed, clicks on key elements, approximate location (country-level from anonymized IP), device type and browser. IP addresses are anonymized before processing.",
          "Marketing data — currently not collected. This category exists as a placeholder for future advertising integrations (e.g., Facebook Pixel, Google Ads). Marketing cookies will only activate after your explicit consent.",
        ],
      },
      cookies: {
        heading: "Cookies we use",
        intro: "Below is a detailed list of cookies used on this website:",
        table: {
          name: "Cookie name",
          provider: "Provider",
          purpose: "Purpose",
          duration: "Duration",
        },
        necessary: {
          name: "locale (localStorage)",
          description: "Stores your language preference. No expiration — persists until you clear browser data.",
        },
        analytics: {
          name: "_ga, _ga_*, _gid",
          description: "Google Analytics 4 — tracks anonymous usage data. _ga expires after 2 years, _gid after 24 hours. Only set after consent.",
        },
        marketing: {
          name: "None currently",
          description: "No marketing cookies are currently in use. This section will be updated if marketing tools are added in the future.",
        },
      },
      usage: {
        heading: "How we use your data",
        content: [
          "Analytics data is used solely to understand how visitors interact with our website and to improve its content and user experience.",
          "We do not sell, rent, or share your personal data with any third parties beyond Google Analytics (which processes data under its own privacy policy).",
          "All analytics data is collected with anonymized IP addresses, making it impossible to identify individual users.",
        ],
      },
      rights: {
        heading: "Your rights under GDPR",
        content: [
          "Under the General Data Protection Regulation (EU 2016/679) and Slovak Act 18/2018 Z.z., you have the following rights:",
          "Right of access — You can request a copy of the data we hold about you.",
          "Right to rectification — You can ask us to correct inaccurate data.",
          "Right to erasure — You can ask us to delete your data (\"right to be forgotten\").",
          "Right to restrict processing — You can ask us to limit how we use your data.",
          "Right to data portability — You can request your data in a machine-readable format.",
          "Right to object — You can object to processing based on legitimate interest.",
          "Right to withdraw consent — You can withdraw your cookie consent at any time via the \"Cookie Settings\" link in the footer. This does not affect the lawfulness of processing before withdrawal.",
        ],
      },
      contact: {
        heading: "How to exercise your rights",
        content: [
          "To exercise any of these rights, please contact us at: segnities@gmail.com",
          "We will respond to your request within 30 days as required by GDPR.",
        ],
      },
      authority: {
        heading: "Supervisory authority",
        content: [
          "If you believe your data protection rights have been violated, you have the right to lodge a complaint with the supervisory authority:",
          "Urad na ochranu osobnych udajov Slovenskej republiky (Office for Personal Data Protection of the Slovak Republic)",
          "Hranicna 12, 820 07 Bratislava 27, Slovakia",
          "Website: https://dataprotection.gov.sk",
          "Phone: +421 2 3231 3214",
        ],
      },
      changes: {
        heading: "Changes to this policy",
        content: [
          "We may update this privacy policy from time to time. When we make material changes, the consent banner will reappear so you can review and update your preferences.",
          "The \"Last updated\" date at the top of this page reflects the most recent changes.",
        ],
      },
    },
  },

  errors: {
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to home",
    },
    serverError: {
      title: "Something went wrong",
      description: "An unexpected error occurred. Please try again.",
      tryAgain: "Try again",
      backHome: "Back to home",
    },
    criticalError: {
      title: "Critical error",
      description: "The application encountered a critical error. Please try reloading the page.",
      reload: "Reload",
      backHome: "Back to home",
    },
  },

  footer: {
    rights: "All rights reserved.",
  },
};
