"use client";
import { motion } from "framer-motion";
import { EASE } from "@/animations/transitions";

export type AgentState = "idle" | "working" | "done";
export type AgentRow = { name: string; task: string; state: AgentState };

const dot = { idle: "bg-fg-3", working: "bg-blue-2 animate-[pulse-dot_1s_infinite]", done: "bg-[#7be3a1]" } as const;

export default function AgentPanel({ agents, className = "" }: { agents: AgentRow[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 font-mono text-[10px] ${className}`} aria-label="Agent activity">
      {agents.map((a) => (
        <motion.li layout transition={{ duration: 0.4, ease: EASE }} key={a.name} className="flex items-center gap-2 rounded-md border border-line-2 bg-white/[.03] px-2.5 py-2">
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[a.state]}`} />
          <span className="whitespace-nowrap text-fg">{a.name}</span>
          <span className="ml-auto truncate text-fg-3">{a.state === "working" ? a.task : a.state}</span>
        </motion.li>
      ))}
    </ul>
  );
}
