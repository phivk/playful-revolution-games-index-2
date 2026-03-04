# Phase 5: About Page - Research

**Researched:** 2026-03-04
**Domain:** Next.js static export with Decap CMS singleton content management
**Confidence:** HIGH

## Summary

Phase 5 adds a CMS-managed about page with organization info and social media links. The technical approach mirrors the existing games catalog pattern: static markdown content loaded at build time via gray-matter parsing. The key implementation pattern is Decap CMS **file collection** (singleton) instead of folder collection, enabling a single `/content/about.md` file to store organization name, description, and social links in YAML frontmatter. No new npm dependencies are required—the existing stack (Next.js 16.1.6, gray-matter, Tailwind CSS, Decap CMS via CDN) is sufficient. The primary constraint is that Decap CMS file collections require the markdown file to exist in Git before editors can manage it; this is a prerequisite, not a blocking issue.

**Primary recommendation:** Create `/content/about.md` and commit to Git first, then add the Decap CMS file collection configuration. Use a `getAboutPage()` data loader mirroring `getGames()`, and render as a server component to keep content static and build predictable.

---

## User Constraints

No CONTEXT.md exists for this phase—constraints come from REQUIREMENTS.md and project decisions in STATE.md:

### Locked Decisions
- About page content managed via Decap CMS (no custom backend or admin UI)
- Social media links grouped with about page (same CMS file, same phase)
- Static export architecture maintained (no server-side API calls at runtime)
- Navigation link to about page added to header/navigation

### Claude's Discretion
- Exact page layout and component structure
- Social media link icon library (Lucide React already available)
- Newsletter signup form placement (may extend to Phase 6)

### Deferred to Phase 6
- Instagram feed preview (INST-01) — requires separate third-party widget research
- Sender.net newsletter signup form (NWSL-01) — requires Sender.net account setup and testing

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ABUT-01 | Visitor can view short descriptive text about Playful Revolution on the about page | Server component renders content from `/content/about.md` frontmatter + body; gray-matter parsing handles markdown-to-HTML |
| ABUT-02 | Admin can edit the about page text via Decap CMS | Decap CMS file collection configuration in `public/admin/config.yml`; requires about.md file pre-existence in Git |
| ABUT-03 | Visitor can view the organisation name on the about page | Frontmatter field in about.md (`organisationName: "Playful Revolution"`); rendered in server component |
| ABUT-04 | Admin can edit the organisation name via Decap CMS | Decap CMS string widget for organisation name field in file collection config |
| SOCL-01 | Visitor can click through to social media profiles via links on the about page | Server component renders links from social media list in frontmatter; Lucide React icons for platform identification |
| SOCL-02 | Admin can add, edit, and remove social media links (platform + URL) via Decap CMS | Decap CMS list widget with nested fields (platform: select, url: string); frontmatter stores `socialLinks: [{platform: "twitter", url: "..."}, ...]` |
| SOCL-03 | Visitor can navigate to the about page from the site navigation | NavBar component updated to include About link; routing via `/about` page directory |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Static export with React 19 and App Router | Already in project; static export (`output: 'export'`) proven in v1.0; App Router eliminates file-based routing complexity |
| React | 19.2.3 | Component framework | Already in project; client components for interactive elements, server components for static content |
| Decap CMS | via CDN | Git-based content management (GitHub backend) | Already integrated in v1.0; file collections enable singleton page pattern; no npm install needed |
| gray-matter | 4.0.3 | YAML frontmatter + markdown parsing | Already in project (used for games); parses about.md metadata and content |
| Tailwind CSS | 4.x | Utility-first CSS | Already styling entire site; about page uses same design system |
| Lucide React | 0.576.0 | Icon library for social media links | Already in project; provides SVG icons for all major platforms |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Next.js Image | built-in | Optimized image component | If about page includes hero image (optional enhancement; defer if possible) |
| React Markdown | 10.1.0 | Markdown-to-HTML in browser | Fallback if about.md body contains complex markdown; gray-matter already handles basic parsing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Decap CMS file collections | Custom JSON editor (custom-built UI) | File collections are zero-code, battle-tested; custom editors add maintenance burden with zero upside |
| gray-matter for parsing | Front Matter library or YAML parser | gray-matter is purpose-built for markdown + YAML; alternatives require more glue code |
| Server components | Client-side data fetching (fetch in useEffect) | Server components keep static content at build time; client-side fetching would require runtime API and defeats static export benefits |

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (NavBar, Footer)
│   ├── page.tsx                      # Home (games list)
│   ├── about/
│   │   └── page.tsx                  # About page server component
│   ├── game/
│   │   └── [slug]/page.tsx           # Game detail (existing)
│   └── admin/
│       └── page.tsx                  # Decap CMS admin (existing)
├── components/
│   ├── NavBar.tsx                    # Updated to include About link
│   ├── SocialLinks.tsx               # NEW: render social media links
│   └── ...                           # (existing components)
├── lib/
│   ├── games.ts                      # Existing games loader
│   └── about.ts                      # NEW: about page loader (mirrors games.ts)
└── types/
    ├── game.ts                       # Existing
    └── about.ts                      # NEW: AboutPage interface

content/
├── games/                            # Existing folder collection
│   ├── game-1.md
│   └── ...
└── about.md                          # NEW: file collection (singleton)

public/admin/
└── config.yml                        # Updated CMS config with file collection
```

### Pattern 1: File-Based Content Loader (Singleton)

**What:** A data loading function that reads a single markdown file with YAML frontmatter, parses metadata and body separately, and exports a TypeScript interface.

**When to use:** When you need one authoritative source of static content (about page, settings page, policy page, etc.) that doesn't scale to multiple items.

**Example:**

```typescript
// src/lib/about.ts
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export interface AboutPage {
  organisationName: string;
  description: string;  // from frontmatter
  body: string;         // from markdown content
  socialLinks: Array<{
    platform: string;   // e.g., "twitter", "instagram", "facebook"
    url: string;        // e.g., "https://twitter.com/playrevolution"
  }>;
}

const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md');

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const raw = await readFile(ABOUT_FILE, 'utf-8');
    const { data, content } = matter(raw);

    return {
      organisationName: data.organisationName || 'Playful Revolution',
      description: data.description || '',
      body: content.trim(),
      socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
    };
  } catch (err) {
    console.error('Failed to load about page:', err);
    return null;
  }
}
```

### Pattern 2: Decap CMS File Collection Configuration

**What:** YAML configuration that tells Decap CMS to manage a single file (not a folder of files) and defines the fields for editing.

**When to use:** When you have one file that needs admin editing (singleton pattern).

**Example configuration (add to public/admin/config.yml):**

```yaml
collections:
  - name: "about"
    label: "About Page"
    file: "content/about.md"  # KEY: single file, not a folder
    slug: "{{slug}}"
    fields:
      - { label: "Organisation Name", name: "organisationName", widget: "string" }
      - { label: "Description (short)", name: "description", widget: "text" }
      - label: "Social Links"
        name: "socialLinks"
        widget: "list"
        fields:
          - { label: "Platform", name: "platform", widget: "select", options: ["twitter", "instagram", "facebook"] }
          - { label: "URL", name: "url", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Pattern 3: Server Component Rendering Static Content

**What:** An async React component that loads data at build time and renders HTML, no client-side data fetching.

**When to use:** For static content where you want fast page load and avoid hydration mismatches.

**Example:**

```typescript
// src/app/about/page.tsx
import { getAboutPage } from '@/lib/about';
import SocialLinks from '@/components/SocialLinks';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Playful Revolution Games',
  description: 'Learn about Playful Revolution and how to connect with us.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>About page not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-revolution-paper">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-revolution-red mb-4">
          {about.organisationName}
        </h1>
        <p className="text-xl text-gray-700 mb-8">{about.description}</p>
        <article className="prose prose-lg mb-12">
          <div>{about.body}</div>
        </article>
        {about.socialLinks.length > 0 && (
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-4">Connect with Us</h2>
            <SocialLinks links={about.socialLinks} />
          </section>
        )}
      </div>
    </main>
  );
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Parsing YAML + markdown | Custom regex parser | gray-matter (already in project) | gray-matter handles edge cases; hand-rolled parsers break on real-world content |
| Building a CMS UI | Custom form builder | Decap CMS (already integrated) | Decap handles git sync, authentication, conflict resolution; custom builders add 2-4 weeks of work |
| Social media icon selection | Custom SVG files | Lucide React (already in project) | Consistent style, auto-updates, no maintenance |
| Responsive about page layout | Custom CSS breakpoints | Tailwind CSS (already styling site) | Consistent with rest of site design; pre-tested responsive behavior |

---

## Common Pitfalls

### Pitfall 1: Decap CMS File Pre-Existence Requirement

**What goes wrong:** You configure a file collection in `public/admin/config.yml` without first creating `/content/about.md`, deploy, and the editor shows "No entries to edit" because Decap can't initialize the editor.

**How to avoid:**
1. Create `/content/about.md` with starter content
2. Commit to Git
3. Then add the Decap CMS file collection configuration
4. Deploy and verify editors can access the About page

**Warning signs:** File collection doesn't appear in CMS UI; "Create new" button is disabled

### Pitfall 2: Frontmatter Type Mismatches

**What goes wrong:** Field type in Decap CMS config (list) doesn't match what's stored in YAML (string). When `getAboutPage()` tries to use `.map()` on `data.socialLinks`, it fails because it's not an array.

**How to avoid:**
- In `getAboutPage()`, validate types before using:
  ```typescript
  const socialLinks = Array.isArray(data.socialLinks) ? data.socialLinks : [];
  ```
- Use explicit widget types in Decap config to constrain input
- Test CMS editor with sample data

**Warning signs:** Errors like "Cannot read property 'map' of undefined"; missing links on about page

### Pitfall 3: About Page Not Appearing in Navigation

**What goes wrong:** About page exists at `/about` but there's no way to reach it from home. NavBar doesn't include an About link.

**How to avoid:**
- Update NavBar.tsx to include About link before Phase 5 launch
- Test navigation on all screen sizes
- Test that About link is visible on mobile

**Warning signs:** About link missing from header; link hidden on mobile

### Pitfall 4: Social Media Links Not Validating URLs

**What goes wrong:** An editor enters an invalid URL (typo, missing `http://`, etc.), the link renders but clicking does nothing.

**How to avoid:**
- In Decap CMS config, add pattern validation:
  ```yaml
  - { label: "URL", name: "url", widget: "string", pattern: ["^https?://", "Must start with http://"] }
  ```
- In `getAboutPage()`, filter out invalid URLs
- Test with intentionally broken URLs

### Pitfall 5: Missing Error Handling

**What goes wrong:** `/content/about.md` doesn't exist, `getAboutPage()` throws an error, the entire about page route returns 500 error instead of gracefully showing a fallback.

**How to avoid:**
- Wrap file read in try-catch and return null on error
- In about page component, check for null and render fallback UI
- Test by temporarily removing the about.md file

---

## Code Examples

### Example 1: Data Loader (Mirrors Existing Games Pattern)

```typescript
// src/lib/about.ts
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export interface AboutPageData {
  organisationName: string;
  description: string;
  socialLinks: Array<{ platform: string; url: string }>;
  body: string;
}

const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md');

export async function getAboutPage(): Promise<AboutPageData | null> {
  try {
    const raw = await readFile(ABOUT_FILE, 'utf-8');
    const { data, content } = matter(raw);

    return {
      organisationName: data.organisationName || 'Playful Revolution',
      description: data.description || '',
      socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      body: content.trim(),
    };
  } catch (err) {
    console.error('Failed to load about page:', err);
    return null;
  }
}
```

### Example 2: Server Component with Error Handling

```typescript
// src/app/about/page.tsx
import { getAboutPage } from '@/lib/about';
import SocialLinks from '@/components/SocialLinks';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Playful Revolution Games',
  description: 'Learn about Playful Revolution and how to connect with us.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return (
      <main className="min-h-screen px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">About page not available</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-revolution-paper">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-revolution-red mb-4">
          {about.organisationName}
        </h1>
        <p className="text-xl text-gray-700 mb-12">{about.description}</p>
        <article className="prose max-w-none mb-12">
          <div>{about.body}</div>
        </article>
        {about.socialLinks.length > 0 && (
          <section className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Connect with Us</h2>
            <SocialLinks links={about.socialLinks} />
          </section>
        )}
      </div>
    </main>
  );
}
```

### Example 3: Social Links Component

```typescript
// src/components/SocialLinks.tsx
import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

interface SocialLink {
  platform: string;
  url: string;
}

const PLATFORM_ICONS = {
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  email: Mail,
};

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link) => {
        const IconComponent = PLATFORM_ICONS[link.platform as keyof typeof PLATFORM_ICONS];
        if (!IconComponent) return null;

        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-revolution-red text-white rounded hover:opacity-80"
          >
            <IconComponent size={20} />
          </a>
        );
      })}
    </div>
  );
}
```

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Not configured (no test runner detected) |
| Config file | None |
| Quick run command | `npm run lint` (ESLint only) |
| Full suite command | Not applicable |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Status |
|--------|----------|-----------|--------|
| ABUT-01 | Visitor can view about page text | Manual visual | Manual only |
| ABUT-02 | Admin can edit via CMS | Manual workflow | Manual only |
| ABUT-03 | Visitor can view org name | Manual visual | Manual only |
| ABUT-04 | Admin can edit org name | Manual workflow | Manual only |
| SOCL-01 | Visitor can click social links | Manual interaction | Manual only |
| SOCL-02 | Admin can manage social links | Manual workflow | Manual only |
| SOCL-03 | Visitor can navigate to about | Manual interaction | Manual only |

### Wave 0 Gaps

- No test framework installed
- Manual QA verification required before phase gate

---

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 Documentation — Static export, server components, Script component
- Decap CMS Official Documentation — File collections, configuration reference
- gray-matter NPM — YAML + markdown parsing (already in project)
- Existing Codebase (src/lib/games.ts, public/admin/config.yml) — Reference implementations

### Secondary (MEDIUM confidence)
- Project research files (.planning/research/) — Earlier v1.1 research synthesis
- Playful Revolution Design Brief — Brand colors, typography, visual style

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — All verified in v1.0, official docs confirm compatibility
- Architecture: HIGH — Mirrors existing games.ts pattern exactly
- Pitfalls: HIGH — From Decap CMS docs and Next.js static export guidelines

**Research date:** 2026-03-04
**Valid until:** 2026-04-03 (30 days)
**Critical dependencies:** Next.js 16.1.6, React 19.2.3, gray-matter 4.0.3
