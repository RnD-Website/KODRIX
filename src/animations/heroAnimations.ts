import { gsap } from "./gsap";
import { EASE_GSAP } from "./transitions";

export function heroIntro(root: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.set("[data-hero-bg]", { opacity: 0 });
    const tl = gsap.timeline({ defaults: { ease: EASE_GSAP } });
    tl.to("[data-hero-bg]", { opacity: 1, duration: 1.6, ease: "power2.out" }, 0)
      .from("[data-hero-eyebrow]", { y: 12, opacity: 0, duration: 0.6 }, 0.15)
      .from("[data-hero-line]", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.25)
      .from("[data-hero-copy]", { y: 18, opacity: 0, duration: 0.8 }, 0.55)
      .from("[data-hero-card]", { y: 60, opacity: 0, duration: 1.1 }, 0.5);
  }, root);
  return () => ctx.revert();
}
