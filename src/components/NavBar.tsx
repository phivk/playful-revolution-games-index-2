"use client";

import RandomPicker from "@/components/RandomPicker";
import { Game } from "@/types/game";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavBarProps {
  games: Game[];
}

export default function NavBar({ games }: NavBarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="bg-revolution-red text-white py-4 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 gap-y-2">
        <Link
          href="/"
          className="font-bold tracking-tight hover:opacity-80 hover:scale-[1.02] flex items-center gap-3"
        >
          <div className="w-10 h-10 shrink-0 rounded-full overflow-hidden border-2 border-white">
            <Image
              src="/logo-playful-revolution.png"
              alt="Playful Revolution"
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          </div>
          <h1 className={isHome ? "text-4xl" : "text-2xl"}>
            Playful Revolution
          </h1>
        </Link>
        <div className="flex-1" />
        <RandomPicker games={games} variant="nav" />
      </div>
      {isHome && (
        <p className="max-w-7xl mx-auto mt-2 px-4 text-lg opacity-90">
          Games for workshops, events, and community
        </p>
      )}
    </header>
  );
}
