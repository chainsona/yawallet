import HeroTitle from "@/app/components/HeroTitle";
import Search from "@/app/components/Search";

export default function Home() {
  return (
    <main
      className="relative h-full
        flex flex-col items-center justify-center
        bg-[#101010] text-gray-100"
    >
      <div className="z-10 w-full flex flex-col items-center gap-8 text-gray-300">
        <HeroTitle />

        <div className="w-3/4 md:w-full max-w-screen-sm">
          <Search />
        </div>
      </div>
    </main>
  );
}
