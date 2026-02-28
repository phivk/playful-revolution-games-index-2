# Coding Conventions

**Analysis Date:** 2026-02-21

## Naming Patterns

**Files:**
- Components: PascalCase (e.g., `GameCard.tsx`, `SearchBar.tsx`, `FilterChips.tsx`)
- Pages: PascalCase (e.g., `page.tsx` as convention, but routes are slug-based like `[slug]/page.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useGameFilters.ts`)
- Types: PascalCase (e.g., `game.ts`)
- Content: markdown in `content/games/`; loaders in `src/lib/` (e.g., `games.ts`)

**Functions:**
- Components: PascalCase for React component exports (e.g., `export default function GameCard()`)
- Helper functions within components: camelCase (e.g., `handleRandomPick`, `handleTagToggle`)
- Hooks: camelCase with `use` prefix (e.g., `useGameFilters`)
- Internal helper functions: camelCase (e.g., `handleClear`, `generateStaticParams`)

**Variables:**
- State variables: camelCase (e.g., `localValue`, `filteredGames`, `selectedTags`)
- Constants: UPPER_SNAKE_CASE for module-level constants (e.g., `ALL_TAGS`, `TAG_COLORS`, `PILLAR_COLORS`, `ENERGY_COLORS`)
- Color objects: camelCase with descriptive names (e.g., `pillarColors`, `energyColors`, `tagColors`)
- Props interfaces: PascalCase with `Props` suffix (e.g., `GameCardProps`, `SearchBarProps`, `FilterChipsProps`)

**Types:**
- Interfaces: PascalCase (e.g., `Game`, `GameCardProps`, `FilterState`)
- Type unions: PascalCase (e.g., `Tag`, `Pillar`; energy is numeric 1–5)
- Branded/discriminated types use string literals (e.g., `type Tag = 'theatre' | 'collaborative' | ...`)

## Code Style

**Formatting:**
- No explicit formatter configured (no `.prettierrc` file detected)
- Code appears to follow common JavaScript/TypeScript conventions
- Semicolons are used consistently
- Single quotes are used for imports and strings
- Double quotes used in JSX attributes only when necessary
- Indentation: 2 spaces (inferred from source files)

**Linting:**
- ESLint with config: `eslint.config.mjs`
- Uses `eslint-config-next/core-web-vitals` for Next.js best practices
- Uses `eslint-config-next/typescript` for TypeScript support
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Import Organization

**Order:**
1. Next.js imports (e.g., `import Link from 'next/link'`, `import { notFound } from 'next/navigation'`)
2. React/React hooks imports (e.g., `import { useState, useEffect } from 'react'`)
3. Application type imports (e.g., `import { Game } from '@/types/game'`)
4. Component imports (e.g., `import GameCard from '@/components/GameCard'`)
5. Hook imports (e.g., `import { useGameFilters } from '@/hooks/useGameFilters'`)
6. Data/loader imports in server components (e.g., `import { getGames } from '@/lib/games'`)

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- Used consistently throughout codebase for cleaner imports

## Error Handling

**Patterns:**
- Conditional rendering for missing data (e.g., empty state UI in `src/app/page.tsx`)
- Next.js `notFound()` function for 404 cases (used in `src/app/game/[slug]/page.tsx`)
- No try/catch blocks detected in source code (relies on Next.js error boundaries and conditional logic)
- Null/undefined checks before operations (e.g., `if (!game)` check in detail page)
- Graceful degradation with fallback UI elements (e.g., fallback colors for unknown tags)

## Logging

**Framework:** Not detected - no logging library configured

**Patterns:**
- No explicit logging found in source code
- Relies on browser console for debugging (available via `console` if needed)
- Next.js server-side errors handled by framework

## Comments

**When to Comment:**
- Inline comments used sparingly for non-obvious logic (e.g., `// Debounce the search input` in `SearchBar.tsx`)
- Comments explain "why" rather than "what" (e.g., `// Pick from ALL games (ignores current filters) as per spec`)
- Comments on filter logic explain the filtering strategy (e.g., `// Tag filter: game must have at least one of the selected tags (OR within tags)`)

**JSDoc/TSDoc:**
- Not extensively used in current codebase
- Type annotations via TypeScript interfaces serve as primary documentation

## Function Design

**Size:** Functions are kept reasonably small and focused:
- Component functions: 20-80 lines typically
- Filter logic extracted to custom hooks (`useGameFilters`)
- Color mapping and configuration extracted to module-level constants

**Parameters:**
- React components receive props via single interface prop (e.g., `{ game }: GameCardProps`)
- Hooks accept data as parameters (e.g., `useGameFilters(games: Game[])`)
- Event handlers use minimal parameters (e.g., `(tag: Tag) => void`)

**Return Values:**
- Components return JSX
- Hooks return objects with state and action functions (e.g., `UseGameFiltersReturn` interface)
- Static data generation returns arrays of objects (e.g., `generateStaticParams()`)

## Module Design

**Exports:**
- Default exports used for React components (e.g., `export default function GameCard()`)
- Named exports used for hooks (e.g., `export function useGameFilters()`)
- Type exports explicitly named (e.g., `export interface FilterState`)

**Barrel Files:** Not used in current structure:
- Components imported directly: `import GameCard from '@/components/GameCard'`
- Types imported directly: `import { Game } from '@/types/game'`
- No index files with re-exports detected

## Type Safety

**TypeScript Configuration:**
- Strict mode enabled (`"strict": true`)
- JSX mode: `react-jsx` (modern React 19)
- Module resolution: `bundler`
- Target: `ES2017`

**Type Annotations:**
- Props defined via interfaces (e.g., `interface GameCardProps`)
- Function parameters explicitly typed
- Discriminated union types for domain types (e.g., `type Tag = '...' | '...'`)
- Record types for color/icon mappings (e.g., `Record<string, string>`)

## Client/Server Boundaries

**Client Components:**
- Use `'use client'` directive at top of file
- Examples: `SearchBar.tsx`, `FilterChips.tsx`, `RandomPicker.tsx`
- Client components handle interactive filtering, search, form input

**Server Components:**
- Default in Next.js App Router
- Layout files: `src/app/layout.tsx`
- Page files: `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`
- Static generation with `generateStaticParams()` for dynamic routes

---

*Convention analysis: 2026-02-21*
