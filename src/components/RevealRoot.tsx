"use client";
import { useEffect, useRef } from "react";
import { initReveals } from "@/animations/scrollAnimations";

export default function RevealRoot({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    return initReveals(ref.current);
  }, []);
  return <div ref={ref}>{children}</div>;
}
