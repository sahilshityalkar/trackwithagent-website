import { ogImage } from "@/lib/og";

export const alt = "Cookie Policy | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Cookie Policy",
    subtitle: "No cookies on this website. One login cookie in Finance.",
  });
}
