# KODRIX — AI coding agents website

Next.js 16 (App Router, Turbopack dev) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Lenis · Framer Motion · PostHog.

## Run
```bash
npm install
cp .env.example .env.local   # fill in values (all optional)
npm run dev                  # Turbopack dev server
npm run build && npm start   # production
```

## Structure
- `src/app` layout, page, metadata, sitemap, robots, OG image
- `src/components` page sections; `ui/` primitives; `developer/` editor, terminal, explorer, agent panel, timeline
- `src/animations` GSAP setup, hero intro, scroll reveals, shared easing
- `src/data` navigation + content · `src/lib` analytics, consent, utils · `src/hooks`

## Environment variables
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical URL, sitemap, OG |
| `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST` | PostHog (loads only after analytics consent) |
| `NEXT_PUBLIC_COOKIEBOT_ID` | optional: use Cookiebot as the single consent manager (disables built-in banner) |

## Deploy (Vercel)
`vercel` (or import the repo in Vercel), set the env vars above, deploy. `vercel.json` is included.

## Notes
All demo interactions are simulated front-end only; no AI backend is connected. NOVA TECH is a fictional example.
