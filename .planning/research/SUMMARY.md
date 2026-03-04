# Research Summary: About Page & Newsletter Signup (v1.1)

**Domain:** CMS-managed singleton pages with third-party form integration for static sites
**Researched:** 2026-03-04
**Overall confidence:** HIGH

## Executive Summary

This milestone adds a CMS-managed about page with organization info and Sender.net newsletter signup to the existing Playful Revolution Games Index. The good news: both components follow proven, standard patterns that integrate cleanly with the existing v1.0 architecture.

**CMS pattern:** Decap CMS uses "file collections" for singleton pages like about pages. This is a straightforward extension of v1.0's existing folder collection setup for games. Admin edits the about page content in Decap CMS, changes commit to GitHub, and Vercel rebuilds the static site automatically.

**Newsletter pattern:** Sender.net provides HTML embed code (two script components) that loads the form asynchronously from their servers. The site never touches subscriber data; Sender.net handles all form submissions, confirmations, and list management. This keeps the static site truly static while providing rich form functionality.

**Complexity:** Both features are MEDIUM complexity but with clear, well-documented patterns. No custom code needed for form handling; no API endpoints required. The main build effort is Decap CMS configuration (YAML file collection setup) and frontend styling to match the site's street poster aesthetic.

## Key Findings

**Stack:** Decap CMS file collections (singleton pattern) + Sender.net embed script
**Architecture:** About page as static file + async Sender.net form embed; no new backend needed
**Critical pitfall:** Not setting `delete: false` in Decap config could allow accidental singleton deletion

## Implications for Roadmap

### Recommended Phase Structure for v1.1

**Phase 1: CMS Configuration & About Page Content Setup**
- Set up Decap CMS file collection for about page in `config.yml`
- Create `content/about.yml` with initial organization info
- Add About Page edit UI to Decap admin panel
- Estimated effort: 2-3 hours (straightforward YAML config extension)

**Phase 2: Frontend About Page & Newsletter Form Integration**
- Create `app/about/page.tsx` component
- Fetch about content from `content/about.yml`
- Render organization name, description, social links
- Integrate Sender.net embed script (copy paste from dashboard)
- Style form to match street poster brand aesthetic
- Estimated effort: 4-6 hours (styling is main work)

**Phase 3: Testing & Validation**
- Test CMS edits flow (Decap → GitHub → Vercel rebuild)
- Test newsletter form submission (Sender.net side)
- Mobile responsive testing (should work; Tailwind exists)
- Performance: verify Sender.net script doesn't slow page load
- Estimated effort: 2 hours

### Phase Ordering Rationale

1. **CMS first:** Must configure Decap before frontend can read about content. If you build UI before CMS setup, you'll hardcode content and lose CMS benefit.
2. **Content then styling:** Get about page rendering with real content, then iterate on design. Styling is the largest chunk of work but doesn't block subsequent work.
3. **Test last:** Validate before shipping; Vercel rebuild + Sender.net integration must work correctly.

### Why This Approach Is Low-Risk

- **Proven patterns:** Both Decap file collections and Sender.net embeds are standard, documented patterns. No experimental code.
- **No backend changes:** Static site stays static. Sender.net handles all form data. No new API endpoints, no database changes, no authentication complexity.
- **Isolated from v1.0:** About page is new URL (`/about`), new CMS collection (`about`), new page component. Existing game catalog (`/games`) unaffected.
- **Easy rollback:** If Sender.net doesn't work out, removing the script tag removes the form. Decap collection can be deleted or disabled.

## Feature Summary

### Table Stakes (Expected)
- About page text (CMS-editable)
- Organization name display
- Newsletter signup form
- Social media links
- Mobile responsiveness (already covered)

### Differentiators
- One-click newsletter signup without leaving site
- Non-technical admins can update all content via CMS
- Pre-rendered static about page (instant load, no API dependency)

### Anti-Features to Avoid
- Multi-language about pages (defer to v2+; too much CMS config)
- Comment sections (breaks static model; use newsletter instead)
- Custom form analytics (Sender.net provides built-in analytics)
- Multi-step signup forms (keep simple; email-only at signup)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Decap CMS file collection pattern | **HIGH** | Verified with official docs; pattern from GitHub examples |
| Sender.net embed technical details | **HIGH** | Official help docs confirm two-script pattern, async loading, no re-implementation needed |
| Static site compatibility | **HIGH** | Both patterns explicitly documented for static sites; no conflicts with Next.js static export |
| Newsletter form UX | **HIGH** | Newsletter signup best practices verified from multiple sources; Sender.net handles complexity |
| CMS admin workflow | **HIGH** | Existing v1.0 validation; extending with new collection is straightforward |

## Gaps to Address in Implementation

1. **Sender.net form customization:** Will need to test styling/CSS customization. Sender.net forms may be in iframe (limits style control). Solution: likely use Sender.net's built-in styling options, then add light CSS on parent page if needed.

2. **About page SEO:** May want to set `<title>`, `<meta description>` dynamically from CMS content. Current research didn't detail Next.js static export metadata handling. Action: verify in v1.1 phase how to set page metadata from content.

3. **Social link icons:** Research didn't specify how icons will be rendered (images, font icons, emoji). Decision needed in Phase 2. Likely solution: use Tailwind + icon library (e.g., Lucide icons if already in project, or SVG components).

## Next Steps for Phase 1

1. Review Decap CMS `config.yml` from v1.0 (reference: `/planning/PROJECT.md` mentions GitHub OAuth + Decap setup)
2. Design about page CMS schema (fields: title, description, org_name, social_links list)
3. Create `content/about.yml` with sample data
4. Add file collection to Decap config with `delete: false` protection
5. Test in Decap admin UI: verify form appears and edits work

---

*Research for v1.1 milestone: About Page & Newsletter Signup*
*Researched: 2026-03-04*
*Next phase: Roadmap creation with implementation sequence*
