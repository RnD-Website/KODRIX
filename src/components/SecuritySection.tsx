"use client";
import { useState } from "react";
import { securityItems } from "@/data/content";
import Container from "./ui/Container";
import Card from "./ui/Card";

const repos = [
  { name: "web-app", access: "Read & write" },
  { name: "billing-service", access: "Read only" },
  { name: "infra", access: "No access" },
];

export default function SecuritySection() {
  const [i, setI] = useState(0);
  return (
    <section id="security" className="kx-section relative">
      <Container>
        <div data-reveal className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <div>
            <p className="eyebrow">Trust &amp; security</p>
            <h2 className="kx-h2 mt-5">Built for serious engineering teams.</h2>
            <p className="kx-lede max-w-[420px]">Give agents the access they need and nothing more, with visibility into everything they do.</p>

            <Card flat className="mt-10 max-w-[420px] p-5" aria-label="Repository permissions example">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">Repository permissions · example</p>
              <ul className="mt-3 divide-y divide-line-2">
                {repos.map((r) => (
                  <li key={r.name} className="flex items-center justify-between py-2.5 font-mono text-[12px]">
                    <span className="text-fg">{r.name}</span>
                    <span className={r.access === "No access" ? "text-fg-3" : r.access === "Read only" ? "text-[#f5c26b]" : "text-[#7be3a1]"}>{r.access}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <ul data-reveal-stagger className="border-t border-line">
            {securityItems.map((s, k) => (
              <li key={s.title} className="border-b border-line">
                <button onClick={() => setI(k)} onMouseEnter={() => setI(k)} aria-expanded={i === k}
                  className="grid w-full grid-cols-[34px_1fr_16px] items-start gap-2 py-4 text-left transition-colors hover:text-fg focus-visible:outline-none">
                  <span className="pt-1 font-mono text-[10px] text-fg-3">{String(k + 1).padStart(2, "0")}</span>
                  <span>
                    <span className={`block text-[20px] tracking-[-0.02em] transition-colors ${i === k ? "text-fg" : "text-fg-2"}`}>{s.title}</span>
                    <span className={`block overflow-hidden text-[13px] leading-5 text-fg-3 transition-all duration-500 ease-out ${i === k ? "mt-1.5 max-h-12 opacity-100" : "max-h-0 opacity-0"}`}>{s.desc}</span>
                  </span>
                  <span className={`pt-2 text-fg-3 transition-transform duration-300 ${i === k ? "rotate-45" : ""}`} aria-hidden>+</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
