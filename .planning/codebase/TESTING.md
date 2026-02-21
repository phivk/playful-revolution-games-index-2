# Testing Patterns

**Analysis Date:** 2026-02-21

## Test Framework

**Runner:**
- Not configured - no test runner detected
- No Jest, Vitest, or other testing framework configured in `package.json`

**Assertion Library:**
- Not applicable (no testing framework installed)

**Run Commands:**
- No test scripts defined in `package.json`
- Available scripts: `npm run dev` (development), `npm run build` (production build), `npm run start` (production server), `npm run lint` (ESLint)

## Test File Organization

**Location:**
- No test files found in codebase
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx` files in `src/` directory
- Testing is not currently implemented

**Naming:**
- Not applicable

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable

**Patterns:**
- No testing patterns established in current codebase

## Mocking

**Framework:** Not applicable

**Patterns:**
- No mocking implementation present

**What to Mock:**
- Not defined

**What NOT to Mock:**
- Not defined

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- `src/data/games.json` contains game data used in development, but not structured as test fixtures

## Coverage

**Requirements:** Not enforced - no coverage configuration detected

**View Coverage:**
- Not applicable

## Test Types

**Unit Tests:**
- Not implemented
- Would be candidates for testing:
  - `useGameFilters` hook - filter logic in `src/hooks/useGameFilters.ts`
  - Helper functions within components (e.g., color mapping logic)
  - Type conversions and data transformations

**Integration Tests:**
- Not implemented
- Would be candidates:
  - Game filtering flow (combining multiple filter types)
  - Search functionality with debounce in `SearchBar.tsx`
  - Random picker selection in `RandomPicker.tsx`

**E2E Tests:**
- Not implemented
- Would benefit from E2E testing with Playwright or Cypress for:
  - Complete game filtering workflows
  - Search and filter interactions
  - Navigation between list and detail pages
  - Static generation of game detail pages

## Common Patterns

**Async Testing:**
- Not applicable

**Error Testing:**
- Not applicable

## Recommended Testing Strategy

### Priority 1: Hook Unit Tests

**Test file location:** `src/hooks/useGameFilters.test.ts`

**Test scenarios for `useGameFilters`:**
```typescript
// Test filter state updates
describe('useGameFilters', () => {
  it('should add a tag to filters', () => {
    // Setup
    // Call setTag('Social Spontaneity')
    // Assert tags array contains the tag
  });

  it('should remove a tag from filters', () => {
    // Setup with existing tag
    // Call removeTag()
    // Assert tag is removed
  });

  it('should filter games by tag (OR logic)', () => {
    // Setup with multiple games and different tags
    // Apply tag filters
    // Assert only games with matching tags returned
  });

  it('should filter games by pillar (OR logic)', () => {
    // Similar to tag filter tests
  });

  it('should filter games by energy level', () => {
    // Test single and multiple energy level selections
  });

  it('should filter games by search query (title and description)', () => {
    // Test case-insensitive search
    // Test substring matching
  });

  it('should combine all filter types (AND logic between filter types)', () => {
    // Apply tag AND pillar AND energy level filters simultaneously
  });

  it('should clear all filters', () => {
    // Apply multiple filters
    // Call clearAll()
    // Assert all filter state reset to empty
  });

  it('should calculate active filter count correctly', () => {
    // Apply various filters
    // Assert activeFilterCount matches
  });
});
```

### Priority 2: Component Unit Tests

**Test file location:** `src/components/__tests__/` directory (co-located pattern)

**Test scenarios:**
- `GameCard.tsx`: Rendering with different game data, color mapping fallbacks
- `SearchBar.tsx`: Debounce behavior, input changes, clear functionality
- `FilterChips.tsx`: Chip selection states, color application, clear all interaction
- `RandomPicker.tsx`: Random selection from games array, router navigation

### Priority 3: Page/Integration Tests

**Test file location:** `src/app/__tests__/`

**Test scenarios:**
- `page.tsx` (home): Data loading, filter integration, results display
- `[slug]/page.tsx`: Static param generation, game detail rendering, 404 handling

## Current State Summary

**Status:** Testing not yet implemented

**Why testing is important for this codebase:**
- Complex filtering logic in `useGameFilters` hook needs unit test coverage
- Filter combinations have multiple edge cases (OR within type, AND between types)
- Search debounce behavior should be verified
- Static generation and dynamic routing should be tested
- Data integrity: games data loaded from JSON needs validation

**First steps:**
1. Install test runner (Vitest recommended for Next.js)
2. Write tests for `useGameFilters` hook (highest priority - most complex logic)
3. Add component tests for interactive UI elements
4. Add integration tests for page-level functionality
5. Set up pre-commit hooks to run tests

---

*Testing analysis: 2026-02-21*
