export const siteConfig = {
  name: "Lubomir Volcko",
  title: "QA Automation Engineer",
  subtitle: "Passionate Full-Stack Developer",
  url: "https://lvtesting.eu",
  email: "segnities@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/lubomirvolcko/",
    github: "https://github.com/LVSoftwareTesting",
  },
};

export const heroContent = {
  greeting: "Hello, I'm",
  name: "Lubomir Volcko",
  role: "QA Automation Engineer",
  tagline:
    "I build confidence in software — through rigorous automation, end-to-end testing, and a developer's eye for quality. When I'm not breaking things professionally, I'm building full-stack apps that work.",
  badges: ["5+ Years QA", "Playwright", "Flutter", "Full-Stack"],
  cta: {
    primary: { label: "Let's Build Together", href: "#contact" },
    secondary: { label: "View Projects", href: "#projects" },
  },
};

export const aboutContent = {
  heading: "About Me",
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
};

export const projects = [
  {
    title: "QA Automation @ Caterpillar",
    subtitle: "Enterprise Platform Testing · via Moxymind",
    description:
      "Contributing to test automation for an internal platform handling dynamic inspection forms and inspection workflows. Building Playwright test suites, writing test plans and test cases, and improving QA processes with modern tooling.",
    tags: ["Playwright", "Azure DevOps", "GitHub", "Copilot", "Enterprise"],
    accent: "purple" as const,
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
    tags: [
      "Flutter",
      "WebSockets",
      "Stripe",
      "Google Pay",
      "Apple Pay",
      "Maps",
      "Firebase",
    ],
    accent: "coral" as const,
    highlights: [
      "Real-time communication (WebSockets)",
      "Payment integrations (Stripe, Google/Apple Pay)",
      "Maps, geolocation & ride logic",
      "Full mobile app lifecycle",
      "Production monitoring & debugging",
    ],
  },
];

export const skills = [
  {
    category: "Test Automation",
    icon: "🤖",
    tools: ["Playwright", "Selenium", "Appium", "Cypress", "Cucumber"],
    level: 90,
    accent: "purple" as const,
  },
  {
    category: "Manual Testing",
    icon: "🔍",
    tools: ["Test Plans", "Test Cases", "Exploratory", "Regression", "UAT"],
    level: 95,
    accent: "coral" as const,
  },
  {
    category: "Mobile Development",
    icon: "📱",
    tools: ["Flutter", "Firebase", "iOS", "Android", "Figma"],
    level: 75,
    accent: "teal" as const,
  },
  {
    category: "Web Development",
    icon: "🌐",
    tools: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
    level: 65,
    accent: "yellow" as const,
  },
  {
    category: "DevOps & Tools",
    icon: "⚙️",
    tools: ["Azure DevOps", "GitHub Actions", "Jenkins", "Git", "Postman"],
    level: 80,
    accent: "purple" as const,
  },
  {
    category: "Bug Tracking & QA",
    icon: "🐛",
    tools: ["Jira", "TestRail", "Azure TestPlans", "Bugzilla", "qTest"],
    level: 90,
    accent: "teal" as const,
  },
];

export const experience = [
  {
    role: "QA Automation Engineer",
    company: "Caterpillar Slovakia · via Moxymind",
    period: "Aug 2024 – Present",
    description:
      "Building automated tests for an internal platform handling dynamic inspection forms and workflows. Contributing to QA process improvements with modern tooling.",
    stack: ["Playwright", "VS Code", "Copilot", "Azure DevOps"],
    accent: "purple" as const,
  },
  {
    role: "Flutter Engineer & Designer",
    company: "Freelance",
    period: "2024 – Present",
    description:
      "Designing and building production mobile applications. Full lifecycle — from Figma prototypes to App Store deployment.",
    stack: ["Flutter", "Firebase", "GoogleAuth", "Figma", "iOS", "Android"],
    accent: "coral" as const,
  },
  {
    role: "Bolt Driver & Personal Break",
    company: "Self-employed",
    period: "Aug 2022 – Dec 2023",
    description:
      "Took a deliberate break from IT to recharge and gain a different perspective. Worked as a Bolt driver while exploring new interests and refocusing career goals.",
    stack: ["Bolt", "Customer Service", "Self-management"],
    accent: "yellow" as const,
  },
  {
    role: "QA Engineer",
    company: "GlobalLogic Slovakia",
    period: "Jan 2022 – Jul 2022",
    description:
      "Automated testing for medical web applications. Ensured compliance and reliability in a highly regulated domain.",
    stack: ["Serenity", "Selenium", "REST API", "Jira", "Java"],
    accent: "teal" as const,
  },
  {
    role: "QA Engineer",
    company: "Ness KE",
    period: "Jun 2019 – Dec 2021",
    description:
      "Manual and automated testing for telematics management applications. Built and maintained test suites across mobile and web.",
    stack: ["Selenium", "TestRail", "Postman", "Jenkins", "Jira"],
    accent: "yellow" as const,
  },
  {
    role: "Graphic Designer",
    company: "IAESTE Slovakia",
    period: "Jul 2019 – Feb 2021",
    description:
      "Creating designs for social media and print materials. Developed promotional content, posters, and digital graphics combining functionality with aesthetics.",
    stack: ["Figma", "Illustrator", "Photoshop"],
    accent: "coral" as const,
  },
  {
    role: "Trainee Mobile Developer",
    company: "GlobalLogic Slovakia",
    period: "Mar 2019 – Jun 2019",
    description:
      "Developed a PoC mobile application 'Bethesda' focused on eldercare in retirement homes — pill organization, blood pressure tracking, and daily care management.",
    stack: ["Android Studio", "Flutter", "Dart", "JSON", "XML"],
    accent: "teal" as const,
  },
];

export const companies = [
  { name: "Caterpillar", url: "https://www.caterpillar.com" },
  { name: "mobiX", url: "https://mobix.eu.sk/" },
  { name: "Moxymind", url: "https://moxymind.eu/" },
  { name: "Masternaut", url: "https://www.masternaut.com" },
  { name: "GlobalLogic", url: "https://www.globallogic.com" },
  { name: "Ness KE", url: "https://www.ness.com" },
  { name: "IAESTE", url: "https://www.iaeste.sk" },
];
