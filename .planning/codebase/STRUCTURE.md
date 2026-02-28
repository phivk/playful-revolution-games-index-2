# Codebase Structure

**Analysis Date:** 2026-02-21

## Directory Layout

```
playful-revolution-games-index-2/
├── .next/                          # Next.js build output (generated)
├── .planning/                      # GSD planning documents
│   └── codebase/                   # Architecture and structure analysis
├── content/                        # Content source (markdown)
│   └── games/                      # Game entries (one .md per game)
├── out/                            # Static export output (generated)
├── node_modules/                   # Dependencies (generated)
├── public/                         # Static assets and CMS
│   ├── admin/                      # Decap CMS interface
│   │   ├── config.yml              # CMS collection definitions
│   │   └── index.html              # CMS iframe entry point
│   └── *.svg                       # SVG graphics
├── src/                            # Source code
│   ├── app/                        # Next.js App Router pages
│   │   ├── admin/                  # Admin panel route
│   │   │   └── page.tsx            # CMS iframe wrapper
│   │   ├── game/                   # Game detail route
│   │   │   └── [slug]/             # Dynamic segment for game slugs
│   │   │       └── page.tsx        # Game detail page
│   │   ├── favicon.ico             # Browser tab icon
│   │   ├── globals.css             # Global styles and Tailwind import
│   │   ├── layout.tsx              # Root layout wrapper
│   │   └── page.tsx                # Home page (browse & filter)
│   ├── components/                 # Reusable React components
│   │   ├── FilterChips.tsx         # Multi-filter UI with chip groups
│   │   ├── GameCard.tsx            # Game grid card component
│   │   ├── GamesCatalog.tsx        # Home catalog (client) with filters
│   │   ├── RandomPicker.tsx        # Random game selector button
│   │   └── SearchBar.tsx           # Debounced search input
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Data loaders and utilities
│   │   └── games.ts                # getGames(), getGameBySlug() from content/games
│   │   └── useGameFilters.ts       # Filter state management logic
│   └── types/                      # TypeScript type definitions
│       └── game.ts                 # Game interface and type unions
├── .gitignore                      # Git ignore rules
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                  # Next.js configuration (static export)
├── package-lock.json               # Dependency lock file
├── package.json                    # Project metadata and scripts
├── postcss.config.mjs              # PostCSS configuration (Tailwind)
├── README.md                       # Project overview
├── tsconfig.json                   # TypeScript compiler configuration
└── tsconfig.tsbuildinfo            # TypeScript build cache
```

## Directory Purposes

**src/app:**
- Purpose: Next.js App Router page components and global layout
- Contains: Page files (`page.tsx`), route groups (folders with brackets for dynamic routes), root layout
- Key files: `page.tsx` (home), `layout.tsx` (root wrapper), `game/[slug]/page.tsx` (detail view), `admin/page.tsx` (CMS)

**src/components:**
- Purpose: Reusable UI components shared across pages
- Contains: React functional components using Tailwind for styling
- Key files: `GameCard.tsx` (grid item), `FilterChips.tsx` (filter UI), `SearchBar.tsx` (search input), `RandomPicker.tsx` (surprise button)

**src/hooks:**
- Purpose: Custom React hooks for shared logic
- Contains: Hook functions with state management and business logic
- Key files: `useGameFilters.ts` (filter state and computed filtered games)

**src/types:**
- Purpose: TypeScript type definitions and interfaces
- Contains: Domain types for games, filters, and validation types
- Key files: `game.ts` (Game interface, tag/pillar/energy enums as unions)

**src/lib:**
- Purpose: Load and normalize game data from markdown
- Contains: Utilities that read from the filesystem (Server Components / build time)
- Key files: `games.ts` (getGames, getGameBySlug; reads content/games/*.md)

**content/games:**
- Purpose: Source of truth for game content (markdown with YAML frontmatter)
- Contains: One `.md` file per game; frontmatter (title, slug, tags, pillars, energy, duration, resources) and body (markdown)
- Managed by: Decap CMS at `/admin` or by editing files directly

**public/admin:**
- Purpose: Decap CMS static files and configuration
- Contains: CMS interface HTML and collection schema
- Key files: `index.html` (CMS app entrypoint), `config.yml` (collection definitions)

**public:**
- Purpose: Static assets served directly by Next.js
- Contains: Images, icons, CMS files
- Key files: SVG graphics, admin CMS interface

## Key File Locations

**Entry Points:**
- `src/app/page.tsx`: Main home page with game browsing and filtering UI
- `src/app/game/[slug]/page.tsx`: Individual game detail pages (pre-generated at build time)
- `src/app/admin/page.tsx`: Admin panel that embeds Decap CMS
- `src/app/layout.tsx`: Root layout that wraps all pages with metadata and global styles

**Configuration:**
- `next.config.ts`: Configures static export mode, disables image optimization
- `tsconfig.json`: Sets up TypeScript with path alias `@/*` for `src/*`
- `package.json`: Defines dev/build/start scripts and dependencies
- `public/admin/config.yml`: Defines Decap CMS collections and fields

**Core Logic:**
- `src/lib/games.ts`: Loads games from `content/games/*.md` (getGames, getGameBySlug); used by layout, home page, game detail page
- `src/hooks/useGameFilters.ts`: Manages filter state and multi-dimensional filtering with OR logic for tags/pillars, AND logic between filter types
- `src/types/game.ts`: Game interface and type unions for valid tag/pillar/energy values

**Styling:**
- `src/app/globals.css`: Tailwind import, brand colors as CSS variables, global typography rules
- Components use inline Tailwind utility classes with color maps

**Testing:**
- None detected (no test files present)

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention)
- Route groups: `[parameter]` for dynamic segments (Next.js convention)
- Components: PascalCase, e.g., `GameCard.tsx`, `FilterChips.tsx`
- Hooks: `useXxx.ts` pattern, e.g., `useGameFilters.ts`
- Types: `xxx.ts` in types folder, e.g., `game.ts`
- Config files: Lowercase with dots, e.g., `next.config.ts`, `eslint.config.mjs`

**Directories:**
- Feature directories: lowercase, plural when containing multiple files, e.g., `components/`, `hooks/`, `types/`
- Route directories: lowercase, semantic names, e.g., `game/`, `admin/`
- Content: `content/` for markdown source; `src/lib/` for loaders

**Variables & Functions:**
- React components: PascalCase (first letter capitalized)
- Hooks: camelCase, prefixed with `use`
- State setter functions: camelCase, e.g., `setTag`, `removeTag`, `setSearchQuery`
- Event handlers: camelCase, prefixed with `handle`, e.g., `handleTagToggle`, `handleRandomPick`
- Constants: UPPER_SNAKE_CASE for constants, e.g., `ALL_TAGS`, `TAG_COLORS`, `PILLAR_COLORS`
- Local variables: camelCase, e.g., `filteredGames`, `hasActiveFilters`, `randomIndex`

**Types:**
- Interfaces: PascalCase with `I` prefix optional, e.g., `Game`, `FilterState`, `GameCardProps`
- Union types: PascalCase, e.g., `EnergyLevel`, `Tag`, `Pillar`
- Props types: PascalCase ending with `Props`, e.g., `GameCardProps`, `FilterChipsProps`, `SearchBarProps`

## Where to Add New Code

**New Feature (UI interaction or data processing):**
- Primary code: `src/app/page.tsx` or `src/components/` (for reusable feature components)
- Tests: Create `*.test.tsx` or `*.spec.tsx` in same directory (not yet in use)
- Hooks: If stateful logic, extract to new hook in `src/hooks/useXxx.ts`

**New Component/Module:**
- Implementation: `src/components/YourComponent.tsx` for UI components
- Props interface: Define `YourComponentProps` in same file or separate `types/` file if complex
- Styling: Use inline Tailwind utilities or add custom CSS variables to `src/app/globals.css`

**New Page Route:**
- Implementation: Create folder in `src/app/route-name/page.tsx` following Next.js App Router conventions
- Dynamic routes: Use `[parameter]` folder naming and `generateStaticParams()` for SSG
- Layout: Share root layout from `src/app/layout.tsx` or create nested layout

**New Game Data:**
- Format: Add a new `.md` file in `content/games/` with YAML frontmatter (title, slug, tags, pillars, energy 1–5, duration, resources) and a markdown body (description + instructions)
- Tags: Use only values from `src/types/game.ts` Tag type (e.g. theatre, collaborative, movement)
- Pillars: Use only values from `src/types/game.ts` Pillar type (intellectual, social, physical)
- Energy: Number 1–5
- Management: Edit via Decap CMS at `/admin` (preferred) or directly in `content/games/*.md`; app loads via `getGames()` from `src/lib/games.ts` at build/server time

**Utilities/Helpers:**
- Shared helpers: Create in `src/utils/` folder (not yet present - create if needed)
- Domain logic: Keep in `src/hooks/` if state-based, or create utility module if pure functions

## Special Directories

**public/:**
- Purpose: Static files served directly by Next.js without processing
- Generated: No
- Committed: Yes
- Contains: CMS interface, SVG assets, favicon

**public/admin/:**
- Purpose: Decap CMS static interface
- Generated: No (manually managed CMS config)
- Committed: Yes
- Contains: `config.yml` (collection schema) and `index.html` (CMS app)

**.next/:**
- Purpose: Next.js build output cache
- Generated: Yes
- Committed: No (.gitignored)
- Contains: Build artifacts, type definitions

**out/:**
- Purpose: Static HTML export output from `next build && next export`
- Generated: Yes
- Committed: No (.gitignored)
- Contains: Pre-rendered HTML pages for static hosting

**node_modules/:**
- Purpose: npm package dependencies
- Generated: Yes
- Committed: No (.gitignored)
- Contains: Installed packages from package-lock.json

---

*Structure analysis: 2026-02-21*
