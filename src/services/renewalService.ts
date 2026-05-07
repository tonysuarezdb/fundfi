// ─────────────────────────────────────────────────────────────────────────────
// Renewal Service
//
// Real API endpoints (NestJS):
//   POST /api/v1/renewal                → submit renewal request + trigger S3 upload + email
//   GET  /api/v1/renewal/status         → get current renewal status for merchant
//   GET  /api/v1/renewal/:id/upload-url → get a pre-signed S3 URL for each document
//
// Document upload flow (production):
//   1. Client calls GET /upload-url for each file → receives a pre-signed S3 PUT URL
//   2. Client uploads file directly to S3 (never touches the portal server)
//   3. Client calls POST /renewal with file metadata (not the files themselves)
//   4. Server triggers malware scan, sends email to Fundfi with expiring download links
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK (delete this block when connecting to real API) ────────────────────
const mockDelay = (ms = 800) => new Promise((r) => setTimeout(r, ms));
let mockRenewalSubmitted = false;  // in-memory state for demo session

function generateSubmissionId() {
  return `RNW-${Date.now().toString(36).toUpperCase()}`;
}
// ─────────────────────────────────────────────────────────────────────────────

import type { RenewalSubmitRequest, RenewalSubmitResponse } from '@/types';
// import { apiClient } from './api';   // ← uncomment when real API is ready

/**
 * Submits a renewal request with desired amount and document metadata.
 * Documents must already be uploaded to S3 via pre-signed URLs before calling this.
 * POST /api/v1/renewal
 */
export async function submitRenewal(
  _merchantId: string,
  payload: RenewalSubmitRequest,
): Promise<RenewalSubmitResponse> {
  // TODO: replace mock with → return apiClient.post<RenewalSubmitResponse>('/renewal', payload);
  if (payload.desiredAmount <= 0) throw new Error('Renewal amount must be greater than zero.');
  if (payload.files.length < 3) throw new Error('3 bank statements are required.');
  await mockDelay();
  mockRenewalSubmitted = true;
  return {
    submissionId: generateSubmissionId(),
    submittedAt: new Date().toISOString(),
  };
}

/**
 * Returns whether the authenticated merchant has a pending renewal submission.
 * GET /api/v1/renewal/status
 */
export async function getRenewalStatus(_merchantId: string): Promise<{ submitted: boolean }> {
  // TODO: replace mock with → return apiClient.get<{ submitted: boolean }>('/renewal/status');
  await mockDelay(300);
  return { submitted: mockRenewalSubmitted };
}

/** Reset mock state between demo scenarios (not needed in production) */
export function _resetMockRenewalState() {
  mockRenewalSubmitted = false;
}
