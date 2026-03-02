"use client";

import { Tag } from "@/types/game";

const TAG_CONFIG: Record<Tag, { bg: string; text: string }> = {
  theatre: { bg: "#E53935", text: "white" },
  collaborative: { bg: "#43A047", text: "white" },
  movement: { bg: "#FDD835", text: "#111111" },
  circle: { bg: "#1E3A8A", text: "white" },
  ball: { bg: "#E53935", text: "white" },
  table: { bg: "#1E3A8A", text: "white" },
  competitive: { bg: "#1E3A8A", text: "white" },
  social: { bg: "#E53935", text: "white" },
};

interface TagChipProps {
  tag: Tag;
  selected?: boolean;
  onClick?: () => void;
  flat?: boolean;
}

export default function TagChip({ tag, selected, onClick, flat }: TagChipProps) {
  const { bg, text } = TAG_CONFIG[tag];
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  const Element = isInteractive ? "button" : "span";

  return (
    <Element
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider transition-all duration-100 ${
        flat ? "border-0" : "border-3 border-[#111111]"
      } ${
        isInteractive
          ? "transform hover:scale-105 active:scale-95 min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? flat ? "" : "shadow-[3px_3px_0px_0px_#111111]"
          : "bg-transparent text-[#111111] hover:border-[#E53935] hover:text-[#E53935]"
      }`}
      style={
        isActive ? { backgroundColor: bg, color: text } : undefined
      }
      title={tag}
    >
      {tag}
    </Element>
  );
}
