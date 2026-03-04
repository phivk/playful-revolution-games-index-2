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

    const instagramPosts: string[] = Array.isArray(data.instagramPosts)
      ? data.instagramPosts.filter((url): url is string => typeof url === 'string')
      : [];

    return {
      title:
        typeof data.title === 'string' && data.title.trim()
          ? data.title.trim()
          : 'Playful Revolution',
      socialLinks,
      instagramPosts,
      body: content.trim(),
    };
  } catch (err) {
    console.error('Failed to load about page:', err);
    return null;
  }
}
