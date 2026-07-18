# Surya Pipe Trader — Divisions

A single-section Next.js app showing Surya Pipe Trader's three divisions
(Head Office / B2B, Texmo Taro Pump Division, Plumbing & Sanitaryware).
Tap any card to open a modal with that division's location, contact numbers,
bank details and a scannable BHIM UPI payment QR.

## Stack
- Next.js 14 (App Router) + React 18
- Tailwind CSS v3
- framer-motion (card hover effect)

## Theme
White + gold (`#f5b800`) + maroon (`#6b1f2a`) — from the Surya logo.

## Develop
```bash
npm install
npm run dev      # http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Structure
- `app/page.tsx` — renders the section
- `app/branches-section.tsx` — cards, ripple background, hover effect, state
- `app/branch-modal.tsx` — division detail modal (location, phone, bank, UPI QR)
- `app/background-ripple-effect.tsx` — Aceternity ripple grid (ported to Tailwind v3)
- `lib/branches.ts` — all division + company data (edit here to update details)
- `public/logo/` — logo image · `public/upi-qr.svg` — generated UPI QR
