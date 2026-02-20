'use client';

import gamesData from '@/data/games.json';
import GameCard from '@/components/GameCard';
import FilterChips from '@/components/FilterChips';
import SearchBar from '@/components/SearchBar';
import RandomPicker from '@/components/RandomPicker';
import { useGameFilters } from '@/hooks/useGameFilters';
import { Game, Tag, Pillar, EnergyLevel } from '@/types/game';

export default function Home() {
  const games = gamesData.games as Game[];

  const {
    filters,
    filteredGames,
    setTag,
    removeTag,
    setPillar,
    removePillar,
    setEnergyLevel,
    removeEnergyLevel,
    setSearchQuery,
    clearAll,
  } = useGameFilters(games);

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

  const handleEnergyToggle = (level: EnergyLevel) => {
    if (filters.energyLevels.includes(level)) {
      removeEnergyLevel(level);
    } else {
      setEnergyLevel(level);
    }
  };

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.pillars.length > 0 ||
    filters.energyLevels.length > 0 ||
    filters.searchQuery.trim() !== '';

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      <header className="bg-[#E53935] text-white py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Playful Revolution</h1>
          <p className="mt-2 text-lg opacity-90">Games for workshops, events, and community</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Search and Random Picker */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-grow">
            <SearchBar value={filters.searchQuery} onChange={setSearchQuery} />
          </div>
          <RandomPicker games={games} />
        </div>

        {/* Filter Chips */}
        <FilterChips
          selectedTags={filters.tags}
          selectedPillars={filters.pillars}
          selectedEnergyLevels={filters.energyLevels}
          onTagToggle={handleTagToggle}
          onPillarToggle={handlePillarToggle}
          onEnergyToggle={handleEnergyToggle}
          onClearAll={clearAll}
        />

        {/* Results count */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-[#111111]">
            Games ({filteredGames.length})
            {hasActiveFilters && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                (filtered from {games.length})
              </span>
            )}
          </h2>
        </div>

        {/* Games Grid or Empty State */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
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
            <h3 className="mt-4 text-lg font-medium text-gray-900">No games match your filters</h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search or clearing some filters to see more games.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="mt-4 px-4 py-2 bg-[#E53935] text-white font-medium rounded-lg hover:bg-[#C62828] transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
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
