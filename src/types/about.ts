export interface SocialLink {
  platform: string; // e.g. "instagram", "twitter", "facebook", "linkedin"
  url: string;      // e.g. "https://www.instagram.com/playrevolution"
}

export interface AboutPageData {
  organisationName: string;
  description: string;
  socialLinks: SocialLink[];
  body: string; // raw markdown body from the file (not parsed to HTML)
}
