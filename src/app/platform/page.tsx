import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";
import Card from "@/components/ui/Card";
import Mock, { type MockVariant } from "@/components/pages/Mock";
import { CtaBand } from "@/components/pages/Sections";
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

export default function Platform() {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <section className="relative isolate overflow-hidden pb-24 pt-[150px] md:pt-[167px]">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-[1100px]">
              {[0, 14.28, 28.57, 42.85, 57.14, 71.42, 85.71, 100].map((l) => (<i key={l} className="absolute inset-y-0 w-px bg-gradient-to-b from-white/15 to-transparent" style={{ left: `${l}%` }} />))}
            </div>
            <div className={wrap}>
              <p className="eyebrow">The KODRIX platform</p>
              <h1 className="font-pixel mt-5 max-w-[860px] text-[40px] leading-[1.02] sm:text-[56px] md:text-[72px]">Build the product.<br />Understand the work.<br />Improve what ships next.</h1>
              <p className="mt-7 max-w-[600px] text-[17px] leading-[1.55] text-white/90">Describe the work your agents do. Follow the changes they make. Review, learn and improve with every task.</p>
              <Link href="/contact" className="btn-primary mt-9 inline-flex h-[44px] items-center rounded-lg px-6">Start Building</Link>
              <div className="mt-16"><Mock variant="task" className="md:max-w-[620px]" /></div>
            </div>
          </section>

          {blocks.map((b) => (
            <section key={b.h} id={b.h.toLowerCase()} className={`${wrap} border-t border-white/10 kx-section`}>
              <p className="font-mono text-[11px] text-fg-3">{b.n}</p>
              <h2 className="mt-4 text-[56px] font-medium leading-none tracking-tight md:text-[72px]">{b.h}</h2>
              <p className="mt-5 max-w-[520px] text-[18px] leading-[1.5] text-fg-2">{b.lead}</p>
              <div className="mt-14 grid gap-4 md:grid-cols-3">
                {b.items.map((it) => (
                  <Card key={it.t} as="article" data-reveal className="flex flex-col p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#ffb48a]">{it.tag}</p>
                    <h3 className="mt-3 text-[20px] leading-6">{it.t}</h3>
                    <p className="mt-2 text-[14px] leading-[22px] text-fg-2">{it.d}</p>
                    <div className="mt-auto pt-6"><Mock variant={it.m} className="h-[250px]" /></div>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          <section className={`${wrap} border-t border-white/10 kx-section`}><h2 className="kx-h2">Learn from each new version.</h2><p className="kx-lede">Every task leaves the team a little better prepared for the next one.</p></section>
          <CtaBand />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
