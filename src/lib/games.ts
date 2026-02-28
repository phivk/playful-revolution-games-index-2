import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import { Game, Tag, Pillar } from '@/types/game';

const TAGS: Tag[] = [
  'theatre',
  'collaborative',
  'movement',
  'circle',
  'ball',
  'table',
  'competitive',
  'social',
];
const PILLARS: Pillar[] = ['intellectual', 'social', 'physical'];

function isTag(s: string): s is Tag {
  return TAGS.includes(s as Tag);
}
function isPillar(s: string): s is Pillar {
  return PILLARS.includes(s as Pillar);
}

function ensureStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((v) => {
    if (typeof v === 'string') return v;
    if (typeof v === 'object' && v !== null) {
      if ('tag' in v) return String((v as { tag: string }).tag);
      if ('resource' in v) return String((v as { resource: string }).resource);
    }
    return String(v);
  });
}

function ensureResources(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => {
      if (typeof v === 'string') return v;
      if (typeof v === 'object' && v !== null && 'resource' in v) return String((v as { resource: string }).resource);
      return String(v);
    });
  }
  return [];
}

function clampEnergy(n: number): number {
  const v = Number(n);
  if (Number.isNaN(v)) return 3;
  return Math.min(5, Math.max(1, Math.round(v)));
}

/** Derive short description from body: first paragraph, markdown stripped. */
function deriveDescription(body: string, explicit?: string): string {
  if (typeof explicit === 'string' && explicit.trim()) return explicit.trim();
  const trimmed = body.trim();
  const firstBlock = trimmed.split(/\n\n+/)[0] ?? trimmed;
  return firstBlock
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#+\s*/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
}

function normalizeFrontmatter(data: Record<string, unknown>, content: string): Game {
  const slug = typeof data.slug === 'string' ? data.slug : '';
  const title = typeof data.title === 'string' ? data.title : 'Untitled';
  const rawTags = ensureStringArray(data.tags);
  const tags = rawTags.map((t) => t.toLowerCase()).filter(isTag);
  const rawPillars = ensureStringArray(data.pillars);
  const pillars = rawPillars.map((p) => p.toLowerCase()).filter(isPillar);
  const energy = clampEnergy(Number(data.energy));
  const duration = typeof data.duration === 'number' ? data.duration : Number(data.duration) || 0;
  const resources = ensureResources(data.resources);
  const description = deriveDescription(content, data.description as string | undefined);

  return {
    slug,
    title,
    description,
    body: content.trim(),
    tags,
    pillars,
    energy,
    duration,
    resources,
  };
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'games');

export async function getGames(): Promise<Game[]> {
  const dir = await readdir(CONTENT_DIR);
  const mdFiles = dir.filter((f) => f.endsWith('.md'));
  const games: Game[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = await readFile(filePath, 'utf-8');
    const { data, content } = matter(raw);
    games.push(normalizeFrontmatter(data as Record<string, unknown>, content));
  }

  return games.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const games = await getGames();
  return games.find((g) => g.slug === slug) ?? null;
}
