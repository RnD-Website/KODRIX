export type Feature = { title: string; desc: string };
export type PageDef = {
  slug: string; nav: string; eyebrow: string; title: string; lede: string;
  features?: Feature[]; featuresTitle?: string;
  steps?: Feature[]; stepsTitle?: string;
  prose?: { h: string; p: string }[];
  form?: "contact" | "signin";
  cta?: { label: string; href: string };
};

const legalNote = "Template text for the KODRIX demo site. It is not legal advice — have counsel review before launch.";

export const pages: PageDef[] = [
  { slug: "developers", nav: "Developers", eyebrow: "Developers", title: "Docs, API and tools for builders.",
    lede: "Everything you need to connect KODRIX to your repositories, CI and the rest of your stack.",
    featuresTitle: "Start here",
    features: [
      { title: "Documentation", desc: "Quickstarts, concepts and guides." }, { title: "API reference", desc: "Endpoints for tasks, agents and results." },
      { title: "CLI", desc: "Run agents from your terminal." }, { title: "Changelog", desc: "What shipped and when." },
    ],
    prose: [{ h: "Status", p: "Developer docs are placeholders in this demo site. Connect your real documentation URLs in src/data/pages.ts." }],
    cta: { label: "Get access", href: "/contact" } },
  { slug: "resources", nav: "Resources", eyebrow: "Resources", title: "Learn how teams build with agents.",
    lede: "Guides, write-ups and examples on working with AI coding agents.",
    featuresTitle: "Latest",
    features: [
      { title: "Blog", desc: "Product updates and engineering notes." }, { title: "Guides", desc: "Step-by-step walkthroughs for common workflows." },
      { title: "Case studies", desc: "Illustrative examples of agent-assisted projects." },
    ], cta: { label: "Subscribe for updates", href: "/contact" } },
  { slug: "pricing", nav: "Pricing", eyebrow: "Pricing", title: "Simple plans. Pricing coming soon.",
    lede: "KODRIX is in early access. Tell us about your team and we'll share plans when they're ready.",
    featuresTitle: "Early access",
    features: [
      { title: "Individual", desc: "For solo builders exploring agent-assisted development." },
      { title: "Team", desc: "Shared workspaces, roles and review workflows." },
      { title: "Enterprise", desc: "Custom security review, SSO and support." },
    ], cta: { label: "Join early access", href: "/contact" } },
  { slug: "about", nav: "About", eyebrow: "Company", title: "We're building the AI engineering team you can trust.",
    lede: "KODRIX exists to help developers go beyond writing code — to describe a product and review what ships.",
    featuresTitle: "What we believe",
    features: [
      { title: "Humans decide", desc: "Agents propose; people review and approve." },
      { title: "Show the work", desc: "Every step, command and diff is visible." },
      { title: "Respect the codebase", desc: "Learn conventions first, then contribute." },
    ], cta: { label: "Contact us", href: "/contact" } },
  { slug: "sign-in", nav: "Sign in", eyebrow: "Account", title: "Welcome back.",
    lede: "Sign in to your KODRIX workspace. Authentication is not connected in this demo.", form: "signin" },
  { slug: "privacy-policy", nav: "Privacy", eyebrow: "Legal", title: "Privacy Policy", lede: legalNote,
    prose: [
      { h: "What we collect", p: "Only what you submit through forms, plus analytics if you accept analytics cookies." },
      { h: "Analytics", p: "PostHog loads only after you consent. You can change your choice any time from Cookie preferences in the footer." },
      { h: "Your choices", p: "You can ask us to access or delete your data by contacting us." },
    ] },
  { slug: "terms-of-service", nav: "Terms", eyebrow: "Legal", title: "Terms of Service", lede: legalNote,
    prose: [
      { h: "Using KODRIX", p: "Use the service lawfully and only on code you have the right to work on." },
      { h: "Your code", p: "You keep ownership of your repositories and the output you accept." },
      { h: "Changes", p: "We may update these terms; continued use means you accept the update." },
    ] },
  { slug: "cookie-policy", nav: "Cookies", eyebrow: "Legal", title: "Cookie Policy", lede: legalNote,
    prose: [
      { h: "Necessary", p: "Used to run the site and remember your consent choice." },
      { h: "Analytics", p: "Optional. Loaded only after you accept." },
    ] },
];

export const pageBySlug = (s: string) => pages.find((p) => p.slug === s);
