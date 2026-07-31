/**
 * Parametric spider web.
 *
 * Radial spokes plus concentric rings, where each ring segment sags toward
 * the centre on a quadratic curve — that sag is the whole difference between
 * "web" and "wagon wheel". Returns bare SVG elements so callers can drop it
 * into their own <svg> and animate the strands with `useDraw()`.
 */

export type WebMeshProps = {
  cx?: number;
  cy?: number;
  radius?: number;
  spokes?: number;
  rings?: number;
  /** 0–0.4; how far ring segments dip toward the centre */
  sag?: number;
  /** radians; rotates the whole web */
  rotate?: number;
  /** innermost ring as a fraction of `radius` */
  innerRatio?: number;
  /** draw only this angular wedge, in radians (defaults to a full web) */
  arc?: number;
};

export function webMeshPaths({
  cx = 0,
  cy = 0,
  radius = 100,
  spokes = 12,
  rings = 5,
  sag = 0.12,
  rotate = 0,
  innerRatio = 0.18,
  arc = Math.PI * 2,
}: WebMeshProps) {
  const full = arc >= Math.PI * 2 - 1e-6;
  const step = arc / (full ? spokes : spokes - 1);

  const angleAt = (i: number) => rotate + i * step;
  const pt = (r: number, a: number) =>
    [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;

  const spokeLines = Array.from({ length: spokes }, (_, i) => {
    const a = angleAt(i);
    const [x1, y1] = pt(radius * innerRatio, a);
    const [x2, y2] = pt(radius, a);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`;
  });

  const ringPaths: string[] = [];
  for (let r = 0; r < rings; r += 1) {
    const t = rings === 1 ? 1 : r / (rings - 1);
    // ease the spacing outward so rings crowd near the hub, as real webs do
    const rr = radius * (innerRatio + (1 - innerRatio) * Math.pow(t, 1.35));
    const segments = full ? spokes : spokes - 1;
    const parts: string[] = [];

    for (let i = 0; i < segments; i += 1) {
      const a1 = angleAt(i);
      const a2 = angleAt(i + 1);
      const [x1, y1] = pt(rr, a1);
      const [x2, y2] = pt(rr, a2);
      // control point pulled inward at the mid-angle produces the sag
      const [cxp, cyp] = pt(rr * (1 - sag), (a1 + a2) / 2);

      if (i === 0) parts.push(`M${x1.toFixed(2)} ${y1.toFixed(2)}`);
      parts.push(
        `Q${cxp.toFixed(2)} ${cyp.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`,
      );
    }
    ringPaths.push(parts.join(""));
  }

  return { spokes: spokeLines, rings: ringPaths };
}

export default function WebMesh({
  stroke = "currentColor",
  strokeWidth = 1,
  opacity = 0.5,
  className,
  ...props
}: WebMeshProps & {
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  className?: string;
}) {
  const { spokes, rings } = webMeshPaths(props);

  return (
    <g
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      strokeLinecap="round"
      aria-hidden="true"
    >
      {spokes.map((d, i) => (
        <path key={`s${i}`} d={d} />
      ))}
      {rings.map((d, i) => (
        <path key={`r${i}`} d={d} />
      ))}
    </g>
  );
}
