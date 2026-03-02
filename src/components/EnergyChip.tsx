"use client";

import EnergyBars from "@/components/EnergyBars";

interface EnergyChipProps {
  level: 1 | 2 | 3;
  selected?: boolean;
  onClick?: () => void;
}

export default function EnergyChip({ level, selected, onClick }: EnergyChipProps) {
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  const Element = isInteractive ? "button" : "span";

  return (
    <Element
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm border-3 border-[#111111] transition-all duration-100 ${
        isInteractive
          ? "transform hover:scale-105 active:scale-95 min-h-[44px] cursor-pointer"
          : ""
      }       ${
        isActive
          ? "bg-[#FDD835] text-[#111111] shadow-[3px_3px_0px_0px_#111111]"
          : "bg-transparent text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
      }`}
      title={`Energy: ${level}`}
    >
      <EnergyBars level={level} size="md" />
    </Element>
  );
}
