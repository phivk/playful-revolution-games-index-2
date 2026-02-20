import gamesData from '@/data/games.json';
import GameCard from '@/components/GameCard';
import { Game } from '@/types/game';

export default function Home() {
  const games = gamesData.games as Game[];

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <header className="bg-[#E53935] text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Playful Revolution</h1>
          <p className="mt-2 text-lg opacity-90">Games for workshops, events, and community</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#111111]">Games ({games.length})</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </main>

      <footer className="bg-[#111111] text-white py-6 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm opacity-70">
            A collection of physical, social, and spontaneous games
          </p>
          <p className="text-xs opacity-50 mt-2">
            Made with joy by Playful Revolution
          </p>
        </div>
      </footer>
    </div>
  );
}
