"use client";

import { Tag } from "@/types/game";

const TAG_CONFIG: Record<Tag, { bg: string; text: string }> = {
  theatre: { bg: "var(--color-revolution-red)", text: "white" },
  collaborative: { bg: "var(--color-play-green)", text: "white" },
  movement: { bg: "var(--color-joy-yellow)", text: "var(--foreground)" },
  circle: { bg: "var(--color-deep-blue)", text: "white" },
  ball: { bg: "var(--color-revolution-red)", text: "white" },
  table: { bg: "var(--color-deep-blue)", text: "white" },
  competitive: { bg: "var(--color-deep-blue)", text: "white" },
  social: { bg: "var(--color-revolution-red)", text: "white" },
};

interface TagChipProps {
  tag: Tag;
  selected?: boolean;
  onClick?: () => void;
}

export default function TagChip({ tag, selected, onClick }: TagChipProps) {
  const { bg, text } = TAG_CONFIG[tag];
  const isInteractive = typeof onClick === "function";
  const isActive = isInteractive ? !!selected : true;

  const Element = isInteractive ? "button" : "span";

  return (
    <Element
      {...(isInteractive ? { onClick, type: "button" as const } : {})}
      className={`inline-flex items-center text-xs px-3 py-2 rounded-full font-bold uppercase tracking-wider transition-all duration-100 ${
        isInteractive ? "border-3 border-foreground" : "border-0"
      } ${
        isInteractive
          ? "min-h-[44px] cursor-pointer"
          : ""
      } ${
        isActive
          ? isInteractive ? "shadow-brutal" : ""
          : "bg-transparent text-foreground hover:border-revolution-red hover:text-revolution-red"
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
