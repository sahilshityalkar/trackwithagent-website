/** Decorative QR-style tile. It encodes nothing and cannot be scanned into a payment. */
export function QrTile({ size = 96, className = "" }: { size?: number; className?: string }) {
  const n = 21;
  const cells: [number, number][] = [];
  // Deterministic pseudo-random pattern so server and client agree.
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!inFinder(x, y) && rand() > 0.52) cells.push([x, y]);
    }
  }
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" rx="1.2" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" rx="0.8" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" rx="0.6" fill="currentColor" />
    </g>
  );
  return (
    <svg
      viewBox={`-1 -1 ${n + 2} ${n + 2}`}
      width={size}
      height={size}
      className={`rounded-xl bg-white p-1 text-[#111] ${className}`}
      aria-hidden="true"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}:${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
      {finder(0, 0)}
      {finder(n - 7, 0)}
      {finder(0, n - 7)}
    </svg>
  );
}
