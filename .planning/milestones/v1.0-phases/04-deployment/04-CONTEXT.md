# Phase 4: Deployment - Context

**Gathered:** 2026-02-21
**Status:** Ready for planning

<domain>
## Phase Boundary

Export the Next.js site as a static build and deploy it to Vercel at a public URL. Configure Decap CMS to work in production with GitHub OAuth authentication. Domain setup and ongoing hosting operations are out of scope.

</domain>

<decisions>
## Implementation Decisions

### Hosting Platform
- Deploy to **Vercel** (not GitHub Pages)
- New Vercel project — repo not yet connected
- Static export strategy (`output: 'export'` vs Vercel native runtime) — Claude's discretion, pick best fit for Next.js + Decap CMS
- Phase delivers config and build setup only — user will connect repo and deploy manually via Vercel dashboard or CLI

### Deploy Workflow
- Auto-deploy on push to main (standard Vercel behavior)
- Use Vercel defaults for preview deployments (preview URLs per branch/PR)
- Pre-build steps beyond `next build` are uncertain — Claude investigates during implementation
- Simple setup: main → production only, no staging environment

### CMS in Production
- Small team of editors (all with GitHub accounts) need access to `/admin`
- GitHub OAuth for authentication — Claude picks simplest working OAuth handler for Vercel (e.g. Vercel serverless function)
- Immediate publish: CMS save → commit to main → auto-deploy → live within minutes
- `/admin` URL is publicly accessible — GitHub OAuth is the only access control needed

### Claude's Discretion
- Whether to use `output: 'export'` or Vercel native Next.js runtime
- OAuth handler implementation (serverless function approach)
- Any pre-build steps needed for data/content

</decisions>

<specifics>
## Specific Ideas

- No specific references or examples provided — open to standard Vercel + Decap CMS deployment approaches

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-deployment*
*Context gathered: 2026-02-21*
