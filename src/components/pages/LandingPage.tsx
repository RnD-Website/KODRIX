import type { Landing } from "@/data/solutions";
import Navigation from "../Navigation";
import Footer from "../Footer";
import RevealRoot from "../RevealRoot";
import { MosaicHero, WhyUs, FeatureRows, Outcomes, Faq, CtaBand } from "./Sections";

export default function LandingPage({ d, back }: { d: Landing; back: string }) {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <MosaicHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} cta2={{ label: d.cta2, href: back }} />
          <WhyUs title={d.whyTitle} items={d.why} mock={d.whyMock} />
          <FeatureRows rows={d.rows} />
          <Outcomes title={d.outTitle} items={d.out} />
          <Faq title="Questions teams ask us" items={d.faq} />
          <CtaBand />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
