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
  resources: string[];
}
