# Playful Revolution Games Index

## What This Is

A mobile-first game catalog with 30 physical, social, and spontaneous games and their facilitation instructions. Facilitators can find games through multi-dimensional filters (tags, pillars, energy levels), keyword search, or random pick. Admins manage games via Decap CMS with GitHub OAuth. The site includes a CMS-managed about page with org info, social links, and an Instagram feed. It is a static Next.js export hosted on Vercel.

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
- ✓ About page with CMS-managed content (org name, description, social links) — v1.1
- ✓ Navigation link to about page in site header — v1.1
- ✓ Instagram feed preview on about page (official embed, CMS-managed post URLs) — v1.1

## Current Milestone: v1.2 UI Consistency

**Goal:** Establish a unified visual language for all interactive chip and button components.

**Target features:**
- Consistent border weight across all chips and buttons (chips as reference: border-3)
- Unified inactive state (visible border on all interactive elements)
- Consistent hover/active effects (button pattern: color shift to revolution-red, no scale transform)
- Consistent size/padding across chips and buttons

### Active

- [ ] All interactive chips and buttons use border-3 border-foreground (UI-01)
- [ ] All interactive elements show consistent inactive border state (UI-02)
- [ ] All interactive elements use unified hover/active color effects (no scale transforms) (UI-03)
- [ ] Size and padding is consistent across chips and buttons (UI-04)
- [ ] Sender.net newsletter signup form on about page (NWSL-01 — deferred from v1.1)

### Out of Scope

- User accounts / authentication — games are publicly accessible
- User-submitted games — admin-only for now to ensure quality
- Game ratings/reviews — possible future feature
- Interactive game running (timer, scoring) — viewing instructions only
- Multi-language about page — defer until validated need
- Contact form — email link sufficient for now
- Multi-step newsletter signup — single email field is sufficient

## Context

- Playful Revolution is a movement to re-kindle playfulness in daily life
- Games can be used anywhere but mostly in playful settings (workshops, events, classrooms, community)
- v1.0 shipped 2026-03-03: full MVP live on Vercel
- v1.1 shipped 2026-03-04: about page with Instagram feed

**Current codebase:** ~2,161 TypeScript LOC (v1.0 baseline), Next.js + Tailwind + Decap CMS + Instagram embeds
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
| Singleton file collection for about page (files: not folder:) | Single fixed file, not a directory of entries | ✓ Good — clean Decap CMS pattern |
| Instagram embed blockquotes (not Graph API) | No API credentials required, works with static export | ✓ Good — simpler, more robust |
| Post URLs managed in CMS (instagramPosts list) | Admin can update feed without code changes | ✓ Good — full CMS control |
| NWSL-01 deferred — Sender.net not wired in | Sender.net integration not ready during v1.1 | — Pending (v1.2 candidate) |

---
*Last updated: 2026-03-14 after v1.2 milestone started*
