"use client";

import { useAnalyticsTracking } from "@/hooks/useAnalyticsTracking";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Companies from "@/components/Companies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  useAnalyticsTracking();

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Companies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
