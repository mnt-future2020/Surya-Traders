"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRANCHES, COMPANY, type Branch } from "../lib/branches";
import { iconFor } from "./icons";
import BranchModal from "./branch-modal";
import { BackgroundRippleEffect } from "./background-ripple-effect";

function BranchCard({
  branch,
  onOpen,
}: {
  branch: Branch;
  onOpen: () => void;
}) {
  const Icon = iconFor(branch.icon);
  return (
    <button
      onClick={onOpen}
      className="group pointer-events-auto relative z-10 flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-xl hover:shadow-maroon/10 focus:outline-none focus:ring-2 focus:ring-gold"
    >
      {/* top accent bar */}
      <span className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-maroon to-gold transition-transform duration-300 group-hover:scale-x-100" />

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-maroon text-gold shadow-md">
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="text-lg font-bold text-maroon-dark">{branch.name}</h3>
      <p className="mt-0.5 text-sm font-semibold text-gold-dark">{branch.role}</p>
      <p className="mt-2 text-sm text-slate-500">{branch.tagline}</p>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-maroon transition group-hover:text-gold-dark">
        View details
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    </button>
  );
}

export default function BranchesSection() {
  const [active, setActive] = useState<Branch | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-[#f4efe9] via-[#efe8e1] to-[#e9dfd6] text-maroon-dark lg:h-screen lg:overflow-hidden">
      {/* ripple grid background */}
      <BackgroundRippleEffect />

      {/* soft colour accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-maroon/5 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-3 backdrop-blur sm:px-10">
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/image_logo.jpeg"
            alt="Surya Pipe Trader"
            className="h-11 w-auto sm:h-12"
          />
        </div>
        <div className="hidden items-center gap-5 text-sm font-medium text-maroon sm:flex">
          <a href={`tel:${COMPANY.phoneDial}`} className="flex items-center gap-1.5 hover:text-gold-dark">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M4 5c0 8.3 6.7 15 15 15v-3.3l-4-1.3-1.7 1.7a12 12 0 0 1-6.4-6.4L8.6 9 7.3 5H4Z" />
            </svg>
            {COMPANY.phone}
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-start px-6 py-8 lg:justify-center">
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
            Authorised Distributor · {COMPANY.since}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-maroon-dark sm:text-4xl">
            Our Three Divisions
          </h1>
          <span className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gold" />
        </div>

        {/* Cards — Aceternity hover effect (highlight slides behind hovered card) */}
        <div
          className="grid gap-6 sm:grid-cols-3"
          onMouseLeave={() => setHovered(null)}
        >
          {BRANCHES.map((b, idx) => (
            <div
              key={b.id}
              className="pointer-events-auto relative"
              onMouseEnter={() => setHovered(idx)}
            >
              <AnimatePresence>
                {hovered === idx && (
                  <motion.span
                    layoutId="cardHover"
                    className="absolute -inset-2 block rounded-3xl bg-maroon/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.15 } }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <BranchCard branch={b} onOpen={() => setActive(b)} />
            </div>
          ))}
        </div>

        {/* Brand strip */}
        <footer className="mt-8 hidden flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400 sm:mt-10 sm:flex">
          <span className="font-semibold text-slate-500">Authorised dealer:</span>
          {COMPANY.brands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </footer>
      </div>

      {active && <BranchModal branch={active} onClose={() => setActive(null)} />}
    </section>
  );
}
