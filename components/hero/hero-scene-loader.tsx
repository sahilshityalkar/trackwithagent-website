"use client";

import dynamic from "next/dynamic";
import { m, useScroll, useTransform } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { reasonToSkip3D } from "@/lib/device";

// The 3D chunk is never in the initial bundle and never rendered on the server.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

type Mode = "poster" | "loading" | "ready" | "failed";

type Capability = { skip: string | null; capture: boolean };

// Checked once per page load; null on the server.
let capability: Capability | null = null;
const readCapability = () => {
  if (!capability) {
    const capture = new URLSearchParams(window.location.search).get("poster") === "1";
    capability = { skip: capture ? null : reasonToSkip3D(), capture };
  }
  return capability;
};
const noSubscribe = () => () => {};

/**
 * Shows the static poster first, then decides on the client whether this
 * device may run the 3D scene. The scene loads after the page is idle,
 * cross-fades in on its first frame, and stops rendering when unseen.
 */
export function HeroSceneLoader({ poster }: { poster: ReactNode }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const declines = useRef(0);
  const [mode, setMode] = useState<Mode>("poster");
  const [visible, setVisible] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const { resolvedTheme } = useTheme();
  const device = useSyncExternalStore<Capability | null>(noSubscribe, readCapability, () => null);
  const posterMode = device?.capture ?? false;

  useEffect(() => {
    heroRef.current = slotRef.current?.closest("section") ?? null;
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Decide whether to load 3D, then wait for an idle moment.
  useEffect(() => {
    if (!device || device.skip) return;
    const start = () => setMode("loading");
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    // Safari has no requestIdleCallback.
    const id = setTimeout(start, 2000);
    return () => clearTimeout(id);
  }, [device]);

  // Pause rendering when the hero is off-screen or the tab is hidden.
  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(slot);
    const onVisibility = () => setTabHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Pointer tilt for mouse and pen only.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const showScene = mode === "loading" || mode === "ready";
  const sceneVisible = mode === "ready";

  return (
    <div
      ref={slotRef}
      data-hero-slot=""
      // Poster capture renders the scene alone, filling the viewport.
      className={posterMode ? "fixed inset-0 z-[200]" : "absolute inset-0"}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-[400ms] ${sceneVisible ? "opacity-0" : "opacity-100"} ${
          device?.skip === "phone" ? "animate-float-y" : ""
        }`}
      >
        {poster}
      </div>
      {showScene && (
        <m.div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-[400ms] ${sceneVisible ? "opacity-100" : "opacity-0"}`}
          style={posterMode ? undefined : { opacity: sceneVisible ? fade : 0 }}
        >
          <HeroScene
            active={(visible && !tabHidden) || posterMode}
            theme={resolvedTheme === "light" ? "light" : "dark"}
            scroll={scrollYProgress}
            pointer={pointer}
            posterMode={posterMode}
            onReady={() => {
              setMode("ready");
              if (posterMode) document.documentElement.dataset.heroReady = "1";
            }}
            onDecline={() => {
              declines.current += 1;
              if (declines.current >= 2) setMode("failed");
            }}
          />
        </m.div>
      )}
    </div>
  );
}
