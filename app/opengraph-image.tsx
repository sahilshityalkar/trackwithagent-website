import { ogImage } from "@/lib/og";

export const alt = "AI agents that keep track for you. | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "AI agents that keep track for you.",
    subtitle: "Our first agent, Finance, runs your money in rupees, UPI and Hinglish.",
  });
}
