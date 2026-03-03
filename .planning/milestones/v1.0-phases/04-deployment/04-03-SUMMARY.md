---
phase: 04-deployment
plan: "03"
subsystem: infra
tags: [vercel, decap-cms, github-oauth, deployment]

# Dependency graph
requires:
  - phase: 04-deployment/04-01
    provides: vercel.json deployment configuration
  - phase: 04-deployment/04-02
    provides: GitHub OAuth serverless functions (api/oauth/authorize.ts, api/auth/callback.ts)
provides:
  - Live site on Vercel at public URL
  - Working Decap CMS admin with GitHub OAuth authentication
  - Facilitators can browse games on mobile at public URL
  - Admins can authenticate and manage games via /admin
affects: [end-users, facilitators, admins]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Manual Vercel deployment via dashboard (not CLI) — no Vercel auth required in Claude
    - GitHub OAuth App created in GitHub settings, credentials stored as Vercel env vars

key-files:
  created: []
  modified:
    - public/admin/config.yml - Update YOUR-GITHUB-USERNAME placeholder with real username (manual step)

key-decisions:
  - "config.yml repo field must be updated with actual GitHub username before deployment"
  - "GitHub OAuth App callback URL must exactly match Vercel deployment URL"

patterns-established:
  - "Vercel env vars (GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET) set via dashboard for Production scope only"

requirements-completed: [DEPL-02]

# Metrics
duration: pending — awaiting user deployment
completed: 2026-02-22
---

# Phase 4 Plan 03: Vercel Deployment & CMS Verification Summary

**Manual Vercel deployment with GitHub OAuth App configuration — guides user through one-time dashboard setup for live site with Decap CMS admin**

## Performance

- **Duration:** Pending (awaiting user manual steps)
- **Started:** 2026-02-22T16:10:24Z
- **Completed:** 2026-02-22
- **Tasks:** 0/2 (both are manual checkpoints)
- **Files modified:** 1 (config.yml username update — user action)

## Accomplishments
- All code from Plans 01 and 02 is deployment-ready
- Checkpoint instructions prepared for GitHub OAuth App creation
- Checkpoint instructions prepared for Vercel project connection with env vars
- End-to-end verification checklist prepared for post-deployment testing

## Task Commits

No automated task commits — both tasks are manual checkpoints requiring user action.

**Plan metadata:** (pending final metadata commit)

## Files Created/Modified
- `public/admin/config.yml` - Requires user to replace `YOUR-GITHUB-USERNAME` with actual GitHub username

## Decisions Made
- All code was completed in Plans 01 and 02; Plan 03 is a guided human-action plan
- config.yml placeholder must be updated with real GitHub username before deploying

## Deviations from Plan

None - plan is a checkpoint plan with no automated tasks.

## Issues Encountered
None

## User Setup Required

**Manual steps required before this plan is complete:**

1. **Create GitHub OAuth App** at https://github.com/settings/developers
   - Application name: `Playful Revolution Games CMS`
   - Homepage URL: `https://YOUR-PROJECT.vercel.app`
   - Authorization callback URL: `https://YOUR-PROJECT.vercel.app/api/auth/callback`
   - Copy Client ID and generate + copy Client Secret

2. **Update config.yml** — replace `YOUR-GITHUB-USERNAME` with actual GitHub username, commit and push

3. **Connect repo to Vercel** at https://vercel.com/new
   - Import GitHub repository
   - Add environment variables: `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (Production scope)
   - Deploy

4. **Update GitHub OAuth App callback URL** with the real Vercel URL after deploy

5. **Verify** site loads, /admin shows Decap CMS login, GitHub OAuth flow completes

## Next Phase Readiness
- Phase 4 (Deployment) will be complete once user verifies live deployment
- No further code changes needed after username placeholder is updated

---
*Phase: 04-deployment*
*Completed: 2026-02-22*

## Self-Check: PENDING

This summary is created at checkpoint time. No automated files were created/modified — self-check will complete after user verification.
