---
phase: quick-2
plan: 01
subsystem: infra
tags: [vercel, next.js, deployment, static-export]

# Dependency graph
requires:
  - phase: quick-1
    provides: "Removed outputDirectory: out from vercel.json (prior fix attempt)"
provides:
  - "vercel.json with explicit outputDirectory: .next to satisfy Vercel's routes-manifest.json lookup"
affects: [04-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [outputDirectory in vercel.json must point to .next not out/ for Next.js static export on Vercel]

key-files:
  created: []
  modified: [vercel.json]

key-decisions:
  - "Set outputDirectory to .next (not out/) so Vercel's adapter finds routes-manifest.json in the correct location"
  - "Did not change buildCommand or headers — only the outputDirectory field was added"

patterns-established:
  - "vercel.json outputDirectory: .next is required for Next.js projects using output: export even though static HTML lands in out/"

requirements-completed: [DEPL-01]

# Metrics
duration: 1min
completed: 2026-02-22
---

# Quick Task 2: Fix Persistent Vercel routes-manifest.json Error Summary

**Added `"outputDirectory": ".next"` to vercel.json so Vercel's Next.js adapter resolves routes-manifest.json from the correct build directory instead of the static export out/ folder.**

## Performance

- **Duration:** ~1 min
- **Started:** 2026-02-22T19:25:57Z
- **Completed:** 2026-02-22T19:26:31Z
- **Tasks:** 1 auto task completed; 1 checkpoint:human-verify documented (awaiting user)
- **Files modified:** 1

## Accomplishments
- Added `"outputDirectory": ".next"` to `vercel.json` as a top-level field alongside `buildCommand`
- Verified `npm run build` succeeds and `.next/routes-manifest.json` is present after the build
- Committed change ready to push for Vercel re-deployment

## Task Commits

Each task was committed atomically:

1. **Task 1: Set outputDirectory to .next in vercel.json** - `5ee3403` (fix)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `/vercel.json` - Added `"outputDirectory": ".next"` field so Vercel finds routes-manifest.json in .next/ instead of out/

## Decisions Made
- Only added the single `outputDirectory` field — no other fields in vercel.json were touched
- `.next` is the correct value because Vercel's Next.js framework adapter inspects `.next/routes-manifest.json` for routing metadata even when the static HTML is exported to `out/`

## Deviations from Plan
None - plan executed exactly as written.

## Issues Encountered
None — build passed cleanly on first attempt and `.next/routes-manifest.json` was confirmed present.

## Checkpoint: Human Verification Required

**Task 2 is a `checkpoint:human-verify` — no code changes needed, but the following steps must be completed by the user to confirm the fix works on Vercel.**

### Verification Steps

1. Push the `vercel.json` change to trigger a new Vercel deployment:
   ```bash
   git push
   ```

2. Watch the Vercel deployment log. Confirm the error:
   ```
   The file "/vercel/path0/out/routes-manifest.json" couldn't be found
   ```
   does NOT appear.

3. Confirm the deployment completes successfully and the site loads at the Vercel URL.

### If the Error Persists

If the `routes-manifest.json` error still appears after pushing this fix, you must also clear the "Output Directory" override in the Vercel project dashboard:

- Go to **Vercel Dashboard** → your project → **Settings** → **General** → **Build & Output Settings**
- Find "Output Directory" — if it is set to `out`, **clear it** (leave it blank or delete the override)
- Trigger a new deployment after clearing it

Dashboard settings can override `vercel.json` and may be the reason the `out/` path persists despite the code fix.

### Resume Signal
- If deployment succeeds: continue — the fix is confirmed.
- If deployment fails: describe the error seen so the next step can be determined.

## User Setup Required
None beyond pushing the branch and checking the Vercel deployment log (see Checkpoint section above).

## Next Phase Readiness
- `vercel.json` is correctly configured with `outputDirectory: ".next"`
- Once Vercel deployment is confirmed working, Phase 4 Plan 3 (deployment verification) can resume

---
*Phase: quick-2*
*Completed: 2026-02-22*
