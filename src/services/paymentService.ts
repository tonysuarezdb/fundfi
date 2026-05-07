// ─────────────────────────────────────────────────────────────────────────────
// Payment Service
//
// Real API endpoints (NestJS):
//   GET  /api/v1/payments                  → payment history for authenticated merchant
//   POST /api/v1/payments/initiate         → initiate one-time payment via processor
//   GET  /api/v1/payments/:id/status       → poll payment status (or use webhook)
//
// Payment flow: portal never touches raw card/bank data. All payment data
// flows through the payment processor's hosted/tokenized flow. Portal only
// initiates and receives status (success / pending / failed).
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK (delete this block when connecting to real API) ────────────────────
import { merchants } from '@/data/mock';
import { generateRefId } from '@/lib/format';

const mockDelay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

function mockOutcome(): 'success' | 'pending' | 'failed' {
  const roll = Math.random();
  return roll < 0.8 ? 'success' : roll < 0.9 ? 'pending' : 'failed';
}
// ─────────────────────────────────────────────────────────────────────────────

import type { Payment, PaymentInitiateRequest, PaymentInitiateResponse } from '@/types';
// import { apiClient } from './api';   // ← uncomment when real API is ready

/**
 * Returns the full payment history for the authenticated merchant.
 * Sorted descending (most recent first).
 * GET /api/v1/payments
 */
export async function getPayments(merchantId: string): Promise<Payment[]> {
  // TODO: replace mock with → return apiClient.get<Payment[]>('/payments');
  await mockDelay();
  const merchant = merchants.find((m) => m.id === merchantId);
  if (!merchant) throw new Error(`Merchant not found: ${merchantId}`);
  return [...merchant.payments].reverse();
}

/**
 * Initiates a one-time payment through the payment processor.
 * The server handles the actual processor API call — the portal only sends the amount.
 * Processing takes ~2s in mock; real ACH may take 1–2 business days.
 * POST /api/v1/payments/initiate
 */
export async function initiatePayment(
  _merchantId: string,
  payload: PaymentInitiateRequest,
): Promise<PaymentInitiateResponse> {
  // TODO: replace mock with → return apiClient.post<PaymentInitiateResponse>('/payments/initiate', payload);
  if (payload.amount <= 0) throw new Error('Payment amount must be greater than zero.');
  await mockDelay(2200);  // simulate processor round-trip
  return {
    outcome: mockOutcome(),
    referenceId: generateRefId(),
    processedAt: new Date().toISOString(),
    amount: payload.amount,
  };
}
