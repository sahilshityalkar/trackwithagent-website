import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none " +
  "transition-[transform,box-shadow,background-color,border-color,filter] duration-200 ease-out " +
  "active:scale-[0.97] motion-reduce:active:scale-100";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-small min-w-11",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-brand-strong text-white shadow-brand hover:-translate-y-px hover:brightness-110 " +
    "hover:shadow-[0_14px_36px_-8px_oklch(0.55_0.24_300/0.7)] motion-reduce:hover:translate-y-0",
  secondary: "bg-surface-2 text-foreground border border-border shadow-elev-1 hover:bg-surface-3",
  ghost: "text-foreground hover:bg-surface-3",
  white: "bg-white text-hero-ink shadow-elev-2 hover:-translate-y-px motion-reduce:hover:translate-y-0",
  "outline-white": "border border-white/60 text-white hover:bg-white/10",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal paths use next/link; everything else a plain anchor. */
export function ButtonLink({ href, children, variant = "primary", size = "md", className = "", ...rest }: Props) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  );
}

/** Underlined text link with an arrow, for "Learn more" style links. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const classes = `group inline-flex items-center gap-1.5 font-semibold text-primary hover:underline ${className}`;
  const arrow = (
    <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
      →
    </span>
  );
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
        {arrow}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {children}
      {arrow}
    </a>
  );
}
