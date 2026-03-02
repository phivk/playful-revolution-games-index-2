"use client";

import { X } from "lucide-react";
import EnergyChip from "@/components/EnergyChip";
import PillarChip from "@/components/PillarChip";
import TagChip from "@/components/TagChip";
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

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
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
      <div className="mb-6">
        <SectionHeader title="Tags" count={selectedTags.length} />
        <div className="flex flex-wrap gap-3">
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

      <div className="mb-6">
        <SectionHeader title="Pillars" count={selectedPillars.length} />
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
        <SectionHeader title="Energy" count={selectedEnergyLevels.length} />
        <div className="flex items-end gap-3">
          <div className="flex flex-wrap gap-3">
            {ALL_ENERGY_LEVELS.map((level) => (
              <EnergyChip
                key={level}
                level={level}
                selected={selectedEnergyLevels.includes(level)}
                onClick={() => onEnergyToggle(level)}
              />
            ))}
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
