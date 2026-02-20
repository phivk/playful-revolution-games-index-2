'use client';

import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';

interface RandomPickerProps {
  games: Game[];
}

export default function RandomPicker({ games }: RandomPickerProps) {
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
      className="w-full sm:w-auto px-6 py-3 bg-[#FDD835] text-[#111111] font-bold text-lg rounded-lg shadow-md transform hover:scale-105 active:scale-95 transition-all duration-150 hover:shadow-lg border-2 border-[#111111]"
    >
      <span className="flex items-center justify-center gap-2">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Surprise Me!
      </span>
    </button>
  );
}
