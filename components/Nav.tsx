"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import SpiderMark from "@/components/art/SpiderMark";
import Container from "@/components/Container";
import { EASE_OUT_EXPO, useMotionDisabled } from "@/components/motion";
import { site } from "@/data/site";

const links = [
  { n: "01", label: "Origin", href: "#about" },
  { n: "02", label: "Skills", href: "#skills" },
  { n: "03", label: "Projects", href: "#work" },
  { n: "04", label: "Timeline", href: "#experience" },
  { n: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("");
  const reduceMotion = useMotionDisabled();

  /* Solidify the bar once the hero is behind us. */
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy. A band across the upper-middle of the viewport decides which
     section counts as current, so short sections still register. */
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    /*
      Track every section's current ratio rather than just the entries in
      each callback. Reacting only to the callback leaves the last match
      stuck highlighted once everything scrolls out of the band — which is
      exactly what happens back at the top of the page, over the hero.
    */
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });

        let bestId = "";
        let best = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > best) {
            best = ratio;
            bestId = id;
          }
        });

        setActive(bestId ? `#${bestId}` : "");
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock the page while the mobile sheet is open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        stuck
          ? "border-b border-ink/10 bg-night-950/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — back to top`}
        >
          <SpiderMark className="h-6 w-6 text-web-500 transition-transform duration-300 group-hover:rotate-90 sm:h-7 sm:w-7" />
          <span className="font-display text-sm tracking-tight text-ink sm:text-base">
            {site.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.href;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative flex items-baseline gap-1.5 px-3 py-2 font-mono text-xs tracking-[0.16em] uppercase transition-colors ${
                      isActive
                        ? "text-ink"
                        : "text-ink-faint hover:text-ink-muted"
                    }`}
                  >
                    <span className="text-[0.6rem] text-web-400">{l.n}</span>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : "nav-strand"}
                        aria-hidden="true"
                        className="absolute inset-x-2 -bottom-0.5 h-px bg-web-500"
                        transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.resumePath}
            download
            className="hidden items-center gap-2 border border-web-500/60 px-3.5 py-2 font-mono text-[0.7rem] tracking-[0.16em] text-ink uppercase transition-colors hover:bg-web-500/15 sm:flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            key="sheet"
            className="overflow-hidden border-t border-ink/10 bg-night-950/95 backdrop-blur-md lg:hidden"
            initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
          >
            <Container className="py-4">
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-3 border-b border-ink/10 py-3.5 font-mono text-sm tracking-[0.16em] text-ink-muted uppercase"
                    >
                      <span className="text-xs text-web-400">{l.n}</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={site.resumePath}
                download
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 border border-web-500/60 py-3 font-mono text-xs tracking-[0.16em] text-ink uppercase"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Résumé
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
