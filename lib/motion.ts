// Motion presets shared with the Finance app.
export const spring = {
  snappy: { type: "spring", stiffness: 520, damping: 34, mass: 0.8 }, // buttons, toggles, menu
  smooth: { type: "spring", stiffness: 300, damping: 30 }, // panels, layout
  bouncy: { type: "spring", stiffness: 420, damping: 18 }, // small celebratory moments
  gentle: { type: "spring", stiffness: 180, damping: 24 }, // progress bars, counters
} as const;

export const duration = { fast: 0.12, base: 0.2, slow: 0.32, reveal: 0.6 } as const;

export const ease = {
  out: [0.16, 1, 0.3, 1],
  in: [0.7, 0, 0.84, 0],
  inOut: [0.65, 0, 0.35, 1],
} as const satisfies Record<string, [number, number, number, number]>;

export const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
