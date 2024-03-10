import type { Metadata } from "next";
import { Karla } from "next/font/google";

import "./globals.css";

import UiLayout from "@/app/components/UiLayout";

const contentFont = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
