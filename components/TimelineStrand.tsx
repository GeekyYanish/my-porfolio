"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import CrawlingSpider from "@/components/art/CrawlingSpider";
import { useMotionDisabled } from "@/components/motion";

/**
 * The timeline strand, with a spider spinning it as you scroll.
 *
 * The spider doesn't travel at a constant rate: each leg of the journey is
 * split into a move and a **dwell**, so it arrives at a node, sits there for
 * a stretch of scroll, then moves on. On arrival it takes that node's accent
 * colour, and the strand it spins on the way to the next node is spun in
 * that same colour — so the finished strand reads as a record of the trip.
 *
 * Travel is measured between the first and last node markers rather than the
 * container edges, so the spider starts and finishes exactly on a node at
 * any viewport width. Positions are percentages of that span, which means a
 * reflow (responsive change, fonts landing, a card wrapping) costs a
 * re-measure and nothing else.
 *
 * Under reduced motion the strand renders fully spun with the spider parked
 * on the final node — the finished state, not an empty one.
 */

/** Share of each leg spent sitting on the node rather than walking to it. */
const DWELL = 0.36;

type NodeInfo = { pct: number; color: string };
type Mapping = { input: number[]; output: number[] };

/** Piecewise-linear lookup. Framer's array form of `useTransform` captures
 *  its stops at creation; this reads them from a ref so a re-measure lands
 *  without having to rebuild the motion value. */
function sample(v: number, { input, output }: Mapping) {
  const last = input.length - 1;
  if (v <= input[0]) return output[0];
  if (v >= input[last]) return output[last];
  for (let i = 1; i <= last; i += 1) {
    if (v <= input[i]) {
      const t = (v - input[i - 1]) / (input[i] - input[i - 1]);
      return output[i - 1] + (output[i] - output[i - 1]) * t;
    }
  }
  return output[last];
}

/** Which node the spider has most recently reached. */
function nodeIndexAt(v: number, count: number) {
  if (count < 2) return 0;
  const legs = count - 1;
  const leg = Math.min(legs - 1, Math.max(0, Math.floor(v * legs)));
  const local = v * legs - leg;
  return local >= 1 - DWELL ? leg + 1 : leg;
}

export default function TimelineStrand({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMotionDisabled();
  const [span, setSpan] = useState<{ top: number; height: number } | null>(null);
  const [nodes, setNodes] = useState<NodeInfo[]>([]);
  const [active, setActive] = useState(0);
  const [crawling, setCrawling] = useState(false);

  /* Measure every node marker, and keep it current across reflows. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const markers = Array.from(
        el.querySelectorAll<HTMLElement>("[data-timeline-marker]"),
      );
      if (markers.length < 2) return;

      const base = el.getBoundingClientRect().top;
      const centres = markers.map((m) => {
        const r = m.getBoundingClientRect();
        return r.top - base + r.height / 2;
      });

      const top = centres[0];
      const height = Math.max(1, centres[centres.length - 1] - top);

      setSpan({ top, height });
      setNodes(
        markers.map((m, i) => ({
          pct: ((centres[i] - top) / height) * 100,
          color: m.dataset.nodeColor || "var(--color-web-500)",
        })),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Scroll progress → position, with a plateau on every node. */
  const mapping = useMemo<Mapping>(() => {
    const count = nodes.length;
    if (count < 2) return { input: [0, 1], output: [0, 100] };

    const legs = count - 1;
    const input = [0];
    const output = [nodes[0].pct];

    for (let k = 0; k < legs; k += 1) {
      // arrive…
      input.push((k + (1 - DWELL)) / legs);
      output.push(nodes[k + 1].pct);
      // …then sit still until the leg is over
      input.push((k + 1) / legs);
      output.push(nodes[k + 1].pct);
    }

    return { input, output };
  }, [nodes]);

  const mappingRef = useRef(mapping);
  mappingRef.current = mapping;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });

  const stepped = useTransform(scrollYProgress, (v) =>
    sample(v, mappingRef.current),
  );
  const position = useSpring(stepped, {
    stiffness: 150,
    damping: 26,
    mass: 0.3,
  });
  const positionPct = useMotionTemplate`${position}%`;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(nodeIndexAt(v, nodes.length));
  });

  /* Legs only move while the spider is actually travelling — during a dwell
     the position is constant, so no change events fire and it stands still. */
  const idleTimer = useRef<number | undefined>(undefined);

  useMotionValueEvent(position, "change", () => {
    if (reduceMotion) return;
    setCrawling(true);
    window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setCrawling(false), 200);
  });

  useEffect(() => () => window.clearTimeout(idleTimer.current), []);

  /* One strand segment per leg, tinted by the node it leaves. */
  const segments = nodes.slice(0, -1).map((n, i) => ({
    top: n.pct,
    height: nodes[i + 1].pct - n.pct,
    color: n.color,
  }));

  /* Parked on the final node under reduced motion, so it takes that node's
     colour rather than whatever the scroll position last implied. */
  const accentIndex = reduceMotion
    ? nodes.length - 1
    : Math.min(active, nodes.length - 1);
  const accent = nodes[accentIndex]?.color ?? "var(--color-web-500)";

  return (
    <div ref={ref} className="relative">
      {/* the un-spun strand, faint for its whole length */}
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-4 w-px bg-linear-to-b from-transparent via-ink/12 to-transparent md:left-1/2"
      />

      {span && nodes.length > 1 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-4 z-20 w-px md:left-1/2"
          style={{ top: span.top, height: span.height }}
        >
          {/*
            The spun strand is the full coloured stack, revealed by clipping
            the wrapper to the spider's current position — so each segment
            appears in its own colour exactly as the spider lays it down.
          */}
          <motion.div
            className="w-px overflow-hidden"
            style={
              reduceMotion ? { height: "100%" } : { height: positionPct }
            }
          >
            <div className="relative w-px" style={{ height: span.height }}>
              {segments.map((s, i) => (
                <span
                  key={i}
                  className="absolute left-0 w-px"
                  style={{
                    top: `${s.top}%`,
                    height: `${s.height}%`,
                    backgroundColor: s.color,
                    opacity: 0.75,
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.span
            className="absolute left-1/2 block -translate-x-1/2 -translate-y-1/2"
            style={
              reduceMotion
                ? { top: "100%", color: accent }
                : { top: positionPct, color: accent }
            }
          >
            <CrawlingSpider
              className="w-6 transition-[color,filter] duration-500 sm:w-7"
              crawling={crawling}
              style={{
                filter: `drop-shadow(0 0 8px color-mix(in srgb, ${accent} 55%, transparent))`,
              }}
            />
          </motion.span>
        </div>
      )}

      {children}
    </div>
  );
}
