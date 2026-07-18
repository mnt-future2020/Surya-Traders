import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Surya Pipe Trader — Branches",
  description:
    "Surya Pipe Trader, Madurai — Head Office, Pump Division and Plumbing & Sanitaryware branches.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
