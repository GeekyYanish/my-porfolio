"use client";

import { useEffect, useRef } from "react";
import { usePointerFine, useMotionDisabled, useMounted } from "@/components/motion";

const TRAIL_POINTS = 14;

/**
 * Desktop-only cursor: a precise dot, a lagging ring, and a web strand that
 * trails the pointer and retracts when it stops.
 *
 * Runs entirely on refs inside one rAF loop — no React state per frame, so
 * it never re-renders the tree while the pointer moves. Disabled on coarse
 * pointers and whenever motion is suppressed, and because the native cursor
 * is hidden while it's active, the footer motion toggle doubles as the
 * escape hatch that brings the system cursor straight back.
 */
export default function CustomCursor() {
  const mounted = useMounted();
  const fine = usePointerFine();
  const reduceMotion = useMotionDisabled();
  const active = mounted && fine && !reduceMotion;

  const dotRef = useRef<SVGCircleElement>(null);
  const ringRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPolylineElement>(null);

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
      // ring eases toward the pointer, giving it weight
      ring.x += (pointer.x - ring.x) * 0.16;
      ring.y += (pointer.y - ring.y) * 0.16;

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
      ringRef.current?.setAttribute(
        "transform",
        `translate(${ring.x.toFixed(1)} ${ring.y.toFixed(1)}) scale(${hovering ? 1.75 : 1})`,
      );
      ringRef.current?.setAttribute("opacity", visible ? "1" : "0");
      trailRef.current?.setAttribute(
        "points",
        trail.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "),
      );
      trailRef.current?.setAttribute("opacity", visible ? "0.55" : "0");

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
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full"
      style={{ mixBlendMode: "screen" }}
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
      <g ref={ringRef} opacity="0">
        <circle
          r="15"
          fill="none"
          stroke="var(--color-web-400)"
          strokeWidth="1.4"
        />
        {/* four web anchors on the ring, so it reads as a web not a halo */}
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1={0}
            y1={0}
            x2={15 * Math.cos((deg * Math.PI) / 180)}
            y2={15 * Math.sin((deg * Math.PI) / 180)}
            stroke="var(--color-web-400)"
            strokeWidth="1"
            opacity="0.45"
          />
        ))}
      </g>
      <circle ref={dotRef} r="2.6" fill="var(--color-sense-400)" />
    </svg>
  );
}
