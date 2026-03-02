'use client';

import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import { Tag, Pillar } from '@/types/game';

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
    </div>
  );
}
