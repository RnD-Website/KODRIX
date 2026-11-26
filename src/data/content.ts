export const brand = {
  name: "KODRIX",
  tagline: "Build beyond code.",
  positioning: "Your AI engineering team. Always ready.",
};

export const stack = ["GitHub", "TypeScript", "Next.js", "Python", "Docker", "PostgreSQL", "Rust", "Go", "Node.js", "React"];

export type Agent = { id: string; name: string; tag: string; desc: string; hue: string };
export const agents: Agent[] = [
  { id: "code", name: "Code Agent", tag: "Build features · Components · Production code", desc: "Turn ideas into working software. Build features, create components, and write production-ready code with an autonomous coding agent.", hue: "#ef5a00" },
  { id: "debug", name: "Debug Agent", tag: "Errors · Traces · Fixes", desc: "Find and fix bugs faster. Analyze errors, trace problems, and identify potential solutions.", hue: "#f7732b" },
  { id: "browser", name: "Browser Agent", tag: "Automation · Testing · User journeys", desc: "Automate browser workflows, test websites, navigate interfaces, and validate user journeys.", hue: "#ffb48a" },
  { id: "terminal", name: "Terminal Agent", tag: "Commands · Scripts · Workflows", desc: "Execute development commands, manage scripts, and automate technical workflows.", hue: "#ef5a00" },
  { id: "research", name: "Research Agent", tag: "Docs · Codebases · Hard problems", desc: "Understand documentation, investigate codebases, and research complex technical problems.", hue: "#f7732b" },
  { id: "review", name: "Review Agent", tag: "Diffs · Issues · Code quality", desc: "Analyze code changes, identify potential issues, and improve code quality.", hue: "#ffb48a" },
];

export const steps = [
  { n: "01", title: "Describe", desc: "Tell KODRIX what you want to build.", label: "You describe" },
  { n: "02", title: "Understand", desc: "The AI analyzes your repository, requirements, and project structure.", label: "KODRIX reads the repo" },
  { n: "03", title: "Execute", desc: "Specialized agents work together to complete development tasks.", label: "Agents build" },
  { n: "04", title: "Review", desc: "Inspect generated code, test results, and suggested improvements.", label: "You review" },
  { n: "05", title: "Ship", desc: "Move from completed development tasks to deployment.", label: "Ready to ship" },
];

export const securityItems = [
  { title: "Secure code access", desc: "Agents only see the repositories you connect." },
  { title: "Repository permissions", desc: "Scope each agent to the repos and branches it needs." },
  { title: "Team management", desc: "Invite teammates, assign roles, and share workspaces." },
  { title: "Access controls", desc: "Decide who can run agents and who can approve changes." },
  { title: "Audit logs", desc: "A record of what every agent did and when." },
  { title: "Isolated workflows", desc: "Each task runs in its own sandboxed environment." },
  { title: "Enterprise-ready architecture", desc: "Built to fit into the way serious engineering teams work." },
];

export const footerCols = [
  { title: "Platform", links: ["Overview", "AI Agents", "Agent Workspace", "Integrations"] },
  { title: "Developers", links: ["Documentation", "API Reference", "GitHub", "Changelog"] },
  { title: "Resources", links: ["Blog", "Guides", "Case Studies"] },
  { title: "Company", links: ["About", "Contact", "Careers"] },
];

export const demoPrompts = [
  "Build a responsive SaaS dashboard with authentication, analytics, and a settings page.",
  "Fix the failing checkout tests and explain the root cause.",
  "Review my last pull request and suggest improvements.",
];
