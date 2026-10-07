import { ogImage } from "@/lib/og";

export const alt = "Terms of Service | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Terms of Service",
    subtitle: "The agreement for trackwithagent.com and Finance.",
  });
}
