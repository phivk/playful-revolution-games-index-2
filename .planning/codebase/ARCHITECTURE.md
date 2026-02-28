# Architecture

**Analysis Date:** 2026-02-21

## Pattern Overview

**Overall:** Next.js Static Site Generation (SSG) with Client-Side Filtering

**Key Characteristics:**
- Static export configured for production (no server runtime)
- Client-side component interactivity for filtering and search
- Decap CMS integration for content management
- Content stored as markdown in content/games
- Multi-dimensional filtering system (tags, pillars, energy levels, search)

## Layers

**Presentation Layer (Pages & Components):**
- Purpose: Render user interface and handle user interactions
- Location: `src/app/` (Next.js App Router) and `src/components/`
- Contains: Page components (`page.tsx`), UI components (cards, filters, search)
- Depends on: Type definitions from `src/types/`, game data from `src/lib/games` (loaded from content/games), custom hooks from `src/hooks/`
- Used by: Browser/Next.js rendering engine

**Data Layer:**
- Purpose: Provide game content and catalog
- Location: `src/lib/games.ts` and `content/games/`
- Contains: Markdown files with YAML frontmatter, parsed by gray-matter; exports `getGames()`, `getGameBySlug(slug)`; normalizes tags, pillars, energy, resources
- Depends on: None (reads from filesystem at build/server time)
- Used by: Layout, home page (via GamesCatalog), game detail page

**Logic Layer (Custom Hooks):**
- Purpose: Encapsulate filter state management and game filtering logic
- Location: `src/hooks/useGameFilters.ts`
- Contains: Filter state (tags, pillars, energy levels, search query), filtering algorithm, state mutation functions
- Depends on: Type definitions from `src/types/game.ts`
- Used by: Home page (`src/app/page.tsx`)

**Type Layer:**
- Purpose: Define domain types and interfaces
- Location: `src/types/game.ts`
- Contains: Game interface, Tag union type, Pillar union type, numeric energy (1–5)
- Depends on: None
- Used by: All other layers for type safety

## Data Flow

**Home Page (Browse & Filter):**

1. Server calls `getGames()` (reads content/games/*.md), passes games to client
2. `GamesCatalog` receives games as props and casts to `Game[]`
3. `useGameFilters` hook initialized with all games
4. User interacts with `FilterChips`, `SearchBar`, or `RandomPicker`
5. Hook updates filter state via `setTag()`, `setPillar()`, `setEnergyLevel()`, `setSearchQuery()`
6. Hook's `useMemo` recalculates `filteredGames` based on current filters
7. Home page re-renders with filtered results
8. `GameCard` components render grid of filtered games

**Game Detail Page:**

1. Server receives slug parameter at build time
2. `generateStaticParams()` pre-generates all game detail pages from `getGames()`
3. Page calls `getGameBySlug(slug)` to load game from markdown
4. `notFound()` returns 404 if slug doesn't match
5. Page renders game details with styling and navigation
6. User clicks back link or browse button to return to home

**Random Picker Flow:**

1. User clicks "SURPRISE ME!" button in `RandomPicker`
2. Component selects random game from full games array (ignores filters)
3. Router navigates to `/game/[slug]`

**State Management:**

- **Filter State:** Managed by `useGameFilters` hook using React `useState`
- **Search State:** Local debounce buffer in `SearchBar` (150ms debounce) synced to filter state
- **Server State:** Markdown content loaded at build/server time via getGames(), no runtime mutations
- **Navigation State:** Next.js client router manages page transitions

## Key Abstractions

**Game Type:**
- Purpose: Defines structure of a game catalog entry
- Examples: Used in `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`, `src/components/GameCard.tsx`
- Pattern: TypeScript interface with branded string unions for tags, pillars, energy levels

**FilterState:**
- Purpose: Represents active filters across multiple dimensions
- Examples: Defined and used in `src/hooks/useGameFilters.ts`
- Pattern: TypeScript interface capturing arrays of selected values plus search query

**Color Maps:**
- Purpose: Map semantic values (tags, pillars, energy levels) to Tailwind color classes and hex values
- Examples: Present in `src/components/GameCard.tsx`, `src/components/FilterChips.tsx`, `src/app/game/[slug]/page.tsx`
- Pattern: Records/objects mapping string values to CSS classes or hex codes

**Chip Component:**
- Purpose: Reusable toggle button for filter selection
- Examples: Nested in `FilterChips.tsx` as internal component
- Pattern: Presentational component with selected state, click handler, optional color override

**ChipGroup Component:**
- Purpose: Group related chips with title and filter count badge
- Examples: Nested in `FilterChips.tsx`, used for Tags, Pillars, Energy levels
- Pattern: Container component that maps chip values to Chip subcomponents

## Entry Points

**Home Page (/):**
- Location: `src/app/page.tsx`
- Triggers: User visits root URL
- Responsibilities: Load all games, manage filter state, render search/filter UI, display game grid with empty state

**Game Detail Page (/game/[slug]):**
- Location: `src/app/game/[slug]/page.tsx`
- Triggers: User clicks game card or random picker navigates to game slug
- Responsibilities: Find game by slug, render full game details with facilitation guide, provide navigation back to home

**Admin Page (/admin):**
- Location: `src/app/admin/page.tsx`
- Triggers: User visits /admin route
- Responsibilities: Embed Decap CMS iframe for content editing

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Wraps all pages
- Responsibilities: Set metadata, load global styles, render shell with children

## Error Handling

**Strategy:** Graceful fallbacks and Next.js built-in error handling

**Patterns:**
- `notFound()` - Returns Next.js 404 page when game slug not found in `src/app/game/[slug]/page.tsx`
- Empty state UI - Shows friendly message when no games match filters in `src/app/page.tsx`
- No try/catch blocks needed - Static data is always available at build time
- Type safety prevents runtime errors through TypeScript

## Cross-Cutting Concerns

**Logging:** Not implemented - static site with no server logs

**Validation:** Type system provides compile-time validation; no runtime validation schema

**Authentication:** Not implemented - public site with content-only admin panel

**Styling:** Tailwind CSS v4 with custom theme colors in `src/app/globals.css`. All interactive elements follow snappy transition pattern (100ms cubic-bezier). Bold typography via Bebas Neue and Anton fonts.

**Content Management:** Decap CMS reads/writes markdown files in `content/games/`; `config.yml` controls collection schema

---

*Architecture analysis: 2026-02-21*
