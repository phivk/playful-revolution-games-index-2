'use client';

import { Tag, Pillar } from '@/types/game';

interface FilterChipsProps {
  selectedTags: Tag[];
  selectedPillars: Pillar[];
  selectedEnergyLevels: number[];
  onTagToggle: (tag: Tag) => void;
  onPillarToggle: (pillar: Pillar) => void;
  onEnergyToggle: (level: number) => void;
  onClearAll: () => void;
}

const ALL_TAGS: Tag[] = [
  'theatre',
  'collaborative',
  'movement',
  'circle',
  'ball',
  'table',
  'competitive',
  'social',
];

const ALL_PILLARS: Pillar[] = ['intellectual', 'social', 'physical'];

const ALL_ENERGY_LEVELS = [1, 2, 3, 4, 5] as const;

const TAG_COLORS: Record<string, string> = {
  theatre: '#E53935',
  collaborative: '#43A047',
  movement: '#FDD835',
  circle: '#1E3A8A',
  ball: '#E53935',
  table: '#1E3A8A',
  competitive: '#1E3A8A',
  social: '#E53935',
};

const PILLAR_COLORS: Record<Pillar, string> = {
  intellectual: '#1E3A8A',
  social: '#E53935',
  physical: '#43A047',
};

const ENERGY_COLORS: Record<number, string> = {
  1: '#1E3A8A',
  2: '#2563EB',
  3: '#FDD835',
  4: '#E53935',
  5: '#B71C1C',
};

function Chip({
  label,
  selected,
  onClick,
  color,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-100 transform hover:scale-105 active:scale-95 min-h-[44px] ${
        selected
          ? 'text-white shadow-[3px_3px_0px_0px_#111111] border-2 border-[#111111]'
          : 'bg-transparent border-3 border-[#111111] text-[#111111] hover:border-[#E53935] hover:text-[#E53935]'
      }`}
      style={
        selected && color
          ? { backgroundColor: color, borderColor: '#111111' }
          : undefined
      }
    >
      {label}
    </button>
  );
}

function ChipGroup({
  title,
  chips,
  selectedValues,
  onToggle,
  colors,
}: {
  title: string;
  chips: readonly string[] | readonly number[];
  selectedValues: (string | number)[];
  onToggle: (value: string | number) => void;
  colors?: Record<string, string> | Record<number, string>;
}) {
  const count = selectedValues.length;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-base font-display font-bold text-[#111111] uppercase tracking-wider">
          {title}
        </h3>
        {count > 0 && (
          <span className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {chips.map((chip) => (
          <Chip
            key={String(chip)}
            label={String(chip)}
            selected={selectedValues.includes(chip)}
            onClick={() => onToggle(chip)}
            color={colors?.[chip as keyof typeof colors] as string | undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default function FilterChips({
  selectedTags,
  selectedPillars,
  selectedEnergyLevels,
  onTagToggle,
  onPillarToggle,
  onEnergyToggle,
  onClearAll,
}: FilterChipsProps) {
  const hasAnyFilters =
    selectedTags.length > 0 ||
    selectedPillars.length > 0 ||
    selectedEnergyLevels.length > 0;

  return (
    <div className="bg-white rounded-xl border-3 border-[#111111] p-5 mb-6 shadow-[4px_4px_0px_0px_#111111]">
      {hasAnyFilters && (
        <div className="flex justify-end mb-4">
          <button
            onClick={onClearAll}
            className="text-sm font-bold uppercase tracking-wider text-[#E53935] hover:text-[#111111] transition-colors underline underline-offset-4"
          >
            Clear all
          </button>
        </div>
      )}

      <ChipGroup
        title="Tags"
        chips={ALL_TAGS}
        selectedValues={selectedTags}
        onToggle={(tag) => onTagToggle(tag as Tag)}
        colors={TAG_COLORS}
      />

      <ChipGroup
        title="Pillars"
        chips={ALL_PILLARS}
        selectedValues={selectedPillars}
        onToggle={(pillar) => onPillarToggle(pillar as Pillar)}
        colors={PILLAR_COLORS}
      />

      <ChipGroup
        title="Energy"
        chips={ALL_ENERGY_LEVELS}
        selectedValues={selectedEnergyLevels}
        onToggle={(level) => onEnergyToggle(level as number)}
        colors={ENERGY_COLORS}
      />
    </div>
  );
}
