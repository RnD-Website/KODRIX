/** Original product-UI mock cards (illustrative, simulated data) used across inner pages. */
const shell = "relative overflow-hidden rounded-[14px] text-left";
const shellStyle = { background: "linear-gradient(180deg,rgba(26,23,21,.96),rgba(10,10,11,.98))", boxShadow: "0 0 0 1px rgba(255,255,255,.09), 0 30px 70px -30px rgba(239,90,0,.35), inset 0 1px 0 rgba(255,255,255,.06)" } as const;

function Chrome({ title, right }: { title: string; right?: string }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-white/[.07] bg-white/[.025] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">
      <span className="flex gap-1.5" aria-hidden><i className="h-[9px] w-[9px] rounded-full bg-[#ff6b63]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#ffc14d]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#38d27a]/80" /></span>
      <span>{title}</span>{right && <span className="ml-auto text-[#ffb48a]">{right}</span>}
    </div>
  );
}
const Tool = ({ name, state, tone = "ok" }: { name: string; state: string; tone?: "ok" | "run" }) => (
  <div className="flex items-center justify-between rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2 font-mono text-[11px]">
    <span className="text-[#ffd58a]">{name}</span>
    <span className={`flex items-center gap-1.5 ${tone === "ok" ? "text-[#7be3a1]" : "text-[#ffb48a]"}`}><i className={`h-1.5 w-1.5 rounded-full ${tone === "ok" ? "bg-[#38d27a]" : "animate-pulse bg-[#f7732b]"}`} />{state}</span>
  </div>
);

export type MockVariant = "task" | "diff" | "kpi" | "terminal" | "tools" | "review";

export default function Mock({ variant, className = "" }: { variant: MockVariant; className?: string }) {
  return (
    <div className={`${shell} ${className}`} style={shellStyle} aria-hidden="true">
      {variant === "task" && (<>
        <Chrome title="Task #1042" right="Simulated" />
        <div className="space-y-3 p-5">
          <p className="ml-auto max-w-[85%] rounded-xl bg-[#f2efe8] px-3.5 py-2.5 text-[13px] leading-5 text-[#1b1a18]">The checkout page throws a 500 when a coupon is applied twice. Fix it and add a test.</p>
          <p className="max-w-[88%] rounded-xl border border-white/10 bg-white/[.04] px-3.5 py-2.5 text-[13px] leading-5 text-white/75">Reproducing the failure first, then I'll trace where the second coupon is applied.</p>
          <Tool name="read_repository" state="Done" /><Tool name="run_tests checkout" state="1 failing" tone="run" /><Tool name="edit coupon.ts" state="Working" tone="run" />
        </div>
      </>)}
      {variant === "diff" && (<>
        <Chrome title="Review · coupon.ts" right="2 files" />
        <pre className="p-5 font-mono text-[11.5px] leading-[19px]">
          <span className="block text-white/35">@@ applyCoupon(order, code)</span>
          <span className="block bg-[#ff6b63]/10 text-[#ff9f9a]">- order.total -= coupon.amount;</span>
          <span className="block bg-[#38d27a]/10 text-[#7be3a1]">+ if (order.coupons.has(code)) return order;</span>
          <span className="block bg-[#38d27a]/10 text-[#7be3a1]">+ order.coupons.add(code);</span>
          <span className="block bg-[#38d27a]/10 text-[#7be3a1]">+ order.total -= coupon.amount;</span>
          <span className="mt-3 block text-white/55">✓ coupon applied once</span><span className="block text-white/55">✓ duplicate coupon ignored</span>
        </pre>
      </>)}
      {variant === "kpi" && (<>
        <Chrome title="Task outcomes" right="Illustrative" />
        <div className="p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">Tasks reviewed and merged</p>
          <div className="mt-6 flex h-[120px] items-end gap-2">
            {[28, 36, 33, 48, 52, 60, 66, 74].map((h, i) => (<i key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i > 5 ? "linear-gradient(180deg,#f7732b,#c94a00)" : "rgba(255,255,255,.14)" }} />))}
          </div>
          <div className="mt-4 flex justify-between font-mono text-[10px] text-white/40"><span>Week 1</span><span>Week 8</span></div>
        </div>
      </>)}
      {variant === "terminal" && (<>
        <Chrome title="kodrix — zsh" right="Simulated" />
        <pre className="p-5 font-mono text-[12px] leading-[20px] text-[#9aa4bd]">
          <span className="block text-white"><i className="mr-2 not-italic text-[#f7732b]">❯</i>kodrix run &quot;add dark mode&quot;</span>
          <span className="block">Reading repository… <i className="not-italic text-[#38d27a]">✓</i></span>
          <span className="block">Planning 3 changes… <i className="not-italic text-[#38d27a]">✓</i></span>
          <span className="block">Editing theme.ts, layout.tsx… <i className="not-italic text-[#38d27a]">✓</i></span>
          <span className="block">Running tests… <i className="not-italic text-[#38d27a]">✓</i></span>
          <span className="block text-[#7be3a1]">Ready for review.</span>
        </pre>
      </>)}
      {variant === "tools" && (<>
        <Chrome title="Connected tools" />
        <div className="space-y-2 p-5"><Tool name="github.read" state="Attached" /><Tool name="shell.run" state="Sandboxed" /><Tool name="browser.open" state="Attached" /><Tool name="deploy.preview" state="Needs approval" tone="run" /></div>
      </>)}
      {variant === "review" && (<>
        <Chrome title="Pull request #218" right="Needs review" />
        <div className="space-y-3 p-5 text-[13px] leading-5">
          <p className="text-white">Add retry to payment webhook</p>
          <div className="rounded-lg border border-white/10 bg-white/[.03] p-3 text-white/70"><span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#ffb48a]">Review agent</span><p className="mt-1.5">Retries are unbounded. Add a max attempt count and a test for the final failure.</p></div>
          <Tool name="tests" state="14 passed" />
        </div>
      </>)}
    </div>
  );
}
