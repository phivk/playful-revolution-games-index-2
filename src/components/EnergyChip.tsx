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
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-100 ${
        isInteractive
          ? "border-3 border-foreground min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? `bg-joy-yellow text-foreground${isInteractive ? " shadow-brutal" : ""}`
          : "bg-transparent text-foreground hover:border-revolution-red hover:text-revolution-red"
      }`}
      title={`Energy: ${level}`}
    >
      <EnergyBars level={level} size="md" />
    </Element>
  );
}
