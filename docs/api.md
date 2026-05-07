# Fundfi Portal — API Reference

> **Base URL:** `https://api.fundfi.com/api/v1`
> **Auth:** All endpoints except `/auth/*` require an active session cookie set by `POST /auth/login`.
> **Content-Type:** `application/json` for all requests and responses.
> **Last updated:** May 2026

---

## Authentication

The portal uses **httpOnly session cookies** — the frontend never reads or stores the JWT. The server sets it on login and clears it on logout.

All authenticated requests automatically include the cookie via `credentials: 'include'` in the API client.

---

## Endpoints

### Auth

---

#### `POST /auth/login`

Authenticates the user and sets an httpOnly session cookie.

**Request body**

```json
{
  "email": "marcus@greenvalleyauto.com",
  "password": "••••••••"
}
```

**Response `200`**

```json
{
  "user": {
    "id": "usr_01HZ9XK2JN",
    "email": "marcus@greenvalleyauto.com",
    "merchantId": "mrc_01HZ9XK2AB",
    "companyName": "Green Valley Auto"
  }
}
```

**Errors**

| Status | When                                      |
| ------ | ----------------------------------------- |
| `401`  | Invalid credentials                       |
| `423`  | Account locked (too many failed attempts) |
| `429`  | Rate limited (5 attempts per minute)      |

**Notes**

- Rate limited to 5 attempts before temporary lockout. NIST SP 800-63B compliant.
- `merchantId` in the response is used by the frontend to scope all subsequent requests — it must match what's in the session server-side.

---

#### `POST /auth/logout`

Clears the session cookie.

**Request body:** none

**Response `204`:** no content

---

#### `POST /auth/forgot-password`

Sends a password reset link to the provided email. Always returns `204` regardless of whether the email exists (to prevent email enumeration).

**Request body**

```json
{
  "email": "marcus@greenvalleyauto.com"
}
```

**Response `204`:** no content

**Notes**

- Reset link expires after 1 hour.
- Link contains a signed token — not the raw user ID.

---

#### `POST /auth/reset-password`

Sets a new password using the token from the reset email.

**Request body**

```json
{
  "token": "eyJhbGci...",
  "newPassword": "NewSecure!Pass123"
}
```

**Response `204`:** no content

**Errors**

| Status | When                                |
| ------ | ----------------------------------- |
| `400`  | Token expired or already used       |
| `422`  | Password does not meet requirements |

---

#### `POST /auth/invite/accept`

First-time setup for a merchant user invited by a Fundfi admin. Sets password and activates the account.

**Request body**

```json
{
  "token": "eyJhbGci...",
  "password": "NewSecure!Pass123"
}
```

**Response `200`**

```json
{
  "user": {
    "id": "usr_01HZ9XK2JN",
    "email": "marcus@greenvalleyauto.com",
    "merchantId": "mrc_01HZ9XK2AB",
    "companyName": "Green Valley Auto"
  }
}
```

**Errors**

| Status | When                                   |
| ------ | -------------------------------------- |
| `400`  | Invite token expired (24–48 hr window) |
| `409`  | Account already activated              |

---

### Merchant

> All merchant endpoints return data scoped to the **authenticated user's merchant**. The server resolves `merchantId` from the session — the client never sends it as a parameter.

---

#### `GET /merchant`

Returns the full merchant profile: company info, contacts, bank account, active deal, payment history, and upcoming schedule.

**Response `200`**

```json
{
  "id": "mrc_01HZ9XK2AB",
  "companyName": "Green Valley Auto",
  "address": "4821 Meadow Dr, Sacramento, CA 95814",
  "phone": "(916) 555-0142",
  "email": "accounts@greenvalleyauto.com",
  "contacts": [
    {
      "name": "Marcus Greene",
      "title": "Owner",
      "phone": "(916) 555-0142",
      "email": "marcus@greenvalleyauto.com"
    }
  ],
  "bankAccount": {
    "bankName": "Chase Bank",
    "lastFour": "4521",
    "accountType": "Checking",
    "routingLastFour": "0021"
  },
  "deal": {
    "id": "DEAL-GVA-2024-001",
    "totalRTR": 45000,
    "balanceRTR": 32400,
    "percentPaid": 28,
    "paymentFrequency": "Weekly",
    "paymentAmount": 375,
    "startDate": "2024-10-07",
    "expectedFinalDate": "2025-08-18",
    "status": "Active",
    "renewalSubmitted": false
  },
  "payments": [
    {
      "id": "PAY-001",
      "date": "2024-10-14",
      "amount": 375,
      "status": "paid",
      "method": "ACH",
      "referenceId": "ACH-7823491"
    },
    {
      "id": "PAY-006",
      "date": "2024-11-18",
      "amount": 375,
      "status": "bounced",
      "method": "ACH",
      "referenceId": "ACH-7894567",
      "rejectionReason": "Insufficient funds"
    }
  ],
  "schedule": [
    { "date": "2025-06-02", "amount": 375 },
    { "date": "2025-06-09", "amount": 375 }
  ]
}
```

**Field reference**

| Field                     | Type           | Description                                         |
| ------------------------- | -------------- | --------------------------------------------------- |
| `deal.totalRTR`           | number         | Total amount to be repaid                           |
| `deal.balanceRTR`         | number         | Remaining amount owed                               |
| `deal.percentPaid`        | number (0–100) | `(totalRTR - balanceRTR) / totalRTR × 100`          |
| `deal.renewalSubmitted`   | boolean        | Whether a renewal request is already on file        |
| `payment.status`          | enum           | `paid` · `pending` · `bounced` · `failed`           |
| `payment.rejectionReason` | string?        | Only present when `status` is `bounced` or `failed` |

---

#### `GET /merchant/deal`

Returns only the active deal data (LendSaaS passthrough). Lighter alternative to `GET /merchant` when only deal info is needed.

**Response `200`**

```json
{
  "id": "DEAL-GVA-2024-001",
  "totalRTR": 45000,
  "balanceRTR": 32400,
  "percentPaid": 28,
  "paymentFrequency": "Weekly",
  "paymentAmount": 375,
  "startDate": "2024-10-07",
  "expectedFinalDate": "2025-08-18",
  "status": "Active",
  "renewalSubmitted": false
}
```

---

#### `GET /merchant/schedule`

Returns the next upcoming scheduled payment dates for the merchant.

**Response `200`**

```json
[
  { "date": "2025-06-02", "amount": 375 },
  { "date": "2025-06-09", "amount": 375 },
  { "date": "2025-06-16", "amount": 375 },
  { "date": "2025-06-23", "amount": 375 },
  { "date": "2025-06-30", "amount": 375 }
]
```

**Notes**

- Returns the next 5 scheduled payments by default.
- Dates are ISO 8601 (`YYYY-MM-DD`).

---

### Payments

---

#### `GET /payments`

Returns the full payment history for the authenticated merchant, sorted most recent first.

**Response `200`**

```json
[
  {
    "id": "PAY-008",
    "date": "2025-05-12",
    "amount": 375,
    "status": "pending",
    "method": "ACH",
    "referenceId": "ACH-8001234"
  },
  {
    "id": "PAY-007",
    "date": "2024-11-25",
    "amount": 375,
    "status": "pending",
    "method": "ACH",
    "referenceId": "ACH-7912345"
  },
  {
    "id": "PAY-006",
    "date": "2024-11-18",
    "amount": 375,
    "status": "bounced",
    "method": "ACH",
    "referenceId": "ACH-7894567",
    "rejectionReason": "Insufficient funds"
  }
]
```

---

#### `POST /payments/initiate`

Initiates a one-time payment through the payment processor. The server handles the processor API call — the portal only sends the amount.

**Request body**

```json
{
  "amount": 375.0
}
```

> `merchantId` is resolved server-side from the session. The client does not send it.

**Response `200`**

```json
{
  "outcome": "success",
  "referenceId": "ACH-9012345",
  "processedAt": "2025-05-07T14:32:00.000Z",
  "amount": 375.0
}
```

**`outcome` values**

| Value     | Meaning                                                       |
| --------- | ------------------------------------------------------------- |
| `success` | Payment accepted and confirmed                                |
| `pending` | Submitted to processor, awaiting settlement (typical for ACH) |
| `failed`  | Processor declined — show error, let merchant retry           |

**Errors**

| Status | When                                          |
| ------ | --------------------------------------------- |
| `400`  | Amount is zero or negative                    |
| `402`  | Processor declined (insufficient funds, etc.) |
| `503`  | Payment processor unavailable                 |

**Notes**

- ACH payments typically return `pending` and settle in 1–2 business days.
- The portal does not handle raw card or bank account numbers — the processor's hosted/tokenized flow is used.

---

#### `GET /payments/:id/status`

Polls the status of a specific payment. Use this if you need to check whether a `pending` payment has settled.

**Response `200`**

```json
{
  "id": "PAY-008",
  "status": "paid",
  "settledAt": "2025-05-09T08:00:00.000Z"
}
```

**Notes**

- Prefer webhooks over polling when the processor supports them (see open questions in `vendor-brief.md`).

---

### Renewal

The renewal flow has three steps:

1. **Get a pre-signed upload URL** for each document file (`GET /renewal/upload-url`)
2. **Upload each file directly to S3** using the pre-signed URL (no portal server involvement)
3. **Submit the renewal request** with the desired amount and file metadata (`POST /renewal`)

---

#### `GET /renewal/status`

Returns whether the authenticated merchant has a pending renewal submission.

**Response `200`**

```json
{
  "submitted": false
}
```

---

#### `GET /renewal/upload-url`

Returns a pre-signed S3 PUT URL for uploading one document. Call once per file before submitting the renewal.

**Query parameters**

| Param         | Type   | Description                                                   |
| ------------- | ------ | ------------------------------------------------------------- |
| `filename`    | string | Original file name (e.g. `statement-may.pdf`)                 |
| `contentType` | string | MIME type (e.g. `application/pdf`, `image/jpeg`, `image/png`) |

**Response `200`**

```json
{
  "uploadUrl": "https://s3.amazonaws.com/fundfi-docs/...?X-Amz-Signature=...",
  "fileKey": "renewals/mrc_01HZ9XK2AB/2025-05/statement-may.pdf",
  "expiresAt": "2025-05-07T15:32:00.000Z"
}
```

**Notes**

- `uploadUrl` expires in 15 minutes — upload immediately after receiving it.
- `fileKey` is what you send in the `POST /renewal` body to reference the uploaded file.
- The portal uploads the file directly to S3 via `PUT` to the `uploadUrl` — no file data passes through the portal server.
- Accepted types: `application/pdf`, `image/jpeg`, `image/png`. Max size: 10 MB per file.

---

#### `POST /renewal`

Submits the renewal request after all 3 documents have been uploaded to S3.

**Request body**

```json
{
  "desiredAmount": 60000,
  "files": [
    {
      "name": "statement-march.pdf",
      "size": 204800,
      "type": "application/pdf"
    },
    {
      "name": "statement-april.pdf",
      "size": 187432,
      "type": "application/pdf"
    },
    {
      "name": "statement-may.pdf",
      "size": 215600,
      "type": "application/pdf"
    }
  ]
}
```

**Response `201`**

```json
{
  "submissionId": "RNW-01HZ9XK8QP",
  "submittedAt": "2025-05-07T14:45:00.000Z"
}
```

**Errors**

| Status | When                                              |
| ------ | ------------------------------------------------- |
| `400`  | `desiredAmount` is zero or negative               |
| `400`  | Fewer than 3 files provided                       |
| `403`  | Merchant is below 40% paid — renewal not eligible |
| `409`  | Renewal already submitted for this deal           |
| `422`  | File type not allowed or exceeds size limit       |

**Notes**

- Server enforces the 40% eligibility rule — not just the UI.
- On success, the server sends an automated email to the Fundfi submissions inbox with: company name in the subject line + expiring secure links (24–48 hr) to each uploaded document.
- Server triggers malware scan on each uploaded file before the email is sent.

---

## Error format

All error responses follow this shape:

```json
{
  "statusCode": 400,
  "message": "3 bank statements are required.",
  "error": "Bad Request"
}
```

---

## TypeScript types

The full TypeScript interfaces used by the portal are in [`src/types/index.ts`](../src/types/index.ts). These mirror exactly what the API returns and accepts.

---

## Open questions before implementation

These need to be answered before the payment and renewal endpoints can be fully specced (see also `vendor-brief.md`):

1. Which payment processor does Fundfi use — ACH, card, or both?
2. Does the processor offer a hosted or tokenized flow? (determines PCI scope)
3. Does the processor support webhooks for payment status updates?
4. Does LendSaaS expose all required fields via its own API?
5. Is a LendSaaS sandbox available for development?

---

_Prepared by Dualboot Partners — May 2026_
