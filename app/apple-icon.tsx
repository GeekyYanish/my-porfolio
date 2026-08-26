import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="120" height="120"><g fill="none" stroke="#ff2d4d" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12.6 12.2L5.2 7.4L2.4 10.8"/><path d="M11.9 15.4L3.6 13.6L1.2 17.4"/><path d="M11.9 18.4L3.8 20.6L2.2 25.2"/><path d="M12.8 21.4L6.8 26.4L7.2 30.6"/><path d="M19.4 12.2L26.8 7.4L29.6 10.8"/><path d="M20.1 15.4L28.4 13.6L30.8 17.4"/><path d="M20.1 18.4L28.2 20.6L29.8 25.2"/><path d="M19.2 21.4L25.2 26.4L24.8 30.6"/></g><path d="M16 12.5L20.4 19L16 26.5L11.6 19Z" fill="#ff2d4d"/><path d="M16 5.5L19 10L16 14L13 10Z" fill="#ff2d4d"/></svg>`;
const GLYPH_URI = `data:image/svg+xml;base64,${Buffer.from(GLYPH).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060f",
          borderRadius: 36,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img width={120} height={120} alt="" src={GLYPH_URI} />
      </div>
    ),
    size,
  );
}
