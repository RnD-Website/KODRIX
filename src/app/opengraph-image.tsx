import { ImageResponse } from "next/og";
export const alt = "KODRIX — Build beyond code.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 80, background: "linear-gradient(160deg,#000000 40%,#8a6a2c)", color: "#f5f7fa", fontFamily: "monospace" }}>
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#ffb48a" }}>KODRIX · AI CODING AGENTS</div>
        <div style={{ fontSize: 110, marginTop: 20, lineHeight: 1 }}>Build beyond code.</div>
        <div style={{ fontSize: 30, marginTop: 24, color: "#a0a7b4" }}>Your AI engineering team. Always ready.</div>
      </div>
    ),
    size
  );
}
