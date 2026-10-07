import { ogImage } from "@/lib/og";

export const alt = "Track every rupee. Split with friends. Settle by UPI. | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Track every rupee. Split with friends. Settle by UPI.",
    subtitle: "An AI money tracker for India you can talk to in English, Hindi or Hinglish.",
    mark: "finance",
  });
}
