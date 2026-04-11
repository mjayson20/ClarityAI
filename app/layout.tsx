import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClarityAI — Think better. Express clearly.",
  description: "Transform messy thoughts into clear, structured writing with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#eef2ff_0%,_#f8fafc_50%,_#f0fdf4_100%)]">
        {children}
      </body>
    </html>
  );
}
