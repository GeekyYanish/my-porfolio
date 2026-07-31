import type { Metadata, Viewport } from "next";
import { Anton, Bungee, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { site } from "@/data/site";
import "./globals.css";

/* Poster-scale condensed display for h1–h3. */
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

/* Signage face — the wordmark and the comic sound-effect stickers only. */
const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-bungee",
  weight: "400",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "600"],
  display: "swap",
  preload: false,
});

const title = `${site.name} | ${site.profession} — Data, AI & Web3`;
const description =
  "Portfolio of Yanish Rai, building data-rich applications, AI systems, Web3 products, and analytics evaluation workflows from Bengaluru.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yanishrai.vercel.app"),
  title,
  description,
  keywords: [
    "Yanish Rai",
    "Data Analyst",
    "Data Engineer",
    "Full-Stack Developer",
    "AI Application Developer",
    "Web3",
    "Bengaluru",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_IN",
    siteName: `${site.name} — Portfolio`,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* Font variables go on <html>, not <body>: the theme maps --font-heading
       and friends onto them at :root, so they have to be defined there too. */
    <html
      lang="en"
      className={`${anton.variable} ${bungee.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
