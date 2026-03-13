"use client";

import { Brain, MessageCircle, Footprints } from "lucide-react";
import { Pillar } from "@/types/game";
import { type ComponentType, type SVGProps } from "react";

const PILLAR_CONFIG: Record<
  Pillar,
  { color: string; Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }> }
> = {
  intellectual: { color: "var(--color-deep-blue)", Icon: Brain },
  social: { color: "var(--color-revolution-red)", Icon: MessageCircle },
  physical: { color: "var(--color-play-green)", Icon: Footprints },
};

interface PillarChipProps {
  pillar: Pillar;
  selected?: boolean;
  onClick?: () => void;
  iconOnly?: boolean;
}

export default function PillarChip({ pillar, selected, onClick, iconOnly }: PillarChipProps) {
  const { color, Icon } = PILLAR_CONFIG[pillar];
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  if (iconOnly) {
    return (
      <span
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-white"
        style={{ backgroundColor: color }}
        title={pillar}
      >
        <Icon size={16} />
      </span>
    );
  }

  const Tag = isInteractive ? "button" : "span";

  return (
    <Tag
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg font-bold uppercase tracking-wider transition-all duration-100 ${
        isInteractive
          ? "border-3 border-foreground transform hover:scale-105 active:scale-95 min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? `text-white${isInteractive ? " shadow-brutal" : ""}`
          : "bg-transparent text-foreground hover:border-revolution-red hover:text-revolution-red"
      }`}
      style={isActive ? { backgroundColor: color } : undefined}
      title={pillar}
    >
      <Icon size={16} />
      {pillar}
    </Tag>
  );
}
