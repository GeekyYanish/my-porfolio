import { seededRandom } from "@/components/seeded";

/**
 * Procedurally generated night skyline, drawn in depth planes.
 *
 * Everything here is deterministic: the layout comes from a seeded PRNG
 * (`seededRandom`), never `Math.random()`, so the server and client render
 * byte-identical markup and hydration stays quiet.
 *
 * Output is three paths per plane at most — one silhouette, two window
 * buckets — so a whole city costs a handful of DOM nodes rather than
 * hundreds of <rect>s.
 */

export type SkylinePlane = 1 | 2 | 3;

type Preset = {
  seed: number;
  minW: number;
  maxW: number;
  minH: number;
  maxH: number;
  /** chance a given window cell is lit */
  litChance: number;
  /** of the lit windows, the share that burn warm gold rather than cold cyan */
  warmShare: number;
  winW: number;
  winH: number;
  gapX: number;
  gapY: number;
  pad: number;
  /** chance a building carries a roof antenna */
  antennaChance: number;
  maxWindows: number;
};

const PRESETS: Record<SkylinePlane, Preset> = {
  // far haze — small, dense, barely lit
  1: {
    seed: 1_337_042,
    minW: 22,
    maxW: 54,
    minH: 48,
    maxH: 132,
    litChance: 0.34,
    warmShare: 0.3,
    winW: 3,
    winH: 4,
    gapX: 5,
    gapY: 7,
    pad: 6,
    antennaChance: 0.06,
    maxWindows: 150,
  },
  // mid city — the brightest band, most of the character
  2: {
    seed: 90_210_777,
    minW: 34,
    maxW: 82,
    minH: 104,
    maxH: 244,
    litChance: 0.44,
    warmShare: 0.42,
    winW: 4,
    winH: 6,
    gapX: 7,
    gapY: 10,
    pad: 9,
    antennaChance: 0.16,
    maxWindows: 240,
  },
  /*
    Foreground rooftops — a low, almost unlit black band that frames the
    composition. Deliberately sparse: at any real window density this plane
    covers the two behind it and its widely-spaced lights stop reading as
    windows at all, becoming confetti scattered over a flat dark field.
  */
  3: {
    seed: 55_128_309,
    minW: 58,
    maxW: 138,
    minH: 150,
    maxH: 330,
    litChance: 0.06,
    warmShare: 0.62,
    winW: 5,
    winH: 7,
    gapX: 8,
    gapY: 11,
    pad: 13,
    antennaChance: 0.34,
    maxWindows: 26,
  },
};

const VIEW_W = 1440;
const VIEW_H = 440;

type Generated = {
  silhouette: string;
  /**
   * The same outline minus the ground edge and the two closing verticals —
   * rooftops and the steps between buildings only. Stroking the full closed
   * silhouette instead would rule bright lines straight across the sky.
   */
  roofline: string;
  warm: string;
  cold: string;
  antennae: { x: number; y: number; h: number }[];
};

function generate(plane: SkylinePlane): Generated {
  const p = PRESETS[plane];
  const rand = seededRandom(p.seed);

  const outline: string[] = [];
  const warm: string[] = [];
  const cold: string[] = [];
  const antennae: { x: number; y: number; h: number }[] = [];
  let windowCount = 0;
  let x = 0;

  while (x < VIEW_W) {
    const w = Math.round(p.minW + rand() * (p.maxW - p.minW));
    const h = Math.round(p.minH + rand() * (p.maxH - p.minH));
    const top = VIEW_H - h;
    const right = Math.min(x + w, VIEW_W);

    // step up the face, across the roof, and leave the cursor at the far edge
    outline.push(`L${x} ${top}`, `L${right} ${top}`);

    if (rand() < p.antennaChance) {
      antennae.push({
        x: Math.round(x + w * (0.3 + rand() * 0.4)),
        y: top,
        h: Math.round(14 + rand() * 30),
      });
    }

    const cols = Math.floor((w - p.pad * 2 + p.gapX) / (p.winW + p.gapX));
    const rows = Math.floor((h - p.pad * 2 + p.gapY) / (p.winH + p.gapY));

    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        if (windowCount >= p.maxWindows) break;
        if (rand() > p.litChance) continue;

        const wx = x + p.pad + c * (p.winW + p.gapX);
        const wy = top + p.pad + r * (p.winH + p.gapY);
        if (wx + p.winW > VIEW_W) continue;

        const cell = `M${wx} ${wy}h${p.winW}v${p.winH}h-${p.winW}Z`;
        (rand() < p.warmShare ? warm : cold).push(cell);
        windowCount += 1;
      }
    }

    x = right;
  }

  return {
    silhouette: `M0 ${VIEW_H}${outline.join("")}L${VIEW_W} ${VIEW_H}Z`,
    // same segments, but opened: the leading L becomes the M
    roofline: `M${outline[0].slice(1)}${outline.slice(1).join("")}`,
    warm: warm.join(""),
    cold: cold.join(""),
    antennae,
  };
}

/* Generated once at module scope — the geometry never changes. */
const PLANES: Record<SkylinePlane, Generated> = {
  1: generate(1),
  2: generate(2),
  3: generate(3),
};

/*
  Aerial perspective: distant buildings sit lighter and hazier against the
  sky, near ones go almost pure black. Without that spread every plane is the
  same value as the background and the city disappears, leaving the lit
  windows floating on their own.

  `rim` is a thin top-edge highlight that separates each silhouette from the
  glow behind it — the thing that actually sells the depth.
*/
const TONE: Record<
  SkylinePlane,
  { fill: string; opacity: number; rim: string; rimOpacity: number }
> = {
  1: {
    fill: "#1b1c3d",
    opacity: 0.92,
    rim: "var(--color-sense-400)",
    rimOpacity: 0.3,
  },
  2: {
    fill: "#0c0e22",
    opacity: 1,
    rim: "var(--color-web-400)",
    rimOpacity: 0.5,
  },
  3: {
    fill: "#02030a",
    opacity: 1,
    rim: "var(--color-web-400)",
    rimOpacity: 0.7,
  },
};

export default function CitySkyline({
  plane,
  className = "",
  flicker = true,
}: {
  plane: SkylinePlane;
  className?: string;
  /** Lets the window lights blink. Off for the small footer skyline. */
  flicker?: boolean;
}) {
  const g = PLANES[plane];
  const tone = TONE[plane];

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={g.silhouette} fill={tone.fill} opacity={tone.opacity} />
      {/* rim light along the rooftops */}
      <path
        d={g.roofline}
        fill="none"
        stroke={tone.rim}
        strokeWidth={plane === 3 ? 1.6 : 1.2}
        opacity={tone.rimOpacity}
        strokeLinejoin="round"
      />

      {g.antennae.map((a, i) => (
        <g key={i}>
          <line
            x1={a.x}
            y1={a.y}
            x2={a.x}
            y2={a.y - a.h}
            stroke={tone.fill}
            strokeWidth={plane === 3 ? 3 : 2}
            opacity={tone.opacity}
          />
          <circle
            cx={a.x}
            cy={a.y - a.h}
            r={plane === 3 ? 2.6 : 1.8}
            fill="var(--color-web-500)"
            className={flicker ? "window-flicker" : undefined}
            style={{ animationDelay: `${(i % 5) * 1.3}s` }}
          />
        </g>
      ))}

      {/* Lit windows. The far plane stays dim on purpose — at full strength
          the distant lights detach from their buildings and read as confetti
          floating in the sky. */}
      <path
        d={g.warm}
        fill="var(--color-gold)"
        opacity={plane === 1 ? 0.34 : plane === 2 ? 0.68 : 0.55}
        className={flicker ? "window-flicker" : undefined}
        style={{ animationDelay: "0.7s" }}
      />
      <path
        d={g.cold}
        fill="var(--color-sense-400)"
        opacity={plane === 1 ? 0.2 : plane === 2 ? 0.4 : 0.34}
        className={flicker ? "window-flicker" : undefined}
        style={{ animationDelay: "3.1s" }}
      />
    </svg>
  );
}
