export const EASE = [0.22, 1, 0.36, 1] as const; // shared easing curve
export const EASE_GSAP = "power3.out";
export const DUR = { fast: 0.25, base: 0.6, slow: 1.1 };
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
};
export const dropdown = {
  hidden: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: EASE } },
};
