import type { Metadata } from "next";
import { site } from "@/site.config";

type Options = {
  /** Page title. Rendered as "<title> | TrackWithAgent" unless `absolute` is set. */
  title: string;
  description: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  absolute?: boolean;
};

/**
 * Full metadata for a page. A page's openGraph replaces the parent's
 * entirely, so every page sets all of it here.
 */
export function pageMetadata({ title, description, path, absolute = false }: Options): Metadata {
  const fullTitle = absolute ? title : `${title} | ${site.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(site.social.x ? { site: `@${site.social.x.split("/").pop()}` } : {}),
    },
  };
}
