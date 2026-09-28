export type Tag =
  | 'theatre'
  | 'collaborative'
  | 'movement'
  | 'circle'
  | 'ball'
  | 'table'
  | 'competitive'
  | 'social';

export type Pillar = 'intellectual' | 'social' | 'physical';

export interface Game {
  slug: string;
  title: string;
  description: string;
  body: string;
  tags: Tag[];
  pillars: Pillar[];
  /** Energy level 1–3 (Low, Medium, High). */
  energy: number;
  duration: number;
  /** Minimum number of players, if the game has one. */
  minPlayers?: number;
  /** Maximum number of players, if the game has one. */
  maxPlayers?: number;
  resources: string[];
}

/** Human-readable player range, e.g. "2–8", "4+", "up to 6"; null when unrestricted. */
export function formatPlayers(min?: number, max?: number): string | null {
  if (min && max) return min === max ? `${min}` : `${min}–${max}`;
  if (min) return `${min}+`;
  if (max) return `up to ${max}`;
  return null;
}
