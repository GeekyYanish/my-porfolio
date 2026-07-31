"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePointerFine, useMotionDisabled } from "@/components/motion";
import { site } from "@/data/site";

/**
 * Momentum scrolling, three gates deep: the `smoothScroll` flag in
 * data/site.ts, `prefers-reduced-motion` (plus the footer toggle), and a
 * fine pointer — touch devices keep their native inertia, which is better
 * than anything JS can fake.
 *
 * Renders nothing; it only installs the rAF loop and an anchor handler.
 */
export default function SmoothScroll() {
  const reduceMotion = useMotionDisabled();
  const fine = usePointerFine();

  useEffect(() => {
    if (!site.smoothScroll || reduceMotion || !fine) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    document.documentElement.dataset.lenis = "on";

    let frame = requestAnimationFrame(function loop(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    /*
      Lenis owns the scroll position, so native hash jumps fight it. Route
      in-page anchor clicks through lenis instead, and keep the URL hash in
      sync so links stay shareable and the back button still works.
    */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
      history.pushState(null, "", `#${id}`);
      // Keep keyboard focus with the destination, which preventDefault broke.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete document.documentElement.dataset.lenis;
    };
  }, [reduceMotion, fine]);

  return null;
}
