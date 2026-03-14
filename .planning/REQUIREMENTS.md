# Requirements: Playful Revolution Games Index

**Defined:** 2026-03-14
**Core Value:** Facilitators can quickly find and view game instructions on mobile devices during sessions.

## v1.2 Requirements

### UI Consistency

- [x] **UI-01**: All interactive chips use `border-3 border-foreground` in their inactive state
- [x] **UI-02**: All button elements (PlaylistButton, Clear all) use `border-3 border-foreground` to match chips
- [x] **UI-03**: All interactive elements use the same hover effect — `hover:border-revolution-red hover:text-revolution-red` — with no scale transforms
- [x] **UI-04**: All interactive elements use consistent padding and min-height (`min-h-[44px]`, uniform `px`/`py`)

### Component Showcase

- [x] **SHOW-01**: A `/components` page exists in the Next.js app listing all interactive components and their variants
- [x] **SHOW-02**: Each component section shows all variants (interactive, non-interactive, selected, icon-only, etc.) side by side
- [x] **SHOW-03**: The page is not linked from the public site navigation (dev-only reference)

## Future Requirements

### Newsletter

- **NWSL-01**: Visitor can submit email via Sender.net signup form on the about page — deferred from v1.1, `NewsletterSignup.tsx` exists but not wired in

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full Storybook integration | Too much tooling overhead for a small codebase |
| Automated visual regression tests | Out of scope for this milestone |
| Newsletter signup (NWSL-01) | Deferred again — v1.2 is styling only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| UI-01 | Phase 7 | Complete |
| UI-02 | Phase 7 | Complete |
| UI-03 | Phase 7 | Complete |
| UI-04 | Phase 7 | Complete |
| SHOW-01 | Phase 8 | Complete |
| SHOW-02 | Phase 8 | Complete |
| SHOW-03 | Phase 8 | Complete |

**Coverage:**
- v1.2 requirements: 7 total
- Mapped to phases: 7
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-14*
*Last updated: 2026-03-14 after Phase 8 plan 01 complete (v1.2 all requirements met)*
