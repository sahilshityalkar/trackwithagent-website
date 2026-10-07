import { ogImage } from "@/lib/og";

export const alt = "Delete your account and data | TrackWithAgent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    title: "Delete your account and data",
    subtitle: "Signed out at once, 30 days to change your mind, then gone.",
  });
}
