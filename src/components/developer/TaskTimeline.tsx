"use client";
export type TaskItem = { label: string; state: "pending" | "active" | "done" };

export default function TaskTimeline({ tasks, className = "" }: { tasks: TaskItem[]; className?: string }) {
  return (
    <ol className={`relative space-y-2.5 font-mono text-[11px] ${className}`} aria-label="Task timeline">
      {tasks.map((t, i) => (
        <li key={t.label} className="relative flex items-center gap-3">
          {i < tasks.length - 1 && <span className="absolute left-[4px] top-3 h-[calc(100%+4px)] w-px bg-line" />}
          <span className={`relative z-10 h-[9px] w-[9px] rounded-full border ${t.state === "done" ? "border-[#7be3a1] bg-[#7be3a1]" : t.state === "active" ? "border-blue-2 bg-blue-2 shadow-[0_0_10px_#f7732b]" : "border-line bg-bg"}`} />
          <span className={t.state === "pending" ? "text-fg-3" : "text-fg"}>{t.label}</span>
          <span className="ml-auto text-fg-3">{t.state === "done" ? "✓" : t.state === "active" ? "…" : ""}</span>
        </li>
      ))}
    </ol>
  );
}
