import { ogImage } from "@/lib/og";

export const alt = "What's new | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "What's new",
    subtitle: "Every release of TrackWithAgent, newest first.",
  });
}
