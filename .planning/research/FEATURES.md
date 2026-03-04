# Feature Research: About Page & Newsletter Signup

**Domain:** CMS-managed singleton pages with third-party form integration on static sites
**Researched:** 2026-03-04
**Confidence:** HIGH — Decap CMS patterns verified with official docs; Sender.net embed technical details confirmed

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist for an about page. Missing these = feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **About page text** | Core site navigation includes About link; users expect descriptive content about the organization | LOW | CMS-editable via Decap file collection singleton |
| **Organization name display** | Standard site identity information on about page | LOW | Simple text field in CMS, display in layout |
| **Social media links** | Standard practice for organizations to show where users can connect | MEDIUM | Requires URL fields + icon/link rendering logic in frontend |
| **Newsletter signup form** | Industry standard for capturing subscriber interest; users expect way to sign up for updates | MEDIUM | Sender.net embed via JavaScript + form styling integration |
| **Mobile-responsive layout** | Facilitators access on phones; all pages must work on mobile | LOW | Tailwind CSS existing system covers this |
| **Editable content persistence** | CMS edits must persist after deploy; users expect changes to stick | LOW | Already validated with Decap CMS + static export in v1.0 |

### Differentiators (Competitive Advantage)

Features that set Playful Revolution apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **About page as entry point to brand story** | Communicate movement values (playfulness, community) beyond just game listings | MEDIUM | Differentiates from generic game catalog; aligns with brand identity |
| **One-click newsletter signup integration** | Users can subscribe without leaving the site; low friction to follow organization | LOW | Sender.net embed handles this; seamless UX |
| **Customizable about page without code** | Non-technical admins can update org info, social links, text without touching frontend | LOW | Decap CMS file collection pattern handles this completely |
| **Pre-rendered static about page** | About page is part of static export, not API-dependent; instant load, no 3rd-party latency | LOW | Static generation already standard; Sender.net embed is async |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Multiple about pages (different languages/versions)** | Seems like good feature for future internationalization | Adds CMS complexity, requires multiple singleton configs, multiplies maintenance burden for content editors, conflicts with static site simplicity | Start with single about page; defer i18n to v2+ after org validates demand |
| **About page metadata/SEO editor fields** | SEO is important for discoverability | Bloats initial about page CMS config; OpenGraph/meta tags should be generated from content automatically or added via Next.js config | Keep about page content simple; generate meta tags in page component from content |
| **Comment section on about page** | Community engagement seems valuable | Introduces real-time backend dependency, spam moderation burden, conflicts with static export model | Use newsletter for two-way engagement instead; keep about page informational |
| **Form analytics (click-through tracking, form abandonment)** | Want to measure newsletter signup effectiveness | Sender.net already provides form analytics in their dashboard; adding custom tracking adds complexity and client-side load | Trust Sender.net's built-in analytics; no need for custom tracking |
| **Multi-step newsletter signup (progressive profiling)** | Collect more data about subscribers | Increases form friction; Sender.net offers basic single-step forms; data collection should be minimal at signup (just email initially) | Single-step form at signup; Sender.net automation can request details later via email |

## Feature Dependencies

```
About Page Content (text, org name)
    └──requires──> Decap CMS file collection config
                      └──requires──> Existing Decap setup (v1.0) ✓

Social Media Links Display
    └──requires──> About page content feature ✓
    └──requires──> Frontend link/icon components
    └──enhances──> Brand identity (differentiator)

Newsletter Signup Form
    └──requires──> Sender.net account creation + form setup
    └──requires──> About page (placement location)
    └──enhances──> Community engagement
    └──independent──> About page content (form can exist on blank page)

Mobile Responsiveness
    └──requires──> Existing Tailwind CSS system (v1.0) ✓
```

### Dependency Notes

- **About page content requires Decap CMS file collection config:** Decap already set up in v1.0 with folder collections (games); adding file collection for singleton about page is straightforward extension of existing system
- **Social media links display requires about page:** Links are rendered in about page layout; can't exist independently
- **Newsletter signup form is independent of about page content:** Form placement on about page is convenient, but technically the embed script can be placed anywhere; keeping them separate in CMS config allows flexibility
- **Mobile responsiveness is built-in:** Existing Tailwind system handles all responsive needs; no new complexity here

## CMS Architecture Pattern: Decap File Collections for Singletons

### How Singleton Pages Work in Decap CMS

Decap CMS uses **file collections** to manage single-instance content (unlike folder collections which manage multiple items):

```yaml
collections:
  - name: 'settings'
    label: 'Site Settings'
    delete: false  # Prevent deletion of singleton
    editor:
      preview: false
    files:
      - name: 'about'
        label: 'About Page'
        file: 'content/about.yml'  # Single file, not folder
        description: 'Organization about page'
        fields:
          - { label: 'Page Title', name: 'title', widget: 'string' }
          - { label: 'Description', name: 'description', widget: 'text' }
          - { label: 'Organization Name', name: 'org_name', widget: 'string' }
          - name: 'social_links'
            label: 'Social Media Links'
            widget: 'list'
            fields:
              - { label: 'Platform', name: 'platform', widget: 'string' }
              - { label: 'URL', name: 'url', widget: 'string' }
```

### Key Characteristics

- **`delete: false`** prevents admins from accidentally deleting the singleton
- **`files` array** (not `folder`) points to individual file paths
- **Single file per collection** (e.g., `content/about.yml`); file must exist in repo before CMS can edit
- **Custom fields per singleton** allow flexibility (about page has different fields than settings)
- **No `create: true`** — singleton already exists; UI won't offer "Add new"

### Expected CMS Behavior

Admins log into Decap CMS, navigate to "About Page" collection, see a single edit form (not a list) with all about page fields editable. Changes are committed to GitHub via Decap's GitHub API. Static site rebuild (via Vercel) picks up changes and deploys.

## Sender.net Newsletter Embed: Technical Pattern

### How Sender.net Embed Works on Static Sites

Sender.net provides **HTML embed code** that pulls form from their servers via JavaScript:

1. Admin creates form in Sender.net dashboard (customizable design, fields, validation)
2. Sender.net generates two script components:
   - A `<div>` container with `data-sender-form-id` attribute
   - A `<script>` that loads the form into that div via iframe

Example structure:
```html
<!-- Container div -->
<div data-sender-form-id="YOUR_FORM_ID"></div>

<!-- Script (typically placed in head or before closing body) -->
<script src="https://sender.net/path/to/form-embed.js"></script>
```

### Key Technical Details

- **Async loading:** Script loads form asynchronously; page renders before form appears
- **No re-implementation needed:** Changes to form design in Sender.net dashboard auto-reflect on site (no code changes required)
- **Two-script structure:** Both parts must be present for form to work
- **Framework compatibility:** Works with static sites, Next.js static export, Gatsby, etc.
- **GDPR controls:** Sender.net forms support GDPR compliance (consent checkboxes, reCaptcha)
- **Explicit rendering mode:** For SPAs or frameworks like Turbo that don't do full-page reloads, can use `?explicit=true` flag to require manual form rendering

### Expected User Behavior

User visits about page, sees newsletter signup form embedded alongside about content. Form appears after script loads (typically <1s). User enters email, form submits directly to Sender.net servers (not your backend). User receives confirmation email. Sender.net dashboard shows new subscriber.

## Feature Complexity Assessment

| Feature | Complexity | Why | Risk |
|---------|------------|-----|------|
| About page text (CMS) | **LOW** | Extend existing Decap setup; one text field | Very low — standard pattern |
| Organization name (CMS) | **LOW** | Single string field in CMS | Very low |
| Social media links (CMS + frontend) | **MEDIUM** | CMS list field + frontend rendering logic (icons, links) | Low — straightforward frontend work |
| Newsletter signup embed | **MEDIUM** | Sender.net setup + script inclusion + styling to match site | Medium — Sender.net handles heavy lifting; styling integration is main work |
| Mobile responsiveness (all features) | **LOW** | Existing Tailwind system handles; no special mobile work needed | Very low — proven in v1.0 |

## MVP Definition

### Launch With (v1.1)

Minimum viable about page:

- [x] **About page with text** — Required for brand communication; CMS-editable via Decap file collection
- [x] **Organization name display** — Table stakes; users expect to see who this is
- [x] **Newsletter signup form** — Core feature for community building; Sender.net embed
- [x] **Social media links** — Standard practice; 2-3 key social links (Twitter, etc.)

### Add After Validation (v1.2+)

Post-MVP enhancements:

- [ ] **Team member listing** — If organization grows and wants to highlight team
- [ ] **Multiple social profiles** — Expand social links as platforms grow important
- [ ] **Newsletter archive/past issues** — Link to Sender.net newsletter archives if valuable
- [ ] **About page images/graphics** — Visual storytelling (hero image, organization photos)

### Future Consideration (v2+)

Defer until product-market fit:

- [ ] **Internationalized about pages** — Multiple about pages for different languages (v2+ feature)
- [ ] **FAQ section** — Move off about page to dedicated FAQ if needed
- [ ] **Team/contributor profiles** — Individual profile pages if needed
- [ ] **About page analytics** — Track pageviews, scroll depth, form conversions

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Notes |
|---------|------------|---------------------|----------|-------|
| About page text | HIGH | LOW | P1 | Core brand story; must ship |
| Organization name | HIGH | LOW | P1 | Table stakes identity info |
| Newsletter signup embed | HIGH | MEDIUM | P1 | Core community building feature |
| Social media links | MEDIUM | MEDIUM | P1 | Standard practice; good to launch with |
| Team member listing | MEDIUM | MEDIUM | P2 | Future enhancement if org grows |
| Form analytics (custom) | LOW | MEDIUM | P3 | Sender.net already provides; no custom needed |
| Multi-language about | LOW | HIGH | P3 | Defer to v2+; not needed yet |

**Priority key:**
- **P1:** Must have for v1.1 launch
- **P2:** Should have; add in v1.2 if time allows
- **P3:** Nice to have; future versions

## Expected Behavior Summary

### For Content Admins (via Decap CMS)

1. Log into Decap CMS admin panel
2. Navigate to "About Page" collection
3. See form with fields: Title, Description, Org Name, Social Links (list with platform + URL)
4. Edit any field; changes persist to `content/about.yml` in GitHub
5. Static site rebuilds automatically on Vercel; changes live in <2 minutes

### For Site Visitors

1. Visit about page link in navigation
2. Read organization story, see org name, view social media links
3. Newsletter form is embedded on the page; can sign up without leaving site
4. Form submits to Sender.net (not backend server); instant feedback
5. Confirmation email received from Sender.net; added to mailing list

## Standards & Best Practices

Based on 2026 CMS and newsletter signup research:

### For About Page (CMS)
- Keep content editable but layout consistent (don't let admins break design)
- Text field for short description (250-500 words typical); longer content should use structured text widget if supported
- Social links as list to avoid hardcoding (allows future expansion)
- Mobile-first; about page is often entry point from social links on mobile

### For Newsletter Signup
- Single-step signup (email only) for minimal friction
- Clear value proposition ("Get updates on new games and workshops")
- Transparent about email frequency ("Weekly updates" or "Monthly digest")
- Form must be visually prominent but not overwhelming
- Style should match site brand (match Playful Revolution's street poster aesthetic)

## Sources

- [Decap CMS Documentation — Configuration](https://decapcms.org/docs/intro/)
- [Decap CMS — File Collections Pattern](https://decapcms.org/docs/collection-file/)
- [Decap CMS GitHub Config Examples](https://github.com/decaporg/decap-cms/blob/main/dev-test/config.yml)
- [Sender.net Embedded Forms Guide](https://help.sender.net/knowledgebase/embedded-form/)
- [Sender.net Creating First Embedded Form](https://help.sender.net/knowledgebase/creating-your-first-embedded-form/)
- [CMS Design Best Practices 2026](https://standardbeagle.com/cms-design-best-practices/)
- [Newsletter Signup Best Practices 2026](https://moosend.com/blog/newsletter-signup-examples/)
- [Static Site Newsletter Integration Patterns](https://victordibia.com/blog/add-newsletter-static-site/)

---

*Feature research for: About Page & Newsletter Signup (v1.1)*
*Researched: 2026-03-04*
