import { Mail } from "lucide-react";
import CitySkyline from "@/components/art/CitySkyline";
import SpiderMark from "@/components/art/SpiderMark";
import BackToTop from "@/components/BackToTop";
import Container from "@/components/Container";
import MotionToggle from "@/components/MotionToggle";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 pt-20 pb-10">
      {/* Night skyline. Same rule as the hero: the glow behind the buildings
          is what makes them read, and the bands need enough height that
          their rooflines survive the `slice` crop. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-night-950)_0%,#0d1030_62%,#231640_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_100%_at_52%_108%,color-mix(in_srgb,var(--color-web-600)_42%,transparent)_0%,transparent_70%)]" />
        {/*
          These bands have to be tall enough to clear the drawing's own 1440×440
          aspect. `slice` scales to cover and anchors to the bottom, so a short
          band shows only the bases of the buildings — which renders as one flat
          slab with a hard top edge rather than a skyline.
        */}
        <CitySkyline
          plane={2}
          flicker={false}
          className="absolute inset-x-0 bottom-0 h-[22rem] w-full opacity-85 sm:h-[27rem]"
        />
        <CitySkyline
          plane={3}
          flicker={false}
          className="absolute inset-x-0 bottom-0 h-40 w-full sm:h-52"
        />
        <div className="grain absolute inset-0" />
        {/* keeps the footer copy legible over the city */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,color-mix(in_srgb,var(--color-night-950)_75%,transparent)_0%,transparent_78%)]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-8">
          <BackToTop />

          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label={`${site.name} — back to top`}
          >
            <SpiderMark className="h-6 w-6 text-web-500 transition-transform duration-300 group-hover:rotate-90" />
            <span className="font-display text-base text-ink">{site.name}</span>
          </a>

          <ul className="flex items-center gap-5">
            <li>
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-faint transition-colors hover:text-web-400"
              >
                <GithubIcon className="h-5 w-5" />
                <span className="sr-only">
                  GitHub — {site.githubHandle} (opens in a new tab)
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 w-11 items-center justify-center text-ink-faint transition-colors hover:text-sense-400"
              >
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">
                  LinkedIn — {site.linkedinHandle} (opens in a new tab)
                </span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-11 w-11 items-center justify-center text-ink-faint transition-colors hover:text-gold"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Email — {site.email}</span>
              </a>
            </li>
          </ul>

          <MotionToggle />

          <div className="w-full border-t border-ink/10 pt-6 text-center">
            <p className="font-mono text-[0.66rem] tracking-[0.14em] text-ink-faint">
              © {year} {site.name} · {site.neighborhood}, IN
            </p>
            <p className="mt-1.5 font-mono text-[0.62rem] tracking-[0.14em] text-ink-faint/70">
              Built with Next.js, TypeScript &amp; Tailwind CSS · All artwork
              original
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
