export default function Logo({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight">
      <svg width={size + 2} height={size + 2} viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="10" fill="#fff" />
        <path d="M6.5 5.5v9M6.5 10l5.5-4.5M6.8 10l5.2 4.5" stroke="#000000" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      KODRIX
    </span>
  );
}
