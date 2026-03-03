'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import GameCard from '@/components/GameCard';
import FilterPanel from '@/components/FilterPanel';
import FilterBottomSheet from '@/components/FilterBottomSheet';
import { SlidersHorizontal } from 'lucide-react';
import { usePlaylist } from '@/contexts/PlaylistContext';
import { useGameFilters } from '@/hooks/useGameFilters';
import { Game, Tag, Pillar } from '@/types/game';

interface GamesCatalogProps {
  initialGames: Game[];
}

export default function GamesCatalog({ initialGames }: GamesCatalogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { slugs, add, remove, clear, initializeFromSlugs } = usePlaylist();
  const {
    filters,
    filteredGames,
    setTag,
    removeTag,
    setPillar,
    removePillar,
    setEnergyLevel,
    removeEnergyLevel,
    setDuration,
    removeDuration,
    setSearchQuery,
    clearAll,
    activeFilterCount,
  } = useGameFilters(initialGames);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const playlistParam = searchParams.get('playlist');
    if (playlistParam) {
      const initialSlugs = playlistParam
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      initializeFromSlugs(initialSlugs);
    }
  }, [searchParams, initializeFromSlugs]);

  const handleTagToggle = (tag: Tag) => {
    if (filters.tags.includes(tag)) {
      removeTag(tag);
    } else {
      setTag(tag);
    }
  };

  const handlePillarToggle = (pillar: Pillar) => {
    if (filters.pillars.includes(pillar)) {
      removePillar(pillar);
    } else {
      setPillar(pillar);
    }
  };

  const handleEnergyToggle = (level: number) => {
    if (filters.energyLevels.includes(level)) {
      removeEnergyLevel(level);
    } else {
      setEnergyLevel(level);
    }
  };

  const handleDurationToggle = (duration: number) => {
    if (filters.durations.includes(duration)) {
      removeDuration(duration);
    } else {
      setDuration(duration);
    }
  };

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.pillars.length > 0 ||
    filters.energyLevels.length > 0 ||
    filters.durations.length > 0 ||
    filters.searchQuery.trim() !== '';

  const handleClearPlaylist = () => {
    clear();
    router.replace('/');
  };

  const handleViewPlaylist = () => {
    const q = slugs.join(',');
    router.replace(`/?playlist=${q}`);
    router.push(`/playlist?g=${q}`);
  };

  const filterPanelProps = {
    searchQuery: filters.searchQuery,
    onSearchChange: setSearchQuery,
    selectedTags: filters.tags,
    selectedPillars: filters.pillars,
    selectedEnergyLevels: filters.energyLevels,
    selectedDurations: filters.durations,
    onTagToggle: handleTagToggle,
    onPillarToggle: handlePillarToggle,
    onEnergyToggle: handleEnergyToggle,
    onDurationToggle: handleDurationToggle,
    onClearAll: clearAll,
    playlistCount: slugs.length,
    onClearPlaylist: handleClearPlaylist,
    onViewPlaylist: handleViewPlaylist,
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6 lg:flex lg:gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-md xl:w-lg shrink-0">
          <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto sidebar-scroll pr-1">
            <FilterPanel {...filterPanelProps} isAnimationTarget />
          </div>
        </aside>

        {/* Mobile filter bottom sheet */}
        <FilterBottomSheet
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          gameCount={filteredGames.length}
        >
          <FilterPanel {...filterPanelProps} />
        </FilterBottomSheet>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3 min-h-10">
            <h2 className="text-2xl font-bold text-foreground">
              Games ({filteredGames.length})
              {hasActiveFilters && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (filtered from {initialGames.length})
                </span>
              )}
            </h2>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.slug}
                  game={game}
                  inPlaylist={slugs.includes(game.slug)}
                  onAddToPlaylist={() => add(game.slug)}
                  onRemoveFromPlaylist={() => remove(game.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No games match your filters
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or clearing some filters to see more
                games.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="mt-4 px-4 py-2 bg-revolution-red text-white font-medium rounded-lg border-2 border-foreground hover-btn"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile FAB - centered at bottom */}
      {!drawerOpen && (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 px-5 py-3 bg-foreground text-white font-bold rounded-full border-3 border-foreground uppercase tracking-wider text-sm shadow-brutal-lg hover:scale-105 active:scale-95"
        >
          <SlidersHorizontal size={18} strokeWidth={2.5} />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-revolution-red text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
