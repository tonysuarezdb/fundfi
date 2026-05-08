# Fundfi Customer Portal — Vendor Brief

> **Purpose:** Executive + technical overview of the proposed Fundfi Customer Portal for vendor evaluation, budgeting, and delivery planning.
>
> **Last updated:** May 2026

---

# Executive Summary

Fundfi currently does not have a customer self-service portal for merchants.

Today, merchants cannot:

- view their balance,
- track repayment progress,
- review payment history,
- make additional payments,
- or request renewals online.

This creates:

- operational overhead,
- support dependency,
- reduced customer transparency,
- and missed renewal opportunities.

The proposed portal solves this by creating a secure, production-grade customer experience where merchants can manage their financing relationship directly online.

The portal is not just a frontend dashboard.

It includes:

- secure authentication,
- real payment processing,
- financial data integrations,
- document uploads,
- encrypted storage,
- audit logging,
- and production-grade security controls.

Because the platform handles financial account information, payment activity, and sensitive business documents, security and compliance requirements significantly impact implementation complexity.

An interactive frontend simulation is available to demonstrate the intended merchant experience and workflows. However, the production MVP still requires:

- backend architecture,
- payment integrations,
- LendSaaS integration,
- infrastructure,
- security hardening,
- QA,
- and production deployment.

Estimated implementation timeline:

- **13–15 weeks**
- depending on:
  - LendSaaS API readiness,
  - payment processor capabilities,
  - and staffing levels.

Largest technical risks:

1. LendSaaS API coverage
2. Payment processor integration model
3. Security/compliance scope

---

# Interactive Demo

An interactive frontend simulation is available to demonstrate the intended merchant experience and workflows before committing to implementation scope.

|                    |                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **URL**            | https://portal-mock-omega.vercel.app                                                      |
| **Login**          | Any email and password — no real credentials needed                                       |
| **Demo scenarios** | Use the **Demo Scenario** selector in the bottom-left sidebar to switch between merchants |

## Demo scenarios available

| Scenario                     | What it shows                                                    |
| ---------------------------- | ---------------------------------------------------------------- |
| Below 40% — Renewal Disabled | Renewal button visible but locked. Progress bar under threshold. |
| Above 40% — Renewal Active   | Renewal button enabled. Merchant can submit a request.           |
| 45% Paid — Bounced Payment   | Payment history includes a bounced entry highlighted in red.     |
| 35% Paid — Pending Payment   | Multiple pending payments in history.                            |
| 72% Paid — Renewal Submitted | Renewal already submitted. Confirmation state visible.           |

> All data shown in the demo is mock data only.
>
> No real payments, no real documents, and no real API calls are used.
>
> The demo is safe to share and explore freely.

---

# What We Are Building

A secure, responsive, production-grade web portal where Fundfi merchants can log in and manage their financing relationship without needing to contact support.

## Merchant capabilities

| Feature               | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| **Dashboard**         | View balance, total financed amount, % paid off, and next payment date |
| **Progress Tracking** | Visual repayment progress bar. Renewal unlocks automatically at 40%    |
| **Payment History**   | Full payment history with status, method, and rejection reasons        |
| **Payment Schedule**  | Upcoming payment dates and amounts                                     |
| **Make a Payment**    | Real one-time payment through payment processor (ACH or card)          |
| **Renewal Request**   | When 40%+ paid: submit renewal request + 3 bank statements             |
| **Profile**           | View company info and authorized contacts                              |
| **Support**           | Contact information and FAQ                                            |

---

# What This Project Is NOT (MVP)

The initial MVP does NOT include:

- Native mobile app (responsive web only)
- Internal admin portal
- Merchant profile editing
- Automated underwriting
- E-signature workflows
- SMS/email reminders
- AI assistant/chat support
- Portfolio analytics dashboards

---

# Prototype vs Production MVP

## Interactive Prototype (Current Demo)

The current demo demonstrates:

- UI/UX
- navigation flow
- merchant experience
- visual branding
- simulated states and workflows

The demo does NOT include:

- real backend infrastructure
- real payments
- real authentication
- real document storage
- real integrations
- security hardening
- compliance implementation

## Production MVP (Actual Build)

The production implementation includes:

- backend APIs
- authentication system
- payment processor integration
- encrypted document storage
- LendSaaS integration
- audit logging
- OWASP security controls
- infrastructure deployment
- QA/UAT
- production monitoring

---

# Why This Is More Than “Just a Portal”

This project handles:

- financial account information,
- payment activity,
- business-sensitive documents,
- and customer authentication.

Because of that, the platform must meet enterprise-grade security and operational standards.

Major complexity drivers include:

- secure payment processing,
- PCI scope management,
- encrypted file handling,
- identity/access controls,
- API integrations,
- and audit logging.

This significantly increases implementation effort compared to a standard frontend dashboard.

---

# IMPORTANT DELIVERY & TIMELINE NOTE

The interactive prototype/demo should NOT be interpreted as an almost-finished production application.

The current demo primarily validates:

- UX direction
- merchant experience
- workflows
- visual branding
- navigation
- and overall product concept

The majority of engineering effort still exists in:

- backend development,
- security implementation,
- payment integrations,
- LendSaaS integration,
- infrastructure,
- QA,
- compliance,
- and production deployment.

## Estimated Production Timeline

| Scope                        | Estimated Time                |
| ---------------------------- | ----------------------------- |
| Discovery & architecture     | 3–4 weeks                     |
| MVP implementation           | 5–6 weeks                     |
| QA, security review & UAT    | 3 weeks                       |
| Launch & stabilization       | 2 weeks                       |
| **Total Estimated Timeline** | **13–15 weeks (~3–4 months)** |

## Estimated Team Effort

| Estimate Type | Hours     |
| ------------- | --------- |
| Low estimate  | 822 hrs   |
| High estimate | 1,173 hrs |

### Hours by Role

| Role               | Hours (Low) | Avg FTE            | Notes                                                                      |
| ------------------ | ----------- | ------------------ | -------------------------------------------------------------------------- |
| PM                 | 60 hrs      | 25%                | Coordination, client comms, UAT facilitation, compliance docs              |
| UX / UI Designer   | 64 hrs      | 50% (Phase 1 only) | Full-time Phase 1 — 11 screens with all states                             |
| Tech Lead          | —           | 100%               | Architecture decisions, code review, ~10 h/week BE + ~5 h/week FE guidance |
| Frontend Developer | 184 hrs     | 100%               | React / Next.js 14+. Payment UI, file upload, renewal flow                 |
| Backend Developer  | 300 hrs     | 100%               | Critical path — payments, LendSaaS, S3, auth, security                     |
| QA Engineer        | 160 hrs     | 50%                | Part-time Phase 2 (test planning) → full-time Phase 3                      |
| DevOps Engineer    | 54 hrs      | 25%                | CI/CD, WAF, S3, secrets vault, production deployment                       |
| **Total**          | **822 hrs** |                    |                                                                            |

> **These estimates trend upward, not downward.**
> Risk on this type of project is one-directional — scope gaps, integration unknowns, and compliance requirements tend to add hours, not reduce them.
> The high estimate accounts for known risks (LendSaaS API coverage, payment processor complexity, PCI scope). If those risks materialize fully, actual effort could exceed the high estimate.

## Important Staffing Note

The backend is the critical path for delivery.

The Backend Developer (40 hrs/week) and the Tech Lead (contributing ~10 hrs/week directly to BE work) together provide **50 effective hours/week of backend capacity**. This is sufficient to complete the 300 hrs of backend scope in approximately 6 weeks, keeping the project on the 13–15 week timeline.

An August launch target is achievable if:

- Phase 0 starts immediately,
- scope is finalized before Phase 2 begins,
- and no additional scope is added during Phase 2.

## Why The Timeline Is Significant

This is not only a frontend dashboard project.

The platform includes:

- financial account access,
- real payment processing,
- encrypted document handling,
- authentication systems,
- compliance-sensitive workflows,
- and production-grade security controls.

These requirements materially increase implementation complexity and QA/security effort.

_Prepared by Dualboot Partners — May 2026_
