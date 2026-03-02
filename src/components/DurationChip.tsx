"use client";

import { Clock } from "lucide-react";

interface DurationChipProps {
  duration: number;
  selected?: boolean;
  onClick?: () => void;
}

export default function DurationChip({ duration, selected, onClick }: DurationChipProps) {
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  const Element = isInteractive ? "button" : "span";

  return (
    <Element
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold uppercase tracking-wider text-sm border-3 border-[#111111] transition-all duration-100 ${
        isInteractive
          ? "transform hover:scale-105 active:scale-95 min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? "bg-[#8E24AA] text-white shadow-[3px_3px_0px_0px_#111111]"
          : "bg-transparent text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
      }`}
      title={`Duration: ${duration} min`}
    >
      <Clock size={16} />
      {duration} min
    </Element>
  );
}
