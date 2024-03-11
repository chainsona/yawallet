"use client";

import React from "react";

import Assets from "@/app/components/Assets";

type ContentProps = {};

export default function Content({}: ContentProps) {
  return (
    <div className="overflow-hidden w-full h-full flex p-2">
      <div className="w-full"></div>

      <div className="w-full sm:w-[420px]">
        <Assets />
      </div>
    </div>
  );
}
