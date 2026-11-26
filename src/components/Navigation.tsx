"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navGroups } from "@/data/navigation";
import { dropdown } from "@/animations/transitions";
import { track } from "@/lib/analytics";
import Logo from "./ui/Logo";

const Chevron = ({ open }: { open: boolean }) => (
  <svg width="9" height="9" viewBox="0 0 8 8" className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true">
    <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
  </svg>
);

/** Header: 54px glass bar, logo at 56px inset, centered 109x40 nav items, Sign in + 119x42 CTA. */
export default function Navigation({ light = false }: { light?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeT = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMobile(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.documentElement.style.overflow = mobile ? "hidden" : ""; }, [mobile]);

  const enter = (l: string) => { if (closeT.current) clearTimeout(closeT.current); setOpen(l); };
  const leave = () => { closeT.current = setTimeout(() => setOpen(null), 140); };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${light ? "[&_nav_button]:!text-black [&_.hdr-link]:!text-black [&_nav_button:hover]:!bg-black/5 [&_.hdr-link:hover]:!bg-black/5" : ""}`}>
      <div className={`absolute inset-x-0 top-0 h-[54px] transition-all duration-500 ${light ? "bg-white/85 backdrop-blur-xl border-b border-black/5" : scrolled || mobile ? "bg-[rgba(0,0,0,.72)] backdrop-blur-xl" : "bg-[rgba(0,0,0,.45)] backdrop-blur-md"}`} aria-hidden />
      <div className="relative mx-auto flex h-[54px] max-w-[1440px] items-center justify-between px-5 md:px-14">
        <a href="/" aria-label="KODRIX home" className={`relative z-10 ${light ? "invert" : ""}`}><Logo /></a>

        <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex" onMouseLeave={leave}>
          {navGroups.slice(0, 4).map((g) => (
            <div key={g.label} className="relative" onMouseEnter={() => enter(g.label)}>
              <button aria-expanded={open === g.label} aria-haspopup="true" onFocus={() => enter(g.label)}
                onClick={() => { setOpen(open === g.label ? null : g.label); track("nav_open", { menu: g.label }); }}
                className={`flex h-10 items-center gap-1.5 rounded-lg px-4 text-[14px] leading-6 transition-colors ${open === g.label ? "bg-white/[.06] text-fg" : "text-fg hover:bg-white/[.06]"}`}>
                {g.label}<span className="text-fg-3"><Chevron open={open === g.label} /></span>
              </button>
              <AnimatePresence>
                {open === g.label && (
                  <motion.div variants={dropdown} initial="hidden" animate="show" exit="hidden"
                    className="absolute left-0 top-full mt-[22px] w-[336px] origin-top rounded-xl border border-line bg-[rgba(6,6,7,.96)] p-1.5 shadow-2xl backdrop-blur-xl">
                    <p className="px-3.5 pb-3 pt-1.5 font-mono text-[11px] leading-[14px] text-fg/55">{g.label === "Platform" ? "The KODRIX platform" : g.label}</p>
                    {g.items.map((it, i) => (
                      <a key={it.title} href={it.href} onClick={() => { setOpen(null); track("nav_click", { item: it.title }); }}
                        className="grid grid-cols-[24px_1fr] gap-0 rounded-lg px-3.5 py-3 transition-colors hover:bg-white/[.06] focus-visible:bg-white/[.06] focus-visible:outline-none">
                        <span className="pt-0.5 font-mono text-[11px] leading-5 text-fg/55">{String(i + 1).padStart(2, "0")}</span>
                        <span>
                          <span className="block text-[14px] leading-5 text-fg/90">{it.title}</span>
                          {it.desc && <span className="mt-1 block text-[13px] leading-[19px] text-fg/55">{it.desc}</span>}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-1">
          <a href="/sign-in" className="hdr-link hidden h-[42px] items-center rounded-lg px-4 text-[14px] text-fg/90 transition hover:bg-white/[.06] sm:inline-flex">Sign in</a>
          <a href="/contact" onClick={() => track("cta_start_building_nav")}
            className="inline-flex h-[42px] items-center justify-center whitespace-nowrap rounded-lg px-5 font-mono text-[11px] uppercase leading-[14px] tracking-[0.06em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_24px_-8px_rgba(239,90,0,.8)] transition hover:brightness-110 active:scale-[.98]"
            style={{ background: "linear-gradient(155.7deg,#f7732b 13.97%,#ef5a00 60%,#c94a00)" }}>Start Building</a>
          <button className="ml-1 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden" aria-label={mobile ? "Close menu" : "Open menu"} aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            <span className={`h-px w-5 bg-white transition-transform duration-300 ${mobile ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-white transition-transform duration-300 ${mobile ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[54px] overflow-y-auto bg-bg px-5 pb-10 pt-4 lg:hidden">
            {navGroups.map((g) => (
              <details key={g.label} className="group border-b border-line-2">
                <summary className="flex h-14 cursor-pointer list-none items-center justify-between text-[17px]">{g.label}<span className="text-fg-3 transition group-open:rotate-180"><Chevron open={false} /></span></summary>
                <div className="pb-3">{g.items.map((it) => (<a key={it.title} href={it.href} onClick={() => setMobile(false)} className="block py-2.5 text-[15px] text-fg-2">{it.title}</a>))}</div>
              </details>
            ))}
            <a href="/contact" onClick={() => setMobile(false)} className="btn-primary mt-6 inline-flex h-11 w-full items-center justify-center">Start Building</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
