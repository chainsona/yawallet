"use client";

import React from "react";

import Assets from "@/app/components/Assets";

type ContentProps = {
  portfolio: Portfolio;
};

export default function Content({ portfolio }: ContentProps) {
  return (
    <div className="overflow-hidden w-full min-h-screen sm:h-full flex flex-col-reverse gap-4 sm:flex-row">
      {/* <div className="overflow-y-scroll w-full h-[2000px] flex flex-col bg-red-500">
        <div className="overflow-hidden w-full h-[800px] flex flex-col bg-green-500"></div>
        <div className="overflow-hidden w-full h-[800px] flex flex-col bg-blue-500"></div>
        <div className="overflow-hidden w-full h-[800px] flex flex-col bg-purple-500"></div>
        <div className="overflow-hidden w-full h-[800px] flex flex-col bg-blue-500"></div>
      </div> */}

      {/* <div className="w-full sm:w-[420px]"> */}
      <div className="w-full">
        <Assets
          assetBreakdown={portfolio?.assetBreakdown}
          assets={
            !!portfolio
              ? [...portfolio.assets.tokens, ...portfolio.assets.nfts]
              : []
          }
          netWorth={portfolio?.netWorth}
        />
      </div>
    </div>
  );
}
