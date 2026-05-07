# Fundfi Customer Portal

Merchant-facing web portal for Fundfi customers. Built with Next.js 14, TypeScript, and Tailwind CSS.

All data is currently mocked — the app runs fully without a backend. When the real API is ready, each service file has a clearly marked swap point (see [Connecting to the real API](#connecting-to-the-real-api)).

**Live demo:** https://portal-mock-omega.vercel.app — any email + any password to log in.

---

## What this app does

- **Dashboard** — balance RTR, total RTR, % paid off, next payment date
- **Payment history** — full list with status, method, rejection reasons
- **Payment schedule** — upcoming dates and amounts
- **Make a payment** — one-time payment flow (mocked, ready for real processor)
- **Renewal request** — multi-step: amount → 3 document uploads → submit (unlocks at 40% paid)
- **Profile** — company info and authorized contacts (read-only)
- **Support** — contact info and FAQ

---

## Getting started

### Requirements

- Node.js 20+
- npm 10+

### 1. Clone the repo

```bash
git clone git@github.com:tonysuarezdb/fundfi.git
cd fundfi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment

```bash
cp .env.local.example .env.local
```

Leave `NEXT_PUBLIC_API_URL` empty to run in mock mode (default). No other changes needed to run locally.

### 4. Start the dev server

```bash
npm run dev
# → http://localhost:3000
```

Log in with any email and password. Use the **Demo Scenario** selector in the bottom-left sidebar to switch between merchant scenarios.

### 5. Activate pre-commit hooks (one-time)

```bash
npx husky install
```

This enables lint-staged to run ESLint + Prettier before every commit.

---

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start dev server at localhost:3000 |
| `npm run build`        | Production build                   |
| `npm run start`        | Start production server            |
| `npm run lint`         | Run ESLint                         |
| `npm run typecheck`    | Run TypeScript compiler check      |
| `npm run format`       | Format all files with Prettier     |
| `npm run format:check` | Check formatting without writing   |

---

## Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Login
│   ├── forgot-password/
│   ├── middleware.ts             # Route protection (cookie-based)
│   └── (dashboard)/              # All authenticated screens
│       ├── layout.tsx            # Shared layout (sidebar + topnav)
│       ├── _components/          # Layout-scoped client components
│       ├── dashboard/
│       ├── deal/
│       ├── payments/
│       ├── make-payment/
│       ├── renewal/
│       ├── profile/
│       └── support/
├── components/
│   ├── layout/                   # Sidebar, TopNav
│   └── ui/                       # Badge, ProgressBar, DemoSwitcher
├── config/
│   └── index.ts                  # App-wide constants (renewal threshold, upload limits)
├── contexts/
│   └── MerchantContext.tsx       # Selected merchant state (demo switcher)
├── data/
│   └── mock.ts                   # 5 merchant scenarios — swappable with real API
├── hooks/
│   ├── useMakePayment.ts         # Payment flow state
│   └── useRenewal.ts             # Renewal flow state + file validation
├── lib/
│   └── format.ts                 # Currency and date formatters
├── services/
│   ├── api.ts                    # Base API client (ready, not yet used)
│   ├── authService.ts            # Login, logout, forgot password
│   ├── merchantService.ts        # Merchant data and deal info
│   ├── paymentService.ts         # Payment history and initiation
│   └── renewalService.ts         # Renewal submission and status
└── types/
    └── index.ts                  # All TypeScript interfaces
```

---

## Demo scenarios

Use the **Demo Scenario** selector in the bottom-left sidebar to switch between merchants without logging out.

| Scenario                     | Company              | % Paid | State                       |
| ---------------------------- | -------------------- | ------ | --------------------------- |
| Below 40% — Renewal Disabled | Green Valley Auto    | 28%    | Renewal locked              |
| Above 40% — Renewal Active   | Summit Logistics LLC | 62%    | Renewal available           |
| 45% Paid — Bounced Payment   | Pacific Rim Trading  | 45%    | Bounced payment in history  |
| 35% Paid — Pending Payment   | BlueStar Services    | 35%    | Pending payments in history |
| 72% Paid — Renewal Submitted | Coastal Ventures     | 72%    | Renewal already submitted   |

---

## Connecting to the real API

Every service file in `src/services/` follows the same pattern:

```ts
// ─── MOCK (delete this block when connecting to real API) ────────────────────
import { merchants } from '@/data/mock';
// ─────────────────────────────────────────────────────────────────────────────

export async function getPayments(merchantId: string): Promise<Payment[]> {
  // TODO: replace mock with → return apiClient.get<Payment[]>('/payments');
  await mockDelay();
  return [...merchant.payments].reverse();
}
```

**To connect a service to the real API:**

1. Set `NEXT_PUBLIC_API_URL` in `.env.local` to the real API base URL
2. Open the service file
3. Uncomment the `apiClient` call in the TODO comment
4. Delete the mock block above it

No component changes needed — the hooks and UI are already wired to the service layer.

---

## Environment files

| File                 | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `.env.local.example` | Template — copy to `.env.local` for local overrides          |
| `.env.development`   | Development defaults (mock mode, localhost)                  |
| `.env.staging`       | Staging API and URL (real values set in Vercel dashboard)    |
| `.env.production`    | Production API and URL (real values set in Vercel dashboard) |

> Never commit `.env.local`. Real secrets (API keys, payment credentials) go in Vercel's environment variable dashboard — not in any file.

---

## Deployment

**Deploy to production:**

```bash
vercel --prod
```

**First time on a new machine:**

```bash
vercel login
vercel link --project portal-mock
vercel --prod
```

Every push to `main` on GitHub also triggers an automatic Vercel deploy via the CI/CD pipeline.

**Vercel project:** https://vercel.com/tonysuarez-6791s-projects/portal-mock

---

## CI/CD

GitHub Actions runs on every pull request to `main` or `develop`:

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`

See [.github/workflows/ci.yml](.github/workflows/ci.yml).

---

## Docs

| File                                                                                       | Description                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [docs/api.md](docs/api.md)                                                                 | API reference — all endpoints, request/response shapes, error codes |
| [docs/estimates/vendor-brief.md](docs/estimates/vendor-brief.md)                           | Full project scope, team, epics, and hour estimates (vendor-facing) |
| [docs/estimates/scope-estimate-simple.csv](docs/estimates/scope-estimate-simple.csv)       | Phase-level hour summary                                            |
| [docs/estimates/scope-estimate-formatted.csv](docs/estimates/scope-estimate-formatted.csv) | Epic-by-epic detail with role breakdown                             |

---

_Prepared by Dualboot Partners — May 2026_
