"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { steps } from "@/data/content";
import { EASE } from "@/animations/transitions";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import FileExplorer from "./developer/FileExplorer";
import CodeEditor from "./developer/CodeEditor";
import AgentPanel, { type AgentRow } from "./developer/AgentPanel";
import TaskTimeline from "./developer/TaskTimeline";
import Terminal from "./developer/Terminal";

const status = ["waiting", "reading", "working", "reviewing", "shipped"];

function Bubble({ me, children }: { me?: boolean; children: React.ReactNode }) {
  return <div className={`max-w-[85%] rounded-lg px-3 py-2 text-[12px] leading-[17px] ${me ? "ml-auto bg-[#f2efe8] text-[#1b1a18]" : "border border-line-2 bg-white/[.04] text-fg-2"}`}>{children}</div>;
}

function Panel({ step }: { step: number }) {
  const [file, setFile] = useState(2);
  const agents: AgentRow[] = [
    { name: "Code Agent", task: "writing dashboard/page.tsx", state: step === 2 ? "working" : step > 2 ? "done" : "idle" },
    { name: "Debug Agent", task: "tracing auth redirect", state: step === 2 ? "working" : step > 2 ? "done" : "idle" },
    { name: "Review Agent", task: "checking diff", state: step === 3 ? "working" : step > 3 ? "done" : "idle" },
  ];
  if (step === 0) return (
    <div className="flex h-full flex-col gap-3 p-4">
      <Bubble me>Build a responsive SaaS dashboard with authentication, analytics, and a settings page.</Bubble>
      <Bubble>Got it. I'll look at your repository first, then plan the work.</Bubble>
      <div className="mt-auto font-mono text-[10px] text-fg-3">Waiting for you to describe the task…</div>
    </div>
  );
  if (step === 1) return (
    <div className="grid h-full grid-cols-[150px_1fr] gap-3 p-4">
      <FileExplorer active={9} onSelect={() => {}} className="rounded-md border border-line-2 bg-black/30 p-1.5" />
      <Terminal run speed={500} lines={["Analyzing repository...", "Found Next.js 16 app router", "Found 42 components", "Reading auth.ts", "Understanding project structure...", "Plan: 3 routes, 5 components"]} />
    </div>
  );
  if (step === 2) return (
    <div className="grid h-full grid-cols-[150px_1fr] gap-3 p-4">
      <div className="min-h-0 space-y-3 overflow-hidden"><FileExplorer active={file} onSelect={setFile} className="rounded-md border border-line-2 bg-black/30 p-1.5" /><AgentPanel agents={agents.slice(0, 2).map((a) => ({ ...a, name: a.name.replace(" Agent", "") }))} /></div>
      <div className="min-h-0 overflow-hidden rounded-md border border-line-2 bg-black/30"><CodeEditor fileIndex={file} typing /></div>
    </div>
  );
  if (step === 3) return (
    <div className="flex h-full flex-col gap-3 p-4 font-mono text-[11px]">
      <div className="rounded-md border border-line-2 bg-black/30 p-3 leading-[18px]">
        <p className="text-fg-3">app/auth.ts</p>
        <p className="text-[#ff8c8c]">- if (!token) return null;</p>
        <p className="text-[#7be3a1]">+ if (!token) redirect("/login");</p>
      </div>
      <div className="rounded-md border border-line-2 bg-black/30 p-3 text-fg-2"><p className="text-fg">Tests</p><p className="text-[#7be3a1]">✓ auth redirects unauthenticated users</p><p className="text-[#7be3a1]">✓ dashboard renders analytics</p><p className="text-[#7be3a1]">✓ settings form saves</p></div>
      <AgentPanel agents={agents.map((a) => ({ ...a, name: a.name.replace(" Agent", "") }))} className="mt-auto" />
    </div>
  );
  return (
    <div className="grid h-full grid-cols-2 gap-3 p-4">
      <TaskTimeline tasks={["Describe", "Understand", "Execute", "Review", "Ship"].map((l) => ({ label: l, state: "done" as const }))} className="self-start rounded-md border border-line-2 bg-black/30 p-3" />
      <div className="flex flex-col rounded-md border border-line-2 bg-black/30 p-3"><Terminal run speed={250} lines={["$ kodrix build", "Running tests...", "Reviewing changes...", "Build completed successfully."]} /><button className="mt-auto h-8 rounded-md bg-white text-[12px] font-medium text-black">Deploy (demo)</button></div>
    </div>
  );
}

export default function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const step = Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999));
  const within = Math.min(1, Math.max(0, p * steps.length - step));
  return (
    <section id="workflow" className="relative">
      <div ref={ref} style={{ height: `${steps.length * 90 + 20}vh` }}>
        <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
          {/* vertical grid lines, as in the reference */}
          <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[1100px] md:block">
            {[0, 33.33, 66.66, 100].map((l) => (<i key={l} className="absolute inset-y-0 w-px bg-white/[.06]" style={{ left: `${l}%` }} />))}
          </div>
          <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-10 px-5 pt-[70px] md:grid-cols-[469px_469px] md:justify-between md:gap-0 md:px-0 md:pt-0">
            <div>
              <p className="eyebrow mb-5">How it works</p>
              <h2 className="font-pixel text-[40px] leading-[1.02] sm:text-[52px] md:text-[61px]">Prompt in.<br />Product out.</h2>
              <p className="mt-6 max-w-[420px] text-[16px] leading-[1.5] text-fg-2">Describe, understand, execute, review and ship — one workflow, handled by agents that work together.</p>
              <ol className="mt-10 hidden md:block" aria-label="Workflow steps">
                {steps.map((s, i) => (
                  <li key={s.n} aria-current={i === step ? "step" : undefined} className={`relative py-3 transition-colors duration-500 ${i === step ? "text-fg" : "text-fg-3"}`}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px]">{s.n}</span>
                      <span className="text-[17px] leading-6">{s.title}</span>
                    </div>
                    <p className={`overflow-hidden pl-[30px] text-[14px] leading-5 text-fg-2 transition-all duration-500 ${i === step ? "mt-1 max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>{s.desc}</p>
                    <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
                    <span aria-hidden className="absolute bottom-0 left-0 h-px bg-blue" style={{ width: i < step ? "100%" : i === step ? `${within * 100}%` : "0%" }} />
                  </li>
                ))}
              </ol>
              <p className="mt-6 font-mono text-[11px] text-fg-2 md:hidden"><span className="text-fg">{steps[step].n}</span> {steps[step].title} — {steps[step].desc}</p>
            </div>

            {/* machine 469x774: 469x710 screen + 64px chassis */}
            <div className="mx-auto w-full max-w-[469px] md:h-[774px]">
              <div className="flex h-[560px] flex-col overflow-hidden rounded-[20px] md:h-[774px]" style={{ background: "#0a0a0b", boxShadow: "0 0 0 1px rgba(255,255,255,.1), 0 40px 100px -30px rgba(0,0,0,.9)" }}>
                <div className="relative min-h-0 flex-1 overflow-hidden" style={{ background: "linear-gradient(180deg,#1c1714 0%,#0d0c0c 55%,#08090a 100%)" }}>
                  <div className="flex h-11 shrink-0 items-center justify-between border-b border-white/[.07] px-4">
                    <AnimatePresence mode="wait"><motion.span key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease: EASE }} className="font-pixel text-[18px]">{status[step]}</motion.span></AnimatePresence>
                    <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">{steps[step].label}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 top-11">
                    <AnimatePresence mode="wait">
                      <motion.div key={step} className="absolute inset-0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: EASE }}><Panel step={step} /></motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex h-16 shrink-0 items-center justify-between border-t border-white/10 px-6" style={{ background: "linear-gradient(180deg,#e6e3df,#cfcbc6)" }}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[rgba(59,58,56,.9)]">KODRIX · Illustrative demo</span>
                  <i className="h-2.5 w-2.5 rounded-full bg-blue shadow-[0_0_10px_#ef5a00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
