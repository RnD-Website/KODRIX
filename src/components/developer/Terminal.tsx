"use client";
import { useEffect, useRef, useState } from "react";

export const buildLog = [
  "$ kodrix build",
  "",
  "Initializing development agent...",
  "Analyzing repository...",
  "Understanding project structure...",
  "Generating components...",
  "Running tests...",
  "Reviewing changes...",
  "",
  "Build completed successfully.",
];

/** Types a log line-by-line while `run` is true. Calls onDone when finished. Deterministic, simulated output. */
export default function Terminal({ run, lines = buildLog, speed = 340, onDone, onProgress, className = "", height = "h-full" }: {
  run: boolean; lines?: string[]; speed?: number; onDone?: () => void; onProgress?: (i: number, total: number) => void; className?: string; height?: string;
}) {
  const [shown, setShown] = useState<string[]>([]);
  const done = useRef(onDone); done.current = onDone;
  const prog = useRef(onProgress); prog.current = onProgress;

  useEffect(() => {
    if (!run) { setShown([]); return; }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(lines.slice(0, i));
      prog.current?.(i, lines.length);
      if (i >= lines.length) { clearInterval(id); done.current?.(); }
    }, speed);
    return () => clearInterval(id);
  }, [run, lines, speed]);

  return (
    <div className={`${height} flex min-h-0 flex-col overflow-hidden rounded-[10px] ${className}`}
      style={{ background: "linear-gradient(180deg,rgba(20,19,18,.95),rgba(6,6,7,.98))", boxShadow: "0 0 0 1px rgba(255,255,255,.09), 0 18px 40px -18px rgba(239,90,0,.4), inset 0 1px 0 rgba(255,255,255,.06)" }}>
      <div className="flex h-7 shrink-0 items-center gap-2 border-b border-white/[.07] bg-white/[.025] px-3 font-mono text-[9px] uppercase tracking-[0.08em] text-white/40">
        <span className="flex gap-1.5" aria-hidden><i className="h-[8px] w-[8px] rounded-full bg-[#ff6b63]/80" /><i className="h-[8px] w-[8px] rounded-full bg-[#ffc14d]/80" /><i className="h-[8px] w-[8px] rounded-full bg-[#38d27a]/80" /></span>
        <span className="ml-1">kodrix — zsh</span><span className="ml-auto text-[#ffb48a]">simulated</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden px-3 py-2 font-mono text-[11px] leading-[18px]" aria-live="polite">
        {shown.map((l, i) => (
          <div key={i} className={l.startsWith("$") ? "text-white" : l.includes("successfully") ? "text-[#7be3a1]" : "text-[#9aa4bd]"}>
            {l.startsWith("$") && <span className="mr-2 text-[#f7732b]">❯</span>}{l.startsWith("$") ? l.slice(2) : l || " "}
            {!l.startsWith("$") && l && !l.includes("successfully") && i < shown.length - 1 && <span className="ml-2 text-[#38d27a]">✓</span>}
          </div>
        ))}
        {run && shown.length < lines.length && <span className="caret text-[#ffb48a]" />}
      </div>
    </div>
  );
}
