import React from "react";

import { titleFont } from "../style";

type GroupTitleProps = { text: string };

export default function GroupTitle({ text }: GroupTitleProps) {
  return (
    <div className="flex justify-between pb-4">
      <h2 className={`${titleFont} font-medium text-2xl text-gray-300`}>
        {text}
      </h2>

      {/* TODO: Swith view between Net worth and accounts */}
    </div>
  );
}
