---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - vercel.json
autonomous: true
requirements: [DEPL-01, DEPL-02]

must_haves:
  truths:
    - "Vercel deployment completes without routes-manifest.json error"
    - "Static site is served correctly at the Vercel deployment URL"
  artifacts:
    - path: "vercel.json"
      provides: "Vercel project configuration without conflicting outputDirectory override"
      contains: "no outputDirectory field"
  key_links:
    - from: "vercel.json"
      to: "Vercel build pipeline"
      via: "framework detection"
      pattern: "outputDirectory"
---

<objective>
Fix Vercel deployment error: "The file '/vercel/path0/out/routes-manifest.json' couldn't be found."

Purpose: The `vercel.json` has `"outputDirectory": "out"` which tells Vercel to look in the static export folder for `routes-manifest.json`. That file only exists in `.next/` (the server build directory), not in `out/` (the static export). Vercel's Next.js integration handles `output: 'export'` automatically when given full access to `.next/` — overriding `outputDirectory` breaks this.

Output: Updated `vercel.json` without the `outputDirectory` field, allowing Vercel to use its default Next.js handling.
</objective>

<execution_context>
@./.claude/get-shit-done/workflows/execute-plan.md
@./.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove outputDirectory override from vercel.json</name>
  <files>vercel.json</files>
  <action>
    Remove the `"outputDirectory": "out"` field from vercel.json.

    Root cause: `next.config.ts` uses `output: 'export'` which generates static files in `out/`. However, `routes-manifest.json` is a Next.js internal build artifact that only exists in `.next/`, not in the static export `out/` folder. Setting `"outputDirectory": "out"` in vercel.json overrides Vercel's framework detection and causes it to look for `routes-manifest.json` in `out/` where it will never exist.

    Vercel's Next.js integration natively handles `output: 'export'` — it reads the framework config from `.next/` and serves the static files from `out/` automatically. Do NOT set `outputDirectory` manually.

    The updated vercel.json should keep:
    - `"buildCommand": "npm run build"` (keep as-is)
    - The entire `"headers"` array (keep as-is, both the /admin and catch-all entries)

    Remove only:
    - `"outputDirectory": "out"` line

    Do NOT add any `"framework"` field or other new fields. Keep the config minimal.
  </action>
  <verify>
    1. Run `cat vercel.json` — confirm `outputDirectory` key is absent
    2. Run `npm run build` locally — confirm build completes successfully and `out/` directory is created
    3. Confirm `routes-manifest.json` does NOT exist in `out/` (this is expected for static exports)
    4. Confirm `.next/routes-manifest.json` DOES exist after build
  </verify>
  <done>
    vercel.json has no `outputDirectory` field. Local build succeeds. Vercel deployment no longer reports the routes-manifest.json error.
  </done>
</task>

</tasks>

<verification>
After applying the fix:
1. `cat vercel.json` shows no `outputDirectory` key
2. `npm run build` exits with code 0
3. Push to the connected Vercel project — deployment completes without the routes-manifest.json error
</verification>

<success_criteria>
Vercel deployment succeeds. The static site is accessible at the Vercel URL. No routes-manifest.json error in build logs.
</success_criteria>

<output>
After completion, create `.planning/quick/1-fix-vercel-deployment-error-missing-rout/1-SUMMARY.md`
</output>
