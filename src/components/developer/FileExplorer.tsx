"use client";
export type FileNode = { name: string; depth: number; dir?: boolean; status?: "A" | "M" };
export const files: FileNode[] = [
  { name: "app", depth: 0, dir: true },
  { name: "dashboard", depth: 1, dir: true },
  { name: "page.tsx", depth: 2, status: "A" },
  { name: "analytics.tsx", depth: 2, status: "A" },
  { name: "settings", depth: 1, dir: true },
  { name: "page.tsx", depth: 2, status: "A" },
  { name: "auth.ts", depth: 1, status: "M" },
  { name: "components", depth: 0, dir: true },
  { name: "Sidebar.tsx", depth: 1, status: "A" },
  { name: "package.json", depth: 0 },
];

export default function FileExplorer({ active, onSelect, className = "" }: { active: number; onSelect: (i: number) => void; className?: string }) {
  return (
    <ul className={`font-mono text-[11px] ${className}`} role="listbox" aria-label="Repository files">
      {files.map((f, i) => (
        <li key={i} role="option" aria-selected={active === i}>
          <button
            disabled={f.dir}
            onClick={() => onSelect(i)}
            style={{ paddingLeft: 8 + f.depth * 12 }}
            className={`flex h-[22px] w-full items-center gap-1.5 rounded-[4px] pr-2 text-left transition-colors ${active === i ? "bg-white/10 text-fg" : f.dir ? "text-fg-3" : "text-fg-2 hover:bg-white/[.05] hover:text-fg"}`}
          >
            <span className="w-3 text-fg-3">{f.dir ? "▸" : ""}</span>
            <span className="truncate">{f.name}</span>
            {f.status && <span className={`ml-auto ${f.status === "A" ? "text-[#7be3a1]" : "text-[#f5c26b]"}`}>{f.status}</span>}
          </button>
        </li>
      ))}
    </ul>
  );
}
