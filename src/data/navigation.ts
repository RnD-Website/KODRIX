export type NavGroup = { label: string; items: { title: string; desc?: string; href: string }[] };

export const navGroups: NavGroup[] = [
  { label: "Platform", items: [
    { title: "Platform overview", desc: "One workspace for your whole AI engineering team.", href: "/platform" },
    { title: "Agent workspace", desc: "Editor, terminal and agents in a single view.", href: "/platform" },
    { title: "Repository understanding", desc: "Agents that learn your codebase before they touch it.", href: "/platform" },
    { title: "Review & ship", desc: "Inspect diffs, run tests, and move to deploy.", href: "/platform" },
  ]},
  { label: "Products", items: [
    { title: "Code Agent", href: "/agents/code" }, { title: "Debug Agent", href: "/agents/debug" },
    { title: "Browser Agent", href: "/agents/browser" }, { title: "Terminal Agent", href: "/agents/terminal" },
    { title: "Research Agent", href: "/agents/research" }, { title: "Review Agent", href: "/agents/review" },
  ]},
  { label: "Solutions", items: [
    { title: "Startups", href: "/solutions/startups" }, { title: "Engineering teams", href: "/solutions/engineering-teams" },
    { title: "Full-stack builders", href: "/solutions/full-stack-builders" }, { title: "Agencies", href: "/solutions/agencies" },
  ]},
  { label: "Developers", items: [
    { title: "Documentation", href: "/developers" }, { title: "API Reference", href: "/developers" },
    { title: "GitHub", href: "/developers" }, { title: "Changelog", href: "/developers" },
  ]},
  { label: "Resources", items: [
    { title: "Blog", href: "/resources" }, { title: "Guides", href: "/resources" }, { title: "Case Studies", href: "/resources" },
  ]},
];
