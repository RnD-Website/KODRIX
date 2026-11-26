import { stack } from "@/data/content";

export default function LogoStrip() {
  const row = [...stack, ...stack];
  return (
    <section aria-label="Works with the tools you already use" className="relative mt-16 md:mt-24">
      <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-fg-3">Works with the tools you already use</p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-[marquee_38s_linear_infinite] gap-16 pr-16">
          {row.map((s, i) => (
            <span key={i} aria-hidden={i >= stack.length} className="font-mono text-[20px] tracking-tight text-fg/70 transition hover:text-fg">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
