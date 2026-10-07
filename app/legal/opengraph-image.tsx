import { ogImage } from "@/lib/og";

export const alt = "Legal | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Legal",
    subtitle: "Privacy, terms, cookies, acceptable use and AI use.",
  });
}
