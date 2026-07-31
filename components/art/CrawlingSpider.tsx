/**
 * The spider that walks the timeline strand.
 *
 * Eight legs drawn as separate two-segment paths so each can be rotated
 * about the body centre independently — that's the whole trick behind the
 * gait. Legs are split into two alternating sets (`spider-leg-b` is driven
 * half a cycle out of phase), which reads as a real crawl rather than all
 * eight twitching in unison.
 *
 * The animation itself lives in globals.css and only runs while the parent
 * carries `data-crawl="true"`, so a parked spider is completely still.
 */

/* Left-side legs, front to back. The right side is these mirrored. */
const LEGS = [
  "M15 14L6 7.5L2 11.5",
  "M14 17L4 14.5L1 19.5",
  "M14 20.5L4 23L2 28",
  "M15.5 23L8 28L8.5 33",
];

/**
 * Everything but the eyes and the body fill is drawn in `currentColor`, so
 * the caller can recolour the whole spider by setting `color` — which is how
 * it takes on the tint of whichever timeline node it last reached.
 */
export default function CrawlingSpider({
  className = "",
  crawling = false,
  style,
}: {
  className?: string;
  crawling?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 36"
      className={className}
      style={style}
      data-crawl={crawling ? "true" : "false"}
      aria-hidden="true"
      focusable="false"
      overflow="visible"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {LEGS.map((d, i) => (
          <path
            key={`l${i}`}
            d={d}
            className={`spider-leg ${i % 2 ? "spider-leg-b" : ""}`}
          />
        ))}
        <g transform="translate(40 0) scale(-1 1)">
          {LEGS.map((d, i) => (
            <path
              key={`r${i}`}
              d={d}
              /* mirrored side runs on the opposite phase, so the spider
                 always has a stable tripod on the strand */
              className={`spider-leg ${i % 2 ? "" : "spider-leg-b"}`}
            />
          ))}
        </g>
      </g>

      {/* abdomen and cephalothorax — dark bodies with a tinted rim */}
      <ellipse
        cx="20"
        cy="22.5"
        rx="6.6"
        ry="8.2"
        fill="var(--color-night-950)"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <ellipse
        cx="20"
        cy="13"
        rx="4.8"
        ry="4.4"
        fill="var(--color-night-950)"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      {/* eyes */}
      <circle cx="18.1" cy="11.8" r="1.15" fill="var(--color-sense-400)" />
      <circle cx="21.9" cy="11.8" r="1.15" fill="var(--color-sense-400)" />
    </svg>
  );
}
