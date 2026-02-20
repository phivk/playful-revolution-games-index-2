# ROADMAP: Playful Revolution Games Index

**Depth:** quick (3-5 phases)
**Total Requirements:** 21 (v1)

---

## Phases

- [ ] **Phase 1: Core Display** - Game catalog and detail view
- [ ] **Phase 2: Search & Filter** - Discovery features
- [ ] **Phase 3: Design & CMS** - Brand styling and admin interface
- [ ] **Phase 4: Deployment** - Static site and hosting

---

## Phase Details

### Phase 1: Core Display

**Goal:** Users can browse game catalog and view detailed facilitation instructions on mobile devices

**Depends on:** Nothing (first phase)

**Requirements:** CORE-01, CORE-02, CORE-03, CORE-04

**Success Criteria** (what must be TRUE):
1. Game catalog displays ~30 games in a scrollable list/grid on mobile
2. Each game card shows title, tags, pillars, energy level at a glance
3. Tapping a game opens detail view with full facilitation instructions (materials, setup, how to play)
4. Detail view is readable on mobile without horizontal scrolling

**Plans:** 1 plan
- [ ] 01-01-PLAN.md — Set up Next.js with game catalog and detail views

---

### Phase 2: Search & Filter

**Goal:** Users can find specific games using filters, search, and random picker

**Depends on:** Phase 1 (needs games to filter)

**Requirements:** FILT-01, FILT-02, FILT-03, FILT-04, FILT-05

**Success Criteria** (what must be TRUE):
1. Users can filter by one or more tags (Social Spontaneity, Group Circle Games, Collaborative, Competitive, Ball Games, Theatre Sports, Movement, Table Games)
2. Users can filter by pillars (Intellectual, Social, Physical)
3. Users can filter by energy level (Low, Medium, High)
4. Users can search by game name or keyword in description
5. Users can tap "Surprise Me" to get a random game suggestion

**Plans:** TBD

---

### Phase 3: Design & CMS

**Goal:** Apply brand identity and enable admin game management via Decap CMS

**Depends on:** Phase 1 (needs game display structure)

**Requirements:** DESN-01, DESN-02, DESN-03, DESN-04, DESN-05, DESN-06, DESN-07, CMS-01, CMS-02, CMS-03

**Success Criteria** (what must be TRUE):
1. Brand colors (Revolution Red, Play Green, Joy Yellow, Deep Blue) appear as bold color blocks
2. Typography uses bold condensed sans-serif headlines, readable body font
3. Visual aesthetic feels like street poster / zine - bold, playful, slightly rough
4. Buttons are big, bold with strong color contrast
5. Interactions are snappy - buttons that jump, not fade
6. Design has high contrast with large tap targets for accessibility
7. Background uses paper-like off-white (#FAFAF7), not pure white
8. Admin can add new games via Decap CMS
9. Admin can edit existing games via Decap CMS
10. Admin can delete games via Decap CMS

**Plans:** TBD

---

### Phase 4: Deployment

**Goal:** Static site exported and live on Vercel or GH Pages

**Depends on:** Phase 3 (needs CMS integration for content)

**Requirements:** DEPL-01, DEPL-02

**Success Criteria** (what must be TRUE):
1. Running build command produces static HTML/CSS/JS files
2. Site is accessible at a public URL on Vercel or GH Pages

**Plans:** TBD

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Core Display | 1/1 | Planned | - |
| 2. Search & Filter | 0/1 | Not started | - |
| 3. Design & CMS | 0/1 | Not started | - |
| 4. Deployment | 0/1 | Not started | - |

---

*Generated: 2026-02-20*
