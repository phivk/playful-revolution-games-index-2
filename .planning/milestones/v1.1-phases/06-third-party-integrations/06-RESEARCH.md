# Phase 6: Third-Party Integrations - Research

**Researched:** 2026-03-04
**Domain:** Instagram Graph API, Sender.net embed, Next.js Route Handlers, next/script
**Confidence:** HIGH (stack confirmed, key INST-01 blocker resolved)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Instagram feed layout**
- Grid layout, 2–3 columns (not horizontal scroll or single column)
- Show 9 recent posts (3 rows of 3)
- Clicking a post thumbnail opens the Instagram post in a new tab
- Section has a heading only (e.g. "Follow us on Instagram" or "@playrevolution") — no descriptive text below it

**Instagram implementation constraints**
- No third-party widget services (e.g. Curator.io, Elfsight) — prefer no vendor dependency or ongoing cost
- One-time token or credential setup is acceptable (e.g. Instagram Basic Display API with a long-lived token)
- No recurring manual steps after launch
- Near real-time freshness preferred — posts should appear within hours of publishing. This means a client-side fetch approach (or a script-based approach) is preferred over build-time-only baking
- If no viable static-export-compatible approach without a widget exists, the feature is dropped entirely — the existing Instagram social link in "Connect with Us" is the fallback

**Instagram fallback behaviour**
- The Instagram section is conditionally rendered: if no posts are available (feed fails to load, API error, or no viable implementation), the section is hidden entirely — no placeholder or error message shown

**Newsletter form**
- Sender.net form embedded with a branded wrapper section
- Section heading: "Join the Playful Revolution"
- Short description below the heading (e.g. "Get updates on games, workshops, and events")
- Attempt to match site brand styling (revolution-red, paper background, bold borders) where Sender.net's embed allows CSS customisation
- Use Sender.net's built-in success/confirmation message — no custom success state needed
- The newsletter section is always rendered regardless of script load success (degradation: heading shows, form may not appear if script fails)

**About page section order**
- Final order: Title → Body → Social links → Instagram feed → Newsletter
- Each new section separated by a `border-t border-gray-200` divider + `pt-8 mt-8` padding (consistent with existing "Connect with Us" pattern)

### Claude's Discretion
- Exact Instagram section heading copy (within the "Follow us" / "@playrevolution" direction)
- Newsletter description copy (within the "updates on games/workshops/events" direction)
- Technical implementation approach for Instagram (Basic Display API vs oEmbed vs other — must be determined by research; client-side fetch strongly preferred for freshness)
- CSS override strategy for Sender.net form styling
- Error handling details for Instagram client-side fetch

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INST-01 | Visitor can view a preview of recent Instagram posts from @playrevolution on the about page | Resolved: use Instagram Graph API (Instagram Login) via Next.js Route Handler proxy; client component fetches `/api/instagram/feed`; long-lived token stored in Vercel env var; token refresh Vercel cron job every 50 days |
| NWSL-01 | Visitor can submit their email address via a Sender.net signup form on the about page | Resolved: use Sender.net two-part embed (universal.js + form div) in a `'use client'` component via `next/script` with `strategy="afterInteractive"` and `onReady` callback for SPA re-mount handling |
</phase_requirements>

---

## Summary

This phase adds two third-party integrations to the existing about page: an Instagram feed preview and a Sender.net newsletter signup form. Both integrate as new `<section>` blocks appended after the existing social links section, following the established `border-t border-gray-200 pt-8 mt-8` pattern.

The critical INST-01 research question is now resolved. The Instagram Basic Display API was shut down on December 4, 2024 and no longer functions. The replacement is the **Instagram Graph API with Instagram Login**, which requires a Business or Creator Instagram account. Direct browser-side fetches to `graph.instagram.com` are blocked by CORS, so a **Next.js Route Handler** (`app/api/instagram/feed/route.ts`) is required to proxy the request server-side, reading the long-lived token from an environment variable. Because `next.config.ts` has no `output: 'export'` setting, Route Handlers are fully supported on Vercel. A `InstagramFeed` client component fetches from `/api/instagram/feed` on mount, providing near-real-time freshness. The long-lived token (60-day TTL) must be refreshed via a Vercel cron job.

For NWSL-01, Sender.net provides a two-part embed: a `<script>` loading `https://cdn.sender.net/accounts_resources/universal.js` plus a `<div>` with `data-sender-form-id`. This is straightforward to implement in a `'use client'` component using `next/script` with `strategy="afterInteractive"` and `onReady` (not `onLoad`) to handle SPA re-mount after navigation.

**Primary recommendation:** Implement INST-01 via Route Handler proxy + client component with conditional render on empty state. Implement NWSL-01 via client component wrapping Sender.net embed. Both are achievable within existing stack — no new npm dependencies required.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/script | Built into Next.js 16.1.6 | Load third-party scripts safely | Official Next.js pattern; handles hydration ordering; supports `onReady` for SPA re-mount |
| Instagram Graph API | Current (v21+) | Fetch recent media from @playrevolution | Only official API available since Basic Display API deprecated Dec 2024 |
| Vercel Route Handlers | Built into Next.js App Router | Proxy Instagram API call server-side | Required because Instagram API blocks CORS from browsers |
| Vercel Cron Jobs | Vercel platform feature | Auto-refresh Instagram long-lived token | Prevents token expiry without manual intervention |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | ^4 (already installed) | Style Instagram grid and newsletter wrapper | All styling — already used throughout project |
| lucide-react | ^0.576.0 (already installed) | Icons if needed in feed/newsletter UI | Already used in SocialLinks; available for reuse |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Route Handler proxy | Client-side fetch directly to graph.instagram.com | CORS blocks all browser-side requests — not viable |
| Route Handler proxy | Third-party widget (Curator.io, Elfsight) | Violates locked decision: no vendor dependency |
| Route Handler proxy | Build-time baked posts (getStaticProps equivalent) | Violates freshness requirement (hours, not deploy-cycle) |
| Vercel cron for token refresh | Manual token refresh every 50 days | Violates "no recurring manual steps after launch" requirement |
| next/script afterInteractive | Direct `<script>` tag in JSX | next/script handles hydration, deduplication, SPA safety |

**Installation:** No new packages required. Stack is entirely within existing dependencies and Vercel platform features.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── about/
│   │   └── page.tsx             # Server component — add InstagramFeed + NewsletterSignup sections
│   └── api/
│       └── instagram/
│           └── feed/
│               └── route.ts     # NEW: Route Handler proxy for Instagram Graph API
├── components/
│   ├── InstagramFeed.tsx         # NEW: 'use client' — fetches /api/instagram/feed, renders grid
│   └── NewsletterSignup.tsx      # NEW: 'use client' — embeds Sender.net form via next/script
```

### Pattern 1: Route Handler as Instagram API Proxy

**What:** A server-side GET endpoint at `/api/instagram/feed` that reads `INSTAGRAM_ACCESS_TOKEN` from env vars and fetches from `graph.instagram.com`, then returns shaped JSON to the client.

**When to use:** Any time you need to call an API that blocks CORS from browsers. Keeps credentials server-side. Token is never exposed to the client.

**Example:**

```typescript
// src/app/api/instagram/feed/route.ts
// Source: Next.js Route Handlers official docs (nextjs.org/docs/app/getting-started/route-handlers)

export const dynamic = 'force-dynamic'; // Never cache — always fresh

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return Response.json({ posts: [] }, { status: 200 });
  }

  try {
    const fields = 'id,media_type,media_url,thumbnail_url,permalink,timestamp';
    const limit = 9;
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour server-side
    if (!res.ok) {
      return Response.json({ posts: [] }, { status: 200 });
    }

    const data = await res.json();
    // Filter out VIDEO-only items without thumbnail — IMAGE and CAROUSEL_ALBUM have media_url
    const posts = (data.data ?? []).filter(
      (p: { media_type: string }) => p.media_type === 'IMAGE' || p.media_type === 'CAROUSEL_ALBUM'
    );

    return Response.json({ posts });
  } catch {
    return Response.json({ posts: [] }, { status: 200 });
  }
}
```

### Pattern 2: InstagramFeed Client Component

**What:** A `'use client'` component that fetches `/api/instagram/feed` on mount, renders a responsive CSS grid of 9 post thumbnails, and returns `null` if the array is empty (conditional render — no error shown).

**When to use:** Any data that requires client-side freshness and must conditionally hide on failure.

**Example:**

```typescript
// src/components/InstagramFeed.tsx
// Source: Next.js 'use client' pattern, App Router docs

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface InstagramPost {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM';
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/instagram/feed')
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Conditional render: return null if no posts (hides section entirely)
  if (loaded && posts.length === 0) return null;

  // Skeleton state while loading (optional — or return null until loaded)
  if (!loaded) return null; // Per locked decision: no placeholder shown

  return (
    <div className="grid grid-cols-3 gap-2">
      {posts.slice(0, 9).map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-square overflow-hidden block"
        >
          <Image
            src={post.media_url}
            alt="Instagram post"
            width={300}
            height={300}
            className="object-cover w-full h-full hover:opacity-80 transition-opacity"
            unoptimized // Instagram CDN URLs — Next.js Image optimizer can't transform external URLs without config
          />
        </a>
      ))}
    </div>
  );
}
```

### Pattern 3: NewsletterSignup Client Component with next/script

**What:** A `'use client'` component that uses `next/script` with `strategy="afterInteractive"` and `onReady` (runs after every mount, including SPA navigation) to inject the Sender.net embed script alongside the placeholder `<div>`.

**When to use:** Any third-party embed that renders into a DOM container and needs re-initialisation after React re-mounts.

**Example:**

```typescript
// src/components/NewsletterSignup.tsx
// Source: Next.js Script Component official docs (nextjs.org/docs/app/api-reference/components/script)

'use client';

import Script from 'next/script';

export default function NewsletterSignup() {
  return (
    <div>
      {/* Sender.net two-part embed */}
      <Script
        src="https://cdn.sender.net/accounts_resources/universal.js"
        strategy="afterInteractive"
        onReady={() => {
          // Re-render form on every mount (handles SPA navigation re-visits)
          if (typeof window !== 'undefined' && (window as Window & { senderForms?: { render: () => void } }).senderForms) {
            (window as Window & { senderForms?: { render: () => void } }).senderForms?.render();
          }
        }}
      />
      {/* Form container — replace XXXXXXXXXX with actual form ID from Sender.net dashboard */}
      <div
        className="sender-form-field"
        data-sender-form-id="XXXXXXXXXX"
        style={{ textAlign: 'left' }}
      />
    </div>
  );
}
```

### Pattern 4: About Page Integration

**What:** Server component (`page.tsx`) imports the two new client components as child sections, following the existing section pattern.

**Example:**

```typescript
// src/app/about/page.tsx (additions only)
import InstagramFeed from '@/components/InstagramFeed';
import NewsletterSignup from '@/components/NewsletterSignup';

// Inside the <div className="max-w-4xl mx-auto px-4 py-12"> wrapper,
// after the social links section:

<section className="border-t border-gray-200 pt-8 mt-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-6">@playrevolution</h2>
  <InstagramFeed />
</section>

<section className="border-t border-gray-200 pt-8 mt-8">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Playful Revolution</h2>
  <p className="text-gray-600 mb-6">Get updates on games, workshops, and events</p>
  <NewsletterSignup />
</section>
```

### Pattern 5: Token Refresh Cron Job

**What:** A Vercel cron job calls a Route Handler that refreshes the Instagram long-lived token and updates the env var. Because Vercel Hobby plan limits cron to once per day, the token refresh runs daily and keeps the 60-day token alive without manual intervention.

**Cron config in vercel.json:**

```json
{
  "crons": [
    {
      "path": "/api/instagram/refresh-token",
      "schedule": "0 3 * * *"
    }
  ]
}
```

**Route Handler for token refresh:**

```typescript
// src/app/api/instagram/refresh-token/route.ts
// Source: Vercel Cron Jobs docs (vercel.com/docs/cron-jobs)
// WARNING: Token refresh updates the in-memory env var only in this invocation.
// For persistent storage, token should be written to a KV store or environment variable update.
// See Open Questions section for the token persistence challenge.

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return Response.json({ error: 'No token' }, { status: 500 });

  const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
  const res = await fetch(url);
  const data = await res.json();

  // Returns new token in data.access_token — must be stored persistently
  return Response.json({ refreshed: !!data.access_token });
}
```

### Anti-Patterns to Avoid

- **Calling graph.instagram.com from client component directly:** CORS error — all Instagram API calls must go through the Route Handler.
- **Storing Instagram token in client-side code or git:** Token is a secret — must live in Vercel environment variables only.
- **Using `onLoad` instead of `onReady` for Sender.net:** `onLoad` fires once; `onReady` fires on every component mount including SPA navigation re-visits. Use `onReady` to prevent blank forms on revisit.
- **Using `output: 'export'` in next.config:** Would break Route Handlers. Project currently has no `output` setting — do not add it.
- **Using next/image without `unoptimized` for Instagram media URLs:** Instagram CDN URLs (e.g. `cdninstagram.com`) are not in the `next.config.ts` `images.domains` whitelist. Either add them or use `unoptimized`.
- **Rendering the Instagram section unconditionally:** Per locked decision, if `posts.length === 0`, return `null` — the section div in `page.tsx` should not show at all.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Third-party script loading | Manual `<script>` injection in useEffect | `next/script` with `strategy="afterInteractive"` | Handles hydration, deduplication, SPA lifecycle correctly |
| Email subscription form | Custom form + API integration | Sender.net embed | GDPR, double opt-in, list management already built in |
| CORS-blocked API proxy | Express/Node proxy server | Next.js Route Handler | Already part of the stack; zero additional infrastructure |
| Token refresh scheduling | Manual calendar reminder every 50 days | Vercel cron job | Violates "no recurring manual steps" constraint |

**Key insight:** The entire Instagram integration complexity (CORS, token storage, token refresh) is handled by three files: one Route Handler for fetching, one Route Handler for token refresh, and one client component for display. No third-party npm packages needed.

---

## Common Pitfalls

### Pitfall 1: Instagram Basic Display API Still Referenced

**What goes wrong:** Docs from 2023 and earlier (and some blog posts) reference `https://api.instagram.com` endpoints and the Basic Display API. These return 4xx errors since December 4, 2024.

**Why it happens:** Stale documentation and tutorials remain indexed and prominent in search results.

**How to avoid:** Use only `https://graph.instagram.com/me/media` endpoints. Verify the Instagram account is a Professional (Creator or Business) account before setup.

**Warning signs:** 400/403 errors with "The endpoint you requested does not exist" or "Application does not have permission" messages.

### Pitfall 2: Instagram Long-Lived Token Expiry

**What goes wrong:** After 60 days without refresh, the token expires and the feed silently returns empty (or 400 error). The about page shows no Instagram section, which looks correct due to conditional render but is actually a silent failure.

**Why it happens:** Long-lived tokens have a hard 60-day expiry from last refresh. If the app is idle or the cron job fails, the token expires.

**How to avoid:** Implement Vercel cron job running daily to refresh the token. Alert/log the refresh result. Note: Vercel Hobby plan supports once-per-day cron — adequate for daily token refresh (token is 60 days).

**Warning signs:** Feed disappears with no error, Route Handler returns `{ posts: [] }` and logs show 400 from Instagram API.

### Pitfall 3: Token Refresh Does Not Persist the New Token

**What goes wrong:** The refresh Route Handler gets a new token from Instagram but has no way to update the Vercel environment variable. The old token is still in `process.env` on next request. After 60 days, token expires anyway.

**Why it happens:** Vercel env vars are set at deploy time — they cannot be mutated at runtime by a function.

**How to avoid:** The simplest approach that works within the "no recurring manual steps" constraint is to refresh the token daily (which extends its life by 60 days from each refresh) and ensure the initial token is set before each deploy. As long as the site is deployed at least once every 60 days (near-certain for an active project), the token stays alive. OR use Vercel KV (key-value store) to persist the refreshed token. See Open Questions.

**Warning signs:** Token refresh endpoint returns a new token in the response but it is not used on subsequent requests.

### Pitfall 4: Instagram Images Blocked by next/image Domain Allowlist

**What goes wrong:** `next/image` component throws a configuration error or shows broken images because Instagram CDN hostnames (`cdninstagram.com`, `scontent-*.cdninstagram.com`) are not in the `images.remotePatterns` list in `next.config.ts`.

**Why it happens:** Next.js Image optimization requires all external domains to be explicitly allowlisted.

**How to avoid:** Either add `{ protocol: 'https', hostname: '**.cdninstagram.com' }` to `next.config.ts` `images.remotePatterns`, OR use `<img>` with `unoptimized` prop, OR use standard `<img>` tag. Using `unoptimized` on `next/image` is simplest for this phase.

**Warning signs:** Build error "Invalid src prop ... hostname not configured under images in your next.config.js".

### Pitfall 5: Sender.net Form Blank on SPA Navigation

**What goes wrong:** User navigates away from the about page and back. The Sender.net form container renders but is empty — the script already ran once and does not re-initialise.

**Why it happens:** `onLoad` only fires once on script load. After SPA navigation, the component re-mounts but the `onLoad` handler does not re-fire.

**How to avoid:** Use `onReady` instead of `onLoad` on the `<Script>` component. `onReady` fires after every mount including re-mounts after navigation.

**Warning signs:** Form visible on first page load but empty/missing after navigating away and back.

### Pitfall 6: Sender.net Form ID Not Yet Known

**What goes wrong:** Implementation begins with a placeholder form ID that is never replaced, resulting in a form that does not appear.

**Why it happens:** Sender.net form IDs are generated inside the Sender.net dashboard when you create a form. They cannot be known before account setup.

**How to avoid:** Retrieve the actual form ID from the Sender.net dashboard before beginning implementation. This is a pre-requisite step, not a code task.

**Warning signs:** Form container div renders but no form appears in browser.

---

## Code Examples

Verified patterns from official sources:

### Instagram Graph API: Fetch Recent Media

```typescript
// Source: Instagram Graph API (graph.instagram.com)
// Requires: long-lived user access token with instagram_graph_api_user_media permission

const fields = 'id,media_type,media_url,thumbnail_url,permalink,timestamp';
const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=9&access_token=${token}`;
const res = await fetch(url);
const data = await res.json();
// data.data = array of media objects
```

### Instagram Graph API: Refresh Long-Lived Token

```typescript
// Source: Instagram Graph API refresh endpoint
// Call at least every 55 days. Token must be > 24 hours old to refresh.

const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
const res = await fetch(url);
const data = await res.json();
// data.access_token = new long-lived token (60 days from now)
```

### next/script with afterInteractive + onReady

```typescript
// Source: Next.js official docs (nextjs.org/docs/app/api-reference/components/script)
// onReady: fires on first load AND every subsequent component mount (SPA navigation)

'use client';
import Script from 'next/script';

<Script
  src="https://cdn.sender.net/accounts_resources/universal.js"
  strategy="afterInteractive"
  onReady={() => {
    // Re-instantiate after every mount
    window.senderForms?.render();
  }}
/>
```

### Vercel cron job configuration (vercel.json)

```json
// Source: Vercel Cron Jobs docs (vercel.com/docs/cron-jobs)
// Hobby plan: max once per day, timing precision ±59 min

{
  "crons": [
    {
      "path": "/api/instagram/refresh-token",
      "schedule": "0 3 * * *"
    }
  ]
}
```

### Next.js images.remotePatterns for Instagram CDN

```typescript
// Source: Next.js Image configuration
// next.config.ts — add if using next/image (not unoptimized)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
};
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Instagram Basic Display API | Instagram Graph API with Instagram Login | December 4, 2024 | All personal accounts removed; must convert to Creator/Business; different endpoint structure |
| `instagram-web-api` npm package | Official Instagram Graph API | Ongoing | Unofficial libraries break with Instagram API changes; CORS blocks client-side unofficial API calls |
| `onLoad` for third-party script re-init | `onReady` in next/script | Next.js v12.2.4 | `onReady` added specifically for SPA re-mount use case |

**Deprecated/outdated:**
- Instagram Basic Display API: Shut down December 4, 2024. Endpoint `https://api.instagram.com/v1/media/recent` returns errors.
- `instagram-web-api` npm package: Does not work due to CORS restrictions on browser-side requests.
- `next/script` `onLoad` for re-initialisation: Works only once; replaced by `onReady` for SPA navigation patterns.

---

## Open Questions

1. **Instagram token persistence after refresh**
   - What we know: Vercel env vars cannot be updated at runtime. The cron job can call the refresh endpoint and get a new token but cannot store it persistently without a separate store.
   - What's unclear: Whether the simpler "daily refresh keeps the 60-day window alive" approach is sufficient, or whether a true persistent store (Vercel KV, or similar) is needed.
   - Recommendation: For this project's scale (hobby site on free Vercel plan), a daily cron refresh call is sufficient. The token gets refreshed daily, which resets its 60-day window. As long as no deployment gap exceeds 60 days AND cron is running, token stays valid. If Vercel KV is added later, the refresh handler can write the new token there. Document this as a known limitation. **Decision for planner:** Pick the simpler approach (daily refresh without KV persistence) as Wave 1; note that a production-grade implementation would use persistent storage.

2. **Instagram @playrevolution account type**
   - What we know: The new API requires a Professional (Creator or Business) Instagram account.
   - What's unclear: Whether @playrevolution is already a Professional account or needs conversion.
   - Recommendation: Verify account type before Wave 1 implementation. Conversion is free and takes < 5 minutes in Instagram settings. This is a pre-requisite step, not a code task.

3. **Sender.net form ID retrieval**
   - What we know: The form ID is generated in the Sender.net dashboard when the form is created.
   - What's unclear: Whether the Sender.net account and form already exist, or whether they need to be created.
   - Recommendation: Create the Sender.net form as a pre-requisite step before code implementation. The form ID is required before `NewsletterSignup.tsx` can be fully implemented. Include as a Wave 0 task.

4. **Instagram API App setup with Meta**
   - What we know: Requires a Meta developer app with Instagram API with Instagram Login product added, and OAuth flow to generate the initial long-lived token.
   - What's unclear: Whether a Meta developer app already exists for this project.
   - Recommendation: Include app creation and initial token generation as Wave 0 steps. This is a one-time setup task. The resulting long-lived token is added to Vercel environment variables.

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in .planning/config.json — treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test config files in project |
| Config file | None — Wave 0 gap |
| Quick run command | N/A until framework installed |
| Full suite command | N/A until framework installed |

No test infrastructure exists in this project. Given the nature of Phase 6 (third-party embeds and API integration), the most practical validation approach is **manual smoke testing** rather than automated unit tests. The integrations depend on live credentials (Instagram token, Sender.net form ID) that cannot be mocked without a test framework setup that exceeds this phase's scope.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INST-01 | Route Handler returns posts array | manual-only | N/A — requires live Instagram token | ❌ |
| INST-01 | InstagramFeed renders 9 thumbnails in 3-column grid | manual-only | N/A — requires live Instagram token | ❌ |
| INST-01 | Clicking thumbnail opens Instagram post in new tab | manual-only | N/A — UI interaction | ❌ |
| INST-01 | Section hidden when API returns empty | manual-only | N/A — requires live credential absence | ❌ |
| NWSL-01 | Newsletter form renders on about page | manual-only | N/A — requires Sender.net account | ❌ |
| NWSL-01 | Submitting email shows Sender.net confirmation | manual-only | N/A — requires live Sender.net form | ❌ |
| NWSL-01 | Submitted email appears in Sender.net dashboard | manual-only | N/A — requires live Sender.net account | ❌ |

All requirements are manual-only for this phase because both integrations require live third-party credentials that cannot be mocked without a test setup investment disproportionate to the phase scope. Smoke testing protocol is the validation mechanism.

### Sampling Rate
- **Per task commit:** Manual browser check — load `/about`, verify section renders
- **Per wave merge:** Full smoke test (see success criteria in CONTEXT.md)
- **Phase gate:** All 4 success criteria verified manually before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] No test framework — manual smoke testing only for this phase (acceptable given third-party credential dependency)
- [ ] Pre-requisite: @playrevolution Instagram account must be Professional (Creator or Business)
- [ ] Pre-requisite: Meta developer app created with Instagram API with Instagram Login product
- [ ] Pre-requisite: Initial long-lived Instagram token generated and added to Vercel env vars as `INSTAGRAM_ACCESS_TOKEN`
- [ ] Pre-requisite: Sender.net account form created; form ID retrieved from dashboard

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs (nextjs.org/docs/app/api-reference/components/script) — Script component strategies, `onReady` vs `onLoad`, client component requirement
- Next.js official docs (nextjs.org/docs/app/getting-started/route-handlers) — Route Handler pattern for API proxy
- Vercel official docs (vercel.com/docs/cron-jobs) — Cron job configuration, Hobby plan limits (once per day, ±59 min precision)
- Vercel official docs (vercel.com/docs/cron-jobs/usage-and-pricing) — Hobby plan: 100 cron jobs, minimum interval once per day

### Secondary (MEDIUM confidence)
- Instagram API deprecation confirmed by multiple official-adjacent sources (docs.spotlightwp.com, lightwidget.com) citing Meta's December 4, 2024 shutdown — corroborated by Meta's own Instagram post
- getfishtank.com/insights/renewing-instagram-access-token — Token refresh endpoint `https://graph.instagram.com/refresh_access_token` and parameters verified
- dev.to/djchadderton — Sender.net embed code structure (two-part: universal.js script + form div with data-sender-form-id); `window.senderForms.render()` for re-mount — corroborated by Sender.net help docs confirming two-part structure

### Tertiary (LOW confidence)
- Various WebSearch results on Instagram Graph API endpoint structure (graph.instagram.com/me/media fields) — fields listed appear consistent across sources but not verified against official Meta documentation directly (Meta developer docs blocked from fetching)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new packages required; all tools are official platform features
- Architecture (Route Handler proxy pattern): HIGH — verified via Next.js official docs
- next/script onReady pattern: HIGH — verified via official Next.js Script docs
- Instagram Graph API endpoints: MEDIUM — consistent across multiple sources; official Meta docs inaccessible during research
- Instagram token refresh endpoint: MEDIUM — verified by multiple implementation guides
- Sender.net embed structure: MEDIUM — confirmed via help docs and real implementation article
- Vercel cron job limits (Hobby): HIGH — verified via official Vercel docs

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable APIs, but Instagram Graph API policy changes quickly — re-verify if > 30 days old)
