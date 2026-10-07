import { ogImage } from "@/lib/og";

export const alt = "Privacy Policy | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Privacy Policy",
    subtitle: "What we collect, why, who sees it, and your rights.",
  });
}
