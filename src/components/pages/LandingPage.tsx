import type { Landing } from "@/data/solutions";
import Navigation from "../Navigation";
import Footer from "../Footer";
import RevealRoot from "../RevealRoot";
import { Faq, CtaBand } from "./Sections";
import { CenterHero, ConnectStrip, ListPanel, SpeedStrip, FeatureCards } from "./LandingSections";

export default function LandingPage({ d, back }: { d: Landing; back: string }) {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <CenterHero eyebrow={d.eyebrow} title={d.title} lede={d.lede} cta2={{ label: d.cta2, href: back }} mocks={["terminal", d.whyMock, "diff"]} />
          <ConnectStrip />
          <ListPanel eyebrow="Why KODRIX" title={d.whyTitle} items={d.why} mocks={[d.whyMock, d.rows[0].mock, d.rows[1].mock]} />
          <SpeedStrip title={d.outTitle} items={d.out} />
          <FeatureCards rows={d.rows} />
          <Faq title="Questions teams ask us" items={d.faq} />
          <CtaBand />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
