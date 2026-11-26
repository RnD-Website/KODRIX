"use client";
import Link from "next/link";
import { useState } from "react";
import Mock, { type MockVariant } from "./Mock";
import Card from "../ui/Card";
import { wrap } from "@/lib/ui";

const streaks = {
  background:
    "repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 56px, rgba(0,0,0,.55) 56px 64px), linear-gradient(180deg,#3a1408 0%,#8a3410 22%,#ef5a00 46%,#5a1d0a 70%,#000 100%)",
} as const;

/** Centered hero with three product frames over a streaked gradient (layout mirrors the reference). */
export function CenterHero({ eyebrow, title, lede, cta2, mocks }: { eyebrow: string; title: string; lede: string; cta2: { label: string; href: string }; mocks: [MockVariant, MockVariant, MockVariant] }) {
  return (
    <section className="relative isolate overflow-hidden pb-0 pt-[150px] text-center md:pt-[180px]">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[760px] opacity-70" style={streaks} />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-gradient-to-b from-black/60 via-transparent to-black" />
      <div className={wrap}>
        <p className="eyebrow justify-center">{eyebrow}</p>
        <h1 className="font-pixel mx-auto mt-5 max-w-[640px] text-[40px] leading-[1.05] sm:text-[52px] md:text-[60px]">{title}</h1>
        <p className="mx-auto mt-6 max-w-[520px] text-[16px] leading-[1.55] text-white/85">{lede}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary inline-flex h-[44px] items-center whitespace-nowrap rounded-lg px-6">Start Building</Link>
          <Link href={cta2.href} className="btn-ghost">{cta2.label}</Link>
        </div>
        <div className="relative mx-auto mt-16 grid max-w-[1000px] grid-cols-1 items-end gap-4 md:grid-cols-[1fr_1.35fr_1fr]">
          <div className="hidden h-[300px] overflow-hidden md:block"><Mock variant={mocks[0]} className="rounded-b-none" /></div>
          <div className="h-[340px] overflow-hidden"><Mock variant={mocks[1]} className="rounded-b-none" /></div>
          <div className="hidden h-[300px] overflow-hidden md:block"><Mock variant={mocks[2]} className="rounded-b-none" /></div>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}

export function ConnectStrip() {
  const names = ["GitHub", "GitLab", "Slack", "Linear", "Jira", "Vercel"];
  return (
    <section className={`${wrap} py-10`} aria-label="Integrations">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-fg-3">Connects with the tools you already use</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 font-mono text-[13px] uppercase tracking-[0.08em] text-white/45">
        {names.map((n) => <li key={n}>{n}</li>)}
      </ul>
    </section>
  );
}

/** Numbered list on the left, product panel on the right — the "channels" block of the reference. */
export function ListPanel({ eyebrow, title, items, mocks }: { eyebrow: string; title: string; items: { title: string; desc: string }[]; mocks: MockVariant[] }) {
  const [a, setA] = useState(0);
  return (
    <section className={`${wrap} kx-section`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="kx-h2 max-w-[760px]">{title}</h2>
      <div className="mt-12 grid items-start gap-6 md:grid-cols-[1fr_1.1fr]">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it, i) => (
            <li key={it.title}>
              <button onClick={() => setA(i)} aria-expanded={a === i} className="flex w-full gap-5 py-6 text-left">
                <span className={`pt-1 font-mono text-[11px] ${a === i ? "text-[#f7732b]" : "text-fg-3"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className={`block text-[20px] leading-6 transition ${a === i ? "text-white" : "text-white/55"}`}>{it.title}</span>
                  <span className={`grid transition-all duration-500 ${a === i ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"}`}><span className="overflow-hidden text-[14px] leading-[22px] text-fg-2">{it.desc}</span></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Card flat className="p-3"><Mock variant={mocks[a % mocks.length]} /></Card>
      </div>
    </section>
  );
}

export function SpeedStrip({ title, items }: { title: string; items: { title: string; desc: string }[] }) {
  return (
    <section className={`${wrap} kx-section text-center`}>
      <h2 className="font-pixel mx-auto max-w-[640px] text-[34px] leading-[1.08] text-white/70 md:text-[46px]">{title}</h2>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {items.map((o) => (
          <div key={o.title}>
            <p className="font-pixel text-[34px] leading-[1.05] md:text-[44px]">{o.title}</p>
            <p className="mx-auto mt-3 max-w-[260px] font-mono text-[10px] uppercase leading-5 tracking-[0.08em] text-fg-3">{o.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">Qualitative goals — not measured results.</p>
    </section>
  );
}

/** Big dark feature cards with the product UI sitting at the bottom edge. First is full width, the rest pair up. */
export function FeatureCards({ rows }: { rows: { title: string; desc: string; mock: MockVariant }[] }) {
  return (
    <section className={`${wrap} space-y-4 pb-10`}>
      {rows.map((r, i) => (
        <Card key={r.title} flat data-reveal className={`overflow-hidden ${i === 0 ? "" : ""}`}>
          <div className={i === 0 ? "grid items-center gap-8 p-8 md:grid-cols-[1fr_1.2fr] md:p-12" : "p-8 md:p-10"}>
            <div>
              <p className="eyebrow mb-4">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-[26px] leading-[1.12] tracking-tight md:text-[34px]">{r.title}</h3>
              <p className="mt-4 max-w-[440px] text-[15px] leading-[1.6] text-fg-2">{r.desc}</p>
            </div>
            <div className={i === 0 ? "" : "mt-8 max-h-[300px] overflow-hidden"}><Mock variant={r.mock} /></div>
          </div>
        </Card>
      ))}
    </section>
  );
}
