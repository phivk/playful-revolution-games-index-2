'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PillarChart from '@/components/PillarChart';
import { usePlaylist } from '@/contexts/PlaylistContext';
import type { Game } from '@/types/game';
import type { Pillar } from '@/types/game';

interface PlaylistViewProps {
  initialSlugs: string[];
  games: Game[];
}

function computePillarMinutes(games: Game[]): Record<Pillar, number> {
  const out: Record<Pillar, number> = {
    intellectual: 0,
    social: 0,
    physical: 0,
  };
  for (const g of games) {
    const mins = g.duration ?? 0;
    for (const p of g.pillars) {
      out[p] = (out[p] ?? 0) + mins;
    }
  }
  return out;
}

export default function PlaylistView({ initialSlugs, games }: PlaylistViewProps) {
  const router = useRouter();
  const { clear: clearContextPlaylist } = usePlaylist();
  const [slugs, setSlugs] = useState<string[]>(initialSlugs);

  const gameBySlug = useMemo(() => {
    const map = new Map<string, Game>();
    for (const g of games) map.set(g.slug, g);
    return map;
  }, [games]);

  useEffect(() => {
    setSlugs(initialSlugs);
  }, [initialSlugs]);

  const sequenceGames = useMemo(() => {
    const result: Game[] = [];
    for (const slug of slugs) {
      const game = gameBySlug.get(slug);
      if (game) result.push(game);
    }
    return result;
  }, [slugs, gameBySlug]);

  const totalDurationMinutes = useMemo(
    () => sequenceGames.reduce((sum, g) => sum + (g.duration ?? 0), 0),
    [sequenceGames]
  );

  const pillarMinutes = useMemo(
    () => computePillarMinutes(sequenceGames),
    [sequenceGames]
  );

  const updateUrl = useCallback(
    (newSlugs: string[]) => {
      const q = newSlugs.length > 0 ? `?g=${newSlugs.join(',')}` : '';
      router.replace(`/playlist${q}`, { scroll: false });
    },
    [router]
  );

  const remove = useCallback(
    (slug: string) => {
      const next = slugs.filter((s) => s !== slug);
      setSlugs(next);
      updateUrl(next);
    },
    [slugs, updateUrl]
  );

  const move = useCallback(
    (index: number, direction: 'up' | 'down') => {
      const next = [...slugs];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return;
      [next[index], next[target]] = [next[target], next[index]];
      setSlugs(next);
      updateUrl(next);
    },
    [slugs, updateUrl]
  );

  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = useCallback(() => {
    const url =
      typeof window !== 'undefined'
        ? `${window.location.origin}/playlist${slugs.length > 0 ? `?g=${slugs.join(',')}` : ''}`
        : '';
    void navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [slugs]);

  const addMoreHref =
    slugs.length > 0 ? `/?playlist=${slugs.join(',')}` : '/';

  const clearPlaylist = useCallback(() => {
    setSlugs([]);
    updateUrl([]);
    clearContextPlaylist();
  }, [updateUrl, clearContextPlaylist]);

  if (sequenceGames.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF7]">
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <h2 className="text-xl font-bold text-[#111111] mb-2">
              Your playlist is empty
            </h2>
            <p className="text-gray-600 mb-4">
              Add games from the catalog to build your playlist.
            </p>
            <Link
              href="/"
              className="inline-flex px-4 py-2 bg-[#E53935] text-white font-bold rounded-lg border-2 border-[#111111] hover:bg-[#C62828] transition-colors uppercase tracking-wide"
            >
              Browse games
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-[#111111] uppercase tracking-wide">
            Playlist ({sequenceGames.length} games)
          </h1>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyLink}
              className={`inline-flex items-center gap-2 px-4 py-2 font-bold rounded-lg border-2 border-[#111111] uppercase tracking-wide text-sm transition-all duration-200 ${
                linkCopied
                  ? 'bg-[#43A047] text-white scale-105 shadow-[3px_3px_0_0_#111111]'
                  : 'bg-white hover:bg-gray-100 hover:shadow-[3px_3px_0_0_#111111] active:scale-[0.98]'
              }`}
            >
              {linkCopied ? (
                <>
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                'Copy link'
              )}
            </button>
            <Link
              href={addMoreHref}
              className="inline-flex px-4 py-2 bg-[#43A047] text-white font-bold rounded-lg border-2 border-[#111111] hover:bg-[#2E7D32] transition-colors uppercase tracking-wide text-sm"
            >
              Add more games
            </Link>
            <button
              type="button"
              onClick={clearPlaylist}
              className="inline-flex px-4 py-2 bg-white font-bold rounded-lg border-2 border-[#111111] hover:bg-gray-100 transition-colors uppercase tracking-wide text-sm"
            >
              Clear playlist
            </button>
          </div>
        </div>

        <div className="mb-6 p-4 bg-white rounded-xl border-2 border-[#111111]">
          <p className="text-lg font-bold text-[#111111]">
            Total duration: {totalDurationMinutes} min
          </p>
        </div>

        <div className="mb-8">
          <PillarChart pillarMinutes={pillarMinutes} />
        </div>

        <ul className="space-y-3">
          {sequenceGames.map((game, index) => (
            <li
              key={game.slug}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-[#111111]"
            >
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => move(index, 'up')}
                  disabled={index === 0}
                  className="p-1 rounded border-2 border-[#111111] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                  aria-label="Move up"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 'down')}
                  disabled={index === sequenceGames.length - 1}
                  className="p-1 rounded border-2 border-[#111111] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                  aria-label="Move down"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/game/${game.slug}`}
                  className="font-bold text-[#111111] hover:text-[#E53935] uppercase tracking-wide"
                >
                  {game.title}
                </Link>
                <span className="text-gray-600 text-sm ml-2">
                  {game.duration ?? 0} min
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(game.slug)}
                className="shrink-0 px-3 py-1.5 text-sm font-bold rounded-lg border-2 border-[#111111] bg-[#FAFAF7] hover:bg-red-50 hover:border-[#E53935] transition-colors uppercase"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <footer className="bg-[#111111] text-white py-6 px-4 mt-8 rounded-xl">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm opacity-70">
              A collection of physical, social, and spontaneous games
            </p>
            <p className="text-xs opacity-50 mt-2">
              Made with joy by Playful Revolution
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
