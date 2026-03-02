import Link from 'next/link';
import { Game, Pillar } from '@/types/game';
import EnergyBars from '@/components/EnergyBars';

interface GameCardProps {
  game: Game;
  inPlaylist?: boolean;
  onAddToPlaylist?: () => void;
  onRemoveFromPlaylist?: () => void;
}

const pillarColors: Record<Pillar, string> = {
  intellectual: 'bg-[#1E3A8A] text-white',
  social: 'bg-[#E53935] text-white',
  physical: 'bg-[#43A047] text-white',
};

const pillarIcons: Record<Pillar, string> = {
  intellectual: '🧠',
  social: '💬',
  physical: '🏃',
};

const tagColors: Record<string, string> = {
  theatre: 'bg-[#E53935] text-white',
  collaborative: 'bg-[#43A047] text-white',
  movement: 'bg-[#FDD835] text-[#111111]',
  circle: 'bg-[#1E3A8A] text-white',
  ball: 'bg-[#E53935] text-white',
  table: 'bg-[#1E3A8A] text-white',
  competitive: 'bg-[#1E3A8A] text-white',
  social: 'bg-[#E53935] text-white',
};

export default function GameCard({
  game,
  inPlaylist = false,
  onAddToPlaylist,
  onRemoveFromPlaylist,
}: GameCardProps) {
  const hasPlaylistActions =
    typeof onAddToPlaylist === 'function' || typeof onRemoveFromPlaylist === 'function';

  return (
    <Link
      href={`/game/${game.slug}`}
      className={`block bg-white rounded-xl border-3 border-[#111111] p-5 hover:border-[#E53935] hover:shadow-[4px_4px_0px_0px_#E53935] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 ${inPlaylist ? 'ring-2 ring-[#43A047] ring-offset-2' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-2xl font-display font-bold text-[#111111] uppercase tracking-wide flex-1 min-w-0">
          {game.title}
        </h3>
        {hasPlaylistActions && (
          <span
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (inPlaylist) {
                onRemoveFromPlaylist?.();
              } else {
                onAddToPlaylist?.();
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (inPlaylist) onRemoveFromPlaylist?.();
                else onAddToPlaylist?.();
              }
            }}
            className={`shrink-0 text-sm font-bold px-3 py-1.5 rounded-lg border-2 border-[#111111] uppercase tracking-wide ${
              inPlaylist
                ? 'bg-[#43A047] text-white'
                : 'bg-[#FAFAF7] text-[#111111] hover:bg-gray-200'
            }`}
          >
            {inPlaylist ? 'In playlist' : 'Add to playlist'}
          </span>
        )}
      </div>

      <p className="text-base text-gray-700 mb-4 line-clamp-2 font-medium">
        {game.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {game.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${tagColors[tag] ?? 'bg-gray-200 text-gray-800'}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t-2 border-gray-200 pt-4 min-w-0">
        <div className="flex flex-wrap gap-2 min-w-0 flex-1">
          {game.pillars.map((pillar) => (
            <span
              key={pillar}
              className={`text-sm px-3 py-2 rounded-lg font-bold border-2 border-[#111111] ${pillarColors[pillar]}`}
              title={pillar}
            >
              {pillarIcons[pillar]} {pillar}
            </span>
          ))}
        </div>

        <div className="shrink-0" title={`Energy: ${game.energy}`}>
          <EnergyBars
            level={(game.energy as 1 | 2 | 3) || 1}
            size="md"
          />
        </div>
      </div>
    </Link>
  );
}
