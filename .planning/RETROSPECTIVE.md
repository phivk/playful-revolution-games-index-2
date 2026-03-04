# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

---

## Milestone: v1.1 — About Page

**Shipped:** 2026-03-04
**Phases:** 2 | **Plans:** 6 | **Sessions:** 1

### What Was Built
- CMS-managed about page with org name, description, Markdown body, and social links
- About navigation link in site header on all pages
- Instagram feed via official embed blockquotes, CMS-managed post URLs (no API credentials)

### What Worked
- Phase 5 executed cleanly via GSD (3 atomic plans, no deviations)
- Switching from Instagram Graph API to official embeds mid-phase avoided credential complexity entirely
- Singleton CMS pattern (`files:` collection) mapped directly to the data loader pattern in games.ts — no new conventions needed
- `react-markdown` was already in `package.json` — zero new dependencies for Markdown body rendering

### What Was Inefficient
- Phase 6 pivoted away from API approach (Instagram Graph API proxy + cron) after the infrastructure was built (06-02-SUMMARY.md documents the superseded work) — earlier research could have ruled this out sooner
- NWSL-01 (Sender.net) was scoped in but never implemented — should have been moved out of scope at milestone start given Sender.net integration wasn't ready

### Patterns Established
- **Singleton CMS pattern:** `files:` collection in Decap CMS for single fixed content files (vs `folder:` for multi-entry collections)
- **Instagram embed approach:** official blockquote embeds from CMS-managed post URLs — simpler and more robust than Graph API for static export sites
- **InstagramFeed returns null when empty:** component safely renders nothing when `instagramPosts: []`
- **Platform icon map with Globe fallback:** `Record<string, React.ComponentType>` pattern for icon selection

### Key Lessons
1. For third-party integrations on static sites, research the simplest working approach first — CMS-managed embed URLs beat API infrastructure every time if freshness requirements allow it
2. If a requirement depends on an external service integration not yet configured (Sender.net), defer it explicitly at milestone start rather than discovering the blocker mid-phase

### Cost Observations
- Model profile: budget (haiku-heavy)
- Sessions: 1 day
- Notable: Phase 5 (3 plans) executed in ~25 min total; Phase 6 pivot to embeds resolved in direct commits

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | ~3 | 4 | Initial GSD setup, established phase/plan pattern |
| v1.1 | 1 | 2 | First pivot mid-phase (API → embed approach); budget profile throughout |

### Cumulative Quality

| Milestone | New Deps | Zero-Dep Wins |
|-----------|----------|---------------|
| v1.0 | Several (gray-matter, lucide-react, react-markdown, etc.) | — |
| v1.1 | 0 | react-markdown already present; embeds need no deps |

### Top Lessons (Verified Across Milestones)

1. Static export constraint shapes all third-party integration decisions — evaluate "works at build time without server" as the first filter
2. Pre-committing CMS content files to Git before configuring file collections is a hard requirement for Decap CMS singleton pattern
