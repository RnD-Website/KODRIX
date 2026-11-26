export type Consent = { necessary: true; analytics: boolean; marketing: boolean; decided: boolean };
const KEY = "kodrix-consent-v1";
export const defaultConsent: Consent = { necessary: true, analytics: false, marketing: false, decided: false };

export function readConsent(): Consent {
  if (typeof window === "undefined") return defaultConsent;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...defaultConsent, ...JSON.parse(raw) } : defaultConsent;
  } catch {
    return defaultConsent;
  }
}

export function writeConsent(c: Consent) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...c, decided: true }));
  } catch {}
  window.dispatchEvent(new CustomEvent("kodrix:consent", { detail: { ...c, decided: true } }));
}
