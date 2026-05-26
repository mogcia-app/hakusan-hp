import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hakusan Retreat",
  description: "Modern hotel landing page framework built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
