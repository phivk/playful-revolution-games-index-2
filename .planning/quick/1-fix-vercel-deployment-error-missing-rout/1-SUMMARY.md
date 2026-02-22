---
phase: quick
plan: 1
subsystem: deployment
tags: [vercel, deployment, config, fix]
dependency_graph:
  requires: []
  provides: [working-vercel-deployment]
  affects: [vercel-build-pipeline]
tech_stack:
  added: []
  patterns: [minimal-vercel-config, framework-detection]
key_files:
  created: []
  modified:
    - vercel.json
decisions:
  - Removed outputDirectory override to let Vercel handle Next.js output:export natively
metrics:
  duration: "~2 minutes"
  completed: "2026-02-22"
  tasks_completed: 1
  files_modified: 1
---

# Quick Task 1: Fix Vercel Deployment Error (Missing routes-manifest.json) Summary

**One-liner:** Removed `outputDirectory: "out"` from vercel.json so Vercel's native Next.js integration can locate routes-manifest.json in .next/ instead of failing when looking for it in the static export out/ folder.

---

## What Was Done

Removed the `"outputDirectory": "out"` field from `vercel.json`.

**Root cause:** `next.config.ts` uses `output: 'export'` which generates static files in `out/`. However, `routes-manifest.json` is a Next.js internal build artifact that only exists in `.next/`, not in the static export `out/` folder. Setting `"outputDirectory": "out"` in vercel.json overrode Vercel's framework detection, causing it to look for `routes-manifest.json` in `out/` where it will never exist.

**Fix:** Vercel's Next.js integration natively handles `output: 'export'` — it reads framework config from `.next/` and serves static files from `out/` automatically. Removing the manual `outputDirectory` override allows this to work correctly.

---

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Remove outputDirectory override from vercel.json | fa1b4ad | vercel.json |

---

## Verification Results

- `vercel.json` has no `outputDirectory` field — confirmed
- `npm run build` exits with code 0 — 35 static pages generated successfully
- `routes-manifest.json` does NOT exist in `out/` — confirmed (expected for static exports)
- `.next/routes-manifest.json` DOES exist after build — confirmed

---

## Deviations from Plan

None - plan executed exactly as written.

---

## Self-Check: PASSED

- File `vercel.json` exists and has no `outputDirectory` field: FOUND
- Commit `fa1b4ad` exists: FOUND
- Build output `out/` directory exists: FOUND
- `.next/routes-manifest.json` exists: FOUND
