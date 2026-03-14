# Roadmap: Playful Revolution Games Index

## Milestones

- ✅ **v1.0 MVP** — Phases 1–4 (shipped 2026-03-03)
- ✅ **v1.1 About Page** — Phases 5–6 (shipped 2026-03-04)
- 🚧 **v1.2 UI Consistency** — Phases 7–8 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1–4) — SHIPPED 2026-03-03</summary>

- [x] Phase 1: Core Display (1/1 plans) — Game catalog and detail view
- [x] Phase 2: Search & Filter (1/1 plans) — Discovery features
- [x] Phase 3: Design & CMS (2/2 plans) — Brand styling and admin interface
- [x] Phase 4: Deployment (3/3 plans) — Static site and hosting

Full archive: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

<details>
<summary>✅ v1.1 About Page (Phases 5–6) — SHIPPED 2026-03-04</summary>

- [x] Phase 5: About Page (3/3 plans) — CMS-managed about page with org info, social links, and navigation
- [x] Phase 6: Third-Party Integrations (— direct commits) — Instagram feed via official embeds from CMS-managed post list

Full archive: [milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

</details>

### 🚧 v1.2 UI Consistency (In Progress)

**Milestone Goal:** Establish a unified visual language for all interactive chip and button components.

- [x] **Phase 7: UI Consistency** — Unified border, inactive state, hover effect, and sizing across all chips and buttons (completed 2026-03-14)
- [ ] **Phase 8: Component Showcase** — Dev-only `/components` page listing all interactive components and their variants

## Phase Details

### Phase 7: UI Consistency
**Goal**: All interactive chips and buttons share a single, coherent visual language
**Depends on**: Phase 6
**Requirements**: UI-01, UI-02, UI-03, UI-04
**Success Criteria** (what must be TRUE):
  1. Every chip (TagChip, PillarChip, EnergyChip, DurationChip) displays a visible `border-3 border-foreground` border in its inactive state
  2. Every button (PlaylistButton, "Clear all" in FilterChips) displays the same `border-3 border-foreground` border as the chips
  3. Hovering over any interactive chip or button shifts color to revolution-red with no scale transform
  4. All interactive chips and buttons have consistent padding and meet the `min-h-[44px]` touch target minimum
**Plans**: 2 plans

Plans:
- [ ] 07-01-PLAN.md — Remove scale transforms from all four interactive chip components (TagChip, PillarChip, EnergyChip, DurationChip)
- [ ] 07-02-PLAN.md — Update PlaylistButton and FilterChips "Clear all" to border-3 border-foreground with colour-shift hover

### Phase 8: Component Showcase
**Goal**: A dev-only `/components` page exists where all interactive components and their variants can be inspected side by side
**Depends on**: Phase 7
**Requirements**: SHOW-01, SHOW-02, SHOW-03
**Success Criteria** (what must be TRUE):
  1. Visiting `/components` in the browser renders a page listing every interactive component used in the app
  2. Each component section shows all variants (inactive, selected, interactive, non-interactive, icon-only where applicable) side by side
  3. The `/components` page is not linked from the public site navigation and does not appear in any user-facing nav
**Plans**: 1 plan

Plans:
- [ ] 08-01-PLAN.md — Create `/components` showcase page with all interactive component variants

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Core Display | v1.0 | 1/1 | Complete | 2026-02-20 |
| 2. Search & Filter | v1.0 | 1/1 | Complete | 2026-02-20 |
| 3. Design & CMS | v1.0 | 2/2 | Complete | 2026-02-20 |
| 4. Deployment | v1.0 | 3/3 | Complete | 2026-02-22 |
| 5. About Page | v1.1 | 3/3 | Complete | 2026-03-04 |
| 6. Third-Party Integrations | v1.1 | — | Complete | 2026-03-04 |
| 7. UI Consistency | v1.2 | 2/2 | Complete | 2026-03-14 |
| 8. Component Showcase | v1.2 | 0/1 | Not started | - |

---

*Last updated: 2026-03-14 after Phase 8 planned (1 plan)*
