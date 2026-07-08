import SchematicBackground from "@/components/SchematicBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustDataSystems from "@/components/TrustDataSystems";
import MetricCallouts from "@/components/MetricCallouts";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import CaseStudies from "@/components/CaseStudies";
import SkillsMatrix from "@/components/SkillsMatrix";
import GitHubProjects from "@/components/GitHubProjects";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SchematicBackground />
      <Nav />
      <main>
        <Hero />
        <TrustDataSystems />
        <MetricCallouts />
        <ExperienceTimeline />
        <CaseStudies />
        <SkillsMatrix />
        <GitHubProjects />
        <Education />
        <Achievements />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
