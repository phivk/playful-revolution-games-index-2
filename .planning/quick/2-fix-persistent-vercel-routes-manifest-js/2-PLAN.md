---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - vercel.json
autonomous: false
requirements: [DEPL-01]

must_haves:
  truths:
    - "Vercel deployment completes without routes-manifest.json error"
    - "Static site is served correctly from the out/ directory"
  artifacts:
    - path: "vercel.json"
      provides: "Explicit outputDirectory pointing to .next so Vercel finds routes-manifest.json"
      contains: "outputDirectory"
  key_links:
    - from: "vercel.json"
      to: ".next/routes-manifest.json"
      via: "outputDirectory: .next"
      pattern: "outputDirectory.*\\.next"
---

<objective>
Fix the persistent Vercel deployment error: `The file "/vercel/path0/out/routes-manifest.json" couldn't be found`.

Purpose: Vercel's Next.js framework adapter requires `routes-manifest.json`, which lives in `.next/` (not `out/`). Despite removing `outputDirectory: "out"` in Quick Task 1, Vercel is still resolving to `out/` — likely because the Vercel project dashboard "Output Directory" setting is overriding `vercel.json`, or Vercel auto-detects `out/` from the `output: 'export'` config. Setting `outputDirectory: ".next"` explicitly in `vercel.json` forces Vercel to find build artifacts (including `routes-manifest.json`) in the correct location.

Output: Updated `vercel.json` with `outputDirectory: ".next"` + confirmation the deployment succeeds.
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
  <name>Task 1: Set outputDirectory to .next in vercel.json</name>
  <files>vercel.json</files>
  <action>
Add `"outputDirectory": ".next"` to `vercel.json`. This explicitly tells Vercel where to find `routes-manifest.json` and other build artifacts produced by the Next.js build step, overriding any conflicting dashboard setting.

The file currently contains `buildCommand` and `headers`. Add `outputDirectory` as a top-level field alongside `buildCommand`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "headers": [...]
}
```

Do NOT change `buildCommand`, `headers`, or any other fields. Only add the `outputDirectory` field.

Note: `output: 'export'` in `next.config.ts` causes Next.js to emit static HTML/CSS/JS to `out/`. Vercel's adapter still expects to inspect `.next/routes-manifest.json` for routing metadata before serving the static output. Setting `outputDirectory: ".next"` satisfies this requirement while the static export in `out/` is served correctly.
  </action>
  <verify>Run `cat vercel.json` and confirm `"outputDirectory": ".next"` is present as a top-level field. Run `npm run build` locally to confirm `.next/routes-manifest.json` exists after a build.</verify>
  <done>`vercel.json` contains `"outputDirectory": ".next"` and `.next/routes-manifest.json` exists after `npm run build`.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Updated vercel.json with `outputDirectory: ".next"` to fix routes-manifest.json lookup path.</what-built>
  <how-to-verify>
1. Commit and push the `vercel.json` change to trigger a new Vercel deployment.
2. Watch the Vercel deployment log. Confirm the error `The file "/vercel/path0/out/routes-manifest.json" couldn't be found` does NOT appear.
3. Confirm the deployment completes successfully and the site loads at the Vercel URL.

IMPORTANT — If the error persists after this code fix, you must also clear the "Output Directory" field in the Vercel project dashboard:
- Go to Vercel Dashboard → your project → Settings → General → Build & Output Settings
- Find "Output Directory" — if it is set to `out`, clear it (leave it blank or delete the override)
- Trigger a new deployment after clearing it

Dashboard settings can override `vercel.json` and may be the reason the `out/` path persists despite the code fix.
  </how-to-verify>
  <resume-signal>Type "approved" if deployment succeeds, or describe the error you see.</resume-signal>
</task>

</tasks>

<verification>
- `vercel.json` contains `"outputDirectory": ".next"`
- Vercel deployment log shows no `routes-manifest.json` error
- Site is accessible at the Vercel URL
</verification>

<success_criteria>
Vercel deployment completes without the routes-manifest.json error and the static site is live.
</success_criteria>

<output>
After completion, create `.planning/quick/2-fix-persistent-vercel-routes-manifest-js/2-SUMMARY.md` summarising what was changed and confirmed.
</output>
