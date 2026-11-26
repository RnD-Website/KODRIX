"use client";
import Link from "next/link";
import { useState } from "react";
import type { PageDef } from "@/data/pages";
import Navigation from "./Navigation";
import Footer from "./Footer";
import Card from "./ui/Card";
import RevealRoot from "./RevealRoot";

function Form({ kind }: { kind: "contact" | "signin" }) {
  const [sent, setSent] = useState(false);
  const field = "h-12 w-full rounded-lg bg-[rgba(242,241,236,.05)] px-4 text-[15px] text-fg ring-1 ring-white/10 placeholder:text-fg/40 focus:outline-none focus:ring-blue/60";
  if (sent) return <p className="rounded-xl border border-line bg-card p-6 text-fg-2">Thanks — this is a demo form, so nothing was sent.</p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid max-w-[540px] gap-3">
      {kind === "contact" && <><label className="sr-only" htmlFor="n">Name</label><input id="n" required placeholder="Your name" className={field} /></>}
      <label className="sr-only" htmlFor="e">Email</label><input id="e" type="email" required placeholder="you@company.com" className={field} />
      {kind === "signin" ? (<><label className="sr-only" htmlFor="p">Password</label><input id="p" type="password" required placeholder="Password" className={field} /></>)
        : (<><label className="sr-only" htmlFor="m">Message</label><textarea id="m" required rows={5} placeholder="What do you want to build?" className={`${field} h-auto py-3`} /></>)}
      <button className="btn-primary h-12 rounded-lg px-6" type="submit">{kind === "signin" ? "Sign in" : "Send message"}</button>
    </form>
  );
}

export default function PageTemplate({ page }: { page: PageDef }) {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <section className="relative isolate overflow-hidden">
            <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-cover bg-top" style={{ backgroundImage: "url(/img/hero-streaks.svg?v=2)" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/35 to-black" />
            </div>
            <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-[150px] md:px-8 md:pb-24 md:pt-[190px] lg:px-0">
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 className="font-pixel mt-5 max-w-[760px] text-[40px] leading-[1.02] sm:text-[56px] md:text-[64px]">{page.title}</h1>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.5] text-white md:text-[19px]">{page.lede}</p>
              {page.cta && <Link href={page.cta.href} className="btn-primary mt-9 inline-flex h-[44px] items-center rounded-lg px-6">{page.cta.label}</Link>}
            </div>
          </section>

          {page.features && (
            <section className="mx-auto max-w-[1100px] px-5 py-16 md:px-8 lg:px-0">
              {page.featuresTitle && <h2 className="kx-h2 mb-12">{page.featuresTitle}</h2>}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.features.map((f, i) => (
                  <Card key={f.title} as="article" data-reveal className="p-8">
                    <span className="font-mono text-[11px] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-8 text-[20px] leading-6 text-fg">{f.title}</h3>
                    <p className="mt-2 text-[14px] leading-[22px] text-fg-2">{f.desc}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {page.steps && (
            <section className="mx-auto max-w-[1100px] px-5 py-12 md:px-8 lg:px-0">
              <h2 className="kx-h2 mb-12">{page.stepsTitle}</h2>
              <ol className="grid gap-6 md:grid-cols-5">
                {page.steps.map((s, i) => (
                  <li key={s.title} className="border-t border-white/15 pt-4"><span className="font-mono text-[11px] text-blue">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 text-[17px]">{s.title}</h3><p className="mt-1 text-[14px] leading-5 text-fg-2">{s.desc}</p></li>
                ))}
              </ol>
            </section>
          )}

          {page.prose && (
            <section className="mx-auto max-w-[760px] px-5 py-12 md:px-8 lg:px-0 lg:ml-[max(0px,calc((100vw-1100px)/2))]">
              {page.prose.map((s) => (<div key={s.h} className="mb-8"><h2 className="text-[20px] text-fg">{s.h}</h2><p className="mt-2 text-[15px] leading-[1.65] text-fg-2">{s.p}</p></div>))}
            </section>
          )}

          {page.form && <section className="mx-auto max-w-[1100px] px-5 pb-24 md:px-8 lg:px-0"><Form kind={page.form} /></section>}
          <div className="h-16" />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
