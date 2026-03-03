# Phase 3: Design & CMS - Context

**Gathered:** 2026-02-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Apply brand identity (street poster/zine aesthetic) and enable admin game management via Decap CMS. This phase delivers design system implementation and CMS integration.

</domain>

<decisions>
## Implementation Decisions

### Design System (per design brief)
- **Colors**: Revolution Red #E53935, Play Green #43A047, Joy Yellow #FDD835, Deep Blue #1E3A8A in bold color blocks
- **Typography**: Bold condensed sans-serif headlines (Bebas Neue/Anton), readable body font (Inter)
- **Background**: Paper-like off-white #FAFAF7
- **Buttons**: Big, bold, strong color contrast
- **Accessibility**: High contrast, large tap targets

### Visual Style (per design brief)
- **Aesthetic**: Street poster / zine - bold, playful, slightly rough
- **Motion**: Snappy - buttons that jump, not fade
- **Layout**: Simple column grid, big margins, sections as "zones"
- **Elements**: Bold dividers (thick lines, zig-zags), hand-drawn style icons
- **Texture**: Subtle paper grain, print-like imperfections

### CMS Setup
- **Structure**: Folder structure - each game as separate markdown file in content/games/
- **Admin route**: /admin
- **Authentication**: Required, git-based auth via GitHub/GitLab (CMS standards)
- **Data import**: Will use existing markdown files when provided by user

### CMS Workflow
- **Adding games**: Via Decap CMS UI (creates markdown files automatically)
- **Editing games**: Via Decap CMS editor
- **Deleting games**: Removes the markdown file (per CMS standards)

### Claude's Discretion
- Exact CSS implementations for brand styling
- Animation timing and feel
- CMS field configuration details
- Icon selection (hand-drawn/woodcut style)

</decisions>

<specifics>
## Specific Ideas

- Use existing markdown files from user when provided
- Reference: playful_revolution_web_design_brief.md for all design decisions

</specifics>

<deferred>
## Deferred Ideas

- Custom accent typography (handwritten style) - optional enhancement
- Custom imagery/photos - deferred to future

</deferred>

---

*Phase: 03-design-cms*
*Context gathered: 2026-02-20*
