# Milestones

## v1.1 About Page (Shipped: 2026-03-04)

**Phases completed:** 2 phases, 6 plans, 0 tasks

**Requirements delivered:** 8/9 v1.1 requirements (NWSL-01 deferred to future milestone)

**Key accomplishments:**
1. CMS-managed about page data layer — typed `getAboutPage()` loader with null-safe singleton pattern
2. About page server component with org name, description, Markdown body, and social links
3. Decap CMS file collection enabling admin editing of all about content without code changes
4. About navigation link added to site header on all pages and screen sizes
5. Instagram feed via official embed blockquotes — CMS-managed post URLs, no API credentials required
6. 3-column portrait Instagram grid on about page

**Known Gaps:**
- NWSL-01: Visitor can submit email via Sender.net signup form — deferred, `NewsletterSignup.tsx` exists but not wired in

**Archive:** [.planning/milestones/v1.1-ROADMAP.md](milestones/v1.1-ROADMAP.md)

---

## v1.0 MVP (Shipped: 2026-03-03)

**Phases completed:** 4 phases, 7 plans
**Requirements delivered:** 21/21 v1 requirements

**Key accomplishments:**
1. Game catalog displaying 30 games with mobile-friendly card layout and full detail views
2. Search, multi-filter (tags, pillars, energy level), and random game picker ("Surprise Me")
3. Playful Revolution brand identity — street poster aesthetic with brand colors and bold typography
4. Decap CMS admin interface with GitHub OAuth authentication for game management
5. Static site export and Vercel deployment with security headers
6. Live site on Vercel with working CMS admin at /admin

**Archive:** [.planning/milestones/v1.0-ROADMAP.md](milestones/v1.0-ROADMAP.md)

---
