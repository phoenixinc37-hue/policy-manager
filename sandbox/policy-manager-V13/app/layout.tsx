import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Policy Manager",
  description:
    "Create, organize, issue, and track policy across your clinics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
