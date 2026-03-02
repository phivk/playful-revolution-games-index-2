import { Zap } from "lucide-react";

interface EnergyBarsProps {
  level: 1 | 2 | 3;
  size?: "sm" | "md";
  className?: string;
}

const ICON_CLASS = {
  sm: "w-3 h-4 shrink-0",
  md: "w-5 h-6 shrink-0",
} as const;

export default function EnergyBars({
  level,
  size = "md",
  className = "",
}: EnergyBarsProps) {
  const iconClass = ICON_CLASS[size];

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <Zap
          key={i}
          className={`${iconClass} text-[#111111]`}
          strokeWidth={2}
          fill={level > i ? "#111111" : "white"}
        />
      ))}
    </span>
  );
}
