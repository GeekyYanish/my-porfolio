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
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      description,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: site.profession,
      description: site.subheadline,
      sameAs: [site.github, site.linkedin],
      homeLocation: {
        "@type": "Place",
        name: site.location,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bengaluru",
          addressRegion: "Karnataka",
          addressCountry: "IN",
        },
      },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "CHRIST (Deemed to be University)",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "St. Joseph’s College",
        },
      ],
      knowsAbout: [
        "Full-stack development",
        "Data analytics",
        "Data engineering",
        "Artificial intelligence systems",
        "Web3",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: `${site.name} — Portfolio`,
  title,
  description,
  alternates: { canonical: "/" },
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
    url: "/",
    type: "website",
    locale: "en_IN",
    siteName: `${site.name} — Portfolio`,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
