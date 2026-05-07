// ─────────────────────────────────────────────────────────────────────────────
// Auth Service
//
// Real API endpoints (NestJS):
//   POST /api/v1/auth/login
//   POST /api/v1/auth/logout
//   POST /api/v1/auth/forgot-password
//   POST /api/v1/auth/reset-password
//
// Auth strategy: JWT stored in httpOnly cookie (set by server on login).
// The portal never reads or stores the token in JS.
// ─────────────────────────────────────────────────────────────────────────────

// ─── MOCK (delete this block when connecting to real API) ────────────────────
const MOCK_DELAY_MS = 800;
const mockDelay = () => new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
// ─────────────────────────────────────────────────────────────────────────────

import type { LoginRequest, LoginResponse, ForgotPasswordRequest } from '@/types';
// import { apiClient } from './api';   // ← uncomment when real API is ready

/**
 * Authenticates the user and sets an httpOnly session cookie.
 * POST /api/v1/auth/login
 */
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  // TODO: replace mock with → return apiClient.post<LoginResponse>('/auth/login', credentials);
  await mockDelay();
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.');
  }
    // Mock: accept any credentials, set a cookie so middleware can protect routes
  if (typeof document !== 'undefined') {
    document.cookie = 'fundfi_auth=true; path=/; max-age=86400; SameSite=Lax';
  }
  return {
    user: {
      id: 'user-mock-001',
      email: credentials.email,
      merchantId: 'merchant-1',
      companyName: 'Green Valley Auto',
    },
  };
}

/**
 * Clears the session cookie.
 * POST /api/v1/auth/logout
 */
export async function logout(): Promise<void> {
  // TODO: replace mock with → await apiClient.post('/auth/logout', {});
  await mockDelay();
  if (typeof document !== 'undefined') {
    document.cookie = 'fundfi_auth=; path=/; max-age=0';
  }
}

/**
 * Sends a password reset email with an expiring link.
 * POST /api/v1/auth/forgot-password
 */
export async function forgotPassword(payload: ForgotPasswordRequest): Promise<void> {
  // TODO: replace mock with → await apiClient.post('/auth/forgot-password', payload);
  await mockDelay();
  if (!payload.email) throw new Error('Email is required.');
  // Mock: always succeeds silently (same behavior as real API to avoid email enumeration)
}
