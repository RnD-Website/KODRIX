"use client";
import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { clamp, ease } from "@/lib/utils";

const PHASES = [
  { k: "Build", title: "Build.", sub: "Bring your repository, tools, and guidelines together." },
  { k: "Observe", title: "Observe.", sub: "" },
  { k: "Improve", title: "What you learn becomes part of your agent.", sub: "The next cycle begins." },
];
const CHIPS = ["Builds", "Tests", "Reviews", "Deploys", "Incidents"];

function seeded(n: number) { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

export default function PipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const p = useScrollProgress(ref);
  const pRef = useRef(0); pRef.current = p;
  const phase = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  const [w, setW] = useState(0);

  useEffect(() => {
    const c = canvas.current!; const ctx = c.getContext("2d")!;
    const rnd = seeded(7);
    const dots = Array.from({ length: 700 }, () => { const a = rnd() * Math.PI * 2, r = Math.pow(rnd(), 0.7); return { a, r, s: rnd() * 1.6 + 0.4, hue: [210, 230, 255, 30, 280][Math.floor(rnd() * 5)], sp: rnd() * 0.3 + 0.05 }; });
    let raf = 0, W = 0, H = 0, dpr = 1;
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = c.clientWidth; H = c.clientHeight; setW(W);
      c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(c);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (time: number) => {
      const P = pRef.current;
      ctx.clearRect(0, 0, W, H);
      const mobile = W < 700;
      const x0 = W * (mobile ? 0.12 : 0.1), x1 = W * (mobile ? 0.62 : 0.7);
      const cy = H * 0.6;
      const ys = [H * 0.34, H * 0.6, H * 0.8];
      // alphas
      const lineA = P < 0.34 ? 1 - clamp((P - 0.3) / 0.06) : P < 0.67 ? clamp((P - 0.64) / 0.06) : 1;
      const dotA = P < 0.3 ? 0 : P < 0.67 ? Math.min(clamp((P - 0.3) / 0.06), 1 - clamp((P - 0.64) / 0.05)) : 0;
      const reveal = ease(clamp(P / 0.2)) ;
      const reveal2 = P > 0.64 ? ease(clamp((P - 0.64) / 0.12)) : 1;
      const glow = P > 0.67 ? clamp((P - 0.72) / 0.15) : 0;

      if (lineA > 0.01) {
        const R = P > 0.64 ? reveal2 : reveal;
        for (let g = 0; g < 3; g++) {
          const n = g === 1 ? 7 : 12;
          for (let i = 0; i < n; i++) {
            const ys0 = ys[g] + (i - n / 2) * (g === 1 ? 3 : 5);
            const xs0 = x0 + (g === 1 ? 0 : (i % 4) * 14);
            ctx.beginPath();
            const steps = 60, lim = Math.floor(steps * R);
            for (let s = 0; s <= lim; s++) {
              const t = s / steps;
              const e = t * t * (3 - 2 * t);
              const x = xs0 + (x1 - xs0) * t;
              const y = ys0 + (cy - ys0) * e;
              s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
            }
            const warm = glow > 0 && i % 5 === 0;
            ctx.strokeStyle = warm ? `rgba(255,170,120,${0.5 * lineA})` : `rgba(210,220,255,${(0.16 + (g === 1 ? 0.2 : 0.06)) * lineA})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
          // source ticks
          for (let k = 0; k < 4; k++) { ctx.fillStyle = `rgba(255,255,255,${0.7 * lineA * R})`; ctx.fillRect(x0 + k * 14, ys[g] - 28, 1.4, 56 * (g === 1 ? 0.15 : 1)); }
        }
        // node
        ctx.fillStyle = `rgba(255,255,255,${lineA * R})`; ctx.shadowColor = "#ffb48a"; ctx.shadowBlur = 10 + glow * 24;
        ctx.fillRect(x1 - 3, cy - 3, 6, 6); ctx.shadowBlur = 0;
      }
      if (dotA > 0.01) {
        const t = reduced ? 0 : time / 1000;
        const cx = W / 2, cyd = H * 0.52, rad = Math.min(W, H * 1.4) * 0.38;
        const spread = 0.6 + 0.4 * ease(clamp((P - 0.3) / 0.2));
        for (const d of dots) {
          const a = d.a + t * d.sp * 0.1;
          const x = cx + Math.cos(a) * d.r * rad * 1.5 * spread;
          const y = cyd + Math.sin(a) * d.r * rad * 0.8 * spread;
          ctx.fillStyle = `hsla(${d.hue},90%,${d.hue === 30 ? 65 : 75}%,${0.75 * dotA})`;
          ctx.fillRect(x, y, d.s, d.s);
        }
        ctx.fillStyle = `rgba(255,255,255,${dotA})`; ctx.fillRect(cx - 3, cyd - 3, 6, 6);
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    if (reduced) { const i = setInterval(() => draw(0), 200); return () => { clearInterval(i); ro.disconnect(); }; }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  const goto = (i: number) => {
    const el = ref.current; if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const target = top + (el.offsetHeight - window.innerHeight) * [0.08, 0.5, 0.88][i];
    const lenis = (window as unknown as { __lenis?: { scrollTo: (n: number, o?: object) => void } }).__lenis;
    lenis ? lenis.scrollTo(target, { duration: 1.4 }) : window.scrollTo({ top: target, behavior: "smooth" });
  };

  const mobile = w > 0 && w < 700;
  return (
    <section id="pipeline" aria-label="Build, observe, improve">
      <div ref={ref} style={{ height: "480vh" }} className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 top-[17vh] px-5 text-center">
            {PHASES.map((ph, i) => (
              <div key={ph.k} className="absolute inset-x-0 transition-all duration-700 ease-out" style={{ opacity: phase === i ? 1 : 0, transform: `translateY(${phase === i ? 0 : phase > i ? -14 : 14}px)` }} aria-hidden={phase !== i}>
                {i === 1 ? (
                  <><h2 className="text-[34px] leading-none tracking-[-0.03em] md:text-[44px]">{ph.title}</h2>
                    <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-[11px] text-fg-2">{CHIPS.map((c, k) => <li key={c} className="flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full" style={{ background: ["#f7732b", "#ffb48a", "#fff", "#ffb07a", "#c79bff"][k] }} />{c}</li>)}</ul></>
                ) : i === 0 ? (
                  <><h2 className="text-[40px] leading-none tracking-[-0.03em] md:text-[52px]">{ph.title}</h2><p className="mx-auto mt-4 max-w-[300px] text-[14px] leading-5 text-fg-2">{ph.sub}</p></>
                ) : (
                  <><h2 className="h-display mx-auto max-w-[620px] text-[26px] md:text-[34px]" style={{ lineHeight: 1.15 }}>{ph.title}</h2><p className="mt-3 text-[13px] text-fg-2">{ph.sub}</p></>
                )}
              </div>
            ))}
          </div>
          {/* canvas labels */}
          <div className="pointer-events-none absolute inset-0 text-[11px] text-fg/90 transition-opacity duration-500" style={{ opacity: phase === 1 ? 0 : 1 }}>
            <span className="absolute" style={{ left: `${mobile ? 8 : 10}%`, top: "26%" }}>Repository</span>
            <span className="absolute" style={{ left: `${mobile ? 4 : 5}%`, top: "52%" }}>Tools</span>
            <span className="absolute" style={{ left: `${mobile ? 8 : 10}%`, top: "72%" }}>Guidelines</span>
            <span className="absolute -translate-y-1/2" style={{ left: `${mobile ? 64 : 72}%`, top: "60%" }}>{phase === 2 ? "Your agent, but better" : "Your agent"}</span>
          </div>
          {/* tabs */}
          <div className="absolute inset-x-0 bottom-7 flex justify-center px-4">
            <div className="flex items-center gap-1 rounded-lg border border-line bg-[#0e0f14]/90 p-1 font-mono text-[9px] uppercase tracking-[0.1em] backdrop-blur">
              {PHASES.map((ph, i) => (
                <button key={ph.k} onClick={() => goto(i)} aria-pressed={phase === i} className={`h-7 rounded-md px-3 transition-colors ${phase === i ? "bg-white/15 text-fg" : "text-fg-3 hover:text-fg"}`}>{ph.k}</button>
              ))}
              <a href="#agents" className="ml-1 flex h-7 items-center gap-1.5 rounded-md bg-white/[.07] px-3 text-fg hover:bg-white/15"><i className="h-1.5 w-1.5 rounded-full bg-blue" />Explore the platform <span aria-hidden>›</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
