---
phase: 05-about-page
plan: "03"
subsystem: ui
tags: [decap-cms, yaml, nextjs, navbar, navigation]

# Dependency graph
requires:
  - phase: 05-about-page plan 01
    provides: content/about.md seed file committed to Git (required before CMS file collection works)
  - phase: 05-about-page plan 02
    provides: /about page and SocialLinks component (what the NavBar links to)
provides:
  - Decap CMS file collection for about page — admin can edit organisationName, description, socialLinks, and body without touching code
  - About link in NavBar — /about is reachable from the site header on all pages and screen sizes
affects: [phase-06-instagram-newsletter, any future CMS config changes]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Decap CMS file collection (files: list) for singleton page content — contrasted with folder: collection for multi-entry content like games"
    - "NavBar active-state conditional className using usePathname()"

key-files:
  created: []
  modified:
    - public/admin/config.yml
    - src/components/NavBar.tsx

key-decisions:
  - "File collection uses files: list (not folder:) for the about page singleton pattern — points to a fixed content/about.md"
  - "Platform select options in CMS restricted to known icon set (instagram, twitter, facebook, linkedin, youtube) matching SocialLinks.tsx"
  - "URL pattern validation in CMS widget (^https?://) prevents invalid social link URLs being saved"
  - "About link in NavBar uses conditional underline for active state on /about, consistent with existing NavBar style"

patterns-established:
  - "Singleton CMS pattern: use files: list with a single file: entry pointing to content/[page].md"
  - "NavBar links: insert between flex spacer and RandomPicker, always visible on all screen sizes"

requirements-completed: [ABUT-02, ABUT-04, SOCL-02, SOCL-03]

# Metrics
duration: ~20min
completed: 2026-03-04
---

# Phase 5 Plan 03: CMS Config and NavBar About Link Summary

**Decap CMS file collection wired to content/about.md and About navigation link added to site header — completing the admin editing loop and making /about reachable from every page**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-04
- **Completed:** 2026-03-04
- **Tasks:** 3 (2 auto + 1 checkpoint)
- **Files modified:** 2

## Accomplishments
- Added Decap CMS `about` file collection to `public/admin/config.yml` — admin can open /admin, see "About Page" in the sidebar, and edit all about content without touching code
- Added About navigation link to NavBar between the flex spacer and RandomPicker — visible on all screen sizes with active-state underline on /about
- Human verification passed: About link in header navigates to /about, CMS shows About Page collection with all fields editable

## Task Commits

Each task was committed atomically:

1. **Task 1: Add Decap CMS file collection for about page** - `c9dbf92` (feat)
2. **Task 2: Add About link to NavBar** - `97b4681` (feat)
3. **Task 3: Checkpoint: Verify complete Phase 5 about page** - human approved (no commit needed)

## Files Created/Modified
- `public/admin/config.yml` - Appended `about` file collection entry with organisationName, description, socialLinks list widget (platform select + url string with pattern validation), and body markdown field
- `src/components/NavBar.tsx` - Added `<Link href="/about">About</Link>` between flex spacer and RandomPicker, with conditional active-state underline using usePathname()

## Decisions Made
- File collection uses `files:` list (not `folder:`) — this is the Decap CMS singleton pattern for managing a single fixed file rather than a directory of entries
- Platform select options restricted to the five platforms with icons in SocialLinks.tsx (instagram, twitter, facebook, linkedin, youtube) — prevents CMS users entering an unsupported platform that would fall back to globe icon without warning
- URL string field uses `pattern` validation to enforce `^https?://` — guards against relative URLs or bare domain entries that would produce broken links
- No `create: true` or `delete: true` on the about collection — file collections manage a fixed file, not a dynamic list

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 5 (About Page) is fully complete: data layer, UI, CMS config, and NavBar navigation all delivered
- Phase 6 (Instagram + Newsletter) can begin — see blockers in STATE.md for pre-research required on Instagram embed approach and Sender.net form ID

---
*Phase: 05-about-page*
*Completed: 2026-03-04*

## Self-Check: PASSED

- FOUND: public/admin/config.yml
- FOUND: src/components/NavBar.tsx
- FOUND: .planning/phases/05-about-page/05-03-SUMMARY.md
- FOUND: commit c9dbf92 (feat(05-03): add Decap CMS file collection for about page)
- FOUND: commit 97b4681 (feat(05-03): add About link to NavBar)
