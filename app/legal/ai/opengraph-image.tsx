import { ogImage } from "@/lib/og";

export const alt = "How we use AI | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "How we use AI",
    subtitle: "The assistant proposes. You confirm. It cannot act alone.",
  });
}
