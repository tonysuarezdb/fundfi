// ─────────────────────────────────────────────────────────────────────────────
// Merchant Service
//
// Real API endpoints (NestJS):
//   GET /api/v1/merchant          → profile for authenticated merchant
//   GET /api/v1/merchant/deal     → active deal (LendSaaS passthrough)
//   GET /api/v1/merchant/schedule → upcoming payment schedule
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK (delete this block when connecting to real API) ────────────────────
import { merchants } from '@/data/mock';
const mockDelay = () => new Promise((r) => setTimeout(r, 600));
// ─────────────────────────────────────────────────────────────────────────────

import type { Merchant, Deal, ScheduledPayment } from '@/types';
// import { apiClient } from './api';   // ← uncomment when real API is ready

/**
 * Returns the full merchant profile including deal, payments, and schedule.
 * In production this is the authenticated user's merchant — merchantId comes from session.
 * GET /api/v1/merchant
 */
export async function getMerchant(merchantId: string): Promise<Merchant> {
  // TODO: replace mock with → return apiClient.get<Merchant>('/merchant');
  await mockDelay();
  const merchant = merchants.find((m) => m.id === merchantId);
  if (!merchant) throw new Error(`Merchant not found: ${merchantId}`);
  return merchant;
}

/**
 * Returns the active deal data (sourced from LendSaaS).
 * GET /api/v1/merchant/deal
 */
export async function getActiveDeal(merchantId: string): Promise<Deal> {
  // TODO: replace mock with → return apiClient.get<Deal>('/merchant/deal');
  await mockDelay();
  const merchant = merchants.find((m) => m.id === merchantId);
  if (!merchant) throw new Error(`Merchant not found: ${merchantId}`);
  return merchant.deal;
}

/**
 * Returns the next N upcoming scheduled payment dates.
 * GET /api/v1/merchant/schedule
 */
export async function getPaymentSchedule(merchantId: string): Promise<ScheduledPayment[]> {
  // TODO: replace mock with → return apiClient.get<ScheduledPayment[]>('/merchant/schedule');
  await mockDelay();
  const merchant = merchants.find((m) => m.id === merchantId);
  if (!merchant) throw new Error(`Merchant not found: ${merchantId}`);
  return merchant.schedule;
}
