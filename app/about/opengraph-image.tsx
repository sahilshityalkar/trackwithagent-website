import { ogImage } from "@/lib/og";

export const alt = "We build agents that do the tracking. | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "We build agents that do the tracking.",
    subtitle: "About TrackWithAgent",
  });
}
