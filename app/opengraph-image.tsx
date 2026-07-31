import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social preview card, generated at build time — the site declares
 * `summary_large_image`, so it needs a real 1200×630 image behind it.
 *
 * Kept to flat colour, gradients, and a couple of inline SVG data URIs,
 * which is the reliable subset of what Satori can render. No external
 * fonts are fetched, so the build stays offline-safe.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.profession}`;

const WEB = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><g fill="none" stroke="#e01130" stroke-width="1.4" opacity="0.55"><circle cx="200" cy="200" r="60"/><circle cx="200" cy="200" r="115"/><circle cx="200" cy="200" r="170"/><circle cx="200" cy="200" r="225"/><path d="M200 200L200 -40M200 200L408 80M200 200L408 320M200 200L200 440M200 200L-8 320M200 200L-8 80"/></g></svg>`;

const WEB_URI = `data:image/svg+xml;base64,${Buffer.from(WEB).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 84px",
          background:
            "radial-gradient(120% 90% at 50% 110%, #101635 0%, #05060f 62%)",
          position: "relative",
        }}
      >
        {/* corner web */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={620}
          height={620}
          alt=""
          src={WEB_URI}
          style={{ position: "absolute", top: -190, right: -160, opacity: 0.6 }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#35e6ff",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          {site.neighborhood}, IN
          <div style={{ width: 60, height: 2, background: "#e01130" }} />
          MCA @ CHRIST
        </div>

        <div
          style={{
            marginTop: 26,
            fontSize: 104,
            fontWeight: 800,
            color: "#f6f7fb",
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            marginTop: 22,
            fontSize: 44,
            color: "#b6bfd8",
            lineHeight: 1.15,
          }}
        >
          Your Friendly Neighborhood
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#35e6ff",
            lineHeight: 1.1,
          }}
        >
          {site.profession}
        </div>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 14,
            fontSize: 22,
            color: "#8592b4",
          }}
        >
          {["Data & Analytics", "AI Systems", "Full Stack", "Web3"].map((t) => (
            <div
              key={t}
              style={{
                border: "1px solid #27336e",
                padding: "8px 18px",
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #b3081f 0%, #e01130 55%, #00c2e0 100%)",
          }}
        />
      </div>
    ),
    size,
  );
}
