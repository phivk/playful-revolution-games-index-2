'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RandomPicker from '@/components/RandomPicker';
import { Game } from '@/types/game';

interface NavBarProps {
  games: Game[];
}

export default function NavBar({ games }: NavBarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="bg-revolution-red text-white py-4 px-4 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-3 gap-y-2">
        {!isHome && (
          <Link
            href="/"
            className="text-white hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
          >
            ← Back
          </Link>
        )}
        <Link
          href="/"
          className="font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          <h1 className={isHome ? 'text-4xl' : 'text-2xl'}>
            Playful Revolution
          </h1>
        </Link>
        <div className="flex-1" />
        <RandomPicker games={games} variant="nav" />
      </div>
      {isHome && (
        <p className="max-w-4xl mx-auto mt-2 px-4 text-lg opacity-90">
          Games for workshops, events, and community
        </p>
      )}
    </header>
  );
}
