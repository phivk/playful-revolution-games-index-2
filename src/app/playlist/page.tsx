import { getGames } from '@/lib/games';
import PlaylistView from './PlaylistView';

interface PageProps {
  searchParams: Promise<{ g?: string }>;
}

export default async function PlaylistPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const slugParam = params?.g ?? '';
  const initialSlugs = slugParam
    ? slugParam.split(',').map((s) => s.trim()).filter(Boolean)
    : [];
  const games = await getGames();

  return <PlaylistView initialSlugs={initialSlugs} games={games} />;
}
