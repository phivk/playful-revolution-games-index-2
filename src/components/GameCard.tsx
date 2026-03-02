import Link from 'next/link';
import { Game } from '@/types/game';
import EnergyBars from '@/components/EnergyBars';
import PillarChip from '@/components/PillarChip';
import TagChip from '@/components/TagChip';

interface GameCardProps {
  game: Game;
  inPlaylist?: boolean;
  onAddToPlaylist?: () => void;
  onRemoveFromPlaylist?: () => void;
}

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
          <TagChip key={tag} tag={tag} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t-2 border-gray-200 pt-4 min-w-0">
        <div className="flex flex-wrap gap-2 min-w-0 flex-1">
          {game.pillars.map((pillar) => (
            <PillarChip key={pillar} pillar={pillar} />
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
