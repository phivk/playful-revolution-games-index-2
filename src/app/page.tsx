import { getGames } from '@/lib/games';
import GamesCatalog from '@/components/GamesCatalog';

export default async function Home() {
  const games = await getGames();
  return <GamesCatalog initialGames={games} />;
}
