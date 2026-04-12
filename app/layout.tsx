import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClarityAI — Think better. Express clearly.",
  description: "Transform messy thoughts into clear, structured writing with AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ backgroundColor: "#f9f8f6" }}>
        {children}
      </body>
    </html>
  );
}
