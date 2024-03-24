"use client";

import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

import { titleFont } from "@/app/style";
import { shortenNumber } from "../utils/primitives";

const COLORS = [
  "#90be6d",
  "#277da1",
  "#f9c74f",
  "#f3722c",
  "#43aa8b",
  "#f9844a",
  "#4d908e",
  "#f8961e",
  "#577590",
  "#f94144",
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <text
        className="text-sm"
        x={ex + (cos >= 0 ? -1 : 1) * 20}
        y={ey + (cos >= 0 ? -2 : -1.6) * 5}
        textAnchor={textAnchor}
        fill="#DDD"
      >{`${(percent * 100).toFixed(2)}%`}</text>
    </g>
  );
};

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any[];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="opacity-90 rounded-xl p-2 px-3 bg-[#101010]">
        <div className="">{payload[0].name}</div>
        <p className="text-gray-300">{`Value: $${shortenNumber(
          payload[0].value,
          2
        )}`}</p>
      </div>
    );
  }

  return null;
};

type AssetBreakdownProps = { data?: { name: string; value: number }[] };

export default function AssetBreakdown({ data }: AssetBreakdownProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  function onPieEnter(_: any, index: any) {
    setActiveIndex(index);
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#202020]
    w-full h-72 flex flex-col p-4 px-6
    bg-gradient-to-r from-[#1C1C1C] to-[#101010]"
    >
      <h3 className={`${titleFont} text-lg text-gray-300`}>Asset Breakdown</h3>

      {/* TODO: Asset breakdown chart */}
      <ResponsiveContainer className={"text-sm"} width="100%" height="100%">
        <PieChart width={400} height={300}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={36}
            outerRadius={60}
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {(data || []).map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            content={<CustomTooltip active={false} payload={[]} label={""} />}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
