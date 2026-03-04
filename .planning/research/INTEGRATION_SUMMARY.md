# Integration Summary: About Page Implementation

**Project:** Playful Revolution Games Index v1.1 (About Page + Newsletter)
**Date:** 2026-03-04
**Status:** Architecture Research Complete

## Key Integration Decisions

### 1. Decap CMS File Collection (NOT Folder Collection)

**Decision:** Use Decap CMS "file collection" for `/content/about.md` singleton.

**Why:**
- About page is single, unique content (not repeating like games)
- File collection designed for exactly this use case
- CMS UI prevents accidental deletion (no delete action for file collection)
- Mirrors industry best practices (Hugo, Jekyll, etc.)

**Implementation:**
```yaml
collections:
  - name: "pages"
    label: "Pages"
    files:
      - label: "About Page"
        name: "about"
        file: "content/about.md"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Organization Name", name: "organizationName", widget: "string" }
          - { label: "Description", name: "description", widget: "text" }
          - label: "Social Links"
            name: "socialLinks"
            widget: "list"
            fields:
              - { label: "Platform", name: "platform", widget: "string" }
              - { label: "URL", name: "url", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }
```

**File must exist in git first:** Create `/content/about.md` and commit before Decap CMS can manage it.

---

### 2. Content Loading Pattern: gray-matter at Build Time

**Decision:** Parse `/content/about.md` with gray-matter during `next build`, NOT at runtime.

**Why:**
- Static export doesn't support runtime file I/O
- Content updates tied to rebuild = guaranteed consistency
- Matches existing `lib/games.ts` pattern (proven in production)
- Zero runtime overhead (all parsing happens at build)

**Implementation:** `src/lib/about.ts` (mirrors `src/lib/games.ts`)
```typescript
export async function getAboutPage(): Promise<AboutPage | null> {
  const raw = await readFile(path.join(process.cwd(), 'content', 'about.md'), 'utf-8');
  const { data, content } = matter(raw);
  return { ...data as AboutPage, body: content };
}
```

---

### 3. Server Component + Client Component Boundary

**Decision:** Server component renders markdown. Client component loads Sender.net embed script.

**Why:**
- Server component handles static content rendering at build time
- Client component isolates external script loading (no server-side conflicts)
- Minimal JavaScript bundle (only client component hydrated)
- Works perfectly with static export

**Implementation:**
```
src/app/about/page.tsx (Server Component)
  ├─ getAboutPage() → static markdown + frontmatter
  ├─ ReactMarkdown → rendered HTML
  └─ <NewsletterSignup /> (Client Component)
      └─ Script → Sender.net embed (afterInteractive)
```

---

### 4. Sender.net Integration: Script Embed vs Server Proxy

**Decision:** Load Sender.net embed script directly in browser, no server-side proxy.

**Why:**
- Static export cannot handle dynamic API routes
- Sender.net provides official embed script for exactly this use case
- Form submission goes directly to Sender.net (no server involvement)
- Simpler, fewer moving parts, fewer failure points

**Implementation:** `src/components/NewsletterSignup.tsx`
```typescript
<Script
  src="https://cdn.sender.net/accounts_static/js/embed.js"
  strategy="afterInteractive"  // Important: wait for DOM
  onLoad={() => {
    if (window.senderjs) {
      window.senderjs.load('YOUR_SENDER_FORM_ID');
    }
  }}
/>
```

---

### 5. Navigation Structure

**Decision:** Add `/about` route to navigation, displayed in NavBar.

**Why:**
- Consistent with existing `/` (home), `/playlist`, `/game/[slug]` routes
- Users expect "About" link in top nav
- Decap CMS can manage about page without code changes (beyond initial setup)

**Implementation:**
```typescript
// Update NavBar.tsx
<Link href="/about" className="...">About</Link>
```

---

## Data Flow Summary

### At Build Time (Vercel)
```
1. CMS user commits change to /content/about.md via GitHub
2. Vercel webhook triggers on push
3. next build runs
   a. Server-side: getAboutPage() reads file
   b. gray-matter parses YAML + markdown
   c. React renders server component
   d. HTML output to out/about/index.html
4. Static files deployed to CDN
```

### At Runtime (Browser)
```
1. User visits /about
2. Browser loads pre-rendered HTML
3. React hydrates components
4. NewsletterSignup component mounts
5. Script component loads Sender.net embed
6. Sender.net script renders form in DOM
7. User submits → direct to Sender.net API
```

---

## File Structure Changes

### New Files
- `/content/about.md` — About page content (managed by Decap CMS)
- `src/lib/about.ts` — Load & parse about page
- `src/types/about.ts` — TypeScript interfaces
- `src/components/NewsletterSignup.tsx` — Sender.net embed wrapper
- `src/app/about/page.tsx` — About page route

### Modified Files
- `public/admin/config.yml` — Add file collection config
- `src/components/NavBar.tsx` — Add about link

### No Changes Required
- `next.config.ts` — Already configured for static export
- `src/app/layout.tsx` — Root layout works for all pages
- Build workflow — Vercel handles everything

---

## Roadmap Implications

### Phase 1: Foundation (Before About Page)
- [x] v1.0 shipped — games catalog complete, CMS working
- Nothing blocking about page implementation

### Phase 2: About Page Implementation
**Suggested order:**

1. **Create content file** (1 min)
   - Create `/content/about.md` in git
   - Add basic YAML + markdown
   - Commit to activate CMS management

2. **Add CMS config** (10 min)
   - Update `public/admin/config.yml`
   - Add file collection for about page
   - Verify form loads at `/admin`

3. **Create data loading lib** (15 min)
   - `src/lib/about.ts` — load & parse file
   - `src/types/about.ts` — interfaces
   - Mirror existing games.ts pattern

4. **Create About page** (20 min)
   - `src/app/about/page.tsx` — server component
   - Render markdown with ReactMarkdown
   - Test locally

5. **Add newsletter signup** (15 min)
   - `src/components/NewsletterSignup.tsx` — client component
   - Load Sender.net script
   - Test form rendering & submission

6. **Update navigation** (5 min)
   - Add `/about` link to NavBar
   - Update metadata if needed

7. **Test & deploy** (10 min)
   - `next build` locally
   - Check `out/about/index.html` renders correctly
   - Push to GitHub
   - Verify Vercel build succeeds
   - Test CMS editing
   - Test newsletter form

**Estimated total:** 75 minutes for complete implementation

### Phase 3: Future Enhancements (Out of Scope for v1.1)
- Multiple about pages (team, history, etc.) — use more file collection entries
- Blog/news section — convert to folder collection pattern
- Contact form — add separate form (not newsletter)
- Community features — requires architecture changes

---

## Risk Assessment

### Low Risk
- **File loading pattern:** Proven in production with games.ts
- **Decap CMS file collection:** Standard pattern, well-documented
- **ReactMarkdown rendering:** Already used for game descriptions
- **Static export:** Vercel handles builds reliably

### Medium Risk
- **Sender.net integration:** Depends on their embed script quality
  - Mitigation: Test thoroughly on staging before deploying to production
  - Fallback: Provide email signup via simple form (no embed)

### High Risk
- None identified

---

## Testing Checklist

### Local Development
- [ ] `/content/about.md` parses correctly with gray-matter
- [ ] `getAboutPage()` returns expected data structure
- [ ] About page renders at `localhost:3000/about`
- [ ] Markdown content renders correctly
- [ ] Newsletter form container renders
- [ ] NavBar link to about works

### Static Export
- [ ] `next build` completes without errors
- [ ] `out/about/index.html` exists and has correct content
- [ ] Static HTML renders correctly in browser (no hydration errors)

### CMS Management
- [ ] Decap CMS form appears at `{site}/admin`
- [ ] Can edit about page content
- [ ] Changes commit to `/content/about.md` in GitHub
- [ ] Changes trigger Vercel rebuild

### Sender.net Integration
- [ ] Form renders on live about page
- [ ] Newsletter signup submission works
- [ ] Sender.net dashboard shows new subscriber

---

## Dependencies

### Package.json (No New Dependencies Needed)
- `gray-matter` — already present
- `next/script` — built-in to Next.js
- `react-markdown` — already present

### External Services
- **Sender.net account:** Required (get form ID from dashboard)
- **GitHub OAuth:** Already set up for Decap CMS
- **Vercel:** Already configured for this project

---

## Success Criteria

Implementation is complete when:

1. ✓ About page renders at `/about` with CMS-managed content
2. ✓ Decap CMS admin can edit about page
3. ✓ Changes to `/content/about.md` trigger rebuild → live deploy
4. ✓ Sender.net newsletter form renders and accepts submissions
5. ✓ Static export (`next build`) completes successfully
6. ✓ Vercel deployment succeeds
7. ✓ No TypeScript errors or warnings
8. ✓ NavBar shows "About" link

---

## Architecture Confidence Assessment

| Component | Confidence | Evidence |
|-----------|------------|----------|
| Decap CMS File Collection | HIGH | Official docs, tested pattern, used by many projects |
| gray-matter + file loading | HIGH | Proven in production (games.ts), standard pattern |
| Next.js Script component | HIGH | Official docs, built-in, used for all embeds |
| Static export compatibility | HIGH | Site already exports (v1.0 shipped), no breaking changes |
| Sender.net embed | MEDIUM | Script-based, works on static HTML, but external dependency |
| Overall architecture | HIGH | Pattern proven across all layers, low complexity |

---

*Integration research complete. Ready for implementation phase.*
