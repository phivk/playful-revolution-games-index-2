# Architecture Research: About Page with CMS Content & Newsletter

**Domain:** Next.js static export with Decap CMS singleton content and external embed integration
**Researched:** 2026-03-04
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     Next.js Static Export (HTML/CSS/JS)              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │   Home Page      │  │   About Page     │  │   Game Detail    │  │
│  │   (Games List)   │  │   (CMS Content)  │  │   (Game Content) │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │              │
│           └─────────────────────┴─────────────────────┘              │
│                            ↓                                         │
│                   ┌─────────────────────┐                            │
│                   │    Shared Layout    │                            │
│                   │ (NavBar, Footer)    │                            │
│                   └────────────┬────────┘                            │
│                                │                                     │
├────────────────────────────────┼─────────────────────────────────────┤
│                     Data Loading Layer                               │
│                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │  getGames()      │  │  getAboutPage()  │  │  getGameBySlug() │  │
│  │  (File System)   │  │  (File System)   │  │  (File System)   │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                     │                     │              │
├───────────┴─────────────────────┴─────────────────────┴──────────────┤
│                     Content Source                                    │
│                                                                       │
│  ┌──────────────────┐  ┌──────────────────┐                          │
│  │  /content/games/ │  │  /content/about/ │                          │
│  │  (Decap: folder) │  │  (Decap: file)   │                          │
│  └──────────────────┘  └──────────────────┘                          │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              GitHub Repository (git-based backend)           │   │
│  │  Decap CMS syncs changes → commits to content files          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│              Client-Side Interactivity (JavaScript)                  │
│                                                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Sender.net Embed Script (External)                          │   │
│  │  • Loaded via Script component with strategy="afterInteractive" │
│  │  • Renders form container on client                          │   │
│  │  • Handles form submission to Sender.net                     │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| About Page (`src/app/about/page.tsx`) | Server component rendering CMS content + newsletter section | Async function, loads data at build time |
| Newsletter Form (`src/components/NewsletterSignup.tsx`) | Client wrapper for Sender.net embed, handles external script loading | Client component with Script component |
| getAboutPage() (`src/lib/about.ts`) | Load and parse single about page markdown/JSON file | Uses gray-matter to parse frontmatter + content |
| Content Source (`/content/about.md` or `about.json`) | Single file managed by Decap CMS | Versioned in git, edited via CMS UI |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (NavBar, Footer, Providers)
│   ├── page.tsx                      # Home page (games list)
│   ├── about/
│   │   └── page.tsx                  # About page (CMS-managed + newsletter)
│   ├── game/
│   │   └── [slug]/
│   │       └── page.tsx              # Individual game detail
│   └── playlist/
│       └── page.tsx                  # Playlist view
├── components/
│   ├── NavBar.tsx                    # Navigation (add "About" link)
│   ├── Footer.tsx                    # Footer
│   ├── NewsletterSignup.tsx          # NEW: Client component with Sender.net embed
│   ├── GamesCatalog.tsx              # Games listing
│   └── [other components]/
├── lib/
│   ├── games.ts                      # Load game content from /content/games/
│   ├── about.ts                      # NEW: Load about page from /content/about.md (or .json)
│   └── constants.ts                  # Shared constants
├── types/
│   ├── game.ts                       # Game interface
│   └── about.ts                      # NEW: About page interface
└── contexts/
    ├── PlaylistContext.tsx           # Playlist state
    └── PlaylistAnimationContext.tsx  # Animation state

content/
├── games/                             # Existing: folder collection (multiple files)
│   ├── turtle-wushu.md
│   ├── ball-massage.md
│   └── [30+ game files]/
└── about.md (or about.json)          # NEW: file collection (single file)

public/
├── images/                           # Images uploaded via CMS
├── admin/
│   └── config.yml                    # Decap CMS config (add file collection for about)
└── [other assets]/
```

### Structure Rationale

- **`src/app/about/`:** New routing folder for about page, alongside existing game routes. Follows Next.js app directory conventions.
- **`src/components/NewsletterSignup.tsx`:** Isolates external script loading and form rendering logic. Client component prevents server-side script conflicts.
- **`src/lib/about.ts`:** Mirrors existing `games.ts` pattern. Handles file loading and parsing in one place, reusable across the app.
- **`src/types/about.ts`:** Mirrors existing `game.ts`. Keeps type definitions co-located with domain.
- **`content/about.md`:** Single file for about page. Not in a folder (unlike games/), managed as Decap CMS "file collection" instead of "folder collection."

## Architectural Patterns

### Pattern 1: File-Based Content with gray-matter Parsing

**What:** Parse markdown files with YAML frontmatter at build time. Content is loaded synchronously during build, not at runtime.

**When to use:** Static site generation where content doesn't change between deployments. Perfect for Decap CMS (git-based) since edits trigger rebuilds.

**Trade-offs:**
- ✓ Fast: No database queries, just file I/O during build
- ✓ Simple: Markdown is human-readable, version-controlled
- ✓ Works perfectly with static export
- ✗ Content updates require rebuild + redeploy
- ✗ Not suitable for high-frequency content changes

**Example:**
```typescript
// src/lib/about.ts
import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';

export interface AboutPage {
  title: string;
  organizationName: string;
  description: string;  // Short intro text
  body: string;         // Markdown content
  socialLinks: Array<{ platform: string; url: string }>;
}

const ABOUT_FILE = path.join(process.cwd(), 'content', 'about.md');

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const raw = await readFile(ABOUT_FILE, 'utf-8');
    const { data, content } = matter(raw);

    return {
      title: data.title || 'About',
      organizationName: data.organizationName || '',
      description: data.description || '',
      body: content.trim(),
      socialLinks: data.socialLinks || [],
    };
  } catch (error) {
    console.error('Failed to load about page:', error);
    return null;
  }
}
```

### Pattern 2: Server Components for Static Content + Client Components for Interactivity

**What:** Render static markdown as server component at build time. Wrap external embeds (like Sender.net) in client components for JavaScript execution.

**When to use:** Static content that needs client-side interactivity (forms, embeds, scripts). Avoids unnecessary JavaScript for text/layout.

**Trade-offs:**
- ✓ Minimal JavaScript bundle
- ✓ Server components render at build time (no client overhead)
- ✓ Client components only for interactive parts
- ✗ Slight complexity with mixed server/client boundaries
- ✗ Client state (form data) cannot be hydrated from server

**Example:**
```typescript
// src/app/about/page.tsx (Server Component)
import { getAboutPage } from '@/lib/about';
import NewsletterSignup from '@/components/NewsletterSignup';
import ReactMarkdown from 'react-markdown';

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return <div>About page not found</div>;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1>{about.title}</h1>
      <p className="font-bold text-lg">{about.organizationName}</p>

      <section className="mt-8">
        <ReactMarkdown>{about.body}</ReactMarkdown>
      </section>

      {/* Client Component: handles Sender.net script loading */}
      <NewsletterSignup />

      {/* Social links */}
      {about.socialLinks.length > 0 && (
        <footer className="mt-8">
          {about.socialLinks.map(link => (
            <a key={link.platform} href={link.url}>
              {link.platform}
            </a>
          ))}
        </footer>
      )}
    </main>
  );
}
```

### Pattern 3: Decap CMS File Collection (Singleton) vs Folder Collection

**What:** Decap CMS supports two collection types:
- **Folder collections:** Multiple files with same schema (games/)
- **File collections:** Individual files with unique schemas (about.md)

**When to use:**
- Folder: Repeating content items (blog posts, products, games)
- File: Singleton pages (about, settings, landing page, site config)

**Trade-offs:**
- ✓ File collection perfect for single-file content
- ✓ No need to create the file beforehand (myth—file MUST exist in repo)
- ✗ File must be committed to git repo before CMS can manage it
- ✗ Cannot use folder-like create/delete UI in CMS (only edit existing)

**Example config:**
```yaml
# public/admin/config.yml

collections:
  # Existing folder collection
  - name: "games"
    label: "Games"
    folder: "content/games"
    create: true              # Can create new game files
    delete: true              # Can delete game files
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }

  # NEW file collection for about page
  - name: "pages"
    label: "Pages"
    files:
      - label: "About Page"
        name: "about"
        file: "content/about.md"    # Must match actual file
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Organization Name", name: "organizationName", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }
          - label: "Social Links"
            name: "socialLinks"
            widget: "list"
            fields:
              - { label: "Platform", name: "platform", widget: "string" }
              - { label: "URL", name: "url", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }
```

### Pattern 4: External Script Loading in Static Export with next/script

**What:** Use Next.js `next/script` component with `strategy="afterInteractive"` to load external embeds (Sender.net) after initial page hydration.

**When to use:** Third-party embeds, analytics, tracking scripts that need DOM to exist and browser APIs available.

**Trade-offs:**
- ✓ Works with static export (output: 'export')
- ✓ Automatic script deduplication across pages
- ✓ Configurable loading strategy (beforeInteractive, afterInteractive, lazyOnload)
- ✗ Scripts load in browser, not at build time
- ✗ Form must be submitted to Sender.net (no server-side handling needed for static site)

**Example:**
```typescript
// src/components/NewsletterSignup.tsx
'use client';

import Script from 'next/script';
import { useState } from 'react';

export default function NewsletterSignup() {
  const [formId] = useState('YOUR_SENDER_FORM_ID');

  return (
    <section className="newsletter-section">
      <h2>Join Our Newsletter</h2>
      <p>Get updates about new games and events.</p>

      {/* Container for Sender.net embed */}
      <div id={`sender-form-${formId}`} />

      {/* Load Sender.net script after page hydration */}
      <Script
        src="https://cdn.sender.net/accounts_static/js/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Sender.net script exposes window.senderjs
          if (window.senderjs) {
            window.senderjs.load(formId);
          }
        }}
      />
    </section>
  );
}
```

## Data Flow

### Build-Time Data Flow

```
CMS User edits about.md via Decap CMS
    ↓
Decap CMS commits change to GitHub
    ↓ (Vercel webhook triggers)
Vercel runs: next build
    ↓
getAboutPage() reads /content/about.md from disk
    ↓
gray-matter parses YAML frontmatter + markdown
    ↓
Server component renders static HTML
    ↓
Static export outputs: out/about/index.html
    ↓
Vercel deploys HTML to CDN
```

### Runtime (Client-Side) Data Flow

```
User visits /about
    ↓
Browser loads HTML (static, pre-rendered)
    ↓
React hydrates and mounts client components
    ↓
NewsletterSignup component mounts
    ↓
Script component loads Sender.net embed script
    ↓ (after afterInteractive strategy)
Sender.net script runs in browser
    ↓
Form renders in #sender-form-{id} div
    ↓
User submits form → Sender.net API handles submission
```

### Content Editing Flow (Decap CMS)

```
Decap Admin UI (/admin)
    ↓
User logs in with GitHub OAuth
    ↓
User edits About Page form
    ↓
Decap CMS writes to /content/about.md
    ↓
Git commit → GitHub repo
    ↓
Vercel webhook receives push event
    ↓
Vercel rebuilds + redeploys site
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Sender.net** | Script embed in NewsletterSignup client component | Form submission handled by Sender.net API. No server-side auth needed for static export. |
| **GitHub** | Decap CMS backend for content sync | Commits to `/content/about.md` trigger Vercel rebuilds. OAuth login required for CMS admin. |
| **Vercel** | Deploy webhook + hosting | Listens for GitHub pushes. Runs `next build` with `output: 'export'`. Serves static files from CDN. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Page routes ↔ Data lib** | Function calls (getAboutPage, getGames) | Server-side at build time. No runtime overhead. |
| **Server Component ↔ Client Component** | Props drilling (about data passed to NewsletterSignup) | Server renders content, passes as props. Client hydrates interactive parts. |
| **Layout ↔ Page components** | Composition (NavBar, Footer shared in root layout) | About page inherits layout structure. |

## New Components

### `src/components/NewsletterSignup.tsx` (NEW)

**Responsibility:** Render Sender.net newsletter signup form container and load the embed script.

**Why client component:** Sender.net script needs DOM access and browser APIs (`window`, event listeners). Cannot run on server during static export.

**Dependencies:**
- `next/script` (built-in)
- Sender.net form ID (from environment or Decap CMS config)

### `src/lib/about.ts` (NEW)

**Responsibility:** Load and parse the about page content file.

**Why separate file:** Mirrors existing `lib/games.ts` pattern. Keeps data-loading logic in one place. Reusable across the app.

**Dependencies:**
- `fs/promises` (Node.js built-in)
- `gray-matter` (existing dependency)
- `path` (Node.js built-in)

### `src/types/about.ts` (NEW)

**Responsibility:** Define TypeScript interfaces for About page data.

**Why separate file:** Mirrors existing `types/game.ts` pattern. Enables type checking across lib and components.

## Modified Components

### `src/app/about/page.tsx` (NEW PAGE ROUTE)

**Responsibility:** Server component that loads about content and renders layout with newsletter signup.

**Changes:**
- New route at `/about`
- Async server component using `getAboutPage()`
- Renders markdown content with ReactMarkdown
- Includes NewsletterSignup client component

### `src/components/NavBar.tsx` (MODIFIED)

**Changes:**
- Add navigation link to `/about` route

### `src/app/layout.tsx` (UNCHANGED)

**Why no change:** Root layout already sets up shared NavBar/Footer. About page inherits structure automatically.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–100 users | Current approach is perfect. Single about.md file. Decap CMS UI for editing. |
| 100–10k users | No changes needed. Static export scales infinitely on CDN. Rebuild time may increase if content grows. |
| 10k+ users | If content becomes too large, consider: (1) splitting about page into multiple files, (2) using cms-only config for structure. Current approach still works. |

## Anti-Patterns

### Anti-Pattern 1: Putting About Content in Database

**What people do:** Create a server endpoint `/api/about` and query a database at runtime.

**Why it's wrong:**
- Breaks static export (requires Node.js server)
- Adds latency to every page load
- Introduces failure points (database down = site broken)
- Unnecessary for content that rarely changes

**Do this instead:** Keep content in git-versioned files. Let Decap CMS manage edits. Content updates = full rebuild = guaranteed consistency.

### Anti-Pattern 2: Server-Side Form Submission for Newsletter

**What people do:** Create `/api/newsletter/subscribe` endpoint and handle Sender.net API calls server-side.

**Why it's wrong:**
- Static export cannot handle dynamic API routes that write to external services
- Adds complexity (need to proxy to Sender.net from server)
- Defeats the purpose of serverless/static deployment

**Do this instead:** Let Sender.net handle form submission directly from client. They provide embed script for exactly this use case. No server involvement needed.

### Anti-Pattern 3: Multiple About Files or Folder Collection

**What people do:** Create `/content/about/` folder with multiple files (sections, config, etc).

**Why it's wrong:**
- Complicates data loading logic (need to aggregate multiple files)
- Decap CMS file collection is designed for single files
- Increases rebuild complexity

**Do this instead:** Keep single `content/about.md` file with all content. Use markdown sections (##) or structured YAML frontmatter for complex data. If truly need multiple sections, consider single YAML file instead.

### Anti-Pattern 4: Using next/script with strategy="beforeInteractive" for Sender.net

**What people do:** Load Sender.net script before page hydration.

**Why it's wrong:**
- Script needs DOM elements to exist (form container)
- beforeInteractive runs before React hydration
- Form won't render properly if script runs before container exists

**Do this instead:** Use `strategy="afterInteractive"` (default). Ensures DOM exists before script runs.

## Build & Deployment Workflow

### Phase 1: Initial Setup

1. Create `/content/about.md` in git repo (must exist before CMS manages it)
2. Add file collection to `public/admin/config.yml`
3. Create `src/lib/about.ts` with getAboutPage()
4. Create `src/types/about.ts` with AboutPage interface
5. Create `src/components/NewsletterSignup.tsx` with Sender.net embed
6. Create `src/app/about/page.tsx` server component
7. Update NavBar with `/about` link
8. Test locally with `next dev`
9. Build & test static export: `next build` → check `out/about/index.html`

### Phase 2: CMS Deployment

1. Push changes to GitHub
2. Vercel rebuilds automatically
3. Test Decap CMS at `{site}/admin`
4. Verify About Page edit form loads correctly
5. Make test edit → verify commit appears in GitHub

### Phase 3: Monitoring

1. Monitor Vercel deploy logs for any gray-matter parsing errors
2. Watch GitHub commits from CMS for malformed YAML (Decap should validate)
3. Test Sender.net form submission on live site
4. Monitor Sender.net webhook for subscription events

## Sources

- [Decap CMS File Collections Configuration](https://decapcms.org/docs/collection-file/)
- [Next.js Scripts Guide](https://nextjs.org/docs/app/guides/scripts)
- [Next.js Static Exports Documentation](https://nextjs.org/docs/app/guides/static-exports)
- [Sender.net Embedded Forms Documentation](https://help.sender.net/knowledgebase/embedded-form/)
- [Existing Project Configuration: .planning/PROJECT.md](/Users/phivk/Documents/Philo\ Personal/projects/playful-revolution-games-index-2/.planning/PROJECT.md)
- [Existing Implementation: src/lib/games.ts](/Users/phivk/Documents/Philo\ Personal/projects/playful-revolution-games-index-2/src/lib/games.ts)

---

*Architecture research for: Next.js static export about page with Decap CMS singleton content and Sender.net newsletter integration*
*Researched: 2026-03-04*
