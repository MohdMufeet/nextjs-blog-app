import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog App",
  description: "A modern full-stack blog application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}