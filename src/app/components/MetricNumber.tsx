import React from "react";

import { titleFont } from "../style";
import { formatNumber } from "../utils/primitives";

type MetricNumberProps = { label: string; value: number };

export default function MetricNumber({ label, value }: MetricNumberProps) {
  return (
    <div className="flex flex-col items-start">
      <h3
        className={`${titleFont} font-medium text-sm text-gray-400 uppercase`}
      >
        {label}
      </h3>
      <div className=""></div>

      <div className="text-3xl text-gray-200">${formatNumber(76484.8793)}</div>
    </div>
  );
}