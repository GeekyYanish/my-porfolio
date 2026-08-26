import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import Container from "@/components/Container";
import HeroHeadline from "@/components/HeroHeadline";
import HeroSky from "@/components/HeroSky";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 sm:pt-28"
    >
      <HeroSky />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <Reveal variant="fade">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs tracking-[0.24em] text-ink-faint uppercase">
              {/* The availability signal leads: it is the one thing a
                  recruiter is scanning for and it was previously only
                  stated at the very bottom of the page. */}
              <span className="sense-ring relative flex items-center gap-2 border border-sense-500/45 bg-sense-500/10 px-2.5 py-1 text-sense-400">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-sense-400"
                />
                {site.availability}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {site.neighborhood}, IN
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-ink/25" />
              <span>MCA @ CHRIST University</span>
            </p>
          </Reveal>

          <HeroHeadline />

          <Reveal delay={0.66} className="mt-7 max-w-xl">
            <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
              {site.subheadline}
            </p>
          </Reveal>

          <Reveal delay={0.76}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <MagneticButton href="#work" tone="primary" senseRing>
                View My Work
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="#contact" tone="ghost" senseRing>
                Contact Me
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.86}>
            {/* The skyline rises behind this row at wide widths, so the
                links carry their own ground rather than sitting on brickwork. */}
            <ul className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xs bg-night-950/55 px-3 font-mono text-xs tracking-[0.14em] text-ink-faint uppercase backdrop-blur-xs transition-colors hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4 transition-colors group-hover:text-web-400" />
                  {site.githubHandle}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xs bg-night-950/55 px-3 font-mono text-xs tracking-[0.14em] text-ink-faint uppercase backdrop-blur-xs transition-colors hover:text-ink"
                >
                  <LinkedinIcon className="h-4 w-4 transition-colors group-hover:text-sense-400" />
                  {site.linkedinHandle}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute inset-x-0 bottom-4 z-10 mx-auto flex w-fit flex-col items-center gap-2 px-3 py-1.5 font-mono text-micro tracking-[0.3em] text-ink-faint uppercase transition-colors hover:text-sense-400"
      >
        Scroll
        <ArrowDown
          className="h-4 w-4 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
