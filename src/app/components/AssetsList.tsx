"use client";

import Image from "next/image";
import React from "react";

import {
  ellipsis,
  formatNumber,
  randomAmount,
  shortenNumber,
} from "../utils/primitives";

const assets = [
  {
    name: "SOL",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Fraw.githubusercontent.com%2Fsolana-labs%2Ftoken-list%2Fmain%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png",
    type: "token",
    amount: 908.8224,
    value: 181934.2904,
    pnl: 169.0207,
  },
  {
    name: "BONK",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Farweave.net%2FhQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    type: "token",
    amount: 32834808.29048,
    value: 52279.24,
    pnl: 288.9527,
  },
  {
    name: "Famous Fox Federation",
    image: null,
    type: "nft",
    amount: 13,
    value: 32879.49267,
    pnl: -14.8974,
  },
  {
    name: "Mad Lads",
    image:
      "https://prod-image-cdn.tensor.trade/images/90x90/freeze=false/https%3A%2F%2Fprod-tensor-creators-s3.s3.us-east-1.amazonaws.com%2Fimage-59c7bcf2-bcb3-4cd3-9301-68ee6a474926",
    type: "nft",
    amount: 2,
    value: 24804.59426,
    pnl: 302.3904,
  },
  {
    name: "WIF",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Fbafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link",
    type: "token",
    amount: 4242.137,
    value: 1879,
    pnl: 180.0976,
  },
  {
    name: "Mad Lads",
    image:
      "https://prod-image-cdn.tensor.trade/images/90x90/freeze=false/https%3A%2F%2Fprod-tensor-creators-s3.s3.us-east-1.amazonaws.com%2Fimage-59c7bcf2-bcb3-4cd3-9301-68ee6a474926",
    type: "nft",
    amount: 2,
    value: 24804.5,
    pnl: 159.4506,
  },
  {
    name: "WIF",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Fbafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link",
    type: "token",
    amount: 4242.5,
    value: 1879,
    pnl: 428.2165,
  },
  {
    name: "BONK",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Farweave.net%2FhQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    type: "token",
    amount: 32834808.29048,
    value: 52279,
    pnl: 200.1769,
  },
  {
    name: "WIF",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Fbafkreibk3covs5ltyqxa272uodhculbr6kea6betidfwy3ajsav2vjzyum.ipfs.nftstorage.link",
    type: "token",
    amount: 4242.5,
    value: 1879,
    pnl: 154.6844,
  },
  {
    name: "BONK",
    image:
      "https://img.fotofolio.xyz/?url=https%3A%2F%2Farweave.net%2FhQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    type: "token",
    amount: 32834808.29048,
    value: 52279,
    pnl: 233.0962,
  },
  {
    name: "Mad Lads",
    image:
      "https://prod-image-cdn.tensor.trade/images/90x90/freeze=false/https%3A%2F%2Fprod-tensor-creators-s3.s3.us-east-1.amazonaws.com%2Fimage-59c7bcf2-bcb3-4cd3-9301-68ee6a474926",
    type: "nft",
    amount: 2,
    value: 24804.5,
    pnl: 196.1603,
  },
];

type AssetsListProps = {};

export default function AssetsList({}: AssetsListProps) {
  return (
    <div
      className="overflow-hidden rounded-2xl
        w-full h-full flex flex-col gap-4"
    >
      {assets.slice(0, 10).map((asset, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl w-full
            flex items-center justify-between
            p-3 px-4 bg-[#1C1C1C]"
        >
          {/* DESCRIPTION */}
          <div className="w-full flex items-center gap-4">
            <div
              className="overflow-hidden rounded-lg w-8 h-8
                flex items-center justify-center
                bg-[#202020]"
            >
              {asset.image ? (
                <Image
                  src={asset.image}
                  alt={asset.name}
                  height={0}
                  width={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <p className="text-gray-400 text-xs uppercase">
                  {asset.name[0]}
                </p>
              )}
            </div>

            <div className="sm:w-48 pr-3 truncate">
              {/* NAME */}
              <p className="text-gray-300" title={asset.name}>
                {ellipsis(asset.name, 14, "end")}
              </p>

              {/* AMOUNT */}
              <p className="text-gray-400 text-xs uppercase">
                {asset.type.toLocaleLowerCase() === "nft"
                  ? `${shortenNumber(asset.amount)} NFT`
                  : shortenNumber(asset.amount)}
              </p>
            </div>
          </div>

          {/* VALUE */}
          <div className="w-48 text-right">
            <p className="text-gray-300">{`$${formatNumber(asset.value)}`}</p>
            <p
              className={`text-xs ${
                asset.pnl > 0 ? "text-green-600" : "text-red-600"
              }`}
            >{`${asset.pnl > 0 ? "+" : ""}${formatNumber(asset.pnl)}%`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
