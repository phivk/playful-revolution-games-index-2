# Phase 2: Search & Filter - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Users discover games through filters, search, and random picker. This phase delivers all game discovery functionality.

</domain>

<decisions>
## Implementation Decisions

### Filter UI
- **Display style**: Chips (pill buttons)
- **Visibility**: Always visible (not collapsible)
- **Organization**: By category (separate chip groups for tags, pillars, energy levels)
- **Selection feedback**: Both highlighted chips AND active count badge

### Filter Logic
- **Combination**: AND logic — games must match ALL selected filters
- **Clear all**: Yes, clear all button available
- **Empty state**: Show "No games match your filters" with suggestion to adjust

### Search UI
- **Position**: At top of page (I'll determine exact placement)
- **Filter combination**: Works combined with filters
- **Behavior**: Instant search (results update as you type)

### Random Picker
- **Button placement**: I'll determine best spot
- **Display**: Navigate to picked game page
- **Filter respect**: No — picks from all games regardless of current filters

### Claude's Discretion
- Exact chip styling and colors
- Search bar exact dimensions and styling
- Random button visual design and animation
- Mobile responsive chip layout

</decisions>

<specifics>
## Specific Ideas

- No specific references mentioned — following standard patterns for filter/search UX
- Brand should influence chip styling (bold colors, street poster aesthetic from design brief)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-search-filter*
*Context gathered: 2026-02-20*
