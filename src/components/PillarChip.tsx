"use client";

import { Brain, MessageCircle, Footprints } from "lucide-react";
import { Pillar } from "@/types/game";
import { type ComponentType, type SVGProps } from "react";

const PILLAR_CONFIG: Record<
  Pillar,
  { color: string; Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }> }
> = {
  intellectual: { color: "#1E3A8A", Icon: Brain },
  social: { color: "#E53935", Icon: MessageCircle },
  physical: { color: "#43A047", Icon: Footprints },
};

interface PillarChipProps {
  pillar: Pillar;
  selected?: boolean;
  onClick?: () => void;
}

export default function PillarChip({ pillar, selected, onClick }: PillarChipProps) {
  const { color, Icon } = PILLAR_CONFIG[pillar];
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  const Tag = isInteractive ? "button" : "span";

  return (
    <Tag
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg font-bold uppercase tracking-wider border-3 border-[#111111] transition-all duration-100 ${
        isInteractive
          ? "transform hover:scale-105 active:scale-95 min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? "text-white shadow-[3px_3px_0px_0px_#111111]"
          : "bg-transparent text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
      }`}
      style={isActive ? { backgroundColor: color } : undefined}
      title={pillar}
    >
      <Icon size={16} />
      {pillar}
    </Tag>
  );
}
