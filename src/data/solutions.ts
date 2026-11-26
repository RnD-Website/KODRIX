import type { MockVariant } from "@/components/pages/Mock";
export type Landing = {
  slug: string; label: string; eyebrow: string; title: string; lede: string; cta2: string;
  whyTitle: string; why: { title: string; desc: string }[]; whyMock: MockVariant;
  rows: { title: string; desc: string; mock: MockVariant }[];
  outTitle: string; out: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

const faqCommon = [
  { q: "Does KODRIX change my code without my approval?", a: "No. Agents propose changes as diffs with test results. You review and approve before anything is merged or deployed." },
  { q: "Which repositories can agents see?", a: "Only the repositories and branches you connect, with permissions you set per agent." },
  { q: "Where do agents run code?", a: "Each task runs in its own isolated, sandboxed environment." },
  { q: "Is this demo connected to a real AI backend?", a: "No. The demos on this site are simulated frontend experiences." },
];

export const solutions: Landing[] = [
  { slug: "startups", label: "Startups", eyebrow: "KODRIX for startups", title: "Ship the first version before the runway shrinks.", cta2: "See how it works",
    lede: "Describe the product, review what the agents build, and ship — with a team of one or ten.",
    whyTitle: "The engineering team that scales with you.", whyMock: "task",
    why: [{ title: "Prototype to production in one workspace", desc: "Agents write the code, run the tests and prepare the deploy, so you stay on product decisions." },
      { title: "Learns your codebase as it grows", desc: "Conventions and structure are read first, so new code matches what you already have." },
      { title: "Review stays yours", desc: "Every change arrives as a diff you can inspect, edit or reject." }],
    rows: [{ title: "Go from idea to working app", desc: "Describe the feature in plain language. Agents plan, build and verify it against your tests.", mock: "terminal" },
      { title: "Fix bugs without the context switch", desc: "The debug agent reproduces the failure, traces the cause and proposes a fix with a regression test.", mock: "diff" },
      { title: "Keep quality while you move fast", desc: "A review agent checks each diff for risks and missing tests before you see it.", mock: "review" }],
    outTitle: "Built to keep a small team moving.", out: [{ title: "Faster first draft", desc: "Agents handle the routine build work." }, { title: "Fewer regressions", desc: "Tests are written and run with each change." }, { title: "Clear review trail", desc: "Every step is visible and reversible." }], faq: faqCommon },
  { slug: "engineering-teams", label: "Engineering teams", eyebrow: "KODRIX for engineering teams", title: "Hand off the routine. Keep the decisions.", cta2: "See the workflow",
    lede: "Give your team agents that take on backlog work, tests and reviews, with permissions and audit trails you control.",
    whyTitle: "Agents that fit your review process.", whyMock: "review",
    why: [{ title: "Works inside your workflow", desc: "Tasks become branches and pull requests your team already knows how to review." },
      { title: "Scoped access", desc: "Give each agent only the repositories, branches and tools it needs." },
      { title: "An audit trail for every run", desc: "See what each agent read, ran and changed, and when." }],
    rows: [{ title: "Clear the backlog in parallel", desc: "Specialized agents split a task and hand results to each other.", mock: "task" },
      { title: "Reviews that catch more", desc: "The review agent flags risks, missing tests and unclear changes before a human looks.", mock: "review" },
      { title: "Connect the tools you use", desc: "Attach repositories, shells and browsers with control over how each can be called.", mock: "tools" }],
    outTitle: "More time on the hard problems.", out: [{ title: "Less toil", desc: "Routine tickets move without constant attention." }, { title: "Consistent reviews", desc: "Every change gets the same checks." }, { title: "Safer automation", desc: "Permissions and approvals are explicit." }], faq: faqCommon },
  { slug: "full-stack-builders", label: "Full-stack builders", eyebrow: "KODRIX for full-stack builders", title: "Front end to back end, in one workspace.", cta2: "Explore the agents",
    lede: "Build the UI, the API and the tests together — with agents that understand how the pieces connect.",
    whyTitle: "One person, a whole engineering team.", whyMock: "terminal",
    why: [{ title: "Agents for every layer", desc: "Code, debug, browser and terminal agents cover the full stack." },
      { title: "See it run", desc: "The browser agent opens your app and clicks through the flow it just built." },
      { title: "Ship when you're ready", desc: "Review the diff, run the checks and move to deployment." }],
    rows: [{ title: "Build the whole feature", desc: "From database change to UI, agents coordinate so the pieces line up.", mock: "terminal" },
      { title: "Test like a user", desc: "The browser agent exercises real flows and reports what breaks.", mock: "task" },
      { title: "Understand unfamiliar code", desc: "The research agent reads docs and source so you don't have to.", mock: "diff" }],
    outTitle: "Move across the stack with confidence.", out: [{ title: "Fewer handoffs", desc: "One workspace from schema to screen." }, { title: "Verified changes", desc: "Tests run before you review." }, { title: "Less context loss", desc: "Agents keep the thread across tasks." }], faq: faqCommon },
  { slug: "agencies", label: "Agencies", eyebrow: "KODRIX for agencies", title: "A separate, isolated workspace for every client.", cta2: "See permissions",
    lede: "Run agents across many client projects without mixing code, access or context.",
    whyTitle: "Deliver more without hiring for every project.", whyMock: "tools",
    why: [{ title: "Isolated by project", desc: "Each project gets its own repositories, permissions and runs." },
      { title: "Consistent delivery", desc: "Shared conventions and review steps across every engagement." },
      { title: "Show clients the work", desc: "Diffs and test results make progress easy to explain." }],
    rows: [{ title: "Spin up a project fast", desc: "Connect a repository and let agents map it before the first task.", mock: "tools" },
      { title: "Keep clients' code separate", desc: "Scoped permissions keep each project's access to itself.", mock: "task" },
      { title: "Review before you hand over", desc: "Every change is inspected before it reaches the client.", mock: "review" }],
    outTitle: "Capacity without the chaos.", out: [{ title: "More projects in parallel", desc: "Agents handle the routine build work." }, { title: "Clear boundaries", desc: "Access is scoped per client." }, { title: "Traceable work", desc: "Every run is recorded." }], faq: faqCommon },
];

export const agents: Landing[] = [
  ["code", "Code Agent", "Builds features, refactors and writes tests in your style.", "terminal"],
  ["debug", "Debug Agent", "Reproduces failures, traces root causes and proposes fixes.", "diff"],
  ["browser", "Browser Agent", "Opens your app, clicks through flows and reports what breaks.", "task"],
  ["terminal", "Terminal Agent", "Runs commands, installs dependencies and reads the output.", "terminal"],
  ["research", "Research Agent", "Reads docs and source to answer how things work.", "tools"],
  ["review", "Review Agent", "Checks diffs for bugs, risks and missing tests.", "review"],
].map(([slug, label, lede, mock]) => ({
  slug, label, eyebrow: `KODRIX ${label}`, title: `${label}: ${lede.split(",")[0].replace(/\.$/, "")}.`, lede, cta2: "See all agents",
  whyTitle: `What the ${label} does.`, whyMock: mock as MockVariant,
  why: [{ title: "Reads before it acts", desc: "It studies your repository and conventions first." }, { title: "Shows its work", desc: "Every command, edit and result is visible." }, { title: "Waits for your review", desc: "Changes arrive as diffs you approve." }],
  rows: [{ title: "Works alone or with the team", desc: "Use it on a single task or let it collaborate with the other agents.", mock: mock as MockVariant }, { title: "Runs in isolation", desc: "Each run happens in its own sandbox with scoped permissions.", mock: "tools" as MockVariant }],
  outTitle: "Built to be reviewed.", out: [{ title: "Visible steps", desc: "Nothing happens off-screen." }, { title: "Scoped access", desc: "Only the tools you attach." }, { title: "Human approval", desc: "You decide what ships." }], faq: faqCommon,
}));
