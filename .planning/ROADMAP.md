# Roadmap: Playful Revolution Games Index

## Milestones

- ✅ **v1.0 MVP** — Phases 1–4 (shipped 2026-03-03)
- 🚧 **v1.1 About Page** — Phases 5–6 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1–4) — SHIPPED 2026-03-03</summary>

- [x] Phase 1: Core Display (1/1 plans) — Game catalog and detail view
- [x] Phase 2: Search & Filter (1/1 plans) — Discovery features
- [x] Phase 3: Design & CMS (2/2 plans) — Brand styling and admin interface
- [x] Phase 4: Deployment (3/3 plans) — Static site and hosting

Full archive: [milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

</details>

### 🚧 v1.1 About Page (In Progress)

**Milestone Goal:** Add a CMS-managed about page with organisation info and third-party integrations (Instagram feed, Sender.net newsletter signup) so visitors can learn about Playful Revolution and connect.

- [x] **Phase 5: About Page** — CMS-managed about page with organisation info, social links, and site navigation (completed 2026-03-04)
- [ ] **Phase 6: Third-Party Integrations** — Instagram feed preview and Sender.net newsletter signup form embedded on the about page

## Phase Details

### Phase 5: About Page
**Goal**: Visitors can reach and read the about page with organisation info and social media links; admins can update all content via Decap CMS
**Depends on**: Phase 4 (v1.0 complete)
**Requirements**: ABUT-01, ABUT-02, ABUT-03, ABUT-04, SOCL-01, SOCL-02, SOCL-03
**Success Criteria** (what must be TRUE):
  1. Visitor can navigate to the about page from the site header/navigation on any device
  2. Visitor can read descriptive text about Playful Revolution on the about page
  3. Visitor can see the organisation name on the about page
  4. Visitor can click through to social media profiles via links on the about page
  5. Admin can edit about page text, organisation name, and social media links (platform + URL) via Decap CMS without touching code
**Plans**: 3 plans

Plans:
- [ ] 05-01-PLAN.md — Data layer: content/about.md seed file, types, and getAboutPage() loader
- [ ] 05-02-PLAN.md — UI: SocialLinks component and about page server component
- [ ] 05-03-PLAN.md — CMS file collection config and NavBar About link

### Phase 6: Third-Party Integrations
**Goal**: Visitors can view recent Instagram posts from @playrevolution and submit their email to subscribe to the newsletter, both directly from the about page
**Depends on**: Phase 5
**Requirements**: INST-01, NWSL-01
**Research Flags**:
  - INST-01 [HIGH]: Implementation approach for Instagram feed preview must be researched before building. Unknown whether to use a third-party widget, Instagram oEmbed API, or another approach. Each has different constraints with static export (no server-side API calls at runtime). Research must determine: (1) which approach works with Next.js static export, (2) whether an API token or OAuth is required, (3) rate limit implications, (4) visual embed vs. scraped data. Do not begin implementation until approach is decided.
  - NWSL-01 [HIGH]: Sender.net form ID and embed script URL must be retrieved from Sender.net dashboard before implementation. Test script loading on slow networks and after client-side navigation.
**Success Criteria** (what must be TRUE):
  1. Visitor can see a preview of recent Instagram posts from @playrevolution on the about page on both mobile and desktop
  2. Visitor can see a newsletter signup form on the about page on both mobile and desktop
  3. Visitor can submit their email address via the form and receive confirmation that signup succeeded
  4. Submitted email appears in the Sender.net dashboard subscriber list
**Plans**: TBD

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Core Display | v1.0 | 1/1 | Complete | 2026-02-20 |
| 2. Search & Filter | v1.0 | 1/1 | Complete | 2026-02-20 |
| 3. Design & CMS | v1.0 | 2/2 | Complete | 2026-02-20 |
| 4. Deployment | v1.0 | 3/3 | Complete | 2026-02-22 |
| 5. About Page | 3/3 | Complete   | 2026-03-04 | - |
| 6. Third-Party Integrations | v1.1 | 0/? | Not started | - |

---

*Last updated: 2026-03-04 after Phase 5 planning complete (3 plans created)*
