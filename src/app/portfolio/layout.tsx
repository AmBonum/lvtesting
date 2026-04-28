import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — LV Testing",
  description:
    "Portfolio of Lubomir Volcko — full-stack developer and QA engineer. Web applications, mobile apps, and graphic design works built with React, TypeScript, Flutter, and more.",
  openGraph: {
    title: "Portfolio — LV Testing",
    description:
      "Portfolio of Lubomir Volcko — full-stack developer and QA engineer. Web applications, mobile apps, and graphic design works.",
    url: "https://lvtesting.eu/portfolio",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
