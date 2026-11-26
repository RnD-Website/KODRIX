"use client";
import { useEffect, useState } from "react";

const snippets: Record<number, { file: string; code: string }> = {
  2: { file: "app/dashboard/page.tsx", code: `import { Sidebar } from "@/components/Sidebar";
import { Analytics } from "./analytics";
import { requireSession } from "@/app/auth";

export default async function Dashboard() {
  const session = await requireSession();
  return (
    <div className="grid grid-cols-[240px_1fr]">
      <Sidebar user={session.user} />
      <Analytics range="30d" />
    </div>
  );
}` },
  3: { file: "app/dashboard/analytics.tsx", code: `"use client";
import { useMemo } from "react";

export function Analytics({ range }: { range: string }) {
  const series = useMemo(() => buildSeries(range), [range]);
  return <LineChart data={series} aria-label="Active users" />;
}` },
  5: { file: "app/settings/page.tsx", code: `export default function Settings() {
  return (
    <form action={saveSettings} className="max-w-md space-y-4">
      <Field name="displayName" label="Display name" />
      <Field name="email" type="email" label="Email" />
      <button type="submit">Save changes</button>
    </form>
  );
}` },
  6: { file: "app/auth.ts", code: `import { cookies } from "next/headers";

export async function requireSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) redirect("/login");
  return verify(token);
}` },
  8: { file: "components/Sidebar.tsx", code: `export function Sidebar({ user }: { user: User }) {
  return (
    <aside className="border-r p-4">
      <nav aria-label="Dashboard">
        <a href="/dashboard">Overview</a>
        <a href="/settings">Settings</a>
      </nav>
    </aside>
  );
}` },
  9: { file: "package.json", code: `{
  "name": "saas-dashboard",
  "scripts": { "dev": "next dev", "test": "vitest" },
  "dependencies": { "next": "16", "react": "19" }
}` },
};
export const editableFiles = Object.keys(snippets).map(Number);

function highlight(line: string) {
  const parts: React.ReactNode[] = [];
  const re = /("[^"]*"|`[^`]*`|\/\/.*$)|\b(import|from|export|default|async|function|return|const|await|if|redirect|use client)\b|(<\/?[A-Za-z][\w.]*)|\b([a-zA-Z_]\w*)(?=\()|(\b\d+\b)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    const cls = m[1] ? (m[1].startsWith("//") ? "text-white/30 italic" : "text-[#9be3b0]") : m[2] ? "text-[#ff9a5c]" : m[3] ? "text-[#f0a3ff]" : m[4] ? "text-[#ffd58a]" : "text-[#ff9f7a]";
    parts.push(<span key={k++} className={cls}>{m[0]}</span>);
    last = m.index + m[0].length;
  }
  parts.push(line.slice(last));
  return parts;
}

/** Premium editor window: glass chrome, traffic lights, tab, gutter, active-line glow, agent status. `typing` types the file out. */
export default function CodeEditor({ fileIndex, typing = false, loop = false, className = "" }: { fileIndex: number; typing?: boolean; loop?: boolean; className?: string }) {
  const s = snippets[fileIndex] ?? snippets[2];
  const [n, setN] = useState(typing ? 0 : s.code.length);
  useEffect(() => {
    if (!typing) { setN(s.code.length); return; }
    setN(0);
    let hold = 0;
    const id = setInterval(() => setN((v) => {
      if (v >= s.code.length) { if (!loop) { clearInterval(id); return v; } hold += 1; return hold > 90 ? 0 : v; }
      hold = 0; return v + 2;
    }), 22);
    return () => clearInterval(id);
  }, [s, typing, loop]);
  const lines = s.code.slice(0, n).split("\n");
  const typingNow = typing && n < s.code.length;
  const total = s.code.split("\n").length;
  return (
    <div className={`relative flex h-full min-h-0 flex-col overflow-hidden rounded-[10px] ${className}`}
      style={{ background: "linear-gradient(180deg,rgba(26,23,21,.92),rgba(10,10,11,.96))", boxShadow: "0 0 0 1px rgba(255,255,255,.09), 0 18px 40px -18px rgba(239,90,0,.45), inset 0 1px 0 rgba(255,255,255,.07)" }}>
      <span aria-hidden className="pointer-events-none absolute -top-10 left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-full bg-[#ef5a00]/25 blur-3xl" />
      <div className="relative flex h-8 shrink-0 items-center gap-3 border-b border-white/[.07] bg-white/[.025] px-3 font-mono text-[10px] text-fg-2">
        <span className="flex gap-1.5" aria-hidden><i className="h-[9px] w-[9px] rounded-full bg-[#ff6b63]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#ffc14d]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#38d27a]/80" /></span>
        <span className="flex items-center gap-1.5 rounded-md bg-white/[.08] px-2 py-[3px] text-fg shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"><i className="h-1.5 w-1.5 rounded-sm bg-[#f7732b]" />{s.file.split("/").pop()}</span>
        <span className="hidden truncate text-white/30 sm:inline">{s.file}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-[#ffb48a]"><i className={`h-1.5 w-1.5 rounded-full ${typingNow ? "animate-pulse bg-[#f7732b] shadow-[0_0_8px_#f7732b]" : "bg-[#38d27a]"}`} />{typingNow ? "Code agent writing" : "Saved"}</span>
      </div>
      <pre className="relative min-h-0 flex-1 overflow-hidden py-2 font-mono text-[11px] leading-[18px] text-[#c9d1e6]">
        {lines.map((l, i) => {
          const active = typingNow && i === lines.length - 1;
          return (
            <div key={i} className={`flex ${active ? "bg-[#ef5a00]/[.10]" : ""}`}>
              <span className="w-9 shrink-0 select-none pr-3 text-right text-white/25">{i + 1}</span>
              <span className="whitespace-pre">{highlight(l)}{active && <span className="caret text-[#ffb48a]" />}</span>
            </div>
          );
        })}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#0a0a0b] to-transparent" />
      </pre>
      <div className="relative flex h-6 shrink-0 items-center gap-3 border-t border-white/[.07] bg-[#ef5a00]/[.08] px-3 font-mono text-[9px] uppercase tracking-[0.06em] text-[#ffb48a]">
        <span>⎇ main</span><span className="text-white/35">TypeScript</span><span className="ml-auto text-white/40">Ln {Math.max(1, lines.length)}/{total}</span>
      </div>
    </div>
  );
}
