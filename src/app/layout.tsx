import type { Metadata } from "next";

import "./globals.css";

import UiLayout from "@/app/components/UiLayout";
import { contentFont } from "@/app/style";

export const metadata: Metadata = {
  title: "Ayowa",
  description: "Feel the Joy of exploring Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={contentFont.className}>
        <UiLayout>{children}</UiLayout>
      </body>
    </html>
  );
}
