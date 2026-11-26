"use client";
import { useRef, useState } from "react";
import { agents } from "@/data/content";
import { track } from "@/lib/analytics";
import Container from "./ui/Container";

function AgentArt({ id, hue }: { id: string; hue: string }) {
  const common = "absolute inset-0";
  const rows: Record<string, string[]> = {
    code: ["const Card = () => {", "  return <Panel />;", "};"],
    debug: ["TypeError: x is undefined", "  at render (app.tsx:42)", "→ guard null session"],
    browser: ["goto /login", "fill #email", "click Sign in ✓"],
    terminal: ["$ pnpm test", "✓ 128 passed", "$ pnpm build"],
    research: ["reading docs/api.md", "found 3 usages", "summarizing…"],
    review: ["+ validate(input)", "- legacy()", "⚠ missing test"],
  };
  return (
    <div className="relative h-[230px] overflow-hidden rounded-t-[11px]" style={{ background: `radial-gradient(120% 90% at 20% 0%, ${hue}55, transparent 60%), #0b0d13` }}>
      <div className={`${common} opacity-[.18]`} style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.12) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.12) 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="absolute inset-x-5 bottom-5 rounded-lg border border-line bg-black/55 p-3 font-mono text-[10.5px] leading-[17px] text-fg-2 backdrop-blur transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div className="mb-1.5 flex gap-1"><i className="h-1.5 w-1.5 rounded-full bg-white/20" /><i className="h-1.5 w-1.5 rounded-full bg-white/20" /><i className="h-1.5 w-1.5 rounded-full bg-white/20" /></div>
        {rows[id].map((r, i) => <div key={i} className={i === 0 ? "text-fg" : ""}>{r}</div>)}
      </div>
    </div>
  );
}

export default function PlatformSection() {
  const scroller = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const go = (dir: 1 | -1) => {
    const el = scroller.current; if (!el) return;
    const next = Math.max(0, Math.min(agents.length - 1, i + dir));
    const card = el.children[next] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 0, behavior: "smooth" });
    setI(next); track("agents_carousel", { dir });
  };
  return (
    <section id="platform" className="relative pt-24 md:pt-36">
      <Container>
        <div data-reveal>
          <p className="eyebrow">Platform</p>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 data-mask className="h-display max-w-[760px] text-[34px] sm:text-[52px]" style={{ lineHeight: 1.1 }}>
              <span className="mask-line"><span data-mask-line className="block">Everything your engineering</span></span>
              <span className="mask-line"><span data-mask-line className="block">team needs. One intelligent workspace.</span></span>
            </h2>
            <div className="hidden gap-2 md:flex">
              {[-1, 1].map((d) => (
                <button key={d} onClick={() => go(d as 1 | -1)} aria-label={d < 0 ? "Previous agent" : "Next agent"} disabled={d < 0 ? i === 0 : i === agents.length - 1}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white/[.04] text-fg transition hover:bg-white/10 disabled:opacity-30">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d={d < 0 ? "M8 2L4 6l4 4" : "M4 2l4 4-4 4"} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" /></svg>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-5 max-w-[520px] text-[15px] leading-[1.5] text-fg-2">From understanding complex repositories to shipping production-ready features, KODRIX brings your entire development workflow together.</p>
        </div>
      </Container>

      <div id="agents" className="mt-12">
        <div ref={scroller} data-reveal-stagger className="hide-scroll mx-auto flex max-w-[1100px] snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-8 lg:px-0">
          {agents.map((a) => (
            <article key={a.id} tabIndex={0} className="group w-[290px] shrink-0 snap-start rounded-xl border border-line bg-card/80 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-white/25 focus-visible:-translate-y-1 focus-visible:border-white/25 focus-visible:outline-none">
              <AgentArt id={a.id} hue={a.hue} />
              <div className="p-5">
                <h3 className="text-[26px] tracking-[-0.02em]">{a.name}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-3">{a.tag}</p>
                <p className="mt-4 text-[13px] leading-[1.5] text-fg-2">{a.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
