import { Users } from "lucide-react";
import { formatPlayers } from "@/types/game";

interface PlayersChipProps {
  minPlayers?: number;
  maxPlayers?: number;
}

export default function PlayersChip({ minPlayers, maxPlayers }: PlayersChipProps) {
  const label = formatPlayers(minPlayers, maxPlayers);
  if (!label) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold uppercase tracking-wider text-sm bg-deep-blue text-white"
      title={`Players: ${label}`}
    >
      <Users size={16} />
      {label} players
    </span>
  );
}
