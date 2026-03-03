import { usePlaylistAnimation } from '@/contexts/PlaylistAnimationContext';
import { PLUS_ICON_PATH, PLUS_ICON_SIZE, PLUS_ICON_VIEWBOX } from '@/lib/constants';

interface PlaylistButtonProps {
  inPlaylist: boolean;
  onAddToPlaylist: () => void;
  onRemoveFromPlaylist: () => void;
}

export default function PlaylistButton({
  inPlaylist,
  onAddToPlaylist,
  onRemoveFromPlaylist,
}: PlaylistButtonProps) {
  const { triggerAddAnimation } = usePlaylistAnimation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inPlaylist) {
      onRemoveFromPlaylist();
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerAddAnimation(rect);
      onAddToPlaylist();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inPlaylist) {
        onRemoveFromPlaylist();
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        triggerAddAnimation(rect);
        onAddToPlaylist();
      }
    }
  };

  return (
    <span
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 border-foreground ${
        inPlaylist
          ? 'bg-playlist-amber text-foreground scale-110'
          : 'bg-background text-foreground hover:text-revolution-red hover:border-revolution-red active:scale-90'
      }`}
      aria-label={inPlaylist ? 'Remove from playlist' : 'Add to playlist'}
    >
      <svg
        className="playlist-icon-morph"
        width={PLUS_ICON_SIZE}
        height={PLUS_ICON_SIZE}
        viewBox={PLUS_ICON_VIEWBOX}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d={PLUS_ICON_PATH}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={inPlaylist ? 1 : 0}
        />
        <path
          d="M2 7.5L5.5 11L12 3"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={inPlaylist ? 0 : 1}
        />
      </svg>
    </span>
  );
}
