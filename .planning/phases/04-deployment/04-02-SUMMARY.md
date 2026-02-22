---
phase: 04-deployment
plan: "02"
subsystem: auth
tags: [oauth, github-oauth, decap-cms, vercel, serverless, typescript]

# Dependency graph
requires:
  - phase: 03-design-cms
    provides: Decap CMS admin panel at /admin with config.yml
provides:
  - GitHub OAuth authorize endpoint at /api/oauth/authorize
  - GitHub OAuth callback endpoint at /api/auth/callback
  - Decap CMS backend configured for GitHub OAuth authentication
affects: [04-deployment]

# Tech tracking
tech-stack:
  added: ["@vercel/node (dev dependency - VercelRequest/VercelResponse types)"]
  patterns:
    - "Root-level api/ directory for Vercel serverless functions independent of Next.js static export"
    - "postMessage protocol for Decap CMS OAuth token handoff"

key-files:
  created:
    - api/oauth/authorize.ts
    - api/auth/callback.ts
  modified:
    - public/admin/config.yml

key-decisions:
  - "Use root-level api/ directory (not src/app/api/) so Vercel handles functions independently of Next.js output: export"
  - "Use backend name: github (not git-gateway) for direct GitHub OAuth without Netlify Identity dependency"
  - "Store GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET as environment variables - never hardcoded"

patterns-established:
  - "Vercel serverless functions for server-side secret handling alongside static Next.js export"

requirements-completed: [DEPL-02]

# Metrics
duration: 1min
completed: 2026-02-22
---

# Phase 4 Plan 02: GitHub OAuth for Decap CMS Summary

**Vercel serverless OAuth handlers at /api/oauth/authorize and /api/auth/callback enable Decap CMS GitHub login with GITHUB_CLIENT_SECRET kept server-side**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-22T16:06:11Z
- **Completed:** 2026-02-22T16:07:30Z
- **Tasks:** 2
- **Files modified:** 4 (2 created, 2 modified)

## Accomplishments
- Created `api/oauth/authorize.ts` — redirects users to GitHub OAuth login with client_id, redirect_uri (from host header), scope, and random state for CSRF
- Created `api/auth/callback.ts` — exchanges GitHub OAuth code for access token using GITHUB_CLIENT_SECRET from env, returns postMessage in exact format Decap CMS expects (`authorization:github:success:{token,provider}`)
- Updated `public/admin/config.yml` to use `name: github` backend with `auth_endpoint: api/oauth/authorize` and placeholder repo field
- Static build (`npm run build`) unaffected — root-level api/ files are ignored by Next.js static export, handled by Vercel platform layer

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GitHub OAuth serverless functions** - `1dc1301` (feat)
2. **Task 2: Update Decap CMS config to use custom OAuth endpoints** - `62137c6` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `api/oauth/authorize.ts` - GitHub OAuth authorize redirect handler; reads GITHUB_CLIENT_ID from env, builds authorize URL with scope and state, redirects
- `api/auth/callback.ts` - GitHub OAuth token exchange handler; reads GITHUB_CLIENT_SECRET from env, POSTs to github.com/login/oauth/access_token, sends postMessage response to Decap CMS window
- `public/admin/config.yml` - Decap CMS backend config updated from git-gateway to github with custom auth_endpoint; includes placeholder repo field and setup comment
- `package.json` / `package-lock.json` - Added @vercel/node as dev dependency for TypeScript types

## Decisions Made
- Used `name: github` backend (not `git-gateway`) — git-gateway requires Netlify Identity which is not available on Vercel; direct GitHub backend with custom OAuth handler is the correct approach for Vercel deployment
- Placed functions in root `api/` directory so Vercel's platform serves them independently of Next.js `output: 'export'` static build — no conflict
- Credentials read from process.env throughout — no hardcoded secrets anywhere in the codebase

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None - TypeScript check passed cleanly, build succeeded without changes.

## User Setup Required

Before deploying, the user must:

1. **Update the `repo` field in `public/admin/config.yml`** — replace `YOUR-GITHUB-USERNAME` with the actual GitHub username (e.g., `phivk/playful-revolution-games-index-2`)

2. **Create a GitHub OAuth App** in GitHub Settings > Developer settings > OAuth Apps:
   - Homepage URL: your Vercel deployment URL
   - Authorization callback URL: `https://your-vercel-domain.vercel.app/api/auth/callback`

3. **Set environment variables in Vercel dashboard** (Settings > Environment Variables):
   - `GITHUB_CLIENT_ID` — from the GitHub OAuth App
   - `GITHUB_CLIENT_SECRET` — from the GitHub OAuth App

## Next Phase Readiness
- OAuth serverless functions are ready — deploy to Vercel and configure env vars to activate
- Phase 4 Plan 01 (Vercel deployment config) covers the deployment setup that activates these endpoints
- All static build output is unaffected — site works without these env vars (they're only needed at CMS login time)

---
*Phase: 04-deployment*
*Completed: 2026-02-22*

## Self-Check: PASSED

- api/oauth/authorize.ts: FOUND
- api/auth/callback.ts: FOUND
- public/admin/config.yml: FOUND
- .planning/phases/04-deployment/04-02-SUMMARY.md: FOUND
- Commit 1dc1301: FOUND
- Commit 62137c6: FOUND
