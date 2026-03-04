---
phase: 6
slug: third-party-integrations
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-04
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest / playwright (existing) |
| **Config file** | jest.config.ts / playwright.config.ts |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx playwright test` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx playwright test`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 0 | INST-01 | manual | — | ❌ W0 | ⬜ pending |
| 6-01-02 | 01 | 1 | INST-01 | build | `npm run build` | ✅ | ⬜ pending |
| 6-01-03 | 01 | 1 | INST-01 | build | `npm run build` | ✅ | ⬜ pending |
| 6-01-04 | 01 | 2 | INST-01 | build | `npm run build` | ✅ | ⬜ pending |
| 6-02-01 | 02 | 0 | NWSL-01 | manual | — | ❌ W0 | ⬜ pending |
| 6-02-02 | 02 | 1 | NWSL-01 | build | `npm run build` | ✅ | ⬜ pending |
| 6-02-03 | 02 | 1 | NWSL-01 | build | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Meta Developer App created with Instagram API with Instagram Login product
- [ ] Initial long-lived Instagram access token generated and stored as `INSTAGRAM_ACCESS_TOKEN` in Vercel env vars
- [ ] `INSTAGRAM_USER_ID` stored in Vercel env vars
- [ ] Sender.net form ID retrieved from dashboard and stored as `NEXT_PUBLIC_SENDER_FORM_ID` env var
- [ ] `vercel.json` cron job configured for daily token refresh

*Wave 0 prerequisites must be completed before Wave 1 code tasks begin.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Instagram posts visible on about page | INST-01 | Requires live API token and real account | Load /about, verify 4-6 Instagram post thumbnails appear on both mobile and desktop |
| Newsletter form submits successfully | NWSL-01 | Requires live Sender.net account integration | Submit test email via form, verify confirmation message appears, check Sender.net dashboard for subscriber |
| Instagram posts render on mobile | INST-01 | Visual/responsive layout | Test at 375px viewport width |
| Newsletter form renders on mobile | NWSL-01 | Visual/responsive layout | Test at 375px viewport width |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
