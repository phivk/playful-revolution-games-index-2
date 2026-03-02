import { Suspense } from 'react';
import { getGames } from '@/lib/games';
import GamesCatalog from '@/components/GamesCatalog';

export default async function Home() {
  const games = await getGames();
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading…</div>}>
      <GamesCatalog initialGames={games} />
    </Suspense>
  );
}
