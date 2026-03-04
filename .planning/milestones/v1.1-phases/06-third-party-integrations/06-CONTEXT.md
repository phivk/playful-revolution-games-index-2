# Phase 6: Third-Party Integrations - Context

**Gathered:** 2026-03-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Add two third-party integrations to the existing about page: (1) a preview of recent Instagram posts from @playrevolution, and (2) a Sender.net newsletter signup form. Both sections are appended to the existing about page content. No new pages, no new routes.

</domain>

<decisions>
## Implementation Decisions

### Instagram feed layout
- Grid layout, 2–3 columns (not horizontal scroll or single column)
- Show 9 recent posts (3 rows of 3)
- Clicking a post thumbnail opens the Instagram post in a new tab
- Section has a heading only (e.g. "Follow us on Instagram" or "@playrevolution") — no descriptive text below it

### Instagram implementation constraints
- No third-party widget services (e.g. Curator.io, Elfsight) — prefer no vendor dependency or ongoing cost
- One-time token or credential setup is acceptable (e.g. Instagram Basic Display API with a long-lived token)
- No recurring manual steps after launch
- Near real-time freshness preferred — posts should appear within hours of publishing. This means a client-side fetch approach (or a script-based approach) is preferred over build-time-only baking
- If no viable static-export-compatible approach without a widget exists, the feature is dropped entirely — the existing Instagram social link in "Connect with Us" is the fallback

### Instagram fallback behaviour
- The Instagram section is conditionally rendered: if no posts are available (feed fails to load, API error, or no viable implementation), the section is hidden entirely — no placeholder or error message shown

### Newsletter form
- Sender.net form embedded with a branded wrapper section
- Section heading: "Join the Playful Revolution"
- Short description below the heading (e.g. "Get updates on games, workshops, and events")
- Attempt to match site brand styling (revolution-red, paper background, bold borders) where Sender.net's embed allows CSS customisation
- Use Sender.net's built-in success/confirmation message — no custom success state needed
- The newsletter section is always rendered regardless of script load success (degradation: heading shows, form may not appear if script fails)

### About page section order
- Final order: Title → Body → Social links → Instagram feed → Newsletter
- Each new section separated by a `border-t border-gray-200` divider + `pt-8 mt-8` padding (consistent with existing "Connect with Us" pattern)

### Claude's Discretion
- Exact Instagram section heading copy (within the "Follow us" / "@playrevolution" direction)
- Newsletter description copy (within the "updates on games/workshops/events" direction)
- Technical implementation approach for Instagram (Basic Display API vs oEmbed vs other — must be determined by research; client-side fetch strongly preferred for freshness)
- CSS override strategy for Sender.net form styling
- Error handling details for Instagram client-side fetch

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/about/page.tsx`: Server component — existing sections follow pattern of `<section className="border-t border-gray-200 pt-8 mt-8">` with `<h2>` heading. New sections should follow the same structure.
- `src/components/SocialLinks.tsx`: Brand button pattern — `revolution-red` background, `border-2 border-foreground`, `hover-btn` class. Reference for brand-consistent interactive elements.
- `next/script` (Next.js built-in): Already used for Sender.net embed strategy in prior decisions — use `strategy="afterInteractive"` in a client component.

### Established Patterns
- About page is a **server component** — data fetched at build time. Any client-side fetch (Instagram API) must be extracted into a `'use client'` child component.
- Newsletter Script embed must be in a client component (already decided in Phase 5 planning).
- Brand colours: `revolution-red` (#D62828), `revolution-paper` (off-white), `foreground` (near-black).
- Conditional rendering pattern: `{about.socialLinks.length > 0 && <section>...</section>}` — use same pattern for Instagram section.

### Integration Points
- `src/app/about/page.tsx`: Add two new `<section>` blocks inside the existing `<div className="max-w-4xl mx-auto px-4 py-12">` wrapper, after the social links section.
- New client component(s) needed: `InstagramFeed` (for client-side API fetch), `NewsletterSignup` (for Sender.net script embed).

</code_context>

<specifics>
## Specific Ideas

- Instagram section heading direction: "Follow us on Instagram" or just "@playrevolution" as the heading
- Newsletter heading: "Join the Playful Revolution" (exact copy, on-brand)
- Near real-time Instagram freshness is valued over simplicity — a client-side fetch with a long-lived token is preferable to baking posts at build time

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-third-party-integrations*
*Context gathered: 2026-03-04*
