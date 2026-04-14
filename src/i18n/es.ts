import type { Translations } from "./types";

export const es: Translations = {
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Habilidades",
    experience: "Experiencia",
    contact: "Contacto",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Ir al contenido",
  },

  hero: {
    headline:
      "Diseño, desarrollo y pruebo aplicaciones web y móviles fiables — de la idea a producción",
    subheadline:
      "Desarrollo full-stack + QA en un solo flujo de trabajo. Diseño, construyo y valido sistemas para que realmente funcionen en condiciones reales.",
    offers: [
      "Aplicaciones web y paneles de administración",
      "Apps móviles (Flutter — iOS y Android)",
      "APIs backend y arquitectura de sistemas",
      "Diseño UX/UI (Figma)",
      "Testing automatizado y QA (Playwright)",
    ],
    credibility:
      "He trabajado en sistemas complejos incluyendo herramientas empresariales internas y plataformas completas de movilidad (web + móvil + backend).",
    badges: ["Apps Web", "Apps Móviles", "QA Automatización", "Diseño UX/UI"],
    ctaPrimary: "Iniciar un proyecto",
    ctaSecondary: "Ver mis trabajos",
  },

  about: {
    heading: "Sobre mí",
    subtitle: "Conóceme",
    paragraphs: [
      "Soy un QA Automation Engineer con más de 5 años de experiencia práctica entregando software de calidad en plataformas empresariales, aplicaciones móviles y web. Mi camino comenzó en el atletismo profesional — donde la disciplina, la precisión y la iteración incansable se convirtieron en segunda naturaleza.",
      "Hoy, aporto esa misma mentalidad a la calidad del software. Me especializo en construir frameworks robustos de automatización de pruebas con Playwright, diseñar estrategias integrales de pruebas y asegurar que cada lanzamiento cumpla los más altos estándares.",
      "Paralelamente, soy un apasionado desarrollador full-stack. Construyo aplicaciones móviles y web de nivel producción — desde la arquitectura hasta el despliegue. Es un hobby que me tomo en serio, y me da una perspectiva única: no solo pruebo software, entiendo cómo se construye.",
      "Más allá de la ingeniería, tengo más de 7 años de experiencia en diseño gráfico, con un fuerte enfoque en diseño UX/UI y Figma. Mi experiencia en diseño incluye la creación de materiales promocionales, carteles, vallas publicitarias y contenido digital que combina efectivamente funcionalidad con estética.",
    ],
    stats: [
      { value: "5+", label: "Años en QA" },
      { value: "100+", label: "Suites de pruebas" },
      { value: "6", label: "Empresas" },
      { value: "∞", label: "Bugs corregidos" },
    ],
  },

  projects: {
    heading: "Proyectos",
    subtitle: "Lo que he estado construyendo",
    badgeQA: "QA",
    badgeDev: "Dev",
    items: [
      {
        title: "QA Automatización @ Caterpillar",
        subtitle: "Pruebas de plataforma empresarial · vía Moxymind",
        description:
          "Contribuyendo a la automatización de pruebas para una plataforma interna que maneja formularios de inspección dinámicos y flujos de trabajo. Construyendo suites de pruebas con Playwright, escribiendo planes y casos de prueba, y mejorando procesos QA con herramientas modernas.",
        highlights: [
          "Pruebas automatizadas con Playwright",
          "Diseño de planes y casos de prueba",
          "Integración CI/CD vía Azure DevOps",
          "Desarrollo asistido por IA con Copilot",
        ],
      },
      {
        title: "Plataforma mobiX",
        subtitle: "Ecosistema de movilidad End-to-End",
        description:
          "Tomé una plataforma de movilidad existente y la adapté a los requisitos del cliente. Rediseñé las aplicaciones móviles, añadí nueva funcionalidad y corregí funciones existentes en todo el stack — API backend, plataforma web admin, aplicaciones móviles de pasajeros y conductores.",
        highlights: [
          "Comunicación en tiempo real (WebSockets)",
          "Integraciones de pago (Stripe, Google/Apple Pay)",
          "Mapas, geolocalización y lógica de viajes",
          "Ciclo de vida completo de app móvil",
          "Monitoreo y depuración en producción",
        ],
      },
    ],
  },

  skills: {
    heading: "Habilidades y herramientas",
    subtitle: "Mi kit técnico",
    categories: [
      "Automatización de pruebas",
      "Pruebas manuales",
      "Desarrollo móvil",
      "Desarrollo web",
      "DevOps y herramientas",
      "Bug tracking y QA",
    ],
  },

  experience: {
    heading: "Experiencia",
    subtitle: "Mi trayectoria profesional",
    items: [
      {
        role: "QA Automation Engineer",
        company: "Caterpillar Slovakia · vía Moxymind",
        period: "Ago 2024 – Presente",
        description:
          "Construyendo pruebas automatizadas para una plataforma interna que maneja formularios de inspección dinámicos y flujos de trabajo. Contribuyendo a mejoras de procesos QA con herramientas modernas.",
      },
      {
        role: "Flutter Engineer & Designer",
        company: "Freelance",
        period: "2024 – Presente",
        description:
          "Diseñando y construyendo aplicaciones móviles de producción. Ciclo de vida completo — desde prototipos en Figma hasta despliegue en App Store.",
      },
      {
        role: "Conductor Bolt & Pausa personal",
        company: "Autónomo",
        period: "Ago 2022 – Dic 2023",
        description:
          "Tomé una pausa deliberada del IT para recargar energías y ganar una perspectiva diferente. Trabajé como conductor de Bolt mientras exploraba nuevos intereses y reenfocaba mis objetivos profesionales.",
      },
      {
        role: "QA Engineer",
        company: "GlobalLogic Slovakia",
        period: "Ene 2022 – Jul 2022",
        description:
          "Pruebas automatizadas para aplicaciones web médicas. Asegurando cumplimiento y fiabilidad en un dominio altamente regulado.",
      },
      {
        role: "QA Engineer",
        company: "Ness KE",
        period: "Jun 2019 – Dic 2021",
        description:
          "Pruebas manuales y automatizadas para aplicaciones de gestión telemática. Construcción y mantenimiento de suites de pruebas en móvil y web.",
      },
      {
        role: "Diseñador gráfico",
        company: "IAESTE Slovakia",
        period: "Jul 2019 – Feb 2021",
        description:
          "Creación de diseños para redes sociales y materiales impresos. Desarrollo de contenido promocional, carteles y gráficos digitales combinando funcionalidad con estética.",
      },
      {
        role: "Trainee de desarrollo móvil",
        company: "GlobalLogic Slovakia",
        period: "Mar 2019 – Jun 2019",
        description:
          "Desarrollo de una aplicación móvil PoC 'Bethesda' enfocada en el cuidado de ancianos en residencias — organización de medicamentos, seguimiento de presión arterial y gestión diaria de cuidados.",
      },
    ],
  },

  companies: {
    heading: "Han confiado en mí",
  },

  contact: {
    heading: "Conectemos",
    subtitle: "¿Listos para trabajar juntos?",
    intro:
      "Ya sea que necesites un experto en QA para blindar tus lanzamientos, un desarrollador para dar vida a tu idea, o un diseñador para pulir tu producto — hablemos.",
    nameLabel: "Nombre",
    namePlaceholder: "Tu nombre",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    serviceLabel: "Me interesa",
    serviceHint: "(selecciona todos los que apliquen)",
    budgetLabel: "Rango de presupuesto",
    budgetPlaceholder: "Selecciona un rango",
    budgetOptions: [
      "< 1.000 €",
      "1.000 – 5.000 €",
      "5.000 – 15.000 €",
      "15.000+ €",
      "Hablémoslo",
    ],
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto...",
    send: "Enviar mensaje",
    sending: "Enviando...",
    successTitle: "¡Mensaje enviado!",
    successMessage: "Te responderé lo antes posible.",
    sendAnother: "Enviar otro mensaje",
    errorMessage:
      "Algo salió mal. Inténtalo de nuevo o contáctame por LinkedIn.",
    orFindMe: "O encuéntrame en",
    serviceOptions: [
      "Quiero una app móvil",
      "Quiero una app web",
      "Quiero web y móvil",
      "No sé qué necesito",
      "Sé exactamente lo que quiero",
    ],
    iKnowExactly: "Sé exactamente lo que quiero",
    detailedServiceOptions: [
      "QA / Automatización de pruebas",
      "Desarrollo de apps móviles",
      "Desarrollo web",
      "Backend / Desarrollo de APIs",
      "Diseño UX/UI",
      "Consultoría",
    ],
  },

  footer: {
    rights: "Todos los derechos reservados.",
  },
};
