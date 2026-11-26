"use client";
import { RefObject, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";

/** 0..1 progress while the element scrolls through the viewport (start top-top, end bottom-bottom). */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => setP(s.progress),
    });
    return () => st.kill();
  }, [ref]);
  return p;
}
export { gsap };
