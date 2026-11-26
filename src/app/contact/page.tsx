import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/pages/ContactForm";

export const metadata: Metadata = { title: "Contact — KODRIX", description: "Start building with KODRIX." };

export default function Contact() {
  return (
    <>
      <Navigation light />
      <main id="main" className="bg-white text-black">
        <div className="mx-auto grid min-h-[980px] max-w-[1100px] gap-10 px-5 pb-24 pt-[110px] md:grid-cols-2 md:gap-14 md:px-8 lg:px-0">
          <ContactForm />
          <aside className="relative hidden overflow-hidden rounded-[22px] p-9 text-white md:block" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.7)), radial-gradient(120% 70% at 20% 0%,#8a6a2c,transparent), linear-gradient(160deg,#3b3a86,#0a0d1c 60%,#2a1a14)" }}>
            <p className="flex items-center gap-2 text-[15px] font-semibold"><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><circle cx="10" cy="10" r="10" fill="#fff" /><path d="M6.5 5.5v9M6.5 10l5.5-4.5M6.8 10l5.2 4.5" stroke="#000" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>KODRIX</p>
            <h2 className="mt-16 font-serif text-[44px] leading-[1.05] tracking-tight">AI engineering<br />that <em>ships</em> itself.</h2>
            <ul className="mt-9 space-y-4 text-[15px] text-white/90">
              <li className="flex gap-3"><i className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7732b]" />Agents that learn your codebase before they touch it.</li>
              <li className="flex gap-3"><i className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7732b]" />Every change arrives as a diff you review.</li>
              <li className="flex gap-3"><i className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7732b]" />Scoped permissions and isolated runs.</li>
            </ul>
            <div className="mt-10 rounded-xl bg-white/95 p-5 text-black shadow-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-black/50">How it works</p>
              <div className="mt-3 grid grid-cols-3 gap-3 text-[13px]"><span><b className="block text-[18px]">01</b>Describe</span><span><b className="block text-[18px]">02</b>Review</span><span><b className="block text-[18px]">03</b>Ship</span></div>
            </div>
            <p className="mt-9 text-[13px] text-white/70">Works with the tools you already use</p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[17px] font-medium text-white/85"><span>GitHub</span><span>Next.js</span><span>Node.js</span><span>Docker</span></p>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
