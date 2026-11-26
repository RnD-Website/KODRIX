"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { initAnalytics, stopAnalytics } from "@/lib/analytics";
import { readConsent } from "@/lib/consent";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Smooth scrolling (Lenis) synced with ScrollTrigger. No scroll-jacking: native scroll distance, eased only.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  // Consent-aware analytics.
  useEffect(() => {
    if (readConsent().analytics) initAnalytics();
    const onConsent = (e: Event) => {
      const c = (e as CustomEvent).detail;
      c.analytics ? initAnalytics() : stopAnalytics();
    };
    window.addEventListener("kodrix:consent", onConsent);
    return () => window.removeEventListener("kodrix:consent", onConsent);
  }, []);

  return <>{children}</>;
}
