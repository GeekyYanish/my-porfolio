import { SpiderGlyph } from "@/components/art/SpiderMark";
import WebMesh from "@/components/art/WebMesh";
import { site } from "@/data/site";

/**
 * The portrait slot — a web-clipped hexagonal crest.
 *
 * There's no headshot in the repo, so rather than a grey placeholder this
 * renders a proper emblem: monogram over halftone, spun through with web
 * strands. To swap in a photo later, drop an <image> into the clipped group
 * below; the frame and webbing carry over unchanged.
 */
export default function ProfileCrest({ className = "" }: { className?: string }) {
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(150 + 132 * Math.cos(a)).toFixed(1)} ${(150 + 132 * Math.sin(a)).toFixed(1)}`;
  }).join("L");

  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      role="img"
      aria-label={`${site.name} — monogram crest`}
    >
      <defs>
        <clipPath id="crest-clip">
          <path d={`M${hex}Z`} />
        </clipPath>
        <pattern id="crest-ht" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.2" fill="var(--color-web-500)" opacity="0.3" />
        </pattern>
        <radialGradient id="crest-glow" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="var(--color-night-700)" />
          <stop offset="100%" stopColor="var(--color-night-950)" />
        </radialGradient>
      </defs>

      <g clipPath="url(#crest-clip)">
        <rect width="300" height="300" fill="url(#crest-glow)" />
        <rect width="300" height="300" fill="url(#crest-ht)" />
        <g className="text-sense-400">
          <WebMesh
            cx={150}
            cy={150}
            radius={190}
            spokes={10}
            rings={5}
            sag={0.13}
            strokeWidth={1}
            opacity={0.28}
          />
        </g>
        <text
          x="150"
          y="150"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-display)"
          fontSize="96"
          fill="var(--color-ink)"
          opacity="0.95"
        >
          {site.shortName}
        </text>
      </g>

      {/* frame: a doubled hex edge with a red offset, like a printed panel */}
      <path
        d={`M${hex}Z`}
        fill="none"
        stroke="var(--color-web-500)"
        strokeWidth="7"
        transform="translate(4 4)"
        opacity="0.55"
      />
      <path
        d={`M${hex}Z`}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="4"
        opacity="0.85"
      />

      {/* corner badge — the mark stamped on the bottom point of the crest */}
      <g transform="translate(129 245)">
        <rect
          x="-8"
          y="-8"
          width="48"
          height="48"
          fill="var(--color-night-950)"
          stroke="var(--color-web-500)"
          strokeWidth="2"
        />
        <g className="text-web-500">
          <SpiderGlyph />
        </g>
      </g>
    </svg>
  );
}
