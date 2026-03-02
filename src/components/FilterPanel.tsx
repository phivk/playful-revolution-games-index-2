'use client';

import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import { Tag, Pillar } from '@/types/game';
import { X } from 'lucide-react';

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
}: FilterPanelProps) {
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
      {playlistCount > 0 && (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onViewPlaylist}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-playlist-amber text-foreground font-bold rounded-lg border-2 border-foreground uppercase tracking-wide text-sm hover-btn"
          >
            View playlist ({playlistCount})
          </button>
          <button
            type="button"
            onClick={onClearPlaylist}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-bold rounded-lg border-2 border-transparent hover:border-foreground uppercase tracking-wide text-sm"
          >
            <X className="w-4 h-4 shrink-0" strokeWidth={2.5} aria-hidden />
            Clear playlist
          </button>
        </div>
      )}
    </div>
  );
}
