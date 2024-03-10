import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";

import UiLayout from "./components/UiLayout";

const contentFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
