'use client';

import { useRouter } from 'next/navigation';
import { Game } from '@/types/game';

interface RandomPickerProps {
  games: Game[];
  variant?: 'default' | 'nav';
}

const buttonClass = {
  default:
    'w-full sm:w-auto px-8 py-4 bg-[#FDD835] text-[#111111] font-display font-bold text-xl rounded-xl shadow-[4px_4px_0px_0px_#111111] transform hover:scale-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 border-3 border-[#111111] min-h-[56px]',
  nav: 'px-4 py-2 bg-[#FDD835] text-[#111111] font-display font-bold text-sm rounded-lg shadow-[2px_2px_0px_0px_#111111] hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100 border-2 border-[#111111]',
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
        <svg
          className={variant === 'nav' ? 'h-4 w-4' : 'h-6 w-6'}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        SURPRISE ME!
      </span>
    </button>
  );
}
