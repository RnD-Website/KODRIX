"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const f = "h-11 w-full rounded-lg border border-black/10 bg-[#f6f6f6] px-3.5 text-[14px] text-black placeholder:text-black/30 focus:border-black/40 focus:outline-none";
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-24 h-[3px] w-full overflow-hidden rounded bg-black/10"><i className="block h-full w-[28%] bg-black" /></div>
      {sent ? <p className="text-[18px]">Thanks — this is a demo form, so nothing was sent.</p> : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h1 className="text-[28px] leading-8 tracking-tight">Start building</h1>
          <p className="mt-2 text-[12px] text-black/55">Get started by connecting with our team. Demo form — nothing is sent.</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <label className="text-[12px]">First Name <span className="text-[#ef5a00]">*</span><input required placeholder="John" className={`${f} mt-1.5`} /></label>
            <label className="text-[12px]">Last Name <span className="text-[#ef5a00]">*</span><input required placeholder="Doe" className={`${f} mt-1.5`} /></label>
          </div>
          <label className="mt-5 block text-[12px]">Email <span className="text-[#ef5a00]">*</span><input required type="email" placeholder="Work email address" className={`${f} mt-1.5`} /></label>
          <label className="mt-5 flex items-start gap-3 text-[11px] leading-4 text-black/60"><input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-black" /><span>By completing this form, I agree to receive communications from KODRIX. I can unsubscribe at any time. For more information, please review our <a href="/privacy-policy" className="underline">Privacy Policy</a>.</span></label>
          <button type="submit" className="mt-8 h-12 w-full rounded-full bg-black text-[14px] font-medium text-white transition hover:bg-black/85 active:scale-[.99]">Continue</button>
        </form>
      )}
    </div>
  );
}
