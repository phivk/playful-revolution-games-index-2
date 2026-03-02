"use client";

import EnergyBars from "@/components/EnergyBars";
import { X } from "lucide-react";
import PillarChip from "@/components/PillarChip";
import { Pillar, Tag } from "@/types/game";

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
  "theatre",
  "collaborative",
  "movement",
  "circle",
  "ball",
  "table",
  "competitive",
  "social",
];

const ALL_PILLARS: Pillar[] = ["intellectual", "social", "physical"];

const ALL_ENERGY_LEVELS = [1, 2, 3] as const;

const TAG_COLORS: Record<string, string> = {
  theatre: "#E53935",
  collaborative: "#43A047",
  movement: "#FDD835",
  circle: "#1E3A8A",
  ball: "#E53935",
  table: "#1E3A8A",
  competitive: "#1E3A8A",
  social: "#E53935",
};

function Chip({
  label,
  selected,
  onClick,
  color,
  pill = false,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
  pill?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-bold uppercase tracking-wider transition-all duration-100 transform hover:scale-105 active:scale-95 min-h-[44px] ${
        pill ? "px-3 py-1 rounded-full text-xs" : "px-4 py-2 rounded-lg text-sm"
      } ${
        selected
          ? "text-white shadow-[3px_3px_0px_0px_#111111] border-3 border-[#111111]"
          : "bg-transparent border-3 border-[#111111] text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
      }`}
      style={
        selected && color
          ? { backgroundColor: color, borderColor: "#111111" }
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
  pill = false,
}: {
  title: string;
  chips: readonly string[] | readonly number[];
  selectedValues: (string | number)[];
  onToggle: (value: string | number) => void;
  colors?: Record<string, string> | Record<number, string>;
  pill?: boolean;
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
            pill={pill}
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
      <ChipGroup
        title="Tags"
        chips={ALL_TAGS}
        selectedValues={selectedTags}
        onToggle={(tag) => onTagToggle(tag as Tag)}
        colors={TAG_COLORS}
        pill
      />

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-base font-display font-bold text-[#111111] uppercase tracking-wider">
            Pillars
          </h3>
          {selectedPillars.length > 0 && (
            <span className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
              {selectedPillars.length}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {ALL_PILLARS.map((pillar) => (
            <PillarChip
              key={pillar}
              pillar={pillar}
              selected={selectedPillars.includes(pillar)}
              onClick={() => onPillarToggle(pillar)}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="text-base font-display font-bold text-[#111111] uppercase tracking-wider">
            Energy
          </h3>
          {selectedEnergyLevels.length > 0 && (
            <span className="bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full">
              {selectedEnergyLevels.length}
            </span>
          )}
        </div>
        <div className="flex items-end gap-3">
          <div className="flex flex-wrap gap-3">
            {ALL_ENERGY_LEVELS.map((level) => {
              const selected = selectedEnergyLevels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => onEnergyToggle(level)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 font-bold uppercase tracking-wider text-sm transition-all duration-100 transform hover:scale-105 active:scale-95 min-h-[44px] ${
                    selected
                      ? "bg-[#FDD835] text-[#111111] shadow-[3px_3px_0px_0px_#111111] border-3 border-[#111111]"
                      : "bg-transparent border-3 border-[#111111] text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
                  }`}
                >
                  <EnergyBars level={level as 1 | 2 | 3} size="md" />
                </button>
              );
            })}
          </div>
          <button
            onClick={onClearAll}
            className={`ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap text-[#E53935] hover:ring-2 hover:ring-[#E53935] transition-all ${hasAnyFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <X size={14} strokeWidth={3} />
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
