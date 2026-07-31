"use client";

import { useEffect, useRef } from "react";
import { webMeshPaths } from "@/components/art/WebMesh";
import {
  usePointerFine,
  useMotionDisabled,
  useMounted,
} from "@/components/motion";

const TRAIL_POINTS = 14;

/* The cursor itself is a little web, generated once from the same parametric
   mesh the rest of the site uses. */
const WEB = webMeshPaths({
  cx: 0,
  cy: 0,
  radius: 15,
  spokes: 6,
  rings: 3,
  sag: 0.2,
  innerRatio: 0.24,
});

/**
 * Desktop-only cursor: a spun web, a precise centre dot, and a silk strand
 * that trails the pointer and retracts when it stops.
 *
 * Runs entirely on refs inside one rAF loop — no React state per frame, so
 * it never re-renders the tree while the pointer moves. Disabled on coarse
 * pointers and whenever motion is suppressed, and because the native cursor
 * is hidden while it's active, the footer motion toggle doubles as the
 * escape hatch that brings the system cursor straight back.
 *
 * The layer is promoted to the **top layer** via the popover API. A modal
 * `<dialog>` opened with `showModal()` also lives there, and the top layer
 * beats every z-index in the document — so a plainly-positioned cursor
 * simply disappears behind the case-study reader. Top-layer elements stack
 * in promotion order, which is why the layer is re-promoted whenever a
 * dialog opens.
 */
export default function CustomCursor() {
  const mounted = useMounted();
  const fine = usePointerFine();
  const reduceMotion = useMotionDisabled();
  const active = mounted && fine && !reduceMotion;

  const layerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const webRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPolylineElement>(null);

  /* Promote into the top layer, and stay there when a dialog opens. */
  useEffect(() => {
    const el = layerRef.current;
    if (!active || !el) return;
    if (typeof el.showPopover !== "function") return;

    const promote = () => {
      try {
        if (el.matches(":popover-open")) el.hidePopover();
        el.showPopover();
      } catch {
        /* the element may not be connected yet — harmless */
      }
    };

    el.setAttribute("popover", "manual");
    promote();

    // a dialog promoted after us would otherwise cover the cursor
    const observer = new MutationObserver((records) => {
      if (
        records.some(
          (r) =>
            r.target instanceof HTMLDialogElement &&
            (r.target as HTMLDialogElement).open,
        )
      ) {
        promote();
      }
    });
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });

    return () => {
      observer.disconnect();
      try {
        if (el.matches(":popover-open")) el.hidePopover();
      } catch {
        /* ignore */
      }
      el.removeAttribute("popover");
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    document.documentElement.dataset.cursor = "custom";

    const pointer = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const trail: number[][] = Array.from({ length: TRAIL_POINTS }, () => [
      -100, -100,
    ]);
    let hovering = false;
    let visible = false;
    let spin = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        ring.x = e.clientX;
        ring.y = e.clientY;
        trail.forEach((p) => {
          p[0] = e.clientX;
          p[1] = e.clientY;
        });
      }
      const el = e.target as HTMLElement | null;
      hovering = Boolean(
        el?.closest?.('a, button, [role="button"], input, textarea, summary'),
      );
    };

    const onLeave = () => {
      visible = false;
      pointer.x = -100;
      pointer.y = -100;
    };

    const loop = () => {
      // the web eases toward the pointer, giving it weight
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;
      // and turns a little as it settles over something interactive
      spin += ((hovering ? 24 : 0) - spin) * 0.12;

      // each trail node chases the one ahead of it — a strand that stretches
      // while moving and retracts to a point when the pointer stops
      trail[0][0] = pointer.x;
      trail[0][1] = pointer.y;
      for (let i = 1; i < trail.length; i += 1) {
        trail[i][0] += (trail[i - 1][0] - trail[i][0]) * 0.34;
        trail[i][1] += (trail[i - 1][1] - trail[i][1]) * 0.34;
      }

      dotRef.current?.setAttribute("cx", String(pointer.x));
      dotRef.current?.setAttribute("cy", String(pointer.y));
      webRef.current?.setAttribute(
        "transform",
        `translate(${ring.x.toFixed(1)} ${ring.y.toFixed(1)}) rotate(${spin.toFixed(1)}) scale(${hovering ? 1.65 : 1})`,
      );
      webRef.current?.setAttribute("opacity", visible ? "1" : "0");
      trailRef.current?.setAttribute(
        "points",
        trail.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "),
      );
      trailRef.current?.setAttribute("opacity", visible ? "0.5" : "0");

      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursor;
    };
  }, [active]);

  if (!active) return null;

  return (
    <div ref={layerRef} aria-hidden="true" className="cursor-layer">
      {/*
        Spider-sense cyan rather than web red, and no blend mode.

        The cursor has to stay legible over the whole site: the navy ground,
        the solid red CTAs and filter chips, and the cream paper panels. Red
        on red is invisible — and `mix-blend-mode: screen` made it more so.
        Cyan is complementary to the red surfaces and is already the site's
        interaction colour, and the dark drop-shadow carries it over the
        light panels.
      */}
      <svg
        className="h-full w-full"
        style={{ filter: "drop-shadow(0 0 1.5px rgba(3, 4, 10, 0.95))" }}
      >
        <polyline
          ref={trailRef}
          fill="none"
          stroke="var(--color-sense-400)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
        />
        <g
          ref={webRef}
          opacity="0"
          fill="none"
          stroke="var(--color-sense-400)"
          strokeLinecap="round"
        >
          {WEB.spokes.map((d, i) => (
            <path key={`s${i}`} d={d} strokeWidth="1" opacity="0.8" />
          ))}
          {WEB.rings.map((d, i) => (
            <path key={`r${i}`} d={d} strokeWidth="1.2" />
          ))}
        </g>
        {/* the centre dot goes red so it stays visible against the web */}
        <circle
          ref={dotRef}
          r="2.6"
          fill="var(--color-web-400)"
          stroke="var(--color-night-950)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
