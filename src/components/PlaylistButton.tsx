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
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inPlaylist) {
      onRemoveFromPlaylist();
    } else {
      onAddToPlaylist();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (inPlaylist) onRemoveFromPlaylist();
      else onAddToPlaylist();
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
          : 'bg-background text-foreground hover-icon'
      }`}
      aria-label={inPlaylist ? 'Remove from playlist' : 'Add to playlist'}
    >
      <svg
        className="playlist-icon-morph"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M7 1v12M1 7h12"
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
