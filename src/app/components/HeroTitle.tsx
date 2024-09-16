import React from "react";

import { titleFont } from "@/app/style";

type HeroTitleProps = {};

export default function HeroTitle({}: HeroTitleProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <h1
        className={`bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
          bg-clip-text bg-300% animate-gradient
          text-transparent ${titleFont.className} text-5xl font-bold uppercase`}
      >
        Ayowa
      </h1>

      <h2 className="md:text-xl fontbold">Feel the Joy of exploring Solana</h2>
    </div>
  );
}
