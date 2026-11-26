/** Illustrative dashboard frame for the platform hero (simulated data, no real metrics). */
const nav = ["Overview", "Tasks", "Agents", "Reviews", "Tools", "Settings"];
export default function AppFrame() {
  return (
    <div aria-hidden className="overflow-hidden rounded-[14px] text-left" style={{ background: "linear-gradient(180deg,rgba(24,22,20,.97),rgba(9,9,10,.99))", boxShadow: "0 0 0 1px rgba(255,255,255,.09), 0 50px 120px -40px rgba(239,90,0,.4)" }}>
      <div className="flex h-9 items-center gap-3 border-b border-white/[.07] px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-white/45">
        <span className="flex gap-1.5"><i className="h-[9px] w-[9px] rounded-full bg-[#ff6b63]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#ffc14d]/80" /><i className="h-[9px] w-[9px] rounded-full bg-[#38d27a]/80" /></span>
        <span>KODRIX workspace</span><span className="ml-auto text-[#ffb48a]">Illustrative</span>
      </div>
      <div className="grid md:grid-cols-[170px_1fr]">
        <ul className="hidden space-y-1 border-r border-white/[.07] p-3 md:block">
          {nav.map((n, i) => <li key={n} className={`rounded-md px-3 py-2 font-mono text-[11px] ${i === 1 ? "bg-white/[.07] text-white" : "text-white/45"}`}>{n}</li>)}
        </ul>
        <div className="p-5 md:p-6">
          <p className="text-[15px]">Task #1042 · Fix coupon bug</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[["Tests", "14 passed"], ["Files", "2 changed"], ["Status", "In review"]].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-white/[.08] bg-white/[.03] p-3"><p className="font-mono text-[9px] uppercase tracking-[0.08em] text-white/40">{k}</p><p className="mt-1 text-[18px] text-[#ffb48a]">{v}</p></div>
            ))}
          </div>
          <div className="mt-5 flex h-[110px] items-end gap-2">
            {[30, 42, 38, 55, 50, 64, 60, 78, 72, 88].map((h, i) => <i key={i} className="flex-1 rounded-t-[3px]" style={{ height: `${h}%`, background: i > 7 ? "linear-gradient(180deg,#f7732b,#ef5a00)" : "rgba(255,255,255,.12)" }} />)}
          </div>
          <ul className="mt-5 space-y-2 font-mono text-[11px] text-white/60">
            <li className="flex justify-between rounded-lg border border-white/[.08] px-3 py-2"><span>read_repository</span><span className="text-[#7be3a1]">Done</span></li>
            <li className="flex justify-between rounded-lg border border-white/[.08] px-3 py-2"><span>run_tests checkout</span><span className="text-[#7be3a1]">Passed</span></li>
            <li className="flex justify-between rounded-lg border border-white/[.08] px-3 py-2"><span>open_pull_request</span><span className="text-[#ffb48a]">Needs review</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
