import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kavach - Enterprise Access Platform",
  description: "Blockchain-based secure platform for Identity, Access Control, and Digital Asset Management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
