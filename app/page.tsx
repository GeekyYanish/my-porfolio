import About from "@/components/About";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import IntroCurtain from "@/components/IntroCurtain";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[110] focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-web-500 focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:text-ink focus:uppercase"
      >
        Skip to content
      </a>

      <SmoothScroll />
      <CustomCursor />
      <IntroCurtain />
      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
