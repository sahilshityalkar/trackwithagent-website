import { ogImage } from "@/lib/og";

export const alt = "Products | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Products",
    subtitle: "Focused AI agents. The agent proposes, you decide.",
  });
}
