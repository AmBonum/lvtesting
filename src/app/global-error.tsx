"use client";

import { useState, useEffect } from "react";

const errorTranslations: Record<string, { title: string; description: string; reload: string; backHome: string }> = {
  en: {
    title: "Critical error",
    description: "The application encountered a critical error. Please try reloading the page.",
    reload: "Reload",
    backHome: "Back to home",
  },
  sk: {
    title: "Kritická chyba",
    description: "Aplikácia narazila na kritickú chybu. Skúste prosím znovu načítať stránku.",
    reload: "Načítať znova",
    backHome: "Späť na úvod",
  },
  cs: {
    title: "Kritická chyba",
    description: "Aplikace narazila na kritickou chybu. Zkuste prosím znovu načíst stránku.",
    reload: "Načíst znovu",
    backHome: "Zpět na úvod",
  },
  de: {
    title: "Kritischer Fehler",
    description: "Die Anwendung hat einen kritischen Fehler festgestellt. Bitte lade die Seite neu.",
    reload: "Neu laden",
    backHome: "Zurück zur Startseite",
  },
  es: {
    title: "Error crítico",
    description: "La aplicación encontró un error crítico. Por favor, recarga la página.",
    reload: "Recargar",
    backHome: "Volver al inicio",
  },
};

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [t, setT] = useState(errorTranslations.en);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale");
      if (saved && saved in errorTranslations) {
        setT(errorTranslations[saved]);
        setLang(saved);
      }
    } catch {
      // localStorage may not be available
    }
  }, []);

  return (
    <html lang={lang}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0F1A",
          color: "#F8F8F2",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 480,
            padding: 40,
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 16,
            boxShadow:
              "0 0 40px rgba(255, 107, 107, 0.15), 0 0 80px rgba(255, 107, 107, 0.05)",
          }}
        >
          <p
            style={{
              fontSize: 80,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#FF6B6B",
              margin: 0,
              lineHeight: 1,
            }}
          >
            500
          </p>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            {t.title}
          </h1>
          <p style={{ color: "#8892B0", marginTop: 12 }}>
            {t.description}
          </p>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "#FF6B6B",
                color: "#fff",
                border: "none",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {t.reload}
            </button>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                background: "transparent",
                color: "#8892B0",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              {t.backHome}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
