import { ogImage } from "@/lib/og";

export const alt = "Acceptable Use Policy | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Acceptable Use Policy",
    subtitle: "The rules that keep TrackWithAgent safe and fair.",
  });
}
