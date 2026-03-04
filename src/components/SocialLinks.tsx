import { Twitter, Instagram, Facebook, Linkedin, Youtube, Globe } from 'lucide-react';
import type { SocialLink } from '@/types/about';

const PLATFORM_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
};

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => {
        const IconComponent = PLATFORM_ICONS[link.platform.toLowerCase()] ?? Globe;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="flex items-center gap-2 px-4 py-2 bg-revolution-red text-white rounded-lg border-2 border-foreground hover-btn"
          >
            <IconComponent size={20} />
            <span className="capitalize text-sm font-medium">{link.platform}</span>
          </a>
        );
      })}
    </div>
  );
}
