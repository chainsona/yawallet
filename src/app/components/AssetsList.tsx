"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ellipsis, formatNumber, shortenNumber } from "../utils/primitives";

type AssetsListProps = {
  assets?: Asset[];
};

export default function AssetsList({ assets }: AssetsListProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl
        w-full h-full flex flex-col gap-4"
    >
      {!!assets ? (
        assets.map((asset, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl w-full
            flex items-center justify-between
            p-3 px-4 bg-[#1C1C1C]"
          >
            {/* DESCRIPTION */}
            <div className="w-full flex items-center gap-4">
              <div
                className="overflow-hidden rounded-full w-8 h-8
                flex items-center justify-center
                bg-[#EFEFEF]"
              >
                {asset.image ? (
                  <Image
                    src={asset.image}
                    alt={asset.name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    unoptimized
                  />
                ) : (
                  <p className="text-gray-400 text-xs uppercase">
                    {asset.name?.[0] || ""}
                  </p>
                )}
              </div>

              <div className="md:w-48 pr-3 truncate">
                {/* NAME */}
                <Link
                  href={`https://solscan.io/account/${asset.id}`}
                  target="_blank"
                >
                  <p
                    className="text-gray-300 hover:cursor-pointer"
                    title={asset.name || asset.id}
                  >
                    {ellipsis(
                      asset.name || asset.id,
                      asset.name ? 14 : 10,
                      asset.name ? "end" : "middle"
                    )}
                  </p>
                </Link>

                {/* AMOUNT */}
                <p className="text-gray-400 text-xs uppercase">
                  {asset.type.toLocaleLowerCase() === "nft"
                    ? `${shortenNumber(asset.balance)} NFT`
                    : shortenNumber(asset.balance)}
                </p>
              </div>
            </div>

            {/* VALUE */}
            <div className="w-48 text-right">
              <p className="text-gray-300">
                {asset.price?.value
                  ? `$${formatNumber(asset.price?.value || 0, 2)}`
                  : ""}
              </p>
              {asset.pnl ||
                (0 > 0 && (
                  <p
                    className={`text-xs ${
                      asset.pnl || 0 > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >{`${asset.pnl || 0 > 0 ? "+" : ""}${formatNumber(
                    asset.pnl || 0
                  )}%`}</p>
                ))}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex items-center justify-center">
          <p className="text-gray-400">No assets to display</p>
        </div>
      )}
    </div>
  );
}
