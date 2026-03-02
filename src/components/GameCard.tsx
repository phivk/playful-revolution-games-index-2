import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Game } from '@/types/game';
import EnergyBars from '@/components/EnergyBars';
import PillarChip from '@/components/PillarChip';
import PlaylistButton from '@/components/PlaylistButton';
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
      className="block bg-white rounded-xl border-3 border-foreground p-5 hover-card hover:border-revolution-red"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-2xl font-display font-bold text-foreground uppercase tracking-wide flex-1 min-w-0">
          {game.title}
        </h3>
        {hasPlaylistActions && onAddToPlaylist && onRemoveFromPlaylist && (
          <PlaylistButton
            inPlaylist={inPlaylist}
            onAddToPlaylist={onAddToPlaylist}
            onRemoveFromPlaylist={onRemoveFromPlaylist}
          />
        )}
      </div>

      <p className="text-base text-gray-700 mb-4 line-clamp-2 font-medium">
        {game.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {game.tags.map((tag) => (
          <TagChip key={tag} tag={tag} flat />
        ))}
      </div>

      <div className="border-t-2 border-gray-200 pt-4 space-y-6">
        <div className="flex flex-wrap gap-2">
          {game.pillars.map((pillar) => (
            <PillarChip key={pillar} pillar={pillar} iconOnly />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div title={`Energy: ${game.energy}`}>
            <EnergyBars
              level={(game.energy as 1 | 2 | 3) || 1}
              size="md"
            />
          </div>
          {game.duration > 0 && (
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-foreground uppercase tracking-wider ml-auto">
              <Clock size={14} />
              {game.duration} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
