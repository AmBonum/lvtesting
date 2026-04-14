"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/lib/ConsentProvider";
import {
  trackPageView,
  trackScrollDepth,
  trackSectionView,
  isGA4Initialized,
} from "@/lib/analytics";

const SECTIONS = ["about", "projects", "skills", "experience", "contact"];
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export function useAnalyticsTracking() {
  const { preferences } = useConsent();
  const trackedSections = useRef(new Set<string>());
  const trackedScrollDepths = useRef(new Set<number>());

  // Track hash-based navigation
  useEffect(() => {
    if (!preferences.analytics) return;

    function onHashChange() {
      if (!isGA4Initialized()) return;
      const path = window.location.hash || "/";
      trackPageView(path, document.title);
    }

    // Track initial page view
    trackPageView(window.location.hash || "/", document.title);

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [preferences.analytics]);

  // Track section views via IntersectionObserver
  useEffect(() => {
    if (!preferences.analytics) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!isGA4Initialized()) return;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            !trackedSections.current.has(entry.target.id)
          ) {
            trackedSections.current.add(entry.target.id);
            trackSectionView(entry.target.id);
          }
        }
      },
      { threshold: 0.3 }
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [preferences.analytics]);

  // Track scroll depth
  useEffect(() => {
    if (!preferences.analytics) return;

    function onScroll() {
      if (!isGA4Initialized()) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (
          percent >= threshold &&
          !trackedScrollDepths.current.has(threshold)
        ) {
          trackedScrollDepths.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [preferences.analytics]);
}
