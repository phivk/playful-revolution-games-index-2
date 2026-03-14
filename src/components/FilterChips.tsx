"use client";

import DurationChip from "@/components/DurationChip";
import EnergyChip from "@/components/EnergyChip";
import PillarChip from "@/components/PillarChip";
import TagChip from "@/components/TagChip";
import { Pillar, Tag } from "@/types/game";
import { X } from "lucide-react";

interface FilterChipsProps {
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

const ALL_DURATIONS = [5, 10, 15] as const;

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <h3 className="text-base font-display font-bold text-foreground uppercase tracking-wider">
        {title}
      </h3>
      {count > 0 && (
        <span className="bg-revolution-red text-white text-xs font-bold px-3 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

export default function FilterChips({
  selectedTags,
  selectedPillars,
  selectedEnergyLevels,
  selectedDurations,
  onTagToggle,
  onPillarToggle,
  onEnergyToggle,
  onDurationToggle,
  onClearAll,
}: FilterChipsProps) {
  const hasAnyFilters =
    selectedTags.length > 0 ||
    selectedPillars.length > 0 ||
    selectedEnergyLevels.length > 0 ||
    selectedDurations.length > 0;

  return (
    <div className="bg-white rounded-xl border-3 border-foreground p-4">
      <div className="mb-5">
        <SectionHeader title="Tags" count={selectedTags.length} />
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => (
            <TagChip
              key={tag}
              tag={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => onTagToggle(tag)}
            />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <SectionHeader title="Pillars" count={selectedPillars.length} />
        <div className="flex flex-wrap gap-2">
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

      <div className="mb-5">
        <SectionHeader title="Energy" count={selectedEnergyLevels.length} />
        <div className="flex flex-wrap gap-2">
          {ALL_ENERGY_LEVELS.map((level) => (
            <EnergyChip
              key={level}
              level={level}
              selected={selectedEnergyLevels.includes(level)}
              onClick={() => onEnergyToggle(level)}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <SectionHeader title="Duration" count={selectedDurations.length} />
        <div className="flex flex-wrap gap-2">
          {ALL_DURATIONS.map((duration) => (
            <DurationChip
              key={duration}
              duration={duration}
              selected={selectedDurations.includes(duration)}
              onClick={() => onDurationToggle(duration)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onClearAll}
        className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border-3 border-foreground hover:border-revolution-red hover:text-revolution-red text-sm font-bold uppercase tracking-wider text-foreground min-h-[44px] transition-all duration-100 ${hasAnyFilters ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <X size={14} strokeWidth={3} />
        Clear all
      </button>
    </div>
  );
}
