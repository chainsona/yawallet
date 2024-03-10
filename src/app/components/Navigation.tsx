"use client";

import React from "react";

import Search from "@/app/components/Search";
import Title from "@/app/components/Title";

type NavigationProps = {};

export default function Navigation({}: NavigationProps) {
  return (
    <div
      className="w-full h-18 flex items-center justify-between gap-8 px-2
        bg-[#101010]"
    >
      <Title />

      <div className="w-80">
        <Search />
      </div>
    </div>
  );
}
