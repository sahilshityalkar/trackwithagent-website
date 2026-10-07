"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { duration, ease, fadeUp } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  /** Position in a staggered group. Delay is 60ms per step, capped at 6 items. */
  index?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Fades content up once when it scrolls into view.
 * The `data-reveal` attribute lets the <noscript> style in the root layout
 * force it visible when JavaScript is off.
 */
export function Reveal({ children, className, index = 0, as = "div" }: Props) {
  const Component = m[as];
  return (
    <Component
      data-reveal=""
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: duration.reveal, ease: ease.out, delay: Math.min(index, 5) * 0.06 }}
    >
      {children}
    </Component>
  );
}
