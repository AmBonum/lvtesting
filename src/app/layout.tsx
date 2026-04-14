import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lvtesting.eu"),
  title: "Lubomir Volcko | QA Automation Engineer",
  description:
    "QA Automation Engineer with 5+ years of experience in Playwright, Selenium, and full-stack development. Specializing in test automation, end-to-end testing, and mobile app development with Flutter.",
  keywords: [
    "QA Automation Engineer",
    "Playwright",
    "Test Automation",
    "Software Testing",
    "Flutter Developer",
    "Selenium",
    "Lubomir Volcko",
    "QA Engineer Slovakia",
  ],
  authors: [{ name: "Lubomir Volcko" }],
  creator: "Lubomir Volcko",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lvtesting.eu",
    siteName: "LV Testing",
    title: "Lubomir Volcko | QA Automation Engineer",
    description:
      "QA Automation Engineer specializing in Playwright test automation, end-to-end testing, and full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lubomir Volcko - QA Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lubomir Volcko | QA Automation Engineer",
    description:
      "QA Automation Engineer specializing in Playwright test automation and full-stack development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-friendly site info" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="LLM-friendly full site content" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Lubomir Volcko",
              alternateName: "Lubomír Volčko",
              url: "https://lvtesting.eu",
              image: "https://lvtesting.eu/og-image.jpg",
              jobTitle: "QA Automation Engineer",
              description:
                "QA Automation Engineer with 5+ years of experience in test automation, full-stack web and mobile development, and UX/UI design. Based in Slovakia.",
              knowsAbout: [
                "QA Automation",
                "Test Automation",
                "Playwright",
                "Selenium",
                "Appium",
                "Cypress",
                "Flutter",
                "Mobile App Development",
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "UX/UI Design",
                "Figma",
                "Azure DevOps",
                "CI/CD",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Caterpillar Slovakia (via Moxymind)",
                url: "https://www.caterpillar.com",
              },
              alumniOf: [
                { "@type": "Organization", name: "GlobalLogic Slovakia" },
                { "@type": "Organization", name: "Ness KE" },
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "SK",
                addressRegion: "Slovakia",
              },
              sameAs: [],
              hasOccupation: [
                {
                  "@type": "Occupation",
                  name: "QA Automation Engineer",
                  occupationalCategory: "15-1256.00",
                  skills:
                    "Playwright, Selenium, Appium, Cypress, Cucumber, Test Plans, Test Cases, CI/CD, Azure DevOps, GitHub Actions",
                },
                {
                  "@type": "Occupation",
                  name: "Flutter Developer",
                  skills: "Flutter, Dart, Firebase, iOS, Android, Stripe, WebSockets",
                },
                {
                  "@type": "Occupation",
                  name: "UX/UI Designer",
                  skills: "Figma, Adobe Illustrator, Adobe Photoshop, Prototyping",
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Lubomir Volcko | QA Automation Engineer",
              url: "https://lvtesting.eu",
              description:
                "Portfolio and freelance services of Lubomir Volcko — QA Automation Engineer, Flutter Developer, and UX/UI Designer based in Slovakia.",
              inLanguage: ["en", "sk"],
              author: {
                "@type": "Person",
                name: "Lubomir Volcko",
                url: "https://lvtesting.eu",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Lubomir Volcko — QA & Development Services",
              url: "https://lvtesting.eu",
              description:
                "QA Automation, Mobile App Development (Flutter), Web Development (Next.js/React), and UX/UI Design services.",
              priceRange: "€1,000 - €15,000+",
              areaServed: {
                "@type": "Place",
                name: "Europe",
              },
              serviceType: [
                "QA Automation",
                "Test Automation",
                "Mobile App Development",
                "Web Application Development",
                "UX/UI Design",
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Development & QA Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Mobile App Development",
                      description:
                        "Cross-platform Flutter apps for iOS and Android, from Figma prototypes to App Store deployment.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Web App Development",
                      description:
                        "Full-stack web applications and admin panels using Next.js, React, TypeScript, and Node.js.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "QA Automation",
                      description:
                        "Automated testing frameworks with Playwright, test strategy design, CI/CD integration.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "UX/UI Design",
                      description:
                        "User interface design, Figma prototyping, promotional materials and digital content.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-bg-primary bg-noise bg-grid">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-purple focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          {children}
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
