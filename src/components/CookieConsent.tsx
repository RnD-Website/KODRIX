"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { readConsent, writeConsent, type Consent } from "@/lib/consent";

/**
 * Single consent manager. If NEXT_PUBLIC_COOKIEBOT_ID is set, Cookiebot is the manager and this banner is disabled.
 * Otherwise the built-in manager is used. Never both.
 */
export default function CookieConsent() {
  const cookiebot = process.env.NEXT_PUBLIC_COOKIEBOT_ID;
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Consent>(readConsent());
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    if (cookiebot) return;
    const c = readConsent();
    setPrefs(c);
    setOpen(!c.decided);
    const reopen = () => { setOpen(true); setCustom(true); };
    window.addEventListener("kodrix:open-consent", reopen);
    return () => window.removeEventListener("kodrix:open-consent", reopen);
  }, [cookiebot]);

  if (cookiebot) {
    return (
      <>
        <Script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid={cookiebot} data-blockingmode="auto" strategy="afterInteractive" />
        <CookiebotBridge />
      </>
    );
  }

  const save = (c: Consent) => { writeConsent(c); setPrefs({ ...c, decided: true }); setOpen(false); setCustom(false); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog" aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[100] max-w-[420px] rounded-xl border border-line bg-[#0d0f15]/95 p-5 backdrop-blur-xl sm:right-auto"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-2">Privacy controls</p>
          <p className="mt-2 text-[13px] leading-5 text-fg-2">
            We use necessary cookies to run this site. With your permission we also use analytics (PostHog) to understand how it is used.
          </p>
          {custom && (
            <div className="mt-4 space-y-3 text-[13px]">
              <Row label="Necessary" note="Always on" checked disabled />
              <Row label="Analytics" checked={prefs.analytics} onChange={(v) => setPrefs({ ...prefs, analytics: v })} />
              <Row label="Marketing" checked={prefs.marketing} onChange={(v) => setPrefs({ ...prefs, marketing: v })} />
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {custom ? (
              <button className="btn-primary h-9 px-4" onClick={() => save(prefs)}>Save preferences</button>
            ) : (
              <>
                <button className="btn-primary h-9 px-4" onClick={() => save({ ...prefs, analytics: true, marketing: true })}>Accept all</button>
                <button className="h-9 rounded-lg border border-line px-4 font-mono text-[11px] uppercase tracking-[0.06em] text-fg transition hover:bg-white/5" onClick={() => save({ ...prefs, analytics: false, marketing: false })}>Necessary only</button>
                <button className="h-9 px-2 font-mono text-[11px] uppercase tracking-[0.06em] text-fg-2 hover:text-fg" onClick={() => setCustom(true)}>Customize</button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, note, checked, disabled, onChange }: { label: string; note?: string; checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-4">
      <span className="text-fg">{label} {note && <span className="text-fg-3">· {note}</span>}</span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange?.(e.target.checked)} className="h-4 w-4 accent-[#ef5a00]" />
    </label>
  );
}

/** Bridges Cookiebot consent into our analytics gate. */
function CookiebotBridge() {
  useEffect(() => {
    const fn = () => {
      const cb = (window as unknown as { Cookiebot?: { consent?: { statistics?: boolean; marketing?: boolean } } }).Cookiebot;
      writeConsent({ necessary: true, analytics: !!cb?.consent?.statistics, marketing: !!cb?.consent?.marketing, decided: true });
    };
    window.addEventListener("CookiebotOnAccept", fn);
    window.addEventListener("CookiebotOnDecline", fn);
    return () => { window.removeEventListener("CookiebotOnAccept", fn); window.removeEventListener("CookiebotOnDecline", fn); };
  }, []);
  return null;
}
