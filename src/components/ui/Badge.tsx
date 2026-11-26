import { cn } from "@/lib/utils";
export default function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-white/[.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-fg-2", className)}>{children}</span>;
}
