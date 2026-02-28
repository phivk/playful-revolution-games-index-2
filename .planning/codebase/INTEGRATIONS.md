# External Integrations

**Analysis Date:** 2026-02-21

## APIs & External Services

**Google Fonts:**
- Google Fonts API - Loads web fonts via CSS import in `src/app/globals.css`
  - Fonts loaded: Anton, Bebas Neue, Inter (multiple weights)
  - URL: `https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap`

**Content Management:**
- Decap CMS - Git-backed headless CMS
  - SDK/Client: Decap CMS (loaded via CDN)
  - URL: `https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js`
  - Interface location: `/admin/index.html` (served at `/admin` route)

## Data Storage

**Databases:**
- None - Application uses static markdown content

**File Storage:**
- Local filesystem only
  - Content data: `content/games/*.md` (markdown with frontmatter), loaded by `src/lib/games.ts` (getGames, getGameBySlug)
  - Media folder configured for CMS uploads: `public/images/` (configured in `public/admin/config.yml`)
  - Backup media folder for publishing: `/images` (public URL path)

**Caching:**
- None detected - Static site generation, browser caching via HTTP headers

## Authentication & Identity

**Auth Provider:**
- Git Gateway (configured in `public/admin/config.yml`)
  - Implementation: Decap CMS Git Gateway backend
  - Branch: `main`
  - Purpose: Authenticates CMS users for content edits, commits changes directly to git repository

**Configuration:**
- Backend: git-gateway
- Repository: GitHub (implied - uses git-gateway)
- Commit branch: main

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- None detected - Standard console logging only (no service integration)

**Analytics:**
- None detected

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured in codebase
- Static site hosting compatible (Vercel, Netlify, GitHub Pages, AWS S3, etc.)
- Build output: `out/` directory (Next.js static export)

**CI Pipeline:**
- None detected in codebase
- Manual deployment or Git-based deployment (Vercel, Netlify) possible

**Build Process:**
```bash
npm run build   # Builds static site to `out/` directory
npm run start   # Serves built site locally
npm run dev     # Development server with hot reload
```

## Environment Configuration

**Required env vars:**
- None detected in codebase
- No `.env` or `.env.*` files present

**Secrets location:**
- Not applicable - No API keys or secrets required
- Git Gateway authentication handled via Decap CMS UI

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Git commits from Decap CMS editor to GitHub repository (automatic via Git Gateway)
  - Triggered: When content changes are published in CMS
  - Target: Git repository on main branch

## Content Management Backend

**CMS Configuration:**
- Location: `public/admin/config.yml`
- Content folder: `content/games/`
- File naming: Slug-based (`{{slug}}`)
- Supported operations:
  - Create new games
  - Delete games
  - Edit existing games
  - Upload media to `public/images/`

**CMS Collections:**
- Games collection
  - Fields: id (UUID), slug, title, description, tags (multi-select), pillars (multi-select), energyLevel (select), materials (list), setup (text), howToPlay (list)
  - Location: `content/games/` directory

## External Dependencies Summary

**CDN Hosted:**
- Decap CMS JS library (unpkg)
- Google Fonts CSS and font files

**Git-based:**
- GitHub repository (required for Git Gateway authentication)
- Content commits flow directly to repository

**Static/Local:**
- All game data via JSON file
- All images served locally from `public/images/`

---

*Integration audit: 2026-02-21*
