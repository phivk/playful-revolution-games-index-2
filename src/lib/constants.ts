import type { Pillar } from '@/types/game';

export const PLUS_ICON_PATH = 'M7 1v12M1 7h12';
export const PLUS_ICON_SIZE = 14;
export const PLUS_ICON_VIEWBOX = '0 0 14 14';

export const PILLAR_COLORS: Record<Pillar, string> = {
  intellectual: 'var(--color-deep-blue)',
  social: 'var(--color-revolution-red)',
  physical: 'var(--color-play-green)',
};

export const PILLAR_LABELS: Record<Pillar, string> = {
  intellectual: 'Intellectual',
  social: 'Social',
  physical: 'Physical',
};
