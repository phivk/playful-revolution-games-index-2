# Phase 8: Component Showcase - Context

**Gathered:** 2026-03-14
**Status:** Ready for planning

<domain>
## Phase Boundary

A dev-only `/components` page in the Next.js app where all interactive components and their variants can be inspected side by side. The page exists for developer reference only — it is not linked from any public navigation.

Creating new components, adding Storybook, or automated visual regression testing are explicitly out of scope (see REQUIREMENTS.md).

</domain>

<decisions>
## Implementation Decisions

### Scope (locked by requirements)
- `/components` route must exist and list all interactive components with all variants (SHOW-01, SHOW-02)
- The page must NOT be linked from public site navigation (SHOW-03)
- Interactive components in scope: TagChip, PillarChip, EnergyChip, DurationChip, PlaylistButton, FilterChips "Clear all" button

### Claude's Discretion
All implementation choices below are left to the planner — no user preferences were captured during discussion:
- Page layout and visual organisation (sections per component, grouping strategy)
- Whether variants are labeled (e.g. "inactive", "selected", "non-interactive")
- Whether `/components` uses the site layout (header/footer) or is a bare dev page
- Whether showcased components are live/interactive or static visual-only
- How to handle components that require React context (e.g. PlaylistButton needs PlaylistAnimationContext)
- What sample data to use for chips (which tags, pillars, energy levels, durations to show)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `TagChip` (`src/components/TagChip.tsx`): renders as `button` (interactive) or `span` (non-interactive) based on whether `onClick` is passed. Variants: inactive (no `selected`), selected (`selected={true}`), non-interactive (no `onClick`)
- `PillarChip` (`src/components/PillarChip.tsx`): same interactive/non-interactive pattern + `iconOnly` prop for icon-only variant
- `EnergyChip` (`src/components/EnergyChip.tsx`): same interactive/non-interactive pattern, levels 1–3
- `DurationChip` (`src/components/DurationChip.tsx`): same interactive/non-interactive pattern, duration in minutes
- `PlaylistButton` (`src/components/PlaylistButton.tsx`): two states — `inPlaylist={false}` (default/inactive) and `inPlaylist={true}` (active/added). Needs `PlaylistAnimationContext` — must wrap in provider or stub
- `FilterChips` "Clear all": rendered inline in `src/components/FilterChips.tsx` (line ~130). It's a standalone button — can be reproduced inline on the showcase page without importing FilterChips

### Established Patterns
- All app routes live under `src/app/` using Next.js App Router — `/components` → `src/app/components/page.tsx`
- Existing dev/utility pages (e.g. `src/app/admin`) are accessible by URL without being in public nav
- Tailwind CSS for all styling — showcase page follows the same pattern
- Components use `"use client"` directive — showcase page will be a client or server component depending on interactivity needs

### Integration Points
- New route: `src/app/components/page.tsx` (no changes to existing files required)
- Must NOT add a link to the components page in `src/components/NavBar.tsx` or any other nav
- PlaylistButton needs `PlaylistAnimationContext` from `src/contexts/PlaylistAnimationContext` — can wrap only that section, or stub via props

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-component-showcase*
*Context gathered: 2026-03-14*
