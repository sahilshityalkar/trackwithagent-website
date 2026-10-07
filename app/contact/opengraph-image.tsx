import { ogImage } from "@/lib/og";

export const alt = "Get in touch | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Get in touch",
    subtitle: "We read every message. Most replies go out within two working days.",
  });
}
