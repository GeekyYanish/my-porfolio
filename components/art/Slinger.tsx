/**
 * The web-slinger silhouette — an original stylized figure, no licensed art.
 *
 * Built entirely from round-capped strokes of varying width rather than one
 * hand-guessed outline path: the geometry stays editable, reads cleanly at
 * any size, and can't collapse into a blob.
 *
 * Drawn in two passes — a fat coloured pass underneath, a slightly thinner
 * body pass on top — which inks the figure with a hard rim the way a comic
 * panel would. That rim is what makes it legible; an earlier version offset
 * two ghost copies behind a black body instead, and on a near-black ground
 * the body vanished and left the ghosts reading as loose wireframe.
 *
 * The figure hangs from (60, 8) in a 120×170 box, so a parent can run a web
 * strand straight up from that point and rotate the group about its top edge
 * for a pendulum swing.
 */

const LIMBS: { d: string; w: number }[] = [
  // torso — the heaviest stroke, shoulder down to hip
  { d: "M50 58L68 96", w: 21 },
  // neck
  { d: "M50 57L44 50", w: 10 },
  // gripping arm, reaching up the strand
  { d: "M50 58Q57 34 60 11", w: 8.5 },
  // trailing arm, thrown back for counterweight
  { d: "M50 58Q34 64 19 80", w: 8 },
  // front leg, tucked and driving forward
  { d: "M68 96Q86 102 99 84", w: 9.5 },
  // back leg, streaming behind
  { d: "M68 96Q73 126 62 150", w: 9.5 },
];

const HEAD = { cx: 41.5, cy: 46, r: 11.5 };

function Body({
  color,
  grow = 0,
  opacity = 1,
}: {
  color: string;
  /** extra stroke width, for the ink outline pass */
  grow?: number;
  opacity?: number;
}) {
  return (
    <g
      stroke={color}
      fill={color}
      opacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {LIMBS.map((l, i) => (
        <path key={i} d={l.d} strokeWidth={l.w + grow} fill="none" />
      ))}
      <circle
        cx={HEAD.cx}
        cy={HEAD.cy}
        r={HEAD.r + grow / 2}
        stroke="none"
      />
    </g>
  );
}

export default function Slinger({
  className = "",
  /** Ink colour of the outline pass. */
  outline = "var(--color-web-500)",
  /** Fill colour of the figure itself. */
  body = "#05070f",
  strand = false,
  strandLength = 900,
}: {
  className?: string;
  outline?: string;
  body?: string;
  /** Draws the web strand from the grip hand up out of the box. */
  strand?: boolean;
  strandLength?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 170"
      className={className}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      {strand && (
        <line
          x1="60"
          y1="10"
          x2="60"
          y2={-strandLength}
          stroke="var(--color-ink)"
          strokeWidth="1.5"
          opacity="0.65"
          strokeLinecap="round"
        />
      )}

      {/* ink outline, then the body sitting inside it */}
      <Body color={outline} grow={5} />
      <Body color={body} />

      {/* a cold rim down one side, for the rooftop-at-night look */}
      <g opacity="0.75">
        <path
          d="M50 58Q57 34 60 11"
          fill="none"
          stroke="var(--color-sense-400)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M68 96Q73 126 62 150"
          fill="none"
          stroke="var(--color-sense-400)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* chest emblem — a single angular spider glyph, kept minimal so it
          survives at small sizes */}
      <g
        stroke={outline}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M55 66L60 73L55 80" />
        <path d="M63 66L58 73L63 80" />
      </g>
    </svg>
  );
}
