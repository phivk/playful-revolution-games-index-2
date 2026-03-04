# Project Research Summary

**Project:** Playful Revolution Games Index v1.1
**Domain:** Next.js static export with CMS-managed singleton pages and third-party service embeds
**Researched:** 2026-03-04
**Confidence:** HIGH

## Executive Summary

The v1.1 release requires adding an about page with CMS content management and a newsletter signup form powered by Sender.net. Based on research of the existing stack and architectural patterns, **no new npm dependencies are required**—the solution leverages existing Next.js 16.1.6, Decap CMS, and gray-matter. The about page will follow a singleton file collection pattern in Decap CMS (storing content in `/content/about.md`), while the newsletter form will be embedded via Next.js Script component for client-side injection. The primary risks are: (1) the Decap CMS file must exist in Git before the CMS can manage it, (2) third-party script loading timing can cause forms to fail silently, and (3) static export rebuild delays mean CMS edits don't appear live until Vercel redeploys. All risks are preventable with proper setup and testing.

## Key Findings

### Recommended Stack

**No new npm dependencies required.** The existing stack (Next.js 16.1.6, React 19.2.3, Decap CMS via CDN, Tailwind CSS 4.x, gray-matter 4.0.3) is sufficient for about page and newsletter integration. Sender.net provides an embedded form script (loaded via `<Script>` component), not an npm package. This keeps the static export pipeline clean and adds no build-time complexity.

**Core technologies:**
- **Next.js 16.1.6** — Supports `next/script` component for third-party embed injection; static export (`output: 'export'`) works with client-side script injection
- **React 19.2.3** — Component-based about page; Script component is built-in
- **Decap CMS (CDN)** — File collections enable singleton pattern for about page; no npm install needed
- **Tailwind CSS 4.x** — About page uses same design system as existing site
- **gray-matter 4.0.3** — Parse about.md frontmatter for metadata (org name, social links)
- **Sender.net embed script** — JavaScript-based form injection (no npm package; Sender.net doesn't publish official packages)

### Expected Features

**Must have (table stakes):**
- About page text (CMS-editable) — Core site navigation includes About link; users expect organizational content
- Organization name display — Standard site identity information
- Newsletter signup form — Industry standard for subscriber capture; users expect signup mechanism
- Social media links — Standard practice for organizations to show connection points
- Mobile-responsive layout — Facilitators access on phones; all pages must work on mobile

**Should have (competitive differentiators):**
- About page as entry point to brand story — Communicate movement values beyond game listings
- One-click newsletter signup integration — Users subscribe without leaving site; low friction
- Customizable about page without code — Non-technical admins can update info via CMS
- Pre-rendered static about page — Part of static export, instant load, no third-party API dependency

**Defer to v2+ (avoid scope creep):**
- Multiple about pages (i18n/localization) — Adds CMS complexity; defer until validated need
- Comment section on about page — Introduces real-time backend dependency; breaks static export model
- Form analytics/tracking — Sender.net already provides form analytics in dashboard; no custom needed
- Multi-step newsletter signup — Increases form friction; start with single-step email capture

### Architecture Approach

The about page follows the existing content pipeline pattern: static content in `/content/about.md` is loaded at build time via `getAboutPage()`, parsed by gray-matter, and rendered by a server component. The newsletter signup form is wrapped in a client component that loads the Sender.net embed script using `next/script` with `strategy="afterInteractive"` to ensure DOM exists before script runs.

**Major components:**
1. **`src/app/about/page.tsx`** — Server component that loads about content and renders layout with newsletter signup
2. **`src/components/NewsletterSignup.tsx`** — Client component managing Sender.net embed script loading and form container
3. **`src/lib/about.ts`** — Data loader function (mirrors existing games.ts pattern) to read and parse `/content/about.md`
4. **Decap CMS file collection** — Configuration in `public/admin/config.yml` to manage `/content/about.md` as singleton

**Key patterns:**
- File-based content with gray-matter parsing (build-time, not runtime)
- Server components for static content + client components for interactive embeds
- Decap CMS file collection (singleton) vs. folder collection (multi-item)
- External script injection via Next.js Script component with afterInteractive strategy

### Critical Pitfalls

1. **Decap CMS file pre-existence requirement** — File collections require the file to exist in Git before CMS can manage it. If you configure the collection without first committing `/content/about.md`, editors will see no way to edit the about page. Mitigation: Create and commit the about page file to Git before enabling CMS; this is non-obvious and a common blocker.

2. **Sender.net embed script loading fails silently** — Third-party scripts have unpredictable loading order. The form wrapper HTML may render before Sender.net script loads and initializes, leaving the form blank. Mitigation: Use Next.js `<Script>` component instead of raw `<script>` tags; set `strategy="afterInteractive"` to ensure DOM exists; wrap in client component; test on slow networks (DevTools → Network throttling); add `onLoad` callback to verify Sender.net initialized.

3. **Static build doesn't trigger on CMS edits** — Decap CMS commits changes to Git, but static exports don't rebuild automatically (ISR not supported). Edits appear in Git but not live until Vercel redeploys. Mitigation: Set up Vercel GitHub integration for auto-deploy on every push; document editor expectations ("changes live in 5-10 seconds"); consider webhook to trigger rebuild on CMS publish.

4. **Hydration mismatch breaking form interactivity** — If about page component uses dynamic values (Date.now(), browser APIs) for any reason, server-rendered content differs from client-rendered content, React throws hydration error, and form becomes unclickable. Mitigation: Avoid dynamic values in about page component; use useEffect for anything browser-dependent; verify no "Hydration mismatch" errors in dev console.

5. **GitHub API rate limit exhaustion** — Decap CMS uses GitHub API to read/write files. With multiple editors or relation widgets, API calls accumulate; rate limit (5,000/hour for personal tokens) gets hit and CMS freezes. Mitigation: Monitor API usage in GitHub settings; minimize relation widgets; enable GraphQL optimization in Decap config (`use_graphql: true`); warn team about concurrent edit limits.

## Implications for Roadmap

Based on research, suggested phase structure for v1.1:

### Phase 1: CMS Configuration & Content Structure
**Rationale:** File collection pre-existence requirement means CMS setup must happen before feature work. Creating the file and updating config.yml blocks downstream work.
**Delivers:** Functional Decap CMS file collection for about page content management
**Addresses features:** About page text, organization name (via CMS fields)
**Avoids pitfalls:** Decap file pre-existence blocking editors; hydration mismatch by keeping content static
**Research flags:** None—well-established Decap pattern, verified against official docs

### Phase 2: About Page Component & Content Rendering
**Rationale:** Depends on Phase 1 (needs about.md file in Git); builds static content rendering infrastructure
**Delivers:** Functional about page at `/about` route with CMS content displayed; navigation links updated
**Addresses features:** About page text rendering, mobile responsiveness, organization name display
**Avoids pitfalls:** Hydration mismatch by using server components for static content
**Research flags:** None—mirrors existing games.ts pattern, standard Next.js architecture

### Phase 3: Social Media Links Feature
**Rationale:** Depends on Phase 2 (requires about page component to exist); MEDIUM complexity with CMS list widget
**Delivers:** Social media links rendered from CMS data on about page with icon/link components
**Addresses features:** Social media links display (table stakes); supports brand identity differentiator
**Avoids pitfalls:** URL validation in CMS config to prevent broken/malicious links
**Research flags:** Minimal—straightforward frontend rendering, CMS list widget well-documented

### Phase 4: Newsletter Signup Form Integration
**Rationale:** Independent of other phases but typically placed on about page; requires most careful script integration
**Delivers:** Sender.net embedded form rendering correctly on about page; form submits to Sender.net
**Addresses features:** Newsletter signup form (table stakes); one-click signup differentiator
**Avoids pitfalls:** Script loading failures via next/script component + afterInteractive strategy; hydration mismatch by isolating form in client component; script loading timing via explicit onLoad callback
**Research flags:** HIGH—requires careful testing on slow networks and different browsers; test form appearance, submission, and Sender.net dashboard confirmation

### Phase 5: Testing, QA & Deploy
**Rationale:** Final phase; covers integration testing, CMS editor validation, and production deployment
**Delivers:** Verified about page, CMS editor workflow, newsletter subscription flow; deployed to production
**Addresses features:** All features from Phases 1-4
**Avoids pitfalls:** Validates Decap CMS editor experience (file exists, fields render correctly); tests Sender.net form on production; confirms static build rebuilds on CMS edits; verifies mobile responsiveness; tests without JavaScript enabled
**Research flags:** Implementation-specific testing—verify all pitfalls from PITFALLS.md before production

### Phase Ordering Rationale

- **Phases 1 & 2 are sequential:** CMS file must exist (Phase 1) before page component can load it (Phase 2). File pre-existence is blocking.
- **Phase 3 builds on Phase 2:** Social links are rendered in the about page component; cannot exist independently.
- **Phase 4 is quasi-independent:** Newsletter form can technically exist anywhere, but typically placed on about page. Delay to Phase 4 allows Phase 2-3 to stabilize before introducing external scripts.
- **Phase 5 validates all phases:** CMS editor workflow test in Phase 5 validates Phase 1 setup. Sender.net form testing validates Phase 4. Mobile testing validates Phase 2-3.

This ordering minimizes risk of blocking dependencies and isolates external script integration (Phase 4) until core features are stable.

### Research Flags

**Phases requiring deeper research during planning:**
- **Phase 4 (Newsletter Integration):** Script loading timing is notoriously fragile. Recommend running full testing matrix: (1) initial page load, (2) client-side navigation with Link component, (3) mobile/tablet, (4) slow network (3G throttle), (5) JavaScript disabled. Sender.net form ID and embed URL must be verified in Sender.net dashboard.

**Phases with well-documented patterns (can skip research-phase):**
- **Phase 1 (CMS Config):** Decap CMS file collection pattern is well-documented in official docs; mirrors existing folder collection setup. No research needed.
- **Phase 2 (About Page Component):** Mirrors existing games.ts + page.tsx pattern; standard Next.js server component pattern. No research needed.
- **Phase 3 (Social Links):** Straightforward frontend rendering; no new patterns. No research needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified against Next.js 16.1.6 docs and Decap CMS official documentation. No new dependencies required; existing tools proven in v1.0. Sender.net embed pattern confirmed in their official embedded forms guide. |
| Features | HIGH | Feature landscape validated against Decap CMS and Sender.net capabilities; differentiators and anti-features identified through domain research; MVP definition aligns with what Decap CMS and Sender.net support. |
| Architecture | HIGH | Architecture patterns match existing codebase structure (mirrors games.ts/game detail patterns); all components use established Next.js patterns; Decap CMS file collection pattern verified against official docs and GitHub config examples. |
| Pitfalls | HIGH | Pitfalls extracted from official docs (Decap CMS pre-existence, Next.js Script component behavior, static export limitations), GitHub issues (rate limiting, hydration mismatch reports), and technical blogs on third-party script integration in Next.js. Top 5 pitfalls are well-documented and preventable. |

**Overall confidence:** HIGH

All research conducted against official documentation sources. No novel patterns; all recommendations follow established conventions for Next.js static export + Decap CMS + external embeds. Main risk is not architectural but operational (CMS editor workflow, script testing, static rebuild timing).

### Gaps to Address

1. **Sender.net account setup & form ID:** Research verified Sender.net embed pattern but doesn't include actual form creation steps or embed script URL. During Phase 4, Sender.net account must be created and form ID/script URL retrieved from their dashboard. Document these steps before handing off to implementation.

2. **Decap CMS OAuth GitHub integration validation:** Research assumes GitHub OAuth is already working (from v1.0); Phase 1 should verify GitHub app is still authorized and has permissions to commit to /content/about.md.

3. **Mobile form styling:** Research identifies potential CSS conflicts between Sender.net form and Tailwind CSS but doesn't test Sender.net form behavior with specific site theme. Phase 4 testing should include Sender.net customization settings (colors, fonts) to match Playful Revolution brand.

4. **Newsletter value proposition:** Research recommends clear value proposition in form CMS fields ("Get updates on new games") but doesn't define actual messaging for Playful Revolution. Marketing/product team should define newsletter value prop and confirm with Sender.net form customization.

## Sources

### Primary Research Files
- **STACK.md** — Technologies, versions, and integration patterns (verified against Next.js 16.1.6 docs and Decap CMS official docs)
- **FEATURES.md** — Feature landscape, CMS architecture patterns, and newsletter integration technical details
- **ARCHITECTURE.md** — Component structure, data flow patterns, and integration points
- **PITFALLS.md** — Critical/moderate/minor pitfalls with prevention strategies and phase-specific warnings

### Key References
- [Next.js 16.1.6 Script Component Documentation](https://nextjs.org/docs/pages/api-reference/components/script)
- [Next.js Static Exports Guide](https://nextjs.org/docs/pages/guides/static-exports)
- [Decap CMS File Collections Documentation](https://decapcms.org/docs/collection-file/)
- [Decap CMS Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Sender.net Embedded Forms Guide](https://help.sender.net/knowledgebase/embedded-form/)

---

*Research completed: 2026-03-04*
*Status: Ready for roadmap creation*
*Next step: Pass to gsd-roadmapper for phase definition and requirements writing*
