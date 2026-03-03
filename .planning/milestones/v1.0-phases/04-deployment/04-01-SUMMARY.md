---
phase: 04-deployment
plan: "01"
subsystem: infra
tags: [vercel, next.js, static-export, github-oauth, deployment]

# Dependency graph
requires:
  - phase: 03-design-cms
    provides: Working Next.js app with Decap CMS admin, static export configured in next.config.ts
provides:
  - vercel.json with buildCommand, outputDirectory, and security headers
  - .env.local.example documenting GitHub OAuth env vars for Vercel dashboard
  - Verified static build producing /out with all 35 pages
affects: [04-02-oauth-handlers]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Static export via next.config.ts output: 'export' produces /out directory"
    - "Security headers configured in vercel.json for admin and global routes"
    - "Env var documentation pattern: .env.local.example with placeholder values and setup instructions"

key-files:
  created:
    - vercel.json
    - .env.local.example
  modified:
    - .gitignore

key-decisions:
  - "Used static export (output: 'export') approach rather than Vercel native Next.js runtime — already configured in next.config.ts"
  - "Added !.env.local.example exception to .gitignore so example file is trackable while .env.local stays protected"
  - "Security headers include X-Frame-Options for /admin/* and Referrer-Policy globally"

patterns-established:
  - "vercel.json pattern: minimal config with buildCommand + outputDirectory + headers only (no rewrites)"
  - "Env var docs: .env.local.example committed with placeholder values, never real secrets"

requirements-completed: [DEPL-01, DEPL-02]

# Metrics
duration: 2min
completed: 2026-02-22
---

# Phase 4 Plan 01: Vercel Deployment Config Summary

**vercel.json static export config with security headers and documented GitHub OAuth env vars for Vercel dashboard**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-22T16:06:11Z
- **Completed:** 2026-02-22T16:07:17Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Verified static build (`npm run build`) produces clean `/out` with 35 static pages, zero errors
- Created `vercel.json` pointing Vercel to `npm run build` with outputDirectory `out` and HTTP security headers
- Created `.env.local.example` documenting GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET with setup instructions for Vercel dashboard

## Task Commits

Each task was committed atomically:

1. **Task 1: Verify static build and create vercel.json** - `c17e37c` (chore)
2. **Task 2: Document environment variables and protect secrets** - `d584754` (chore)

**Plan metadata:** (docs commit — added after SUMMARY.md)

## Files Created/Modified
- `vercel.json` - Vercel deployment config: buildCommand, outputDirectory, security headers for /admin/* and all routes
- `.env.local.example` - GitHub OAuth env var documentation with setup instructions; safe to commit (placeholder values only)
- `.gitignore` - Added `!.env.local.example` exception so example file is trackable while real `.env.local` stays protected

## Decisions Made
- Used static export approach (already configured via `output: 'export'` in `next.config.ts`) rather than Vercel native Next.js runtime — fits the project's static site model
- Added explicit `!.env.local.example` gitignore exception — `.env*` wildcard would have blocked the example file from being committed
- Kept `vercel.json` minimal: no rewrites or routes since static export serves files from `/out` directly; OAuth routes are handled in Plan 02

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added .env.local.example gitignore exception**
- **Found during:** Task 2 (Document environment variables and protect secrets)
- **Issue:** `.gitignore` had `.env*` wildcard which would prevent `.env.local.example` from being committed, making env var documentation unavailable in the repo
- **Fix:** Added `!.env.local.example` exception line after `.env*` in `.gitignore`
- **Files modified:** `.gitignore`
- **Verification:** `git check-ignore -v .env.local.example` confirms file is unignored; `.env.local` remains protected
- **Committed in:** d584754 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (missing critical — gitignore exception for committed docs file)
**Impact on plan:** Essential for the `.env.local.example` file to actually be committable and useful. No scope creep.

## Issues Encountered
None — build was already working correctly via existing `next.config.ts` static export configuration.

## User Setup Required
**External services require manual configuration before OAuth works in production:**

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set Authorization callback URL to `https://YOUR-VERCEL-DOMAIN.vercel.app/api/auth/callback`
3. In Vercel Dashboard > Your Project > Settings > Environment Variables, add:
   - `GITHUB_CLIENT_ID` — from your GitHub OAuth App
   - `GITHUB_CLIENT_SECRET` — from your GitHub OAuth App
   - Set scope to "Production" for both

See `.env.local.example` in the project root for the full instructions.

## Next Phase Readiness
- Static build verified and working: 35 pages rendered to `/out`
- `vercel.json` ready for Vercel to import and deploy the repo
- Env var documentation in place so user knows what to set before pushing
- Plan 02 (GitHub OAuth serverless handlers) can proceed — it will add `/api/auth/*` Vercel Functions for the Decap CMS OAuth flow

---
*Phase: 04-deployment*
*Completed: 2026-02-22*
