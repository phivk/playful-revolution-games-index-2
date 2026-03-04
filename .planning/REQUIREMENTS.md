# Requirements: Playful Revolution Games Index

**Defined:** 2026-03-04
**Core Value:** Facilitators can quickly find and view game instructions on mobile devices during sessions.

## v1.1 Requirements

Requirements for About Page milestone. Each maps to roadmap phases.

### About Page (ABUT)

- [x] **ABUT-01**: Visitor can view short descriptive text about Playful Revolution on the about page
- [x] **ABUT-02**: Admin can edit the about page text via Decap CMS
- [x] **ABUT-03**: Visitor can view the organisation name on the about page
- [x] **ABUT-04**: Admin can edit the organisation name via Decap CMS

### Social (SOCL)

- [x] **SOCL-01**: Visitor can click through to social media profiles via links on the about page
- [x] **SOCL-02**: Admin can add, edit, and remove social media links (platform + URL) via Decap CMS
- [x] **SOCL-03**: Visitor can navigate to the about page from the site navigation

### Instagram (INST)

- [x] **INST-01** [research: HIGH]: Visitor can view a preview of recent Instagram posts from @playrevolution on the about page
  - Implementation approach must be researched during Phase 6 planning before any code is written.
  - Key constraint: static export (no server-side API calls at runtime).
  - Options to evaluate: third-party widget (e.g. Curator.io), Instagram oEmbed, Instagram Basic Display API, or other approach.

### Newsletter (NWSL)

- [ ] **NWSL-01**: Visitor can submit their email address via a Sender.net signup form on the about page

## v2 Requirements

Deferred to future release.

### Content

- Multi-language about page — defer until validated need
- Contact form — defer, email link sufficient for now

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-step newsletter signup | Increases friction; single email field is sufficient |
| Form analytics/tracking | Sender.net dashboard provides analytics |
| Comment section | Requires real-time backend, breaks static export |
| Multiple about pages / i18n | Adds CMS complexity; no validated need |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ABUT-01 | Phase 5 | Complete |
| ABUT-02 | Phase 5 | Complete |
| ABUT-03 | Phase 5 | Complete |
| ABUT-04 | Phase 5 | Complete |
| SOCL-01 | Phase 5 | Complete |
| SOCL-02 | Phase 5 | Complete |
| SOCL-03 | Phase 5 | Complete |
| INST-01 | Phase 6 | Complete |
| NWSL-01 | Phase 6 | Pending |

**Coverage:**
- v1.1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-04*
*Last updated: 2026-03-04 after adding INST-01 (Instagram feed preview) and mapping to Phase 6*
