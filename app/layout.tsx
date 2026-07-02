import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nakhla — Build Session Report",
  description:
    "Outcomes, live deployments, competitive gap analysis, costs, and next steps for the Nakhla KSA influencer marketplace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
