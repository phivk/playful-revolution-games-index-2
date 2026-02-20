export type EnergyLevel = 'Low' | 'Medium' | 'High';

export type Tag = 
  | 'Social Spontaneity'
  | 'Group Circle Games'
  | 'Collaborative'
  | 'Competitive'
  | 'Ball Games'
  | 'Theatre Sports'
  | 'Movement'
  | 'Table Games';

export type Pillar = 'Intellectual' | 'Social' | 'Physical';

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: Tag[];
  pillars: Pillar[];
  energyLevel: EnergyLevel;
  materials: string[];
  setup: string;
  howToPlay: string[];
}
