# Fundfi Customer Portal — Product Overview

> **Audience:** Product team, stakeholders, and anyone who needs to understand what is being built, why, and how the team is organized.
> **Companion files:** `scope-estimate-simple.csv` (phase-level view) · `scope-estimate-formatted.csv` (epic-by-epic detail)
> **Last updated:** May 2026 — revised to reflect real payment integration and security requirements per Architect Scoping Brief.

---

## What Are We Building?

A **secure, production-grade merchant-facing web portal** where Fundfi customers can log in, see the full picture of their financing deal, make real payments, and request renewal — without calling support.

Today, merchants have no self-service access to their deal information. That creates friction: they don't know their balance, they can't see upcoming payments, and they have no way to request renewal on their own. The portal solves all of that in one place.

### The core promise to the merchant:

> _"Log in once and know exactly where you stand — how much you owe, what's coming next, and what you need to do."_

---

## What the Merchant Can Do

| Feature              | What the merchant sees or does                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Dashboard**        | Balance RTR, total RTR, % paid off, next payment date, expected final payment date                               |
| **Progress Bar**     | Visual indicator of how much of the deal is paid off — unlocks Renewal at 40%                                    |
| **Payment History**  | Full list of past payments: date, amount, status, method, rejection reason. Bounced payments highlighted in red. |
| **Payment Schedule** | Frequency (daily/weekly), payment amount, next 5 scheduled dates, expected end date                              |
| **One-Time Payment** | Make a real payment through the payment processor — not simulated                                                |
| **Renewal Request**  | When 40%+ is paid off: submit desired amount + 3 bank statements securely stored                                 |
| **Profile**          | View company name, address, authorized contacts, and business info                                               |
| **Support**          | Email, phone, and basic FAQ                                                                                      |

---

## What the Portal Is NOT (MVP Scope)

These are explicitly **out of scope** for the MVP:

- Underwriting or credit decisioning
- Editing merchant profile information (read-only in MVP)
- Native mobile app (responsive web only — works on mobile browsers)
- Admin panel for Fundfi internal team
- Saved payment methods / recurring payment changes
- Automated renewal decisioning or e-signature
- SMS/email payment reminders

---

## The 40% Rule — Renewal Eligibility

The Renewal CTA is the most important **business logic** in the portal. Here is how it works:

```
percent_paid = (total_RTR - balance_RTR) / total_RTR
```

- **Below 40%:** The "Renew Now" button is visible but disabled. A message shows the merchant their progress toward the threshold.
- **At or above 40%:** The button activates. The merchant enters a desired renewal amount and uploads 3 bank statements.
- **After submitting:** The portal shows a confirmation state and Fundfi receives an automatic email with the company name in the subject and secure links to the uploaded documents.

This rule is enforced **server-side** — not just in the UI — so it cannot be bypassed by manipulating the URL or API calls.

---

## Payments — Real, Not Simulated

The one-time payment flow is a **real integration** with Fundfi's payment processor. The scope includes:

- Payment initiation through a **hosted or tokenized flow** (the portal never touches raw card or bank account data)
- Payment status handling: success, pending, failed
- Receipt and reference number generation
- Reconciliation signal back to LendSaaS after payment confirms

**What this requires before Fase 2 starts (Fase 0 discovery):**

- Which processor does Fundfi use today? ACH, card, or both?
- Does the processor offer a hosted payment page or embedded tokenized fields?
- Who holds PCI DSS responsibility — Fundfi or Dualboot?

**PCI DSS scope depends on the answer:**

- Hosted payment page → SAQ-A (simplest, smallest scope addition)
- Embedded tokenized fields (Accept.js / Stripe.js) → SAQ-A-EP
- Server-side card handling → SAQ-D (very complex, avoid)

---

## Bank Statements — Real Secure Upload

The renewal document upload is a **real file storage integration**. The scope includes:

- Merchant uploads 3 files (PDF, JPG, or PNG) via the portal
- Files are stored in **private encrypted cloud storage** (AWS S3 or equivalent)
- Files undergo **malware scanning** before being accepted
- Fundfi team receives an email with **expiring secure links** (not raw attachments) to access the documents
- Files are never directly accessible via a public URL

---

## Security — First-Class Requirement

Because this portal exposes financial account data, PII, and payment activity, security is not an afterthought. The following controls are in scope for MVP:

| Control                       | What it means                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IDOR protection**           | A merchant can never access another merchant's data by guessing a deal ID in the URL. Every request is validated server-side against the active session. |
| **Rate limiting & lockout**   | Login is rate-limited. After 5 failed attempts, the account is temporarily locked.                                                                       |
| **Secure session management** | JWT with httpOnly cookies and session timeout. Aligned with NIST SP 800-63B.                                                                             |
| **Audit logging**             | Every sensitive action is logged: login/logout, deal views, payment attempts, document uploads, renewal submissions. Logs are queryable by Fundfi admin. |
| **WAF**                       | Web Application Firewall active at the infrastructure layer.                                                                                             |
| **Secrets management**        | API keys, payment credentials, and database passwords stored in a secrets vault — never in code or environment files.                                    |
| **OWASP controls**            | Input validation, output encoding, CSRF/XSS protections, secure HTTP headers.                                                                            |
| **Dependency scanning**       | Automated vulnerability scanning in CI/CD pipeline.                                                                                                      |

---

## How Data Flows

```
Merchant browser
    ↓ HTTPS
Fundfi Portal (Next.js frontend)
    ↓ authenticated API calls
NestJS Backend
    ├── LendSaaS API (deal data, payments, schedules, balances)
    ├── Payment Processor (one-time payment initiation + status)
    ├── AWS S3 (bank statement storage)
    └── Email Service (renewal submission notification to Fundfi)
```

**LendSaaS remains the system of record.** The portal stores only:

- Portal user accounts and merchant mappings
- Audit logs
- Renewal request records and file metadata
- Payment request references (not payment data itself)

---

## Open Questions — Must Be Answered Before Fase 2

These are blocking decisions that affect the estimate. Each unresolved question adds risk to the timeline.

| #   | Question                                                                               | Impact if unanswered                                             |
| --- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | Does LendSaaS expose all required fields via API? (deal, payments, schedule, balances) | Could add 40-80 hrs BE if data must be derived or transformed    |
| 2   | Is there a LendSaaS sandbox environment?                                               | Without it, all Fase 2 BE work runs against mock data only       |
| 3   | Which payment processor does Fundfi use? ACH, card, or both?                           | Determines payment scope, PCI SAQ type, and integration approach |
| 4   | Does the processor support hosted/tokenized flow?                                      | Determines PCI scope: SAQ-A vs. SAQ-D                            |
| 5   | Does LendSaaS support webhooks for payment and deal updates?                           | Without webhooks, portal must poll — adds latency and complexity |
| 6   | Can one merchant have multiple active deals?                                           | Affects dashboard layout and data model                          |
| 7   | How are merchants invited? Bulk import, manual admin, self-registration?               | Affects onboarding flow scope                                    |
| 8   | What file types and sizes are allowed for bank statements?                             | Affects upload validation and storage policy                     |
| 9   | Should bank statements be emailed as attachments or as secure links?                   | Affects email routing design                                     |
| 10  | What audit log retention period does Fundfi require?                                   | Affects storage and compliance documentation                     |
| 11  | What branding, domain, and legal footer/disclosures are required?                      | Needed before Fase 1 design starts                               |

---

## Screens at a Glance

| Screen           | Purpose                                                                      |
| ---------------- | ---------------------------------------------------------------------------- |
| Login            | Email + password. Rate-limited. Account lockout.                             |
| Forgot Password  | Expiring reset link sent to verified email.                                  |
| Reset Password   | Set new password via secure link.                                            |
| Invite Accept    | First-time setup for new merchant users invited by Fundfi admin.             |
| Dashboard        | Central hub — all deal KPIs, RTR progress bar, renewal CTA, payment button.  |
| Deal Detail      | Full deal card + upcoming 5 payment dates.                                   |
| Payment History  | Paginated table. Red rows for bounced/failed payments with rejection reason. |
| Payment Schedule | Frequency, amount, next 5 dates, expected final date.                        |
| Make Payment     | Real payment flow: amount → confirm → process → receipt.                     |
| Renewal Request  | Multi-step: amount → 3 document uploads → confirm → submit to Fundfi.        |
| Profile          | Company info + authorized contacts. Read-only.                               |
| Support          | Contact info + FAQ.                                                          |

---

## Development Phases

### Fase 0 — Discovery (Weeks 1–2)

**Goal:** Lock in all decisions that block the build before a line of code is written.

BE lead and PM validate the LendSaaS API (endpoint coverage, sandbox availability, data quality) and the payment processor (ACH vs. card, hosted flow availability, PCI scope). This phase is cheap to run and expensive to skip.

**Deliverable:** Decision document — LendSaaS API map, payment processor approach, PCI SAQ type, auth strategy, list of data gaps.

---

### Fase 1 — UX + Architecture (Weeks 1–4, parallel with Fase 0)

**Goal:** Agree on what the product looks like and how it's built before anyone touches the codebase.

Design produces wireframes and an interactive prototype for all screens. BE lead produces the data model, security threat model, and API contracts. Sign-off before Fase 2 begins.

**Deliverable:** Figma prototype (covers full golden path on desktop + mobile) + architecture diagram + threat model.

---

### Fase 2 — Build MVP (Weeks 4–10)

**Goal:** A production-grade portal: real auth, real payments, real file storage, real security controls.

This is the longest phase. BE dev + Tech Lead + FE dev work in parallel. QA runs smoke tests and begins test planning from week 6 onward.

**Build order (rough):**

1. Dev environment + infra + CI/CD + WAF
2. Authentication + merchant invite flow + multi-user
3. LendSaaS integration layer (or mock data if sandbox unavailable)
4. Audit logging system (enabled from the start — not bolted on later)
5. Dashboard + data modules (progress, history, schedule, profile)
6. Renewal request flow + document storage (S3) + email routing
7. Real payment gateway integration
8. Security hardening (OWASP controls, IDOR enforcement, dependency scanning)
9. Responsive polish + accessibility pass

**Deliverable:** Fully working portal on staging. All real integrations live (LendSaaS, payment processor, S3, email). Security checklist passed.

---

### Fase 3 — QA + Security Testing + UAT (Weeks 10–13)

**Goal:** Find and fix bugs. Verify security controls. Get client sign-off.

QA runs full regression across all flows including security test cases (IDOR attempts, XSS, lockout enforcement, audit log completeness). Then UAT session with Fundfi team on staging with realistic test data.

**What product needs to prepare:** At least 3 test merchant accounts with different scenarios: one below 40%, one above 40%, one with a bounced payment in history. Makes UAT meaningful.

**Deliverable:** Regression report. Security test results. Fundfi sign-off document. Triaged bug list (fix before launch vs. post-launch).

---

### Fase 4 — Launch / Handoff (Weeks 13–15)

**Goal:** Go live with production-grade confidence. Hand over everything the team needs to operate independently.

Production environment fully configured. Compliance documentation generated. Technical and operational handoff complete. 1-week hotfix window included.

**Deliverable:** Portal live in production. PCI SAQ documentation. Audit log runbook. Post-MVP backlog. Repo + credentials handoff.

---

## Team — Who Does What

### PM (Project Manager)

- **Total hours:** ~60 hrs
- **When most active:** Fase 0 (decisions), Fase 3 (UAT coordination + security sign-off), Fase 4 (compliance docs + handoff)
- **Responsibilities:** Client communication, sprint planning, UAT facilitation, milestone tracking, risk escalation, compliance documentation coordination
- **Not responsible for:** Technical decisions, security controls, QA test cases

---

### UX/UI Designer

- **Total hours:** ~64 hrs
- **When most active:** Fase 1 (3 weeks, effectively full-time)
- **Responsibilities:** Wireframes (low + high fidelity), interactive Figma prototype, visual design for all screens + states, component library
- **Dependency:** Needs Fundfi branding assets (logo, brand colors, approved terminology) before Fase 1 starts. No brand = add ~10-15 hrs brand discovery sprint.

---

### Tech Lead

- **Total hours:** Not tracked separately — captured in team overhead
- **Commitment:** 20 hrs/week for the full project duration
- **When most active:** All phases, with peak in Fase 2 (build)
- **Responsibilities:** Architecture decisions, technical direction, code review across FE and BE, security design, threat model, API contracts. Directly contributes ~10 hrs/week to BE implementation and ~5 hrs/week of FE technical guidance. Remaining ~5 hrs/week covers planning, reviews, and cross-cutting concerns.
- **Note:** The Tech Lead's BE contribution is what enables the 50 effective BE hrs/week needed to complete the build phase on schedule.

---

### Frontend Developer

- **Total hours:** ~184 hrs
- **When most active:** Fase 2 (peak) and Fase 3 (bug fixes)
- **Responsibilities:** All portal screens in Next.js 14+. Auth flows, payment UI, renewal multi-step, file upload UX, responsive behavior, CSRF/XSS controls in frontend layer. Also receives ~5 h/week of FE technical guidance from Tech Lead.
- **Stack:** React, Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Dependency:** Needs Figma comps (Fase 1) before building screens (Fase 2)

---

### Backend Developer + Tech Lead

- **Total hours:** ~300 hrs (BE Developer) — the heaviest role
- **When most active:** Fase 0 through Fase 3
- **Responsibilities:** NestJS API, authentication + session management, LendSaaS integration, payment gateway integration, S3 file storage + malware scan, email routing service, audit logging, IDOR enforcement, OWASP security controls. The Tech Lead contributes ~10 hrs/week of direct BE work (architecture implementation, code review, complex integrations) alongside the BE Developer's 40 hrs/week, for 50 effective BE hours/week total.
- **Stack:** Node.js, NestJS, PostgreSQL, Prisma ORM, AWS S3
- **Critical path:** BE is the blocker for everything. With 50 effective BE hrs/week (BE dev + Tech Lead), the 300 hrs of BE scope completes in ~6 weeks — fitting within the 13–15 week timeline.

---

### QA Engineer

- **Total hours:** ~160 hrs — significantly higher than initial estimate due to real payments + security testing
- **When most active:** Fase 3 (full-time for 3 weeks)
- **Responsibilities:** Test plan, smoke tests during Fase 2 (from week 8), full regression in Fase 3, security test cases (IDOR, lockout, XSS), payment flow testing (success/failed/pending), file upload security tests, UAT support
- **Note:** Financial + payment testing requires more thoroughness than a standard web app. Bounced payment scenarios, payment webhook edge cases, and audit log completeness need dedicated test coverage.

---

### DevOps Engineer

- **Total hours:** ~54 hrs
- **When most active:** Fase 2 (infra setup), Fase 4 (production deployment)
- **Responsibilities:** Cloud environments, CI/CD, Docker, managed DB with backups, WAF, secrets vault, S3 bucket config, SSL, monitoring, production deployment, dependency scanning in pipeline
- **Note:** Given security requirements (WAF, secrets vault, encrypted storage), this role cannot be cut. Can be shared with a senior BE dev if that person has cloud infrastructure experience.

---

## Risks & Mitigation

| Risk                                           | Likelihood | Impact | Mitigation                                                                                                       |
| ---------------------------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| LendSaaS API doesn't expose all required data  | Medium     | High   | Mock data layer built from day 1. Fase 0 validates before Fase 2 starts. Budget +40-80 hrs BE if gaps found.     |
| LendSaaS sandbox not available                 | Medium     | Medium | All Fase 2 development runs against mock data. Real integration validated in Fase 3 against staging credentials. |
| Payment processor doesn't support hosted flow  | Medium     | High   | Forces SAQ-D compliance path — adds ~30-40 hrs and extends Fase 2. Resolve in Fase 0.                            |
| Payment processor not identified before Fase 2 | High       | High   | Blocks payment gateway epic entirely. Must be decided by end of Fase 0 week 2.                                   |
| August timeline with current scope             | Medium     | High   | 13-15 week timeline makes August feasible if Fase 0 starts immediately and no scope is added in Fase 2.          |
| Branding assets not ready                      | Low        | Medium | Wireframes start without brand. Visual design (week 3 of Fase 1) needs brand assets.                             |
| Security review findings in Fase 3             | Medium     | High   | Start security hardening in Fase 2 week 1, not at the end. Don't bolt security on — build it in.                 |

---

## Post-MVP Backlog

These are confirmed future features, not scope for this estimate:

1. **Saved payment methods** — Store tokenized payment credentials for future use
2. **Profile editing** — Allow merchants to request contact/address updates
3. **Email notifications** — Payment confirmation, upcoming payment reminders, renewal status updates
4. **Multi-deal dashboard navigation** — Switch between multiple active deals
5. **MFA enforcement** — TOTP or SMS second factor for login
6. **Admin panel for Fundfi team** — Manage merchants, review renewal submissions, view audit logs, manage portal users
7. **Prefilled renewal offers** — Fundfi-generated renewal terms visible in portal
8. **Document center** — Downloadable statements and agreement history

---

## Hour Summary by Role

| Role           | Hrs         | % of Total |
| -------------- | ----------- | ---------- |
| PM             | 60          | 7%         |
| UX/UI Designer | 64          | 8%         |
| Tech Lead      | —           | —          |
| Frontend       | 184         | 22%        |
| Backend        | 300         | 37%        |
| QA             | 160         | 19%        |
| DevOps         | 54          | 7%         |
| **Total**      | **822 hrs** | **100%**   |

**Low estimate:** ~822 hrs | **High estimate:** ~1,173 hrs
**Timeline:** 13–15 weeks (~3–4 months)
**To hit August (client goal):** Fase 0 starting immediately + zero scope additions in Fase 2

> Estimates follow the same risk multiplier used in the detail spreadsheets:
> Low risk items × 1.3 · Medium risk items × 1.5

> **Key change from v1:** Payments and bank statement uploads are real integrations (not simulated). Security hardening, audit logging, document storage, and multi-user support are now in MVP scope based on the Architect Scoping Brief reviewed May 2026.
