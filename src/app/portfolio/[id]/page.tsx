"use client";

import Content from "@/app/components/Content";
import Navigation from "@/app/components/Navigation";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Portofolio() {
  // TODO: Fetch path from router
  const path = usePathname();

  const [portfolio, setPortfolio] = useState<any | null>(null);

  const query = path.split("/").pop();

  const fetchPortfolio = useCallback(async () => {
    const response = await fetch(`/api/portfolio?id=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setPortfolio(data.data);
  }, [query]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchPortfolio();
    }, 30000);
    return () => clearInterval(timer);
  }, [fetchPortfolio]);

  return (
    <main
      className="relative h-full md:h-dvh
        flex flex-col items-center justify-start gap-2 p-4 md:px-6 pt-2
        bg-[#101010] text-gray-100"
    >
      <Navigation />

      <div className="overflow-hidden w-full min-h-screen md:h-full pt-0">
        <Content portfolio={portfolio} />
      </div>
    </main>
  );
}
