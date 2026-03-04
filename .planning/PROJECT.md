# Playful Revolution Games Index

## What This Is

A mobile-first game catalog with 30 physical, social, and spontaneous games and their facilitation instructions. Facilitators can find games through multi-dimensional filters (tags, pillars, energy levels), keyword search, or random pick. Admins manage games via Decap CMS with GitHub OAuth. The site is a static Next.js export hosted on Vercel.

## Core Value

Facilitators can quickly find and view game instructions on mobile devices during sessions.

## Requirements

### Validated

- ✓ Game catalog with 30 games — v1.0
- ✓ Game detail view with facilitation instructions (materials, setup, how to play) — v1.0
- ✓ Mobile-friendly responsive design — v1.0
- ✓ Filter by tags (Social Spontaneity, Group Circle Games, Collaborative, Competitive, Ball Games, Theatre Sports, Movement, Table Games) — v1.0
- ✓ Filter by pillars (Intellectual, Social, Physical) — v1.0
- ✓ Filter by energy level (Low, Medium, High) — v1.0
- ✓ Search by game name/keyword — v1.0
- ✓ Random game picker ("Surprise Me") — v1.0
- ✓ Street poster brand identity (brand colors, bold typography, zine aesthetic) — v1.0
- ✓ Decap CMS integration for admin game management (add/edit/delete) — v1.0
- ✓ GitHub OAuth authentication for CMS admin — v1.0
- ✓ Static site export — v1.0
- ✓ Vercel deployment with security headers — v1.0

## Current Milestone: v1.1 About Page

**Goal:** Add a CMS-managed about page with organization info and Sender.net newsletter signup.

**Target features:**
- About page with short descriptive text (CMS-editable)
- Organization name and social media links (CMS-editable)
- Newsletter signup form embedded from Sender.net

### Active

- [ ] About page with CMS-managed content (text, name, social links)
- [ ] Sender.net newsletter signup form embedded on about page
- [ ] Navigation link to about page

### Out of Scope

- User accounts / authentication — games are publicly accessible
- User-submitted games — admin-only for now to ensure quality
- Game ratings/reviews — possible future feature
- Interactive game running (timer, scoring) — viewing instructions only

## Context

- Playful Revolution is a movement to re-kindle playfulness in daily life
- Games can be used anywhere but mostly in playful settings (workshops, events, classrooms, community)
- v1.0 shipped 2026-03-03: full MVP live on Vercel

**Current codebase:** ~2,161 TypeScript LOC, 250 files, Next.js + Tailwind + Decap CMS
**Tech stack:** Next.js (static export), Tailwind CSS, Decap CMS (GitHub backend), Vercel serverless for OAuth

## Constraints

- **Platform**: Web app that exports to static site
- **CMS**: Decap CMS (git-based, GitHub backend)
- **Hosting**: Vercel
- **Mobile**: Must be mobile-friendly for facilitators

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site export (output: 'export') | Fast, cheap hosting, no server needed | ✓ Good — works well on Vercel |
| Decap CMS with GitHub backend (not git-gateway) | git-gateway requires Netlify Identity, not available on Vercel | ✓ Good — works with Vercel |
| Root-level api/ for OAuth serverless functions | Independent of Next.js static export | ✓ Good — clean separation |
| outputDirectory set to .next in vercel.json | Fixes routes-manifest.json error on Vercel | ✓ Good — resolved deployment issue |
| Mobile-first | Facilitators need to view on phones during sessions | ✓ Good — core use case |
| Combined Design & CMS into single phase | Both depend on core display structure | ✓ Good — efficient delivery |

---
*Last updated: 2026-03-04 after v1.1 milestone start*
