"use client";
import { useState } from "react";
import { track } from "@/lib/analytics";
import Container from "./ui/Container";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <section id="cta" className="kx-section relative md:!py-44">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]" style={{ background: "radial-gradient(50% 70% at 50% 100%, rgba(239,90,0,.3), transparent 70%)" }} />
      <Container className="relative text-center">
        <p data-reveal className="eyebrow">Get started</p>
        <h2 data-mask className="kx-h2 mt-5">
          <span className="mask-line"><span data-mask-line className="block">Your next great product</span></span>
          <span className="mask-line"><span data-mask-line className="block">starts here.</span></span>
        </h2>
        <p data-reveal className="kx-lede mx-auto max-w-[420px]">Give your ideas an engineering team that never stops building.</p>
        <form data-reveal className="mx-auto mt-8 flex max-w-[460px] items-center gap-2 rounded-xl border border-white/10 bg-[#111214] p-1.5 pl-4 shadow-[0_0_60px_-10px_rgba(239,90,0,.45)] focus-within:border-blue/60"
          onSubmit={(e) => { e.preventDefault(); setSent(true); track("cta_start_building_final", { hasEmail: !!email }); }}>
          <label htmlFor="cta-email" className="sr-only">Work email</label>
          <input id="cta-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-fg placeholder:text-fg-3 focus:outline-none" />
          <button type="submit" className="btn-primary h-10 shrink-0 px-4">{sent ? "Thanks" : "Start Building with KODRIX"}</button>
        </form>
        <p className="mt-3 font-mono text-[10px] text-fg-3" role="status">{sent ? "Demo form — no data was sent anywhere." : "Demo form · no backend connected."}</p>
      </Container>
    </section>
  );
}
