import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import PlatformSection from "@/components/PlatformSection";
import DemoSection from "@/components/DemoSection";
import WorkflowSection from "@/components/WorkflowSection";
import PipelineSection from "@/components/PipelineSection";
import SecuritySection from "@/components/SecuritySection";
import CustomerStory from "@/components/CustomerStory";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";

export default function Home() {
  return (
    <>
      <Navigation />
      <RevealRoot>
        <main id="main">
          <Hero />
          <LogoStrip />
          <PlatformSection />
          <DemoSection />
          <WorkflowSection />
          <PipelineSection />
          <SecuritySection />
          <CustomerStory />
          <FinalCTA />
        </main>
      </RevealRoot>
      <Footer />
    </>
  );
}
