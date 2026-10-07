import { ogImage } from "@/lib/og";

export const alt = "How we keep your data safe | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "How we keep your data safe",
    subtitle: "No bank access. Nothing saved without your tap.",
  });
}
