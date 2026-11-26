export default function SectionHead({ eyebrow, title, lede, center }: { eyebrow?: string; title: React.ReactNode; lede?: string; center?: boolean }) {
  return (
    <header className={center ? "mx-auto text-center" : ""}>
      {eyebrow && <p className={`eyebrow mb-4 ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="kx-h2">{title}</h2>
      {lede && <p className={`kx-lede ${center ? "mx-auto" : ""}`}>{lede}</p>}
    </header>
  );
}
