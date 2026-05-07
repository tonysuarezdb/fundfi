# Fundfi Customer Portal — Vendor Brief

> **Purpose:** Overview of the project scope, team, epics, and hour estimates for vendor evaluation.
> **Last updated:** May 2026

---

## What We Are Building

A **secure, production-grade web portal** where Fundfi merchants can log in and fully manage their financing deal — without calling support.

Today merchants have no self-service access to their account. The portal changes that.

### What the merchant can do

| Feature              | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| **Dashboard**        | See their balance, total financed amount, % paid off, and next payment date |
| **Progress bar**     | Visual indicator of how much is paid — unlocks Renewal at 40%               |
| **Payment history**  | Full list of past payments with status, method, and rejection reasons       |
| **Payment schedule** | Upcoming payment dates and amounts                                          |
| **Make a payment**   | Real one-time payment through the payment processor (ACH or card)           |
| **Renewal request**  | When 40%+ is paid: submit desired amount + 3 bank statements                |
| **Profile**          | View company info and authorized contacts                                   |
| **Support**          | Contact info and FAQ                                                        |

### What it is NOT (MVP)

- Native mobile app (responsive web only)
- Admin panel for Fundfi internal team
- Merchant profile editing
- Automated renewal decisioning or e-signature
- SMS / email reminders

---

## How It Works — Technical Overview

```
Merchant browser (Next.js portal)
    ↓ authenticated API calls
NestJS Backend
    ├── LendSaaS API       — deal data, payments, balances
    ├── Payment Processor  — real payment initiation (ACH / card)
    ├── AWS S3             — encrypted bank statement storage
    └── Email Service      — renewal notifications to Fundfi team
```

**Key technical details:**

- **Auth:** Email + password with rate limiting, account lockout, and JWT session (httpOnly cookies). NIST SP 800-63B compliant.
- **Payments:** Real integration with Fundfi's payment processor. Portal never handles raw card or bank data — hosted or tokenized flow only (PCI SAQ-A scope).
- **Document upload:** Bank statements stored in private encrypted S3. Malware scanned before accepted. Fundfi team receives expiring secure links — not raw attachments.
- **Security:** IDOR protection (merchants can never access each other's data), OWASP controls, WAF, full audit logging of all sensitive actions.
- **Data source:** LendSaaS remains the system of record. Portal reads from it; it does not duplicate deal data.

---

## Team

| Role                  | Hours                                | When most active            | Notes                                      |
| --------------------- | ------------------------------------ | --------------------------- | ------------------------------------------ |
| PM                    | 60 hrs                               | Discovery + UAT + Launch    | ~25–35% allocation, not full-time          |
| UX/UI Designer        | 64 hrs                               | Phase 1 (full-time 3 weeks) | Needs brand assets before starting         |
| Frontend Developer ×2 | 184 hrs                              | Phase 2–3                   | React / Next.js 14, TypeScript, Tailwind   |
| Backend Developer ×2  | 300 hrs                              | All phases                  | Node.js / NestJS — critical path           |
| QA Engineer           | 160 hrs                              | Phase 3 (full-time)         | Includes security test cases + UAT support |
| DevOps Engineer       | 54 hrs                               | Phase 2 + Launch            | WAF, S3, CI/CD, secrets vault, prod deploy |
| **Total**             | **822 hrs (low) — 1,173 hrs (high)** |                             |                                            |

**Peak team size:** 7 people simultaneously during Phase 2 (2 FE + 2 BE + QA + DevOps + PM).

> The Backend role is the critical path. With 1 BE developer, Phase 2 alone takes 14–16 weeks. With 2 BE developers, it compresses to 8–10 weeks. Hitting an August target requires 2 BE developers.

---

## Phases & Epics

### Phase 0 — Discovery (Weeks 1–2)

> Validate all blocking technical decisions before a line of code is written.

| Epic                         | Description                                                                                                     | Hours (Low / High) |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------ |
| LendSaaS API Evaluation      | Validate what LendSaaS exposes via API. Identify data gaps. Confirm sandbox availability. Define auth strategy. | 40 / 52            |
| Payment Processor Evaluation | Identify processor (ACH / card). Confirm hosted/tokenized flow availability. Determine PCI scope.               | 12 / 16            |
| **Phase 0 Total**            |                                                                                                                 | **52 / 68 hrs**    |

---

### Phase 1 — UX + Architecture (Weeks 1–4, parallel with Phase 0)

> Agree on what the product looks like and how it's built before anyone writes code.

| Epic                                     | Description                                                                        | Hours (Low / High) |
| ---------------------------------------- | ---------------------------------------------------------------------------------- | ------------------ |
| Wireframes & Interactive Prototype       | All 10 screens on desktop + mobile. Interactive Figma prototype for client review. | 48 / 72            |
| Visual Design & Component Library        | Fundfi branding applied to all screens. Full component library in Figma.           | 24 / 31            |
| Technical Architecture + Security Design | Data model, API contracts with LendSaaS, threat model (IDOR, XSS, CSRF, session).  | 20 / 26            |
| **Phase 1 Total**                        |                                                                                    | **92 / 129 hrs**   |

---

### Phase 2 — Build MVP (Weeks 4–16)

> Full portal with real payments, real file storage, and production security controls.

| Epic                                  | Description                                                                                | Hours (Low / High) |
| ------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------ |
| Tech stack setup & dev environment    | Monorepo, TypeScript strict, mock data layer for LendSaaS-independent development          | 16 / 21            |
| Infrastructure & DevOps               | Cloud environments (dev/staging/prod), CI/CD, Docker, WAF, secrets manager, monitoring     | 20 / 30            |
| Authentication system                 | Login, logout, forgot password, rate limiting, account lockout, JWT sessions               | 52 / 78            |
| Merchant invite & onboarding          | First-access flow: admin sends invite link → merchant accepts → account created and linked | 20 / 30            |
| Multi-user per merchant               | Multiple authorized contacts per merchant account. IDOR enforcement.                       | 25 / 37            |
| Merchant dashboard                    | KPI cards, RTR progress bar, renewal CTA (active at 40%), Make Payment button              | 38 / 57            |
| Data modules                          | Payment history, payment schedule, progress bar, profile (read-only)                       | 78 / 101           |
| Renewal request flow                  | Multi-step: amount → 3 document uploads → confirm → submit → email Fundfi team             | 44 / 66            |
| Support page                          | Contact info + FAQ                                                                         | 6 / 8              |
| LendSaaS integration layer            | Centralized NestJS service for all LendSaaS calls, retry logic, mock fallback              | 32 / 48            |
| Real payment gateway integration      | Initiate payment, handle success/pending/failed, receipt, reconciliation with LendSaaS     | 70 / 105           |
| Document storage (bank statements)    | Private encrypted S3, malware scan, expiring links, retention rules                        | 30 / 45            |
| Email routing (renewal notifications) | Automated email to Fundfi with secure document links on every renewal submission           | 12 / 18            |
| Audit logging system                  | Log all sensitive actions: login, deal views, payments, uploads, renewals                  | 25 / 37            |
| Security hardening                    | OWASP controls, IDOR enforcement, WAF config, dependency scanning, SAST in CI              | 46 / 69            |
| Responsive polish & accessibility     | iOS Safari + Android Chrome audit, WCAG AA contrast, accessible mobile forms               | 24 / 31            |
| **Phase 2 Total**                     |                                                                                            | **538 / 781 hrs**  |

---

### Phase 3 — QA + Security Testing + UAT (Weeks 16–19)

> Full regression, security verification, and client sign-off.

| Epic                           | Description                                                                                                  | Hours (Low / High) |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | ------------------ |
| Full QA regression & bug fixes | End-to-end regression across all flows including edge cases (expired session, bounced payment, IDOR attempt) | 44 / 66            |
| Security testing & compliance  | IDOR tests, XSS, CSRF, lockout, file upload bypass, audit log completeness, PCI confirmation                 | 20 / 30            |
| UAT with Fundfi team           | Staging session with realistic test data. Collect feedback. Sign-off document.                               | 20 / 26            |
| **Phase 3 Total**              |                                                                                                              | **84 / 122 hrs**   |

---

### Phase 4 — Launch / Handoff (Weeks 19–21)

> Go live and hand over everything the team needs to operate independently.

| Epic                              | Description                                                                                    | Hours (Low / High) |
| --------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------ |
| Production deployment & go-live   | Final prod config, DNS, SSL, WAF, secrets, load test, go-live checklist, 1-week hotfix window  | 20 / 26            |
| Compliance documentation          | PCI SAQ documentation, security controls summary, audit log retention policy, incident runbook | 16 / 21            |
| Technical documentation & handoff | API docs, deployment runbook, Fundfi team operating guide, post-MVP backlog                    | 20 / 26            |
| **Phase 4 Total**                 |                                                                                                | **56 / 73 hrs**    |

---

## Hour Summary

| Phase                         | Low         | High          | Calendar time                     |
| ----------------------------- | ----------- | ------------- | --------------------------------- |
| Phase 0 — Discovery           | 52 hrs      | 68 hrs        | Weeks 1–2                         |
| Phase 1 — UX + Architecture   | 92 hrs      | 129 hrs       | Weeks 1–4 (parallel with Phase 0) |
| Phase 2 — Build MVP           | 538 hrs     | 781 hrs       | Weeks 4–16                        |
| Phase 3 — QA + Security + UAT | 84 hrs      | 122 hrs       | Weeks 16–19                       |
| Phase 4 — Launch / Handoff    | 56 hrs      | 73 hrs        | Weeks 19–21                       |
| **Total**                     | **822 hrs** | **1,173 hrs** | **17–21 weeks (~4–5 months)**     |

> **Estimate logic:** Low estimate = sum of all role hours. High estimate applies a risk multiplier: low-risk items ×1.3, medium-risk items ×1.5.

---

## Key Risks

| Risk                                            | Impact                                  | Mitigation                                                             |
| ----------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| LendSaaS API doesn't expose all required fields | +40–80 hrs BE                           | Phase 0 validates before build starts                                  |
| Payment processor doesn't support hosted flow   | +30–40 hrs (PCI scope expands to SAQ-D) | Must be resolved by end of Phase 0                                     |
| Payment processor not identified before Phase 2 | Blocks payment epic entirely            | Decide by end of Phase 0, week 2                                       |
| August target with current scope                | Aggressive                              | Requires 2 BE devs + Phase 0 starting immediately + no scope additions |
| Branding assets not ready                       | Delays visual design                    | Wireframes start without brand; visual design needs assets by week 3   |

---

## Open Questions (Must Be Answered Before Phase 2)

1. Which payment processor does Fundfi use today — ACH, card, or both?
2. Does the processor support a hosted or tokenized payment flow?
3. Does LendSaaS expose all required fields (deal, payments, schedule, balances) via API?
4. Is there a LendSaaS sandbox environment available for development?
5. Does LendSaaS support webhooks for payment and deal status updates?
6. Can one merchant have multiple active deals simultaneously?
7. How are merchants invited — bulk import, manual admin, or self-registration?
8. What branding assets, domain name, and legal disclosures are required?

---

_Prepared by Dualboot Partners — May 2026_
