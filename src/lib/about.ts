import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import type { AboutPageData, SocialLink } from '@/types/about';

const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md');

export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const raw = await readFile(ABOUT_FILE, 'utf-8');
    const { data, content } = matter(raw);

    const socialLinks: SocialLink[] = Array.isArray(data.socialLinks)
      ? data.socialLinks
          .filter(
            (link): link is { platform: string; url: string } =>
              typeof link === 'object' &&
              link !== null &&
              typeof link.platform === 'string' &&
              typeof link.url === 'string'
          )
          .map((link) => ({ platform: link.platform, url: link.url }))
      : [];

    return {
      organisationName:
        typeof data.organisationName === 'string' && data.organisationName.trim()
          ? data.organisationName.trim()
          : 'Playful Revolution',
      description: typeof data.description === 'string' ? data.description.trim() : '',
      socialLinks,
      body: content.trim(),
    };
  } catch (err) {
    console.error('Failed to load about page:', err);
    return null;
  }
}
