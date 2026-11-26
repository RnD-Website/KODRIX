"use client";
import Link from "next/link";
import { footerCols } from "@/data/content";

const routes: Record<string, string> = { Overview: "/platform", "AI Agents": "/agents", "Agent Workspace": "/platform", Integrations: "/platform", Documentation: "/developers", "API Reference": "/developers", GitHub: "/developers", Changelog: "/developers", Blog: "/resources", Guides: "/resources", "Case Studies": "/resources", About: "/about", Contact: "/contact", Careers: "/careers" };
import Logo from "./ui/Logo";

const Social = ({ label, d }: { label: string; d: string }) => (
  <a href="#" aria-label={label} className="grid h-8 w-8 place-items-center rounded-md text-fg-2 transition hover:bg-white/10 hover:text-fg">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d={d} /></svg>
  </a>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-line-2 bg-bg">
      <div className="mx-auto max-w-[1100px] px-5 pb-8 pt-16 md:px-8 lg:px-0">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 max-w-[200px] font-mono text-[10px] uppercase leading-4 tracking-[0.06em] text-fg-3">Build beyond code.</p>
            <div className="mt-6 flex gap-1">
              <Social label="X" d="M18.2 2h3.3l-7.2 8.3L23 22h-6.7l-5.2-6.8L5.1 22H1.8l7.7-8.8L1.4 2h6.9l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z" />
              <Social label="GitHub" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.3 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.500 3.200-1.200 3.200-1.200.6 1.600.2 2.800.1 3.100.8.800 1.200 1.800 1.200 3.100 0 4.400-2.700 5.400-5.300 5.700.4.400.8 1.100.8 2.200v3.200c0 .3.2.7.8.600A11.500 11.500 0 0 0 12 .5z" />
              <Social label="LinkedIn" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4v12H3v-12zm7 0h3.8v1.7h.1c.5-1 1.8-2 3.800-2 4 0 4.800 2.600 4.800 6V21.500h-4v-5.600c0-1.300 0-3-1.900-3s-2.100 1.400-2.100 2.900v5.700h-4v-12z" />
            </div>
          </div>
          {footerCols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-3">{c.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (<li key={l}><Link href={routes[l] ?? "/"} className="text-[13px] text-fg/90 transition-colors hover:text-blue-3">{l}</Link></li>))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t border-line-2 pt-6 text-[11px] text-fg-3 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2"><Link href="/privacy-policy" className="hover:text-fg">Privacy</Link><Link href="/terms-of-service" className="hover:text-fg">Terms</Link><Link href="/cookie-policy" className="hover:text-fg">Cookies</Link>
            <button type="button" className="hover:text-fg" onClick={() => window.dispatchEvent(new Event("kodrix:open-consent"))}>Cookie preferences</button></nav>
          <p>© {new Date().getFullYear()} KODRIX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
