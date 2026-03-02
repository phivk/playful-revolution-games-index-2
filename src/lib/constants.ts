import type { Pillar } from '@/types/game';

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
