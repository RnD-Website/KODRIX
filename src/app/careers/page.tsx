import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";
import { CtaBand } from "@/components/pages/Sections";
import { wrap } from "@/lib/ui";

export const metadata: Metadata = { title: "Careers — KODRIX" };

const values = [
  ["Deep care for your craft", "Great products are born from great detail. Set a high bar and don't compromise on quality."],
  ["Take ownership and act", "Don't wait for permission. When you see a problem, you solve it."],
  ["Operate with speed", "Move fast without breaking trust. Ship at a pace that surprises."],
  ["Be customer-obsessed", "Start from the person using what we build, and work backward."],
  ["Push boundaries", "Try the thing nobody has tried, then share what you learned."],
];

function Polaroid({ className, g }: { className: string; g: string }) {
  return <div aria-hidden className={`absolute hidden w-[170px] bg-white p-2 pb-8 shadow-2xl md:block ${className}`}><div className="h-[120px]" style={{ background: g }} /></div>;
}

export default function Careers() {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <section className="relative isolate overflow-hidden pb-24 pt-[140px] text-black" style={{ background: "repeating-linear-gradient(90deg,#d9d9d9 0 120px,#cfcfcf 120px 124px)" }}>
            <Polaroid className="left-[6%] top-[130px] -rotate-[7deg]" g="linear-gradient(135deg,#d9772b,#3b3a86)" />
            <Polaroid className="right-[6%] top-[150px] rotate-[6deg]" g="linear-gradient(135deg,#2a5fb0,#0a0d1c)" />
            <div className="mx-auto max-w-[760px] px-5 text-center">
              <p className="eyebrow justify-center !text-black/70">Careers</p>
              <h1 className="font-pixel mt-5 text-[40px] leading-[1.05] sm:text-[56px] md:text-[64px]">Help build the future of AI engineering</h1>
              <p className="mx-auto mt-6 max-w-[520px] text-[16px] leading-[1.55] text-black/70">Our mission is to give every team an AI engineering partner they can review, trust and learn from.</p>
              <a href="#roles" className="btn-primary mt-8 inline-flex h-[44px] items-center rounded-lg px-6">See open roles</a>
            </div>
            <div className="mx-auto mt-16 max-w-[1100px] px-5">
              <div className="grid h-[300px] grid-cols-[1fr_220px] overflow-hidden rounded-xl bg-[#101112] shadow-2xl">
                <div className="grid grid-cols-3 gap-4 p-8 font-pixel text-[20px] text-white/70"><span>Craft</span><span>Ownership</span><span>Speed</span><span>Care</span><span>Curiosity</span><span>Trust</span></div>
                <div className="relative grid place-items-center bg-[#e1deda]"><span className="grid h-32 w-32 place-items-center rounded-full bg-[#f4f2ef] font-mono text-[11px] text-black/70 shadow-[0_14px_30px_-8px_rgba(0,0,0,.35),inset_0_2px_0_#fff]">Join us</span></div>
              </div>
            </div>
          </section>

          <section id="roles" className={`${wrap} py-24`}>
            <h2 className="text-[40px] leading-none tracking-tight md:text-[64px]">Join the team</h2>
            <div className="mt-10 rounded-2xl border border-white/10 bg-[#0a0a0b] p-8 text-fg-2"><p className="text-[18px] text-fg">No open roles are listed yet.</p><p className="mt-2 text-[14px]">Send a note through the <a className="text-[#ffb48a] underline" href="/contact">contact page</a> and tell us what you'd like to build.</p></div>
          </section>

          <section className={`${wrap} border-t border-white/10 py-24`}>
            <h2 className="text-[40px] leading-none tracking-tight md:text-[64px]">What we value and how we act</h2>
            <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
              {values.map(([t, d], i) => (
                <div key={t} data-reveal className="grid gap-4 py-8 md:grid-cols-[60px_1fr_1fr]"><span className="font-mono text-[12px] text-fg-3">{String(i + 1).padStart(2, "0")}</span><h3 className="text-[28px] leading-[1.1] md:text-[44px]">{t}</h3><p className="text-[15px] leading-[1.6] text-fg-2 md:pt-2">{d}</p></div>
              ))}
            </div>
          </section>
          <CtaBand title="Ready to build the next generation of AI engineering?" />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
