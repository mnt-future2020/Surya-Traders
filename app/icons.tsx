import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function WholesaleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
    </svg>
  );
}

export function PumpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="13" r="6" />
      <path d="M12 13v-3" />
      <path d="M12 4h4" />
      <path d="M12 4v3" />
      <path d="m15 10 3-3" />
      <path d="M18 5v3h-3" />
    </svg>
  );
}

export function PlumbingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 3v6a3 3 0 0 0 3 3 3 3 0 0 1 3 3v6" />
      <path d="M6 3h6" />
      <path d="M15 3h3v3" />
      <path d="M18 12h3v3" />
      <circle cx="15" cy="21" r="0.5" fill="currentColor" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="12" r="4.2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        const x1 = 12 + Math.cos(a) * 6.5;
        const y1 = 12 + Math.sin(a) * 6.5;
        const x2 = 12 + Math.cos(a) * 9;
        const y2 = 12 + Math.sin(a) * 9;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
        );
      })}
    </svg>
  );
}

export function iconFor(name: "wholesale" | "pump" | "plumbing") {
  if (name === "wholesale") return WholesaleIcon;
  if (name === "pump") return PumpIcon;
  return PlumbingIcon;
}
