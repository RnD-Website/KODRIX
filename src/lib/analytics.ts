import posthog from "posthog-js";
import { readConsent } from "./consent";

let started = false;

/** Initialise PostHog ONLY when analytics consent has been granted. */
export function initAnalytics() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key || started || typeof window === "undefined") return;
  if (!readConsent().analytics) return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie",
  });
  started = true;
  posthog.capture("$pageview");
}

export function stopAnalytics() {
  if (!started) return;
  posthog.opt_out_capturing();
  started = false;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!started) return;
  posthog.capture(event, props);
}
