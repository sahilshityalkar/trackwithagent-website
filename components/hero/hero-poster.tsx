import { existsSync } from "node:fs";
import { join } from "node:path";
import { getImageProps } from "next/image";
import { HeroArt } from "./hero-art";

const posterDir = join(process.cwd(), "public", "hero");
const hasPosters = ["poster-dark.avif", "poster-light.avif"].every((file) => existsSync(join(posterDir, file)));

/**
 * The hero's first paint and LCP element: a still render of the 3D scene.
 * <picture> lets the browser download only the poster for the system theme.
 * Falls back to the CSS drawing if the posters have not been generated.
 */
export function HeroPoster() {
  if (!hasPosters) return <HeroArt />;

  const common = {
    alt: "",
    width: 1600,
    height: 1200,
    sizes: "(min-width: 1024px) 50vw, (min-width: 640px) 34rem, 100vw",
  };
  const { props: dark } = getImageProps({ ...common, src: "/hero/poster-dark.avif" });
  const {
    props: { srcSet: lightSrcSet, ...light },
  } = getImageProps({ ...common, src: "/hero/poster-light.avif" });

  return (
    <picture>
      <source media="(prefers-color-scheme: dark)" srcSet={dark.srcSet} sizes={common.sizes} />
      <img
        {...light}
        srcSet={lightSrcSet}
        alt=""
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </picture>
  );
}
