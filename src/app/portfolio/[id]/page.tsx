"use client";

import Content from "@/app/components/Content";
import Navigation from "@/app/components/Navigation";
import { usePathname } from "next/navigation";

export default function Portofolio() {
  // TODO: Fetch path from router
  const path = usePathname();
  const query = path.split("/").pop();

  return (
    <main
      className="relative h-full
        flex flex-col items-center justify-start px-2 sm:px-6 py-2
        bg-[#101010] text-gray-100"
    >
      <Navigation />

      <div className="overflow-hidden w-full h-full pt-0">
        <Content />
      </div>
    </main>
  );
}
