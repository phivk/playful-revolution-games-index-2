'use client';

import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';

interface RandomPickerProps {
  games: Game[];
  variant?: 'default' | 'nav';
}

const buttonClass = {
  default:
    'w-full sm:w-auto px-8 py-4 bg-joy-yellow text-foreground font-bold text-xl rounded-xl shadow-brutal-lg transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 border-3 border-foreground min-h-[56px]',
  nav: 'px-4 py-2 bg-joy-yellow text-foreground font-bold text-sm rounded-lg shadow-brutal-sm hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100 border-2 border-foreground',
};

export default function RandomPicker({ games, variant = 'default' }: RandomPickerProps) {
  const router = useRouter();

  const handleRandomPick = () => {
    // Pick from ALL games (ignores current filters) as per spec
    const randomIndex = Math.floor(Math.random() * games.length);
    const randomGame = games[randomIndex];
    
    if (randomGame) {
      router.push(`/game/${randomGame.slug}`);
    }
  };

  return (
    <button
      onClick={handleRandomPick}
      className={buttonClass[variant]}
    >
      <span className="flex items-center justify-center gap-3">
        <span className={variant === "nav" ? "text-base" : "text-2xl"} aria-hidden>
          🎲
        </span>
        SURPRISE ME!
      </span>
    </button>
  );
}
