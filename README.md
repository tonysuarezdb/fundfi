# Fundfi Customer Portal — Mock App

Frontend-only simulator for the Fundfi merchant portal. Built with Next.js 14 + Tailwind CSS. No backend, no real auth, no real payments.

## Live URL

**Production:** https://portal-mock-omega.vercel.app

**Vercel project:** https://vercel.com/tonysuarez-6791s-projects/portal-mock

**Login:** any email + any password

---

## Demo scenarios (sidebar switcher)

| Scenario | Company | % Paid | Renewal |
|---|---|---|---|
| 1 | Green Valley Auto | 28% | Locked |
| 2 | Summit Logistics LLC | 62% | Active |
| 3 | Pacific Rim Trading | 45% | Active + bounced payment |
| 4 | BlueStar Services | 35% | Locked + pending payment |
| 5 | Coastal Ventures | 72% | Already submitted |

---

## Run locally

```bash
cd Fundfi/portal-mock
npm install
npm run dev
# → http://localhost:3000
```

---

## Deploy to Vercel

Logged in as: `tonysuarez-6791`

```bash
cd Fundfi/portal-mock
vercel --prod --yes
```

First time on a new machine — login first:
```bash
vercel login
# Opens browser → authenticate → then run deploy
```

---

## Project structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Login
│   ├── forgot-password/
│   └── (dashboard)/        # All authenticated screens
│       ├── dashboard/
│       ├── deal/
│       ├── payments/
│       ├── make-payment/
│       ├── renewal/
│       ├── profile/
│       └── support/
├── contexts/
│   └── MerchantContext.tsx # Selected merchant + state
├── data/
│   └── mock.ts             # All 5 merchant scenarios
└── components/
    ├── layout/             # Sidebar, TopNav
    └── ui/                 # Badge, ProgressBar, DemoSwitcher
```

---

## Changing mock data

Edit `src/data/mock.ts` — all merchant info, deals, payments, and schedules live there. Re-deploy with `vercel --prod --yes` after any change.
