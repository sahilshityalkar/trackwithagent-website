import { ogImage } from "@/lib/og";

export const alt = "TrackWithAgent Replay | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "TrackWithAgent Replay",
    subtitle: "Our next agent. We are building it now.",
    mark: "replay",
  });
}
