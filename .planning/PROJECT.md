# Playful Revolution Games Index

## What This Is

A living collection of ~30 physical, social, and spontaneous games with facilitation instructions. Users can find games through filters (tags, pillars, energy levels), search, or random pick. Admins manage games via Decap CMS. The site exports to a static site hosted on Vercel or GH Pages.

## Core Value

Facilitators can quickly find and view game instructions on mobile devices during sessions.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Game catalog with ~30 games
- [ ] Filter by tags (Social Spontaneity, Group Circle Games, Collaborative, Competitive, Ball Games, Theatre Sports, Movement, Table Games)
- [ ] Filter by pillars (Intellectual, Social, Physical)
- [ ] Filter by energy level (Low, Medium, High)
- [ ] Search by name/keyword
- [ ] Random game picker
- [ ] Game detail view with facilitation instructions
- [ ] Decap CMS integration for admin game management
- [ ] Static site export
- [ ] Mobile-friendly responsive design
- [ ] Vercel or GH Pages deployment

### Out of Scope

- User accounts / authentication — games are publicly accessible
- User-submitted games — admin-only for now
- Game ratings/reviews — possible future feature
- Interactive game running (timer, scoring) — viewing instructions only

## Context

- Playful Revolution is a movement to re-kindle playfulness in daily life
- Games can be used anywhere but mostly in playful settings (workshops, events, classrooms, community)
- Initial dataset: ~30 games with existing taxonomy

## Constraints

- **Platform**: Web app that exports to static site
- **CMS**: Decap CMS (git-based)
- **Hosting**: Vercel or GH Pages
- **Mobile**: Must be mobile-friendly for facilitators

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site export | Fast, cheap hosting, simple deployment | — Pending |
| Decap CMS | Git-based, no external database, fits Vercel/GH Pages | — Pending |
| Mobile-first | Facilitators need to view on phones during sessions | — Pending |

---
*Last updated: 2026-02-20 after initialization*
