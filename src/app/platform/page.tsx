import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";
import Card from "@/components/ui/Card";
import Mock, { type MockVariant } from "@/components/pages/Mock";
import AppFrame from "@/components/pages/AppFrame";
import FinalCTA from "@/components/FinalCTA";
import { wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Platform — KODRIX", description: "Build the product. Understand the work. Improve what ships next." };

const blocks: { n: string; h: string; lead: string; items: { tag: string; t: string; d: string; m: MockVariant }[] }[] = [
  { n: "01", h: "Build", lead: "Describe the product. Make it yours.", items: [
    { tag: "Tasks", t: "Plain-language work. Real code.", d: "Describe a feature or a bug. Agents plan it, write it and run the tests before you see it.", m: "task" },
    { tag: "Tool access", t: "Give agents the tools to finish the job.", d: "Attach repositories, shells and browsers, and control how each one can be called.", m: "tools" },
    { tag: "Isolation", t: "Every run in its own sandbox.", d: "Tasks execute in isolated environments with the permissions you set.", m: "terminal" } ] },
  { n: "02", h: "Observe", lead: "See exactly what happened.", items: [
    { tag: "Review", t: "Diffs you can read.", d: "Every change arrives with its tests, so reviewing takes minutes, not hours.", m: "diff" },
    { tag: "Outcomes", t: "Follow what gets merged.", d: "Track tasks from request to merge and spot where work gets stuck.", m: "kpi" },
    { tag: "Audit", t: "A record of every run.", d: "See what each agent read, ran and changed, and when.", m: "review" } ] },
  { n: "03", h: "Improve", lead: "Turn what you learn into a better team.", items: [
    { tag: "Feedback", t: "Reviews teach the agents.", d: "Comments on a diff become guidance for the next task.", m: "review" },
    { tag: "Conventions", t: "Capture how your team builds.", d: "Save patterns and rules so new code matches the old.", m: "task" },
    { tag: "Iterate", t: "Try, compare, adopt.", d: "Run a change, compare the result with the last one, and keep what works.", m: "kpi" } ] },
];

const callouts = ["Describe the work. Agents build it and show you the diff.", "Follow every task from request to merge, step by step.", "Feed what you learn back in so the next task goes better."];

export default function Platform() {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <section className="relative isolate overflow-hidden pb-16 pt-[150px] md:pt-[167px]">
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] opacity-60" style={{ background: "repeating-linear-gradient(90deg, rgba(0,0,0,0) 0 56px, rgba(0,0,0,.5) 56px 64px), linear-gradient(180deg,#8a3410 0%,#ef5a00 35%,#5a1d0a 70%,#000 100%)" }} />
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-black/30 to-black" />
            <div className={wrap}>
              <p className="eyebrow">The KODRIX platform</p>
              <div className="mt-5 grid gap-8 md:grid-cols-[2fr_1fr] md:items-end">
                <h1 className="font-pixel text-[38px] leading-[1.04] sm:text-[44px] md:text-[48px]">Build the agent.<br />Understand the outcome.<br />Improve what happens next.</h1>
                <p className="max-w-[340px] text-[15px] leading-[1.55] text-white/85">Describe the work your agents do. Follow the changes they make. Review, learn and improve with every task.</p>
              </div>
              <div className="mt-14"><AppFrame /></div>
            </div>
          </section>

          <nav aria-label="Platform sections" className={`${wrap} grid grid-cols-3 border-y border-white/10`}>
            {blocks.map((b) => (<a key={b.h} href={`#${b.h.toLowerCase()}`} className="py-5 font-mono text-[12px] uppercase tracking-[0.08em] text-white/60 transition hover:text-white">{b.h}</a>))}
          </nav>

          {blocks.map((b, bi) => (
            <section key={b.h} id={b.h.toLowerCase()} className={`${wrap} kx-section scroll-mt-20`}>
              <div className="grid gap-8 md:grid-cols-[1fr_300px] md:items-end">
                <div>
                  <p className="eyebrow mb-4">{b.n}</p>
                  <h2 className="text-[48px] font-medium leading-none tracking-tight md:text-[64px]">{b.h}</h2>
                  <p className="mt-4 max-w-[480px] text-[17px] leading-[1.5] text-fg-2">{b.lead}</p>
                </div>
                <p className="border-l border-white/15 pl-5 text-[13px] leading-[1.6] text-fg-2">{callouts[bi]}</p>
              </div>
              <div className="mt-16 space-y-16 md:space-y-24">
                {b.items.map((it, i) => (
                  <div key={it.t} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
                    <Card flat data-reveal className={`p-4 md:p-6 ${i % 2 ? "md:order-2" : ""}`}><Mock variant={it.m} /></Card>
                    <div className={i % 2 ? "md:order-1" : ""}>
                      <p className="eyebrow mb-4">{it.tag}</p>
                      <h3 className="max-w-[380px] text-[26px] leading-[1.15] tracking-tight md:text-[32px]">{it.t}</h3>
                      <p className="mt-4 max-w-[400px] text-[15px] leading-[1.6] text-fg-2">{it.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className={`${wrap} kx-section`}>
            <h2 className="kx-h2 mx-auto max-w-[620px] text-center">Learn from each new version.</h2>
            <p className="kx-lede mx-auto text-center">Every task leaves the team a little better prepared for the next one.</p>
            <Card flat className="mt-12 p-4 md:p-8"><Mock variant="kpi" /></Card>
          </section>
          <FinalCTA />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
