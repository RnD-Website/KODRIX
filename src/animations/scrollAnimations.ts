import { gsap, ScrollTrigger } from "./gsap";
import { EASE_GSAP } from "./transitions";

/** Generic scroll reveals: [data-reveal] fades/rises, [data-reveal-stagger] children stagger, [data-clip] clip-path wipes. */
export function initReveals(root: HTMLElement) {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        y: 32, opacity: 0, duration: 0.9, ease: EASE_GSAP,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
      gsap.from(Array.from(el.children), {
        y: 28, opacity: 0, duration: 0.8, ease: EASE_GSAP, stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
      gsap.from(el.querySelectorAll("[data-mask-line]"), {
        yPercent: 105, duration: 1, ease: EASE_GSAP, stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(8% 6% 8% 6% round 16px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 8px)", ease: "none",
        scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true },
      });
    });
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      const amt = parseFloat(el.dataset.parallax || "40");
      gsap.fromTo(el, { y: -amt }, { y: amt, ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
  }, root);
  ScrollTrigger.refresh();
  return () => ctx.revert();
}
