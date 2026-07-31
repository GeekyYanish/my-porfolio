import type { PanelArt } from "@/data/projects";

/**
 * Bespoke comic-panel artwork, one per project.
 *
 * Each panel is an abstract graphic of what the system actually does — a
 * tracking viewfinder for the proctoring platform, a block chain for the
 * donation ledger, a scatter-and-fit for the ML notebooks. Original vector
 * art, no photography, so the cards cost nothing to load.
 *
 * Adding a value to the `PanelArt` union means adding an entry to the
 * `panelArt` lookup at the bottom of this file.
 */

const W = 400;
const H = 200;

type PanelProps = { accent: string };

/** Shared chrome: halftone ground plus comic viewfinder corner brackets. */
function Frame({ id, accent }: { id: string; accent: string }) {
  return (
    <>
      <defs>
        <pattern
          id={`ht-${id}`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.4" cy="1.4" r="1" fill={accent} opacity="0.28" />
        </pattern>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-night-800)" />
          <stop offset="100%" stopColor="var(--color-night-950)" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#sky-${id})`} />
      <rect width={W} height={H} fill={`url(#ht-${id})`} />
      <g
        stroke={accent}
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
        strokeLinecap="square"
      >
        <path d="M12 30V12h18" />
        <path d={`M${W - 30} 12h18v18`} />
        <path d={`M12 ${H - 30}v18h18`} />
        <path d={`M${W - 30} ${H - 12}h18v-18`} />
      </g>
    </>
  );
}

/* ---------------------------------------------------------------- procto */
/* Face-tracking viewfinder with a live integrity readout. */
function ProctoArt({ accent }: PanelProps) {
  return (
    <>
      <Frame id="procto" accent={accent} />
      <g stroke={accent} fill="none" strokeWidth="2">
        {/* tracked head + shoulders */}
        <circle cx="130" cy="82" r="30" opacity="0.95" />
        <path d="M86 148c6-24 22-34 44-34s38 10 44 34" opacity="0.8" />
        {/* tracking box */}
        <rect
          x="92"
          y="44"
          width="76"
          height="76"
          strokeDasharray="10 7"
          opacity="0.55"
        />
      </g>
      {/* landmark points */}
      <g fill="var(--color-sense-400)">
        {[
          [119, 76],
          [141, 76],
          [130, 90],
          [121, 100],
          [139, 100],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" />
        ))}
      </g>
      {/* crosshair */}
      <g stroke="var(--color-sense-400)" strokeWidth="1" opacity="0.4">
        <path d="M130 30v22M130 112v24M60 82h26M174 82h26" />
      </g>
      {/* event waveform + integrity bars */}
      <path
        d="M232 118l14-1 8-22 10 40 9-26 11 14 8-6 10 20 9-32 12 12 10-4"
        fill="none"
        stroke="var(--color-sense-400)"
        strokeWidth="2.2"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <g fill={accent}>
        {[26, 40, 33, 52, 46, 64].map((h, i) => (
          <rect key={i} x={234 + i * 21} y={168 - h} width="12" height={h} />
        ))}
      </g>
      <text
        x="234"
        y="52"
        fill="var(--color-ink-muted)"
        fontSize="12"
        fontFamily="var(--font-mono)"
        letterSpacing="1.5"
      >
        INTEGRITY
      </text>
    </>
  );
}

/* --------------------------------------------------------------- dochain */
/* A verifiable ledger: hexagonal blocks chained left to right. */
function DochainArt({ accent }: PanelProps) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join("L");

  return (
    <>
      <Frame id="dochain" accent={accent} />
      {/* wallet */}
      <g stroke="var(--color-ink-muted)" fill="none" strokeWidth="2">
        <rect x="30" y="66" width="52" height="40" rx="4" />
        <path d="M30 78h52" />
        <circle cx="70" cy="92" r="4" fill={accent} stroke="none" />
      </g>
      {/* chain of blocks */}
      {[0, 1, 2, 3].map((i) => {
        const cx = 132 + i * 68;
        const live = i === 3;
        return (
          <g key={i}>
            {i > 0 && (
              <path
                d={`M${cx - 60} 86h20`}
                stroke={accent}
                strokeWidth="2.5"
                opacity="0.8"
              />
            )}
            <path
              d={`M${hex(cx, 86, 26)}Z`}
              fill={live ? accent : "none"}
              fillOpacity={live ? 0.22 : 0}
              stroke={live ? accent : "var(--color-ink-muted)"}
              strokeWidth="2.2"
            />
            <circle
              cx={cx}
              cy="86"
              r="5"
              fill={live ? "var(--color-sense-400)" : accent}
              opacity={live ? 1 : 0.75}
            />
          </g>
        );
      })}
      <path d={`M92 86h${132 - 26 - 92}`} stroke={accent} strokeWidth="2.5" opacity="0.8" />
      {/* public verification row */}
      <g opacity="0.9">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${44 + i * 66} 148)`}>
            <path
              d="M0 4l5 6 11-13"
              fill="none"
              stroke="var(--color-sense-400)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 5h32"
              stroke="var(--color-ink-faint)"
              strokeWidth="2"
              opacity="0.7"
            />
          </g>
        ))}
      </g>
    </>
  );
}

/* --------------------------------------------------------------- odyssey */
/* Hackathon build: a burst of speed lines around a prize. */
function OdysseyArt({ accent }: PanelProps) {
  return (
    <>
      <Frame id="odyssey" accent={accent} />
      {/* radiating burst */}
      <g stroke={accent} strokeWidth="2" opacity="0.55" strokeLinecap="round">
        {Array.from({ length: 18 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 18;
          const x1 = 200 + Math.cos(a) * 46;
          const y1 = 100 + Math.sin(a) * 46;
          const len = i % 2 === 0 ? 44 : 26;
          const x2 = 200 + Math.cos(a) * (46 + len);
          const y2 = 100 + Math.sin(a) * (46 + len);
          return (
            <path
              key={i}
              d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`}
            />
          );
        })}
      </g>
      {/* prize diamond */}
      <path
        d="M200 58l34 42-34 42-34-42z"
        fill={accent}
        fillOpacity="0.2"
        stroke={accent}
        strokeWidth="2.6"
      />
      <path
        d="M200 78l18 22-18 22-18-22z"
        fill={accent}
        fillOpacity="0.55"
        stroke="none"
      />
      {/* speed lines */}
      <g stroke="var(--color-sense-400)" strokeWidth="2.5" opacity="0.6" strokeLinecap="round">
        <path d="M28 62h54M28 100h34M28 138h46" />
        <path d={`M${W - 82} 62h54M${W - 62} 100h34M${W - 74} 138h46`} />
      </g>
    </>
  );
}

/* --------------------------------------------------------------- harness */
/* Mock entities flowing through evaluation into a scored dashboard. */
function HarnessArt({ accent }: PanelProps) {
  return (
    <>
      <Frame id="harness" accent={accent} />
      {/* entity field */}
      <g fill="var(--color-ink-muted)" opacity="0.75">
        {Array.from({ length: 24 }, (_, i) => (
          <rect
            key={i}
            x={34 + (i % 4) * 15}
            y={54 + Math.floor(i / 4) * 15}
            width="8"
            height="8"
          />
        ))}
      </g>
      {/* flow arrows */}
      <g stroke={accent} strokeWidth="2.4" fill="none" opacity="0.9">
        {[70, 100, 130].map((y, i) => (
          <path key={i} d={`M110 ${y}h56`} />
        ))}
        <path d="M158 92l10 8-10 8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* scenario stack */}
      <g>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={182}
            y={58 + i * 30}
            width="70"
            height="22"
            fill="none"
            stroke="var(--color-ink-muted)"
            strokeWidth="2"
            opacity="0.8"
          />
        ))}
        <rect x="182" y="88" width="70" height="22" fill={accent} opacity="0.28" />
      </g>
      {/* scoring dial */}
      <g fill="none" strokeWidth="9" strokeLinecap="round">
        <path
          d="M286 132a44 44 0 0 1 76-30"
          stroke="var(--color-night-700)"
        />
        <path d="M286 132a44 44 0 0 1 50-42" stroke={accent} />
      </g>
      {/* result bars */}
      <g fill="var(--color-sense-400)" opacity="0.85">
        {[18, 30, 24, 38].map((h, i) => (
          <rect key={i} x={288 + i * 20} y={166 - h} width="11" height={h} />
        ))}
      </g>
    </>
  );
}

/* ----------------------------------------------------------------- mllab */
/* Scatter with a fitted curve, plus a confusion matrix. */
function MlLabArt({ accent }: PanelProps) {
  const pts = [
    [64, 148],
    [82, 138],
    [96, 142],
    [110, 126],
    [124, 118],
    [136, 122],
    [150, 104],
    [164, 96],
    [176, 100],
    [190, 82],
    [204, 74],
    [216, 80],
  ];

  return (
    <>
      <Frame id="mllab" accent={accent} />
      {/* axes */}
      <g stroke="var(--color-ink-faint)" strokeWidth="2" opacity="0.7">
        <path d="M52 42v126h182" />
      </g>
      {/* gridlines */}
      <g stroke="var(--color-ink-faint)" strokeWidth="1" opacity="0.2">
        {[70, 98, 126, 154].map((y) => (
          <path key={y} d={`M52 ${y}h182`} />
        ))}
      </g>
      {/* fitted curve */}
      <path
        d="M60 152Q140 132 232 70"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* observations */}
      <g fill="var(--color-sense-400)">
        {pts.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" opacity="0.9" />
        ))}
      </g>
      {/* confusion matrix */}
      <g transform="translate(268 58)">
        {Array.from({ length: 9 }, (_, i) => {
          const r = Math.floor(i / 3);
          const c = i % 3;
          const diag = r === c;
          return (
            <rect
              key={i}
              x={c * 34}
              y={r * 34}
              width="30"
              height="30"
              fill={diag ? accent : "var(--color-night-700)"}
              opacity={diag ? 0.75 : 0.5}
            />
          );
        })}
      </g>
    </>
  );
}

/* ------------------------------------------------------------------- p2p */
/* A peer mesh with packets in flight. */
function P2pArt({ accent }: PanelProps) {
  const nodes = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 6 - Math.PI / 2;
    return [200 + Math.cos(a) * 68, 100 + Math.sin(a) * 62] as const;
  });

  return (
    <>
      <Frame id="p2p" accent={accent} />
      {/* mesh links */}
      <g stroke={accent} strokeWidth="1.6" opacity="0.5">
        {nodes.map(([x1, y1], i) =>
          nodes.slice(i + 1).map(([x2, y2], j) => (
            <path
              key={`${i}-${j}`}
              d={`M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`}
            />
          )),
        )}
      </g>
      {/* hub */}
      <circle cx="200" cy="100" r="9" fill="var(--color-sense-400)" />
      <circle
        cx="200"
        cy="100"
        r="17"
        fill="none"
        stroke="var(--color-sense-400)"
        strokeWidth="1.6"
        opacity="0.6"
      />
      {/* peers */}
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <rect
            x={cx - 12}
            y={cy - 12}
            width="24"
            height="24"
            fill="var(--color-night-950)"
            stroke={accent}
            strokeWidth="2.4"
            transform={`rotate(45 ${cx} ${cy})`}
          />
          <circle cx={cx} cy={cy} r="3.5" fill={accent} />
        </g>
      ))}
      {/* packets in flight */}
      <g fill="var(--color-gold)">
        <rect x="160" y="62" width="7" height="7" transform="rotate(45 163 65)" />
        <rect x="242" y="128" width="7" height="7" transform="rotate(45 245 131)" />
      </g>
    </>
  );
}

const panelArt: Record<PanelArt, (p: PanelProps) => React.ReactElement> = {
  procto: ProctoArt,
  dochain: DochainArt,
  odyssey: OdysseyArt,
  harness: HarnessArt,
  mllab: MlLabArt,
  p2p: P2pArt,
};

const ACCENT_VAR = {
  web: "var(--color-web-500)",
  sense: "var(--color-sense-500)",
  gold: "var(--color-gold)",
} as const;

export default function ProjectPanelArt({
  panel,
  accent,
  label,
  className = "",
}: {
  panel: PanelArt;
  accent: "web" | "sense" | "gold";
  /** Describes the artwork for screen readers. */
  label: string;
  className?: string;
}) {
  const Art = panelArt[panel];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid slice"
    >
      <Art accent={ACCENT_VAR[accent]} />
    </svg>
  );
}
