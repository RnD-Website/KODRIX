"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroIntro } from "@/animations/heroAnimations";
import { gsap } from "@/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { demoPrompts } from "@/data/content";
import { track } from "@/lib/analytics";
import Terminal from "./developer/Terminal";
import CodeEditor from "./developer/CodeEditor";

type Mode = "terminal" | "code";
type Status = "idle" | "running" | "done";

const seamH = "linear-gradient(rgba(110,103,100,.5),rgba(110,103,100,.5) 1px,rgba(255,255,255,.55) 1px)";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("terminal");
  const [status, setStatus] = useState<Status>("idle");
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(2);
  const [pct, setPct] = useState(0);
  const [dim, setDim] = useState(false);

  useEffect(() => {
    if (!root.current || reduced) return;
    return heroIntro(root.current);
  }, [reduced]);

  // Reference behaviour: the device drifts down slower than the page (decelerating) and powers down.
  useEffect(() => {
    if (!card.current || reduced || window.innerWidth < 900) return;
    const ctx = gsap.context(() => {
      gsap.to(card.current, { y: 640, ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top top", end: "+=1300", scrub: 0.6, onUpdate: (s) => setDim(s.progress > 0.35) } });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  const start = () => { if (status === "running") return; setPct(0); setFile(2); setStatus("running"); track("demo_start", { mode, hasPrompt: !!prompt }); };
  const reset = () => { setStatus("idle"); setPct(0); };
  const press = () => (status === "running" ? undefined : status === "done" ? reset() : start());

  useEffect(() => {
    if (status !== "running" || mode !== "code") return;
    const order = [2, 3, 5, 6, 8]; let i = 0;
    const id = setInterval(() => { i = (i + 1) % order.length; setFile(order[i]); }, 2400);
    return () => clearInterval(id);
  }, [status, mode]);

  const lampOn = status === "running" && !dim;
  
  return (
    <section ref={root} id="top" className="relative isolate md:h-[1560px]">
      <div data-hero-bg className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[1250px] overflow-hidden" aria-hidden="true">
        <Image src="/img/hero-streaks.svg?v=2" alt="" fill priority fetchPriority="high" sizes="100vw" unoptimized className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/0 via-bg/10 to-bg" />
      </div>

      <div className="mx-auto max-w-[1100px] px-5 md:px-8 lg:px-0">
        {/* header block: eyebrow 133, h1 168, copy at x867 */}
        <div className="relative pt-[118px] md:h-[375px] md:pt-[133px]">
          <p data-hero-eyebrow className="flex items-center gap-1.5 font-mono text-[11px] uppercase leading-[14px] text-white">
            <i className="inline-block h-2 w-2 rounded-[1px] bg-blue shadow-[0_0_10px_#ef5a00]" />AI Coding Agents
          </p>
          <h1 className="font-pixel mt-[21px] text-[48px] leading-[44px] sm:text-[72px] sm:leading-[64px]">
            <span className="mask-line"><span data-hero-line className="block">Build beyond</span></span>
            <span className="mask-line"><span data-hero-line className="block">code.</span></span>
          </h1>
          <p data-hero-copy className="mt-6 text-[17px] leading-[1.45] text-white md:absolute md:left-[697px] md:top-[184px] md:mt-0 md:w-[403px] md:text-[19px] md:leading-[27.55px]" style={{ top: undefined }}>
            Meet the autonomous AI development platform that understands your codebase, builds features, fixes bugs, and ships software alongside your team.
          </p>
        </div>

        {/* 1100 x 470 device */}
        <div ref={card} data-hero-card className="relative mt-10 grid overflow-hidden rounded-xl shadow-[0_40px_120px_-30px_rgba(0,0,0,.85)] md:mt-0 md:h-[470px] md:grid-cols-2" style={{ boxShadow: "0 0 0 1px rgba(255,255,255,.1),0 40px 120px -30px rgba(0,0,0,.85)" }}>
          {/* status panel */}
          <div className="relative flex min-h-[430px] flex-col px-[26px] pb-[22px] pt-[22px]" style={{ background: "linear-gradient(160deg,#121315 0%,#050607 24%,#020304 60%)" }}>
            <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(160deg,rgba(255,255,255,.043),rgba(255,255,255,0) 40%)" }} />
            <p className="font-pixel relative mt-[0px] text-[26px] leading-[26px] text-fg/80 md:mt-[0px]" style={{ paddingTop: 0, marginTop: 0 }}>
              <span className="mt-4 block pt-[2px]">try prompting our agent<span className="caret" /></span>
            </p>

            <div className="relative mt-4 min-h-0 flex-1">
              {status === "idle" ? (
                <div className="flex h-full flex-col gap-2">
                  <div className="min-h-0 flex-1 opacity-90"><CodeEditor fileIndex={2} typing loop /></div>
                  <div className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
                    {demoPrompts.map((p) => (
                      <button key={p} onClick={() => { setPrompt(p); track("demo_example", { p }); }}
                        className="max-w-[210px] shrink-0 truncate rounded-md border border-white/10 bg-white/[.03] px-2.5 py-1 text-left font-mono text-[10px] leading-4 text-fg/60 transition hover:border-blue/50 hover:text-fg">{p}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col gap-2">
                  <div className="min-h-0 flex-1">
                    {mode === "terminal" ? (
                      <Terminal run speed={420} onProgress={(i, t) => setPct(Math.round((i / t) * 100))} onDone={() => { setPct(100); setStatus("done"); track("demo_complete", { mode }); }} />
                    ) : (
                      <>
                        <CodeEditor fileIndex={file} typing />
                        <div className="hidden"><Terminal run speed={420} onProgress={(i, t) => setPct(Math.round((i / t) * 100))} onDone={() => { setPct(100); setStatus("done"); }} /></div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[10px] text-fg-3">
                    <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-blue transition-[width] duration-500" style={{ width: `${pct}%` }} /></div>
                    <span className={status === "done" ? "text-[#7be3a1]" : ""}>{status === "done" ? "completed" : `${pct}%`}</span>
                  </div>
                </div>
              )}
            </div>

            <p className="relative mt-3 text-[18px] leading-[26px] text-fg/85">Describe what you want to build to start the demo.</p>
            <form className="relative mt-[18px]" onSubmit={(e) => { e.preventDefault(); status === "done" ? reset() : start(); }}>
              <div className="flex h-12 items-center rounded-lg bg-[rgba(242,241,236,.043)] pl-[17px] pr-[5px] ring-1 ring-white/10 focus-within:ring-blue/60">
                <label htmlFor="hero-prompt" className="sr-only">Describe what to build</label>
                <input id="hero-prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={status === "running"} placeholder="Build a SaaS dashboard…"
                  className="min-w-0 flex-1 bg-transparent text-[15px] leading-[22px] text-fg placeholder:text-fg/40 focus:outline-none" />
                <button type="submit" disabled={status === "running"} className="h-[38px] shrink-0 rounded-[5px] bg-[#f2f1ec] px-4 text-[14px] leading-5 text-[#1f1d1b] transition hover:bg-white active:scale-[.97] disabled:opacity-60">
                  {status === "done" ? "Run again" : status === "running" ? "Building…" : "Start building"}
                </button>
              </div>
              <p className="mt-[14px] text-[11px] leading-[14px] text-fg/65">Simulated frontend demo · no AI backend is connected.</p>
            </form>
          </div>

          {/* hardware plate */}
          <div className="relative min-h-[320px] overflow-hidden md:min-h-0" style={{ background: "#e1deda" }}>
            <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(132px 38px at 242px -34px, rgba(255,255,255,.55), transparent 70%), linear-gradient(147.71deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 60%)" }} />
            {/* seams */}
            <i aria-hidden className="absolute inset-x-0 top-[234px] h-[2px]" style={{ background: seamH }} />
            <i aria-hidden className="absolute bottom-0 left-[274px] top-[236px] w-[2px]" style={{ background: "linear-gradient(to right,rgba(110,103,100,.5) 1px,rgba(255,255,255,.55) 1px)" }} />
            {/* screws */}
            {[11, 524].map((l, i) => (<span key={l} aria-hidden className="absolute top-[11px] h-[15px] w-[15px] rounded-full bg-[#b3aeaa] shadow-[inset_0_0_0_.5px_rgba(110,103,100,.35)]" style={{ left: l }}><i className="absolute left-[2px] top-[6.5px] h-[2px] w-[11px] rounded bg-[#8e8985]" style={{ transform: `rotate(${i ? 62 : -30}deg)` }} /></span>))}
            {/* speaker dots */}
            <div aria-hidden className="absolute left-[426px] top-[30px] hidden md:block">
              {[0, 1].map((r) => (<div key={r} className="flex gap-[13px]" style={{ marginLeft: r ? 8 : 0, marginBottom: 9 }}>{Array.from({ length: r ? 5 : 6 }).map((_, k) => <i key={k} className="h-[3px] w-[3px] rounded-full bg-[rgba(46,43,41,.62)]" />)}</div>))}
            </div>
            <span aria-hidden className="absolute left-[24px] top-[212px] font-mono text-[9px] leading-[9px] text-[rgba(75,75,72,.42)]">KODRIX</span>

            {/* dial */}
            <div className="absolute left-1/2 top-[235px] h-[216px] w-[216px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(110,103,100,.12)]">
              <span aria-hidden className={`absolute -inset-4 rounded-full transition-opacity duration-700 ${lampOn ? "opacity-100" : "opacity-0"}`} style={{ background: "radial-gradient(circle closest-side, transparent 93%, rgba(239,90,0,.35) 96%, transparent)" }} />
              <button onClick={press} aria-label={status === "running" ? "Building" : "Press to run the demo"} aria-pressed={status === "running"}
                className="absolute inset-[10px] rounded-full outline-none transition-transform duration-300 active:scale-[.975] focus-visible:ring-2 focus-visible:ring-blue"
                style={{ background: "radial-gradient(circle at 36% 30%, #f4f2ef 0%, #ebe8e4 45%, #d9d5cf 100%)", boxShadow: "0 14px 30px -8px rgba(0,0,0,.35), inset 0 2px 0 #fff, inset 0 -8px 14px rgba(0,0,0,.1)" }}>
                <span className="absolute left-1/2 top-[88px] h-1 w-[26px] -translate-x-1/2 rounded-sm transition-colors duration-500" style={{ background: lampOn ? "#ef5a00" : status === "done" ? "#2ea06a" : "#6b3418", boxShadow: lampOn ? "0 0 12px #ef5a00" : "none" }} />
                <span className="absolute inset-x-0 top-[106px] text-center font-mono text-[11px] leading-[13px] text-[rgba(59,58,56,.9)]">{status === "running" ? "Build…" : status === "done" ? "Done" : "Build"}</span>
              </button>
            </div>

            {/* bottom cells */}
            {(["code", "terminal"] as Mode[]).map((m, i) => (
              <button key={m} onClick={() => { if (status !== "running") { setMode(m); track("demo_mode", { m }); } }} aria-pressed={mode === m}
                className="absolute bottom-0 top-[236px] rounded-b-xl text-left font-mono text-[11px] leading-[13px] text-[rgba(59,58,56,.9)] transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-blue"
                style={{ left: i ? 276 : 0, width: i ? 274 : 274 }}>
                <span className="absolute bottom-[14px] left-[25px] flex items-center gap-[7px] capitalize"><i className="h-[7px] w-[7px] rounded-full" style={{ background: mode === m && !dim ? "#ef5a00" : "rgba(110,103,100,.4)", boxShadow: mode === m && !dim ? "0 0 8px #ef5a00" : "none" }} />{m}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
