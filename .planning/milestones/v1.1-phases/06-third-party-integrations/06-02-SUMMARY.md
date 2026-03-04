---
phase: 06-third-party-integrations
plan: "02"
subsystem: api

tags: [instagram, graph-api, next-api-routes, vercel-cron, next-image]

# Dependency graph
requires:
  - phase: 06-third-party-integrations
    provides: Instagram research and implementation approach decision (06-01)
provides:
  - Server-side Instagram Graph API proxy at /api/instagram/feed
  - Daily token refresh cron job endpoint at /api/instagram/refresh-token
  - next.config.ts image remotePatterns for **.cdninstagram.com
  - vercel.json daily cron schedule (0 3 * * *) for token TTL maintenance
affects:
  - 06-03 (InstagramFeed client component that calls /api/instagram/feed)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Server-side proxy Route Handler for CORS-blocked third-party APIs (force-dynamic, upstream fetch with revalidate)
    - Graceful degradation: always return 200 with empty array on failure, never 500 from feed endpoint
    - Vercel cron for long-lived token TTL maintenance (daily refresh before 60-day expiry)

key-files:
  created:
    - src/app/api/instagram/feed/route.ts
    - src/app/api/instagram/refresh-token/route.ts
  modified:
    - next.config.ts
    - vercel.json

key-decisions:
  - "force-dynamic on feed route prevents route-level caching; upstream fetch uses revalidate: 3600 for server-side 1-hour cache"
  - "Feed endpoint never returns 500 — all failures (missing token, API error, network error) return { posts: [] } with 200"
  - "Token refresh endpoint cannot update Vercel env vars at runtime — daily cron extends the 60-day window of the original token value"
  - "Filtered to IMAGE and CAROUSEL_ALBUM only — VIDEO posts lack media_url field"

patterns-established:
  - "Third-party API proxy pattern: server Route Handler reads env token, fetches upstream, returns normalized response"
  - "Graceful degradation: { posts: [] } with status 200 on any failure — client component receives consistent shape"

requirements-completed: [INST-01]

# Metrics
duration: 1min
completed: 2026-03-04
---

# Phase 6 Plan 02: Instagram API Infrastructure Summary

**Server-side Instagram Graph API proxy with daily Vercel cron for token TTL maintenance, graceful degradation on all failure paths**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-04T20:04:42Z
- **Completed:** 2026-03-04T20:05:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created `/api/instagram/feed` Route Handler that proxies Instagram Graph API with 1-hour server-side cache and graceful degradation (always returns `{ posts: [] }` with 200 on failure)
- Created `/api/instagram/refresh-token` Route Handler called by Vercel cron to extend token TTL daily before 60-day expiry
- Added `images.remotePatterns` in `next.config.ts` for `**.cdninstagram.com` to enable `next/image` with Instagram CDN URLs
- Added Vercel cron schedule (`0 3 * * *`) in `vercel.json` pointing to the refresh-token endpoint

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Instagram feed Route Handler proxy** - `d1138b6` (feat)
2. **Task 2: Create token refresh route, vercel cron, and next.config image domains** - `62f040d` (feat)

## Files Created/Modified

- `src/app/api/instagram/feed/route.ts` - Server-side proxy: reads `INSTAGRAM_ACCESS_TOKEN`, fetches up to 9 IMAGE/CAROUSEL_ALBUM posts, returns `{ posts: [] }` on any failure
- `src/app/api/instagram/refresh-token/route.ts` - Cron target: calls `graph.instagram.com/refresh_access_token` to extend token TTL without updating env vars
- `next.config.ts` - Added `images.remotePatterns` allowing `**.cdninstagram.com` for `next/image`
- `vercel.json` - Added `"crons"` array with daily schedule (`0 3 * * *`) for `/api/instagram/refresh-token`

## Decisions Made

- `force-dynamic` on feed route prevents route-level caching; upstream `fetch` uses `{ next: { revalidate: 3600 } }` for 1-hour server-side cache — balances freshness with rate limits
- Feed endpoint never returns 500 — all failure paths return `{ posts: [] }` with status 200 so the client component always receives a consistent response shape
- Token refresh endpoint cannot update Vercel env vars at runtime; this is documented as a known limitation — the daily cron keeps the existing token alive by continuously extending its 60-day window
- Filtered posts to `IMAGE` and `CAROUSEL_ALBUM` only — `VIDEO` posts lack `media_url` which is required for display

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

**INSTAGRAM_ACCESS_TOKEN** environment variable must be set in Vercel project settings before the feed or refresh endpoints are functional. Without it:
- `/api/instagram/feed` returns `{ "posts": [] }` (graceful degradation — no error)
- `/api/instagram/refresh-token` returns `{ "error": "No token configured" }` with status 500

Obtain a long-lived Instagram access token via the Instagram Graph API token generation flow and add it as `INSTAGRAM_ACCESS_TOKEN` in Vercel environment variables.

## Next Phase Readiness

- `/api/instagram/feed` endpoint is ready for the `InstagramFeed` client component (Plan 06-03) to call
- Response contract matches the `InstagramPost` interface expected by the client component
- Cron job will activate automatically on Vercel deploy once `INSTAGRAM_ACCESS_TOKEN` is set

---
*Phase: 06-third-party-integrations*
*Completed: 2026-03-04*

## Self-Check: PASSED

- src/app/api/instagram/feed/route.ts: FOUND
- src/app/api/instagram/refresh-token/route.ts: FOUND
- next.config.ts: FOUND (modified)
- vercel.json: FOUND (modified)
- 06-02-SUMMARY.md: FOUND
- Commit d1138b6: FOUND
- Commit 62f040d: FOUND
