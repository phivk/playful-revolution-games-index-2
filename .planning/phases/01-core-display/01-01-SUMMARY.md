---
phase: 01-core-display
plan: "01"
subsystem: core-display
tags: [games-catalog, mobile-friendly, static-export]
dependency-graph:
  requires: []
  provides:
    - game-catalog-page
    - game-detail-page
    - game-data-structure
  affects:
    - Phase 2 (search-filter)
    - Phase 3 (design-system)
    - Phase 4 (deployment)
tech-stack:
  added:
    - Next.js 16 with TypeScript
    - Tailwind CSS
    - Static site export (output: 'export')
  patterns:
    - Dynamic routes with generateStaticParams
    - JSON data import for game catalog
    - Mobile-first responsive design
key-files:
  created:
    - src/app/layout.tsx (root layout with Inter font, paper background)
    - src/app/page.tsx (catalog page with 30 game cards)
    - src/app/game/[slug]/page.tsx (detail page with facilitation guide)
    - src/components/GameCard.tsx (reusable game card component)
    - src/data/games.json (30 games with full data)
    - src/types/game.ts (TypeScript interfaces)
    - next.config.ts (static export config)
  modified:
    - src/app/globals.css (brand colors, paper background)
decisions:
  - Used paper-like background (#FAFAF7) per design brief
  - Applied brand colors (#E53935 red, #43A047 green, #FDD835 yellow, #1E3A8A blue)
  - TypeScript type assertion for JSON imports to avoid build errors
metrics:
  duration: "~5 minutes"
  completed: "2026-02-20"
  tasks: 3
  files: 8
---

# Phase 1 Plan 1: Core Display Summary

Set up Next.js project with game catalog and detail views for mobile-friendly display.

## Objective

Initialize a Next.js project configured for static export with a working game catalog displaying ~30 games and individual game detail pages with facilitation instructions.

## Completed Tasks

### Task 1: Initialize Next.js project with static export

- Created Next.js 16 project with TypeScript, Tailwind CSS, ESLint
- Configured `next.config.ts` with `output: 'export'` for static site generation
- Set up root layout with Inter font and paper-like background (#FAFAF7)
- Added brand colors to globals.css per design brief

**Commit:** `276ac9b`

### Task 2: Create game data with ~30 games

- Created TypeScript `Game` interface with all required fields (id, slug, title, description, tags, pillars, energyLevel, materials, setup, howToPlay)
- Added 30 diverse games covering all categories:
  - Tags: Social Spontaneity, Group Circle Games, Collaborative, Competitive, Ball Games, Theatre Sports, Movement, Table Games
  - Pillars: Intellectual, Social, Physical
  - Energy Levels: Low, Medium, High
- Each game includes realistic facilitation instructions

**Commit:** `0ab7568`

### Task 3: Build catalog and detail views

- Created GameCard component displaying title, tags (badges), pillars (icons + text), energy level (color indicator)
- Built catalog page with responsive grid (1 column mobile, 2 columns tablet+)
- Created dynamic detail page at `/game/[slug]` with:
  - Title, description, tags, pillars, energy level
  - Facilitation guide: materials list, setup instructions, numbered how-to-play steps
  - Back navigation to catalog
- All pages mobile-friendly: readable without horizontal scroll, 16px base font

**Commit:** `09cf8c3`

## Success Criteria

| Criterion | Status |
|-----------|--------|
| CORE-01: Game catalog displays ~30 games in scrollable grid | ✅ |
| CORE-02: Game cards show title, tags, pillars, energy at a glance | ✅ |
| CORE-03: Detail view shows full facilitation instructions | ✅ |
| CORE-04: Mobile-friendly layout - no horizontal scroll | ✅ |

## Verification

- `npm run build` succeeds with static export to `out/` directory
- Generated 30 static game detail pages
- Static HTML files verified in `out/` directory

## Deviations from Plan

None - plan executed exactly as written.

## Out of Scope (Deferred)

- Search functionality (Phase 2)
- Filter by tags/pillars/energy (Phase 2)
- Full design system application (Phase 3)
- Decap CMS integration (Phase 3)

## Self-Check: PASSED

- [x] All task commits exist
- [x] Static build succeeds
- [x] 30 game pages generated
- [x] All required files exist
