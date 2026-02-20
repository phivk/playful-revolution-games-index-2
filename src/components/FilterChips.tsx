'use client';

import { Tag, Pillar, EnergyLevel } from '@/types/game';

interface FilterChipsProps {
  selectedTags: Tag[];
  selectedPillars: Pillar[];
  selectedEnergyLevels: EnergyLevel[];
  onTagToggle: (tag: Tag) => void;
  onPillarToggle: (pillar: Pillar) => void;
  onEnergyToggle: (level: EnergyLevel) => void;
  onClearAll: () => void;
}

const ALL_TAGS: Tag[] = [
  'Social Spontaneity',
  'Group Circle Games',
  'Collaborative',
  'Competitive',
  'Ball Games',
  'Theatre Sports',
  'Movement',
  'Table Games',
];

const ALL_PILLARS: Pillar[] = ['Intellectual', 'Social', 'Physical'];

const ALL_ENERGY_LEVELS: EnergyLevel[] = ['Low', 'Medium', 'High'];

// Brand colors per design brief
const TAG_COLORS: Record<string, string> = {
  'Social Spontaneity': '#E53935', // Revolution Red
  'Group Circle Games': '#43A047', // Play Green
  Collaborative: '#FDD835', // Joy Yellow
  Competitive: '#1E3A8A', // Deep Blue
  'Ball Games': '#E53935',
  'Theatre Sports': '#43A047',
  Movement: '#FDD835',
  'Table Games': '#1E3A8A',
};

const PILLAR_COLORS: Record<Pillar, string> = {
  Intellectual: '#1E3A8A',
  Social: '#E53935',
  Physical: '#43A047',
};

const ENERGY_COLORS: Record<EnergyLevel, string> = {
  Low: '#1E3A8A',
  Medium: '#FDD835',
  High: '#E53935',
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
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150 transform hover:scale-105 active:scale-95 ${
        selected
          ? 'text-white shadow-md'
          : 'bg-transparent border-2 border-gray-400 text-gray-700 hover:border-gray-600'
      }`}
      style={
        selected && color
          ? { backgroundColor: color, borderColor: color }
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
  chips: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  colors?: Record<string, string>;
}) {
  const count = selectedValues.length;

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          {title}
        </h3>
        {count > 0 && (
          <span className="bg-[#111111] text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            selected={selectedValues.includes(chip)}
            onClick={() => onToggle(chip)}
            color={colors?.[chip]}
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      {hasAnyFilters && (
        <div className="flex justify-end mb-3">
          <button
            onClick={onClearAll}
            className="text-sm font-medium text-gray-500 hover:text-[#E53935] transition-colors underline underline-offset-2"
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
        onToggle={(level) => onEnergyToggle(level as EnergyLevel)}
        colors={ENERGY_COLORS}
      />
    </div>
  );
}
