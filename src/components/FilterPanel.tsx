'use client';

import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import { usePlaylistAnimation } from '@/contexts/PlaylistAnimationContext';
import { Tag, Pillar } from '@/types/game';
import { Route, X } from 'lucide-react';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedTags: Tag[];
  selectedPillars: Pillar[];
  selectedEnergyLevels: number[];
  selectedDurations: number[];
  onTagToggle: (tag: Tag) => void;
  onPillarToggle: (pillar: Pillar) => void;
  onEnergyToggle: (level: number) => void;
  onDurationToggle: (duration: number) => void;
  onClearAll: () => void;
  playlistCount: number;
  onClearPlaylist?: () => void;
  onViewPlaylist?: () => void;
  isAnimationTarget?: boolean;
}

export default function FilterPanel({
  searchQuery,
  onSearchChange,
  selectedTags,
  selectedPillars,
  selectedEnergyLevels,
  selectedDurations,
  onTagToggle,
  onPillarToggle,
  onEnergyToggle,
  onDurationToggle,
  onClearAll,
  playlistCount,
  onClearPlaylist,
  onViewPlaylist,
  isAnimationTarget = false,
}: FilterPanelProps) {
  const { showPlusOne, targetRef } = usePlaylistAnimation();

  return (
    <div className="space-y-4">
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      <FilterChips
        selectedTags={selectedTags}
        selectedPillars={selectedPillars}
        selectedEnergyLevels={selectedEnergyLevels}
        selectedDurations={selectedDurations}
        onTagToggle={onTagToggle}
        onPillarToggle={onPillarToggle}
        onEnergyToggle={onEnergyToggle}
        onDurationToggle={onDurationToggle}
        onClearAll={onClearAll}
      />
      <div className="flex flex-col gap-2">
        <button
          ref={isAnimationTarget ? targetRef : undefined}
          type="button"
          onClick={playlistCount > 0 ? onViewPlaylist : undefined}
          className={`relative w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 font-bold rounded-lg border-3 uppercase tracking-wide text-sm ${
            playlistCount > 0
              ? 'bg-playlist-amber text-foreground border-foreground hover-btn'
              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-default'
          }`}
          aria-label={`Playlist: ${playlistCount} games`}
        >
          <Route size={16} strokeWidth={2.5} />
          {playlistCount > 0 ? 'View playlist ' : 'Playlist '}
          <span
            key={playlistCount}
            className={showPlusOne ? 'playlist-count-bump' : ''}
          >
            ({playlistCount})
          </span>
        </button>
        {playlistCount > 0 && (
          <button
            type="button"
            onClick={onClearPlaylist}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-bold rounded-lg border-3 border-foreground hover:border-revolution-red hover:text-revolution-red uppercase tracking-wide text-sm"
          >
            <X className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden />
            Clear playlist
          </button>
        )}
      </div>
    </div>
  );
}
