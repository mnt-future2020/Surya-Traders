"use client";

import { useMemo, useState, type CSSProperties } from "react";

type Cell = { row: number; col: number };

/**
 * Background ripple grid (adapted from Aceternity UI's BackgroundRippleEffect
 * for Tailwind v3). Clicking a cell sends an outward ripple; hovering lights
 * individual cells. Colours use the maroon grid lines + gold flash palette.
 */
export function BackgroundRippleEffect({
  rows = 12,
  cols = 40,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) {
  const [clicked, setClicked] = useState<Cell | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const cells = useMemo(
    () => Array.from({ length: rows * cols }),
    [rows, cols],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(circle at center, black 30%, transparent 78%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 30%, transparent 78%)",
      }}
    >
      <div
        key={rippleKey}
        className="pointer-events-auto absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {cells.map((_, idx) => {
          const row = Math.floor(idx / cols);
          const col = idx % cols;
          const distance = clicked
            ? Math.hypot(clicked.row - row, clicked.col - col)
            : 0;
          const delay = clicked ? distance * 55 : 0;
          const style: CSSProperties = clicked
            ? { animation: `ripple-flash 0.9s ease-out ${delay}ms both` }
            : {};
          return (
            <div
              key={idx}
              className="ripple-cell"
              style={style}
              onClick={() => {
                setClicked({ row, col });
                setRippleKey((k) => k + 1);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
