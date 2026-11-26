"use client";
import Link from "next/link";
import { useState } from "react";
import Mock, { type MockVariant } from "./Mock";
import Card from "../ui/Card";

import { wrap } from "@/lib/ui";
const ghost = "btn-ghost";

/** Photo-mosaic hero from the reference, rebuilt with original tilted tiles (no copied imagery). */
export function MosaicHero({ eyebrow, title, lede, cta2 }: { eyebrow: string; title: string; lede: string; cta2: { label: string; href: string } }) {
  const tiles = [
    "linear-gradient(135deg,#1c3b73,#0a0d1c)", "linear-gradient(160deg,#d9772b,#6e2a3a)", "linear-gradient(135deg,#2a5fb0,#1c3b73)", "linear-gradient(150deg,#0a0d1c,#c2481f)",
    "linear-gradient(135deg,#9a2f1d,#1a1210)", "linear-gradient(120deg,#e8edef,#7aa8ff)", "linear-gradient(135deg,#17171a,#2a5fb0)", "linear-gradient(160deg,#f7732b,#3b3a86)",
  ];
  return (
    <section className="relative isolate min-h-[640px] overflow-hidden pb-24 pt-[200px] md:pt-[250px]">
      <div aria-hidden className="absolute inset-0 -z-10 grid grid-cols-4 gap-3 p-3 opacity-80 [transform:perspective(1200px)_rotateX(6deg)_scale(1.08)] md:grid-cols-5">
        {[...tiles, ...tiles.slice(0, 4)].map((g, i) => (<i key={i} className="rounded-lg" style={{ background: g, transform: `rotate(${(i % 3 - 1) * 2.2}deg)`, aspectRatio: i % 2 ? "3/4" : "1/1", boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)" }} />))}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black to-transparent" />
      <div className={wrap}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-pixel mt-5 max-w-[620px] text-[42px] leading-[1.03] sm:text-[52px] md:text-[60px]">{title}</h1>
        <p className="mt-6 max-w-[560px] text-[16px] leading-[1.55] text-white/90 md:text-[17px]">{lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className="btn-primary inline-flex h-[44px] items-center rounded-lg px-6">Start Building</Link>
          <Link href={cta2.href} className={ghost}>{cta2.label}</Link>
        </div>
      </div>
    </section>
  );
}

export function WhyUs({ title, items, mock = "task" }: { title: string; items: { title: string; desc: string }[]; mock?: MockVariant }) {
  return (
    <section className={`${wrap} grid gap-12 kx-section md:grid-cols-[1fr_480px] md:gap-16`}>
      <div>
        <p className="eyebrow mb-5">Why KODRIX</p>
        <h2 className="kx-h2">{title}</h2>
        <div className="mt-10 space-y-4">
          {items.map((it, i) => (
            <Card key={it.title} data-reveal className="p-6">
              <span className="font-mono text-[11px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-[19px] leading-6">{it.title}</h3>
              <p className="mt-2 max-w-[460px] text-[14px] leading-[22px] text-fg-2">{it.desc}</p>
            </Card>
          ))}
        </div>
      </div>
      <div className="md:sticky md:top-28 md:self-start"><Mock variant={mock} /></div>
    </section>
  );
}

export function FeatureRows({ rows }: { rows: { title: string; desc: string; mock: MockVariant }[] }) {
  return (
    <section className="py-8">
      {rows.map((r, i) => (
        <div key={r.title} className={`${wrap} grid items-center gap-10 border-t border-white/10 py-20 md:grid-cols-2 md:gap-20`}>
          <div className={i % 2 ? "md:order-2" : ""}>
            <h3 className="text-[30px] leading-[1.1] tracking-tight md:text-[40px]">{r.title}</h3>
            <p className="mt-5 max-w-[440px] text-[16px] leading-[1.6] text-fg-2">{r.desc}</p>
          </div>
          <div data-reveal className={i % 2 ? "md:order-1" : ""}><Mock variant={r.mock} /></div>
        </div>
      ))}
    </section>
  );
}

export function Outcomes({ title, items }: { title: string; items: { title: string; desc: string }[] }) {
  return (
    <section className={`${wrap} kx-section`}>
      <h2 className="kx-h2 max-w-[640px]">{title}</h2>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {items.map((o) => (<Card key={o.title} className="p-8"><h3 className="text-[26px] leading-[1.15] md:text-[31px]">{o.title}</h3><p className="mt-3 text-[14px] leading-[22px] text-fg-2">{o.desc}</p></Card>))}
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">Qualitative goals — not measured results.</p>
    </section>
  );
}

export function Faq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={`${wrap} grid gap-10 kx-section md:grid-cols-[1fr_1.4fr]`}>
      <h2 className="kx-h2">{title}</h2>
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((f, i) => (
          <div key={f.q}>
            <button className="flex w-full items-center justify-between gap-6 py-5 text-left text-[18px]" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
              {f.q}<span aria-hidden className={`text-[22px] text-fg-3 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}><p className="overflow-hidden text-[15px] leading-[1.6] text-fg-2">{f.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBand({ title = "See what KODRIX can build for you." }: { title?: string }) {
  return (
    <section className="relative isolate overflow-hidden py-28 text-center">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_100%,rgba(239,90,0,.35),transparent)]" />
      <div className={wrap}>
        <h2 className="font-pixel mx-auto max-w-[760px] text-[38px] leading-[1.05] md:text-[52px]">{title}</h2>
        <Link href="/contact" className="btn-primary mt-9 inline-flex h-[46px] items-center rounded-lg px-7">Start Building</Link>
      </div>
    </section>
  );
}
