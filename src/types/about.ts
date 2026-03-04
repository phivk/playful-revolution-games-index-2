export interface SocialLink {
  platform: string; // e.g. "instagram", "twitter", "facebook", "linkedin"
  url: string;      // e.g. "https://www.instagram.com/playrevolution"
}

export interface AboutPageData {
  title: string;
  socialLinks: SocialLink[];
  instagramPosts: string[];
  body: string; // raw markdown body from the file (not parsed to HTML)
}
