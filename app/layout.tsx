import type { Metadata } from "next";
import { Sora, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Yanish Rai | Data Analytics, AI Systems & Full-Stack Developer",
  description:
    "Portfolio of Yanish Rai, building data-rich applications, AI systems, Web3 products, and analytics evaluation workflows.",
  keywords: [
    "Yanish Rai",
    "Data Analyst",
    "Data Engineer",
    "Full-Stack Developer",
    "AI Application Developer",
    "Web3",
    "Bengaluru",
  ],
  authors: [{ name: "Yanish Rai", url: "https://github.com/GeekyYanish" }],
  openGraph: {
    title: "Yanish Rai | Data Analytics, AI Systems & Full-Stack Developer",
    description:
      "Portfolio of Yanish Rai, building data-rich applications, AI systems, Web3 products, and analytics evaluation workflows.",
    type: "website",
    locale: "en_IN",
    siteName: "Yanish Rai — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yanish Rai | Data Analytics, AI Systems & Full-Stack Developer",
    description:
      "Portfolio of Yanish Rai, building data-rich applications, AI systems, Web3 products, and analytics evaluation workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${manrope.variable} ${plexMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
