import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TrackWithAgent",
    short_name: "TrackWithAgent",
    description: "AI agents that keep track for you.",
    start_url: "/",
    display: "browser",
    theme_color: "#08080d",
    background_color: "#08080d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
