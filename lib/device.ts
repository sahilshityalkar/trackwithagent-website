// Client-only checks that decide whether the 3D hero may load.

type NavigatorExtras = Navigator & {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
};

export function forced3D() {
  return new URLSearchParams(window.location.search).get("3d") === "1";
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2"));
  } catch {
    return false;
  }
}

/** Returns a reason to skip 3D, or null when the device can run it. */
export function reasonToSkip3D(): string | null {
  if (forced3D()) return null;
  const nav = navigator as NavigatorExtras;
  if (prefersReducedMotion()) return "reduced-motion";
  if (nav.connection?.saveData) return "save-data";
  if (!hasWebGL2()) return "no-webgl2";
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory;
  if (cores <= 4 && (memory === undefined || memory <= 4)) return "low-power";
  const narrow = window.matchMedia("(max-width: 639px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (narrow && coarse) return "phone";
  return null;
}
