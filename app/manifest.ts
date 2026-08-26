import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.profession}`,
    short_name: site.shortName,
    description: site.subheadline,
    start_url: "/",
    display: "standalone",
    background_color: "#05060f",
    theme_color: "#05060f",
    icons: [
      {
        src: "/web-app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
