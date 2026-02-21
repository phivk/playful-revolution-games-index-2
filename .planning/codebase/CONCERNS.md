# Codebase Concerns

**Analysis Date:** 2026-02-21

## Security Considerations

**Decap CMS Admin Interface Exposure:**
- Risk: Admin interface at `/admin` is accessible without authentication barrier in code. Relies on Decap CMS's git-gateway backend for security, but client-side access control is not enforced by the application itself.
- Files: `src/app/admin/page.tsx`
- Current mitigation: External authentication handled by Decap CMS git-gateway backend (requires GitHub auth). No client-side route protection.
- Recommendations: Implement client-side route guards to prevent unauthorized access attempts; consider environment-based conditional rendering of admin route.

**Hardcoded Color Values Across Components:**
- Risk: Color definitions duplicated across multiple files with no validation. Mismatches between `GameCard.tsx` detail page colors and list page colors could confuse users.
- Files: `src/components/GameCard.tsx`, `src/app/game/[slug]/page.tsx`, `src/components/FilterChips.tsx`
- Current mitigation: None
- Recommendations: Create centralized color constants file (e.g., `src/constants/colors.ts`) to ensure consistency and maintainability.

**Data Format Mismatch Between CMS and Application:**
- Risk: `public/admin/config.yml` defines a `tags` field as list of objects with `tag` property, but `src/data/games.json` stores tags as simple string array. If CMS content is generated, there could be data structure conflicts.
- Files: `public/admin/config.yml`, `src/data/games.json`, `src/types/game.ts`
- Current mitigation: Manual data management; no automated sync between CMS and JSON file
- Recommendations: Document the data pipeline clearly; implement validation schema that accepts both formats or standardize CMS output format.

## Fragile Areas

**Admin Page IFrame Design:**
- Files: `src/app/admin/page.tsx`
- Why fragile: Uses 100% viewport dimensions with absolute positioning. No error handling if iframe fails to load or if `/admin/index.html` is missing.
- Safe modification: Add iframe error handler; add fallback message; test with missing admin file.
- Test coverage: No tests for admin page.

**Game Detail Page Color Map Inconsistency:**
- Files: `src/app/game/[slug]/page.tsx`
- Why fragile: Has its own pillar/energy/tag color definitions that differ from list page colors (e.g., detail uses `bg-blue-100` while list uses `bg-[#1E3A8A]`). These could easily diverge.
- Safe modification: Extract all color maps to shared constants before modifying.
- Test coverage: No visual regression tests; color consistency not validated.

**Filter Logic Dependency Chain:**
- Files: `src/hooks/useGameFilters.ts`, `src/app/page.tsx`
- Why fragile: Hook returns many individual setter functions that could be called in wrong order or combination. No clear constraints on filter interaction (e.g., what if user selects incompatible filters that return zero results).
- Safe modification: Consider consolidating setters into single reducer function; add tests for edge cases.
- Test coverage: No tests for filter combinations or edge cases.

**Type Safety Gap in Filter Casting:**
- Files: `src/components/FilterChips.tsx` (lines 157, 165, 173)
- Why fragile: Uses `as Tag` and `as Pillar` type casting without validation. If chip labels don't match exact enum values, silent type errors could occur.
- Safe modification: Use type-safe enum values; add runtime validation.
- Test coverage: No tests validating type safety.

## Performance Bottlenecks

**Static Game Data Loading on Every Page Load:**
- Problem: `games.json` is imported and parsed on every page render in both `/` and `/game/[slug]` pages.
- Files: `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`
- Cause: Direct JSON import used twice independently rather than centralized data source
- Improvement path: Create `src/lib/gameData.ts` that exports games once; use in both places. Consider static generation if data doesn't change frequently.

**No Debounce Refinement in Search:**
- Problem: Search debounce set to 150ms. For large datasets (100+ games), filtering on every keystroke could cause janky UI.
- Files: `src/components/SearchBar.tsx` (line 15)
- Cause: No debounce on filter logic itself, only on input event
- Improvement path: Increase debounce to 250-300ms; consider memoizing filter function with stable reference.

**Mutable Filter State Operations:**
- Problem: `useGameFilters` hook creates new arrays on every filter change even if adding/removing same item multiple times
- Files: `src/hooks/useGameFilters.ts`
- Cause: No deduplication; arrays are always spread and modified
- Improvement path: Add check before spread to prevent no-op updates; use Set for temporary storage if order matters.

## Missing Critical Features

**No Loading States:**
- Problem: No loading indicators or skeletons while game data loads or while admin page iframe loads
- Files: `src/app/page.tsx`, `src/app/admin/page.tsx`
- Blocks: Users see blank page while data loads

**No Error Boundaries:**
- Problem: No React error boundaries or error pages if game data fails to load or is malformed
- Files: `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`
- Blocks: Parsing error in `games.json` would crash entire page

**No Data Validation:**
- Problem: No runtime validation that games.json conforms to Game type before use
- Files: `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`
- Blocks: Malformed data from CMS could silently break filtering and display

**No 404 Handling for Missing Images:**
- Problem: Game cards can contain image references in CMS but no image handling in component
- Files: `src/components/GameCard.tsx`, `src/app/game/[slug]/page.tsx`
- Blocks: If CMS adds images field, app will break

## Test Coverage Gaps

**No Unit Tests:**
- What's not tested: `useGameFilters` hook has complex filtering logic with no tests
- Files: `src/hooks/useGameFilters.ts`
- Risk: Filter edge cases (empty arrays, null values, special characters) are untested
- Priority: High - Core business logic

**No Component Tests:**
- What's not tested: `FilterChips` component event handlers, `SearchBar` debounce behavior
- Files: `src/components/FilterChips.tsx`, `src/components/SearchBar.tsx`
- Risk: Interactive components could break on refactor
- Priority: Medium - User interaction

**No Integration Tests:**
- What's not tested: End-to-end flow of filtering, searching, and navigating to game detail
- Files: Multiple
- Risk: Breaking changes in data flow not caught
- Priority: Medium - Feature workflows

**No Accessibility Tests:**
- What's not tested: Color contrast, keyboard navigation, screen reader compatibility
- Files: All components
- Risk: App could be inaccessible without notice
- Priority: Medium - Compliance

## Scaling Limits

**Static Build Output:**
- Current capacity: Works for current game count (appears to be <50 games)
- Limit: Static export means build time grows with game count; pre-generation of all game pages happens at build time
- Scaling path: If games grow to 1000+, consider dynamic route segments or serverless functions instead of static export.

**JSON File as Data Source:**
- Current capacity: Games loaded into memory on every render
- Limit: With 10,000+ games, initial JSON parse could lag. No pagination or lazy loading.
- Scaling path: Switch to database with API; implement pagination; add virtual scrolling for large lists.

**Color Map Duplication:**
- Current capacity: 3 separate color definition objects
- Limit: Each new tag/pillar requires updates in 3 places
- Scaling path: Centralize colors; add automated tests to ensure consistency.

## Technical Debt

**Hardcoded Magic Strings:**
- Issue: Tag names, pillar names, energy levels referenced as strings throughout codebase
- Files: `src/components/GameCard.tsx`, `src/app/game/[slug]/page.tsx`, `src/components/FilterChips.tsx`
- Impact: Refactoring enum values requires finds/replaces across multiple files; typos create silent failures
- Fix approach: Move all enum values to `src/constants/enums.ts`; import everywhere; use as single source of truth.

**Duplicate Color Definition Objects:**
- Issue: `pillarColors`, `energyColors`, `tagColors` defined in GameCard, FilterChips, and game detail page
- Files: `src/components/GameCard.tsx`, `src/components/FilterChips.tsx`, `src/app/game/[slug]/page.tsx`
- Impact: Color changes require updates in 3+ places; divergence causes visual inconsistency
- Fix approach: Create `src/constants/colors.ts` exporting all color maps; import in all components.

**No Barrel Exports:**
- Issue: Components imported directly from files, no centralized export point
- Files: `src/app/page.tsx`, `src/app/game/[slug]/page.tsx`
- Impact: Harder to refactor folder structure; unclear what's public API
- Fix approach: Create `src/components/index.ts` and `src/hooks/index.ts` barrel files.

**Search Bar Debounce Implementation Concerns:**
- Issue: Double useEffect for debounce + sync creates potential race conditions
- Files: `src/components/SearchBar.tsx`
- Impact: Clearing search rapidly could desync local and parent state
- Fix approach: Consolidate to single useEffect; use useCallback with proper dependency array.

**Admin Page Type Safety:**
- Issue: PageProps uses `params: Promise<{ slug: string }>` but admin page doesn't use params
- Files: `src/app/game/[slug]/page.tsx`
- Impact: Pattern could be applied incorrectly elsewhere
- Fix approach: Document why params pattern is needed (async params in Next 15+); add TSDoc comment.

## Known Bugs

**Random Picker Could Fail Silently:**
- Symptoms: "Surprise Me" button does nothing if games array is empty
- Files: `src/components/RandomPicker.tsx` (line 18)
- Trigger: Navigate to home when gamesData.games is empty array
- Workaround: Check console for errors; ensure games.json is not empty

**SearchBar State Sync Issues:**
- Symptoms: Clearing search in SearchBar doesn't immediately update parent state if onChange callback is slow
- Files: `src/components/SearchBar.tsx` (lines 23-25)
- Trigger: Rapidly clear search and type new query
- Workaround: Wait for debounce timer before typing new query

**Game Detail Page Missing Error Handling:**
- Symptoms: If games.json is malformed or missing game entry, notFound() redirects but no clear error message
- Files: `src/app/game/[slug]/page.tsx`
- Trigger: Manually navigate to `/game/nonexistent-slug`
- Workaround: Check browser network tab to verify games.json loads correctly

---

*Concerns audit: 2026-02-21*
