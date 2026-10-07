/**
 * Static, CSS-only drawing of the hero scene: the agent orb, its ledger ring
 * and tracked items. Used before the 3D scene loads and when it never does.
 */
const cards = [
  { label: "चाय ₹50", hi: true, x: "4%", y: "16%", r: "-6deg" },
  { label: "Uber ₹120", x: "10%", y: "40%", r: "4deg" },
  { label: "Rent ₹18,000", x: "0%", y: "64%", r: "-3deg" },
  { label: "Goa trip ₹25,000", x: "26%", y: "82%", r: "5deg" },
  { label: "Priya owes you ₹450", x: "30%", y: "4%", r: "3deg" },
];

export function HeroArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 select-none">
      {/* ledger ring */}
      <div className="absolute left-[38%] top-1/2 aspect-square w-[78%] rounded-full border-2 border-primary/40 [transform:translateY(-50%)_rotateX(70deg)]" />
      {/* agent orb */}
      <div className="absolute left-[62%] top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-[-30%] rounded-full bg-[radial-gradient(closest-side,oklch(0.62_0.24_330/0.45),transparent)] blur-2xl" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,oklch(1_0_0/0.85),transparent_18%),radial-gradient(circle_at_70%_80%,oklch(0.76_0.17_55/0.85),transparent_55%),radial-gradient(circle_at_25%_70%,oklch(0.55_0.24_290/0.95),transparent_60%),radial-gradient(circle_at_60%_40%,oklch(0.62_0.24_345),oklch(0.45_0.2_300))] shadow-[inset_0_0_40px_oklch(1_0_0/0.25)]" />
        <div className="absolute left-1/2 top-1/2 aspect-square w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-[2px] animate-pulse-dot" />
      </div>
      {/* tracked items */}
      {cards.map((card) => (
        <div
          key={card.label}
          className="absolute rounded-xl border border-border bg-surface-2/85 px-3 py-2 text-[0.8125rem] font-semibold shadow-elev-2 backdrop-blur-sm tabular sm:text-sm"
          style={{ left: card.x, top: card.y, rotate: card.r }}
        >
          <span lang={card.hi ? "hi" : undefined}>{card.label}</span>
        </div>
      ))}
    </div>
  );
}
