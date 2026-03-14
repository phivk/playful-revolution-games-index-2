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
      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-100 ${
        isInteractive
          ? "border-3 border-foreground min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? `bg-duration-purple text-white${isInteractive ? " shadow-brutal" : ""}`
          : "bg-transparent text-foreground hover:border-revolution-red hover:text-revolution-red"
      }`}
      title={`Duration: ${duration} min`}
    >
      <Clock size={16} />
      {duration} min
    </Element>
  );
}
