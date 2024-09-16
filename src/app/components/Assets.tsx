"use client";

import React from "react";

import AssetsList from "@/app/components/AssetsList";
import AssetBreakdown from "@/app/components/AssetBreakdown";
import GroupTitle from "@/app/components/GroupTitle";
import MetricNumber from "@/app/components/MetricNumber";

type AssetsProps = {
  assetBreakdown?: { name: string; value: number }[];
  netWorth?: number;
  assets?: Asset[];
};

export default function Assets({
  assetBreakdown,
  assets,
  netWorth,
}: AssetsProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#343653]
        w-full h-full flex flex-col gap-4 p-6"
    >
      <MetricNumber label={"Net Worth"} value={netWorth} />

      <div
        className="overflow-y-scroll rounded-2xl
          scrollbar-thin scrollbar-thumb-[#1A1A1E] scrollbar-track-transparent"
      >
        <AssetBreakdown data={assetBreakdown} />

        <div className="my-5 border-b border-[#202020]"></div>

        <GroupTitle text="Assets" />

        <div className="w-full">
          <AssetsList assets={assets} />
        </div>
      </div>
    </div>
  );
}
