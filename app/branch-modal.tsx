"use client";

import { useEffect, useState } from "react";
import type { Branch } from "../lib/branches";
import { UPI_QR_DATA_URI } from "../lib/upi-qr";
import { iconFor } from "./icons";

// Save the QR as a PNG. On mobile, opens the share sheet so the user can
// "Save Image" to their gallery (needed to upload the QR into GPay); on
// desktop it falls back to a normal file download.
async function saveQr() {
  try {
    const res = await fetch(UPI_QR_DATA_URI);
    const blob = await res.blob();
    const file = new File([blob], "surya-pipe-trader-upi-qr.png", {
      type: "image/png",
    });
    const nav = navigator as Navigator & {
      canShare?: (data?: ShareData) => boolean;
    };
    if (nav.canShare?.({ files: [file] })) {
      await nav.share({
        files: [file],
        title: "Surya Pipe Trader — UPI QR",
      });
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "surya-pipe-trader-upi-qr.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    window.open(UPI_QR_DATA_URI, "_blank");
  }
}

async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

function CopyLine({
  label,
  value,
  copyValue,
  valueClass = "",
  onCopied,
}: {
  label: string;
  value: string;
  copyValue?: string;
  valueClass?: string;
  onCopied: () => void;
}) {
  return (
    <div className="flex items-start gap-2 py-0.5">
      <span className="w-14 shrink-0 text-maroon/50">{label}</span>
      <button
        type="button"
        onClick={async () => {
          if (await copyText(copyValue ?? value)) onCopied();
        }}
        title="Click to copy"
        className={`min-w-0 flex-1 cursor-pointer break-words text-left transition hover:underline ${valueClass}`}
      >
        {value}
      </button>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-maroon/5 text-maroon">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon/50">
          {label}
        </p>
        <div className="text-sm text-maroon-dark">{children}</div>
      </div>
    </div>
  );
}

export default function BranchModal({
  branch,
  onClose,
}: {
  branch: Branch;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);

  const showCopied = () => setCopied(true);

  const Icon = iconFor(branch.icon);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={branch.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-maroon-dark/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-scale-in">
        {/* Header — unified maroon for consistent, high-contrast look */}
        <div className="relative bg-gradient-to-br from-maroon to-maroon-light px-6 py-5">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-maroon shadow-sm">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight text-white">
                {branch.name}
              </h2>
              <p className="text-xs font-medium text-white/80">{branch.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid gap-5 overflow-y-auto overflow-x-hidden px-6 py-5">
          <Row
            label="Location"
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" />
                <circle cx="12" cy="11" r="2.2" />
              </svg>
            }
          >
            <p>{branch.location.address}</p>
            <a
              href={branch.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold-dark hover:underline"
            >
              Open in Google Maps
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </Row>

          <Row
            label="Phone"
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M4 5c0 8.3 6.7 15 15 15v-3.3l-4-1.3-1.7 1.7a12 12 0 0 1-6.4-6.4L8.6 9 7.3 5H4Z" />
              </svg>
            }
          >
            <div className="flex flex-col gap-1">
              {branch.phones.map((p, i) => (
                <a
                  key={i}
                  href={`tel:${p.number.replace(/\s/g, "")}`}
                  className="flex items-baseline gap-2 hover:text-gold-dark"
                >
                  <span className="w-20 shrink-0 text-maroon/50">{p.label}</span>
                  <span className="font-medium">{p.number}</span>
                </a>
              ))}
            </div>
          </Row>

          <Row
            label="Bank / Payment"
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M3 10 12 4l9 6" />
                <path d="M5 10v8M19 10v8M9 10v8M15 10v8M3 20h18" />
              </svg>
            }
          >
            <div className="flex flex-col">
              <CopyLine
                label="A/c No."
                value={branch.bank.account}
                valueClass="font-medium tracking-wide"
                onCopied={showCopied}
              />
              <CopyLine
                label="Bank"
                value={`${branch.bank.bank}, ${branch.bank.branch}`}
                onCopied={showCopied}
              />
              <CopyLine
                label="IFSC"
                value={branch.bank.ifsc}
                valueClass="font-medium"
                onCopied={showCopied}
              />
              <CopyLine
                label="UPI"
                value={branch.bank.upi}
                valueClass="font-medium text-gold-dark"
                onCopied={showCopied}
              />
            </div>
          </Row>

          {/* Scan to pay */}
          <Row
            label="Scan to Pay (BHIM UPI)"
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M4 4h5v5H4zM15 4h5v5h-5zM4 15h5v5H4z" />
                <path d="M15 15h2v2h-2zM19 15h1M19 19h1M15 19h2" />
              </svg>
            }
          >
            <div className="inline-flex flex-col items-start gap-2">
              <div className="relative rounded-xl border border-maroon/10 bg-white p-2 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={UPI_QR_DATA_URI}
                  alt={`UPI QR for ${branch.bank.upi}`}
                  className="h-32 w-32"
                />
                <button
                  type="button"
                  onClick={saveQr}
                  aria-label="Save UPI QR to gallery"
                  title="Save QR to gallery"
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-maroon text-gold shadow-md transition hover:bg-maroon-light"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
                  </svg>
                </button>
              </div>
            </div>
          </Row>

          <Row
            label="Handles"
            icon={
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path d="M3 9 12 3l9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                <path d="M3 9h18M12 3v18" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-1.5">
              {branch.products.map((p, i) => (
                <span
                  key={i}
                  className="rounded-full bg-maroon/5 px-2.5 py-1 text-xs text-maroon-dark"
                >
                  {p}
                </span>
              ))}
            </div>
          </Row>
        </div>

        {/* centered copied toast */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-200 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded-full bg-maroon px-4 py-1.5 text-xs font-semibold text-white shadow-lg">
            Copied to clipboard
          </span>
        </div>
      </div>
    </div>
  );
}
