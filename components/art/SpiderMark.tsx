/**
 * Original angular arachnid glyph — the site's wordmark badge and favicon.
 *
 * Two stacked diamonds for the body, four angular legs per side. Deliberately
 * geometric so it stays legible at 16px in a browser tab.
 *
 * `SpiderGlyph` is the bare 32×32 geometry with no <svg> wrapper, for
 * composing into a larger drawing; `SpiderMark` is the standalone element.
 */

/** Legs for the left side; the right side is the same paths mirrored. */
const LEGS = [
  "M12.6 12.2L5.2 7.4L2.4 10.8",
  "M11.9 15.4L3.6 13.6L1.2 17.4",
  "M11.9 18.4L3.8 20.6L2.2 25.2",
  "M12.8 21.4L6.8 26.4L7.2 30.6",
];

/** The glyph itself, drawn on a 32×32 grid. Wrap in a <g> to place it. */
export function SpiderGlyph({ strokeWidth = 1.7 }: { strokeWidth?: number }) {
  return (
    <>
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {LEGS.map((d, i) => (
          <path key={`l${i}`} d={d} />
        ))}
        <g transform="translate(32 0) scale(-1 1)">
          {LEGS.map((d, i) => (
            <path key={`r${i}`} d={d} />
          ))}
        </g>
      </g>
      {/* abdomen */}
      <path d="M16 12.5L20.4 19L16 26.5L11.6 19Z" fill="currentColor" />
      {/* cephalothorax */}
      <path d="M16 5.5L19 10L16 14L13 10Z" fill="currentColor" />
    </>
  );
}

export default function SpiderMark({
  className = "",
  title,
}: {
  className?: string;
  /** Supply to expose the mark as meaningful imagery; omit to hide it. */
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      <SpiderGlyph />
    </svg>
  );
}
