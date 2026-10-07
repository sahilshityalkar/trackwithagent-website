"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { spring } from "@/lib/motion";

/** Tilts its children toward the pointer, at most `max` degrees. Mouse and pen only. */
export function Tilt({ children, max = 4, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, spring.gentle);
  const rotateY = useSpring(ry, spring.gentle);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine) and (min-width: 64rem)").matches) return;
    const onMove = (event: PointerEvent) => {
      ry.set(((event.clientX / window.innerWidth) * 2 - 1) * max);
      rx.set(-((event.clientY / window.innerHeight) * 2 - 1) * max);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, max, rx, ry]);

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <m.div style={{ rotateX, rotateY }} className="[transform-style:preserve-3d]">
        {children}
      </m.div>
    </div>
  );
}
