import type { Translations } from "./types";

export const es: Translations = {
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Habilidades",
    experience: "Experiencia",
    contact: "Contacto",
    portfolio: "Portfolio",
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

  consent: {
    banner: {
      title: "Valoramos tu privacidad",
      description: "Utilizamos cookies para analizar el tráfico del sitio y optimizar tu experiencia. Puedes elegir qué cookies permitir.",
      privacyLink: "Política de Privacidad",
      acceptAll: "Aceptar todas",
      rejectAll: "Rechazar todas",
      customize: "Personalizar",
    },
    settings: {
      title: "Configuración de Cookies",
      description: "Elige qué cookies deseas permitir. Puedes cambiar esta configuración en cualquier momento desde el pie de página.",
      necessary: {
        title: "Necesarias",
        description: "Esenciales para el funcionamiento del sitio web. Almacenan tu preferencia de idioma. No se recopilan datos personales.",
      },
      analytics: {
        title: "Analíticas",
        description: "Nos ayudan a comprender cómo los visitantes utilizan nuestro sitio web. Usamos Google Analytics con direcciones IP anonimizadas.",
      },
      marketing: {
        title: "Marketing",
        description: "Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas. Actualmente no están en uso.",
      },
      required: "Obligatoria",
      savePreferences: "Guardar preferencias",
      acceptAll: "Aceptar todas",
      rejectAll: "Rechazar todas",
    },
    footerLinks: {
      cookieSettings: "Configuración de Cookies",
      privacyPolicy: "Política de Privacidad",
    },
  },

  privacy: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 14 de abril de 2026",
    backHome: "Volver al inicio",
    sections: {
      controller: {
        heading: "Responsable del tratamiento",
        content: [
          "Lubomir Volcko (\"nosotros\", \"nos\", \"nuestro\")",
          "Sitio web: https://lvtesting.eu",
          "Correo electrónico: segnities@gmail.com",
          "Ubicación: Eslovaquia, Unión Europea",
        ],
      },
      dataCollection: {
        heading: "Qué datos recopilamos y por qué",
        content: [
          "Recopilamos datos para mejorar tu experiencia en nuestro sitio web y para comprender cómo los visitantes interactúan con nuestro contenido.",
          "Preferencia de idioma — se almacena localmente en tu navegador (localStorage) para recordar el idioma elegido. Es una función necesaria y no requiere consentimiento.",
          "Datos analíticos — se recopilan a través de Google Analytics 4 (GA4) solo después de que otorgues tu consentimiento explícito. Esto incluye: páginas visitadas, tiempo en el sitio, profundidad de desplazamiento, secciones visualizadas, clics en elementos clave, ubicación aproximada (a nivel de país a partir de IP anonimizada), tipo de dispositivo y navegador. Las direcciones IP se anonimizan antes del procesamiento.",
          "Datos de marketing — actualmente no se recopilan. Esta categoría existe como marcador de posición para futuras integraciones publicitarias (p. ej., Facebook Pixel, Google Ads). Las cookies de marketing solo se activarán tras tu consentimiento explícito.",
        ],
      },
      cookies: {
        heading: "Cookies que utilizamos",
        intro: "A continuación se detalla la lista de cookies utilizadas en este sitio web:",
        table: {
          name: "Nombre de la cookie",
          provider: "Proveedor",
          purpose: "Finalidad",
          duration: "Duración",
        },
        necessary: {
          name: "locale (localStorage)",
          description: "Almacena tu preferencia de idioma. Sin fecha de expiración — persiste hasta que borres los datos del navegador.",
        },
        analytics: {
          name: "_ga, _ga_*, _gid",
          description: "Google Analytics 4 — registra datos de uso anónimos. _ga expira a los 2 años, _gid a las 24 horas. Solo se establece tras el consentimiento.",
        },
        marketing: {
          name: "Ninguna actualmente",
          description: "No se utilizan cookies de marketing actualmente. Esta sección se actualizará si se añaden herramientas de marketing en el futuro.",
        },
      },
      usage: {
        heading: "Cómo utilizamos tus datos",
        content: [
          "Los datos analíticos se utilizan exclusivamente para comprender cómo los visitantes interactúan con nuestro sitio web y para mejorar su contenido y experiencia de usuario.",
          "No vendemos, alquilamos ni compartimos tus datos personales con terceros, salvo Google Analytics (que procesa los datos conforme a su propia política de privacidad).",
          "Todos los datos analíticos se recopilan con direcciones IP anonimizadas, lo que hace imposible identificar a usuarios individuales.",
        ],
      },
      rights: {
        heading: "Tus derechos según el RGPD",
        content: [
          "En virtud del Reglamento General de Protección de Datos (UE 2016/679) y la Ley eslovaca 18/2018 Z.z., dispones de los siguientes derechos:",
          "Derecho de acceso — Puedes solicitar una copia de los datos que tenemos sobre ti.",
          "Derecho de rectificación — Puedes pedirnos que corrijamos datos inexactos.",
          "Derecho de supresión — Puedes pedirnos que eliminemos tus datos (\"derecho al olvido\").",
          "Derecho a la limitación del tratamiento — Puedes pedirnos que restrinjamos el uso de tus datos.",
          "Derecho a la portabilidad de los datos — Puedes solicitar tus datos en un formato legible por máquina.",
          "Derecho de oposición — Puedes oponerte al tratamiento basado en interés legítimo.",
          "Derecho a retirar el consentimiento — Puedes retirar tu consentimiento de cookies en cualquier momento a través del enlace \"Configuración de Cookies\" en el pie de página. Esto no afecta a la licitud del tratamiento previo a la retirada.",
        ],
      },
      contact: {
        heading: "Cómo ejercer tus derechos",
        content: [
          "Para ejercer cualquiera de estos derechos, contáctanos en: segnities@gmail.com",
          "Responderemos a tu solicitud en un plazo de 30 días, conforme a lo exigido por el RGPD.",
        ],
      },
      authority: {
        heading: "Autoridad de control",
        content: [
          "Si consideras que se han vulnerado tus derechos de protección de datos, tienes derecho a presentar una reclamación ante la autoridad de control:",
          "Úrad na ochranu osobných údajov Slovenskej republiky (Oficina para la Protección de Datos Personales de la República Eslovaca)",
          "Hraničná 12, 820 07 Bratislava 27, Eslovaquia",
          "Sitio web: https://dataprotection.gov.sk",
          "Teléfono: +421 2 3231 3214",
        ],
      },
      changes: {
        heading: "Cambios en esta política",
        content: [
          "Podemos actualizar esta política de privacidad periódicamente. Cuando realicemos cambios sustanciales, el banner de consentimiento volverá a aparecer para que puedas revisar y actualizar tus preferencias.",
          "La fecha de \"Última actualización\" en la parte superior de esta página refleja los cambios más recientes.",
        ],
      },
    },
  },

  errors: {
    notFound: {
      title: "Página no encontrada",
      description: "La página que buscas no existe o ha sido movida.",
      backHome: "Volver al inicio",
    },
    serverError: {
      title: "Algo salió mal",
      description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
      tryAgain: "Intentar de nuevo",
      backHome: "Volver al inicio",
    },
    criticalError: {
      title: "Error crítico",
      description: "La aplicación encontró un error crítico. Por favor, recarga la página.",
      reload: "Recargar",
      backHome: "Volver al inicio",
    },
  },

  portfolio: {
    title: "Portfolio — LV Testing",
    seoDescription:
      "Portfolio de Lubomir Volcko — desarrollador full-stack e ingeniero de QA. Aplicaciones web, apps móviles y trabajos de diseño gráfico creados con React, TypeScript, Flutter y más.",
    copyright:
      "Todos los proyectos y diseños son propiedad intelectual de Lubomir Volcko. Todos los derechos reservados.",
    heading: "Portfolio",
    subtitle: "Una selección de mis trabajos",
    backHome: "Volver al inicio",
    webProjects: {
      heading: "Proyectos web",
      subtitle: "Aplicaciones full-stack construidas desde cero",
    },
    graphicDesigns: {
      heading: "Diseño gráfico",
      subtitle: "Trabajo de diseño visual y branding",
      comingSoon: "Muestras de trabajo próximamente",
    },
    subenai: {
      tagline:
        "subenai es una aplicación web educativa full-stack construida con React, TypeScript, Supabase y Cloudflare que enseña a los usuarios a reconocer estafas online a través de tests interactivos, lecciones de contenido y resultados medibles.",
      description:
        "Una aplicación web centrada en la seguridad digital. Ayuda a los usuarios a reconocer amenazas online como phishing, SMS fraudulentos, tiendas falsas e ingeniería social mediante tests interactivos y contenido educativo.",
      tech:
        "React 19 · TypeScript · TanStack Start/Router/Query · Vite · Tailwind CSS v4 · Radix UI · Supabase · Cloudflare Pages · Stripe · Vitest",
      visitSite: "Visitar sitio",
      features: [
        "Tests interactivos de detección de estafas",
        "Paquetes de tests temáticos y sectoriales",
        "Páginas educativas explicando tipos de ataques",
        "Evaluación detallada de respuestas y puntuación",
        "Compartir resultados y generación de imagen para redes sociales",
        "Sección de patrocinadores con pagos Stripe",
        "Cookie consent respetando la preferencia del usuario",
        "Base SEO con sitemap y meta tags",
      ],
      year: "2025",
    },
  },

  footer: {
    rights: "Todos los derechos reservados.",
  },
};
