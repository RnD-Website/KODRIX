import type { Metadata, Viewport } from "next";
import { GeistPixelLine } from "geist/font/pixel";
import "./globals.css";
import Providers from "@/components/Providers";
import CookieConsent from "@/components/CookieConsent";

const url = process.env.NEXT_PUBLIC_SITE_URL || "https://kodrix.example.com";
const title = "KODRIX — AI coding agents. Build beyond code.";
const description = "KODRIX is an autonomous AI development platform that helps developers build, debug, understand, review, and ship software faster.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title, description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url, siteName: "KODRIX", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "KODRIX — Build beyond code." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org", "@type": "SoftwareApplication", name: "KODRIX",
  applicationCategory: "DeveloperApplication", description, url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistPixelLine.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
