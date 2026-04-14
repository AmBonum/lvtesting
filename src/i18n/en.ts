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

  footer: {
    rights: "All rights reserved.",
  },
};
