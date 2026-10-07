"use client";

import { ThemeProvider } from "next-themes";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/** Inertial scroll for mouse users only. Off under reduced motion and on touch devices. */
function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!reduce.matches && !coarse.matches);
    update();
    reduce.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;
  return <ReactLenis root options={{ lerp: 0.12, anchors: { offset: -72 } }} />;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation} strict>
          <SmoothScroll />
          {children}
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
