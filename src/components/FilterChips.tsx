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
  chips: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  colors?: Record<string, string>;
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
        onToggle={(level) => onEnergyToggle(level as EnergyLevel)}
        colors={ENERGY_COLORS}
      />
    </div>
  );
}
