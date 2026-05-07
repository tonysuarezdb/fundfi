// ─────────────────────────────────────────────────────────────────────────────
// Domain types — shared across services, hooks, and components.
// These mirror the shapes that the real NestJS API will return.
// ─────────────────────────────────────────────────────────────────────────────

export type PaymentStatus = 'paid' | 'pending' | 'bounced' | 'failed';
export type PaymentFrequency = 'Daily' | 'Weekly';
export type AccountType = 'Checking' | 'Savings';
export type DealStatus = 'Active' | 'Completed';

export interface Payment {
  id: string;
  date: string;           // ISO date string
  amount: number;
  status: PaymentStatus;
  method: string;         // e.g. 'ACH'
  referenceId: string;
  rejectionReason?: string;
}

export interface ScheduledPayment {
  date: string;           // ISO date string
  amount: number;
}

export interface Deal {
  id: string;
  totalRTR: number;
  balanceRTR: number;
  percentPaid: number;    // 0–100
  paymentFrequency: PaymentFrequency;
  paymentAmount: number;
  startDate: string;      // ISO date string
  expectedFinalDate: string;
  status: DealStatus;
  renewalSubmitted: boolean;
}

export interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
}

export interface BankAccount {
  bankName: string;
  lastFour: string;
  accountType: AccountType;
  routingLastFour: string;
}

export interface Merchant {
  id: string;
  companyName: string;
  address: string;
  phone: string;
  email: string;
  contacts: Contact[];
  bankAccount: BankAccount;
  deal: Deal;
  payments: Payment[];
  schedule: ScheduledPayment[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Service request / response shapes
// These define the contract between the portal and the NestJS API.
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  /** JWT is set as httpOnly cookie by the server — never stored in JS */
  user: {
    id: string;
    email: string;
    merchantId: string;
    companyName: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export type PaymentOutcome = 'success' | 'pending' | 'failed';

export interface PaymentInitiateRequest {
  amount: number;
  /** merchantId comes from the authenticated session on the server — not sent by the client */
}

export interface PaymentInitiateResponse {
  outcome: PaymentOutcome;
  referenceId: string;
  processedAt: string;    // ISO datetime string
  amount: number;
}

export interface FileMetadata {
  name: string;
  size: number;           // bytes
  type: string;           // MIME type
}

export interface RenewalSubmitRequest {
  desiredAmount: number;
  files: FileMetadata[];  // metadata only — actual upload goes to a signed S3 URL
}

export interface RenewalSubmitResponse {
  submissionId: string;
  submittedAt: string;    // ISO datetime string
}
