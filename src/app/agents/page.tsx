import type { Metadata } from "next";
import Link from "next/link";
import { agents } from "@/data/solutions";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import { CtaBand } from "@/components/pages/Sections";
import { wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "agents — KODRIX" };
export default function Index() {
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="relative isolate overflow-hidden pb-16 pt-[190px]">
          <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-cover bg-top" style={{ backgroundImage: "url(/img/hero-streaks.svg?v=2)" }}><div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/35 to-black" /></div>
          <div className={wrap}><p className="eyebrow">agents</p><h1 className="font-pixel mt-5 max-w-[720px] text-[44px] leading-[1.02] md:text-[64px]">Six agents. One engineering team.</h1></div>
        </section>
        <section className={`${wrap} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
          {agents.map((s, i) => (
            <Card key={s.slug} href={`/agents/${s.slug}`} className="group block p-8">
              <span className="font-mono text-[11px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-8 text-[22px] leading-7">{s.label}</h2><p className="mt-2 text-[14px] leading-[22px] text-fg-2">{s.lede}</p>
              <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.06em] text-[#ffb48a]">Learn more ↗</span>
              </Card>
          ))}
        </section>
        <div className="h-8" /><CtaBand />
      </main>
      <Footer />
    </>
  );
}
