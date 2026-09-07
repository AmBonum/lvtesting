import type { Metadata } from "next";
import "./v2.css";

export const metadata: Metadata = {
  title: "lvtesting.eu — v2 preview",
  description: "Preview of the next version of lvtesting.eu.",
  // This preview must never compete with the live site for the same
  // keywords in five languages. Removed when v2 is promoted to production.
  robots: {
    index: false,
    follow: false,
  },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="v2-body min-h-screen">{children}</div>;
}
