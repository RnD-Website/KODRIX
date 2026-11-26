"use client";
import { useEffect, useRef, useState } from "react";
import { demoPrompts, agents } from "@/data/content";
import { track } from "@/lib/analytics";
import Container from "./ui/Container";
import CodeEditor from "./developer/CodeEditor";
import TaskTimeline, { type TaskItem } from "./developer/TaskTimeline";

const TASKS = ["Read repository", "Scaffold routes", "Generate components", "Run tests", "Review changes"];
type Phase = "idle" | "running" | "done";

export default function DemoSection() {
  const [prompt, setPrompt] = useState("");
  const [selected, setSelected] = useState<string[]>(["code", "review"]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(0); // accordion slat
  const timer = useRef<ReturnType<typeof setInterval>>(null);

  const run = () => {
    if (phase === "running") return;
    setStep(0); setPhase("running"); setActive(1);
    track("demo_section_start", { agents: selected });
    let s = 0;
    timer.current = setInterval(() => {
      s += 1; setStep(s);
      if (s >= TASKS.length) { clearInterval(timer.current!); setPhase("done"); setActive(3); track("demo_section_complete"); }
    }, 1100);
  };
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const tasks: TaskItem[] = TASKS.map((l, i) => ({ label: l, state: phase === "idle" ? "pending" : i < step ? "done" : i === step && phase === "running" ? "active" : phase === "done" ? "done" : "pending" }));
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const slats = [
    { k: "Prompt", body: <div className="p-4 font-mono text-[11px] leading-[18px] text-fg-2"><p className="text-fg-3">// your idea</p><p className="mt-2 text-fg">{prompt || demoPrompts[0]}</p></div> },
    { k: "Progress", body: <div className="p-4"><TaskTimeline tasks={tasks} /></div> },
    { k: "Code", body: <CodeEditor fileIndex={2} typing={phase === "running"} /> },
    { k: "Result", body: <div className="grid h-full place-items-center p-4 text-center"><div><p className="font-pixel text-[22px]">{phase === "done" ? "Build completed." : "Waiting."}</p><p className="mt-2 font-mono text-[10px] text-fg-3">{phase === "done" ? "5 files · 12 tests passing (simulated)" : "Press Start building"}</p></div></div> },
  ];

  return (
    <section id="demo" className="relative py-20 md:py-28">
      <Container>
        <div data-reveal className="grid overflow-hidden rounded-[14px] border border-white/15 bg-gradient-to-br from-[#17171a] to-[#0a0a0b] md:grid-cols-[1.05fr_1fr]">
          <div className="p-6 md:p-9">
            <p className="eyebrow">Interactive demo</p>
            <h2 className="mt-4 text-[26px] leading-[1.15] tracking-[-0.02em] md:text-[30px]">
              See what KODRIX can build for you. <span className="text-fg-2">Describe your next idea and let your AI engineering team take it from concept to code.</span>
            </h2>

            <label htmlFor="demo-prompt" className="mt-6 block font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">Your prompt</label>
            <textarea id="demo-prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={demoPrompts[0]}
              className="mt-2 w-full resize-none rounded-lg border border-line bg-black/50 p-3 font-mono text-[12px] leading-5 text-fg placeholder:text-fg-3 focus:border-blue/60 focus:outline-none" />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {demoPrompts.map((p) => (
                <button key={p} onClick={() => setPrompt(p)} className="max-w-full truncate rounded-full border border-line-2 px-2.5 py-1 font-mono text-[10px] text-fg-2 transition hover:border-blue/50 hover:text-fg">{p.length > 44 ? p.slice(0, 44) + "…" : p}</button>
              ))}
            </div>

            <fieldset className="mt-5">
              <legend className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">Agents</legend>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {agents.map((a) => (
                  <button key={a.id} role="checkbox" aria-checked={selected.includes(a.id)} onClick={() => toggle(a.id)}
                    className={`rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.05em] transition ${selected.includes(a.id) ? "border-blue bg-blue/20 text-fg" : "border-line-2 text-fg-2 hover:border-line"}`}>{a.name.replace(" Agent", "")}</button>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 flex items-center gap-4">
              <button onClick={run} disabled={phase === "running" || selected.length === 0} className="btn-primary h-10 px-5 disabled:opacity-60">{phase === "running" ? "Building…" : phase === "done" ? "Run again" : "Start building"}</button>
              <span className="font-mono text-[10px] text-fg-3">Simulated · no AI backend connected</span>
            </div>
          </div>

          {/* accordion slats */}
          <div className="flex min-h-[320px] gap-px border-t border-line md:min-h-[440px] md:border-l md:border-t-0" role="tablist" aria-label="Demo output">
            {slats.map((s, i) => (
              <div key={s.k} role="tab" tabIndex={0} aria-selected={active === i}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                className="relative overflow-hidden bg-[#0a0b10] transition-[flex-grow] duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ flex: active === i ? "6 1 0" : "1 1 0", minWidth: 34 }}>
                <span className={`absolute left-2 top-3 z-10 origin-top-left font-mono text-[9px] uppercase tracking-[0.1em] text-fg-3 transition-opacity ${active === i ? "opacity-0" : "opacity-100"}`} style={{ writingMode: "vertical-rl" }}>{s.k}</span>
                <div className={`h-full transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-0"}`} style={{ minWidth: 240 }}>{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
