import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const titleFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

type TitleProps = {};

export default function Title({}: TitleProps) {
  return (
    <div className="h-16 flex items-center justify-between gap-4 text-gray-100">
      <Link href={"/"} target={"_self"}>
        <div className="flex items-center justify-start gap-2">
          <div className="relative rounded-lg h-5 w-5 bg-300% animatedbggradient">
            <Image
              src={"/logo.png"}
              alt={"Ayowa"}
              height={0}
              width={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <h1 className={`${titleFont.className} text-2xl font-bold uppercase`}>
            Ayowa
          </h1>
        </div>
      </Link>

      <div className="">{/* TODO COLLAPSE */}</div>
    </div>
  );
}
