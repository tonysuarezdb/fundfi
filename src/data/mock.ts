// ─────────────────────────────────────────────────────────────────────────────
// Mock data — used only by service files while the app is in mock mode.
// When connecting to the real API, delete this file and remove mock imports
// from each service in src/services/.
// ─────────────────────────────────────────────────────────────────────────────

import type { Merchant } from '@/types';

export type { PaymentStatus } from '@/types';

/** Demo-only extension. Not present in the real Merchant type from the API. */
export interface MockMerchant extends Merchant {
  scenarioLabel: string;
}

export const merchants: MockMerchant[] = [
  // 1. Green Valley Auto — 28% paid, renewal disabled
  {
    id: 'merchant-1',
    scenarioLabel: 'Below 40% — Renewal Disabled',
    companyName: 'Green Valley Auto',
    address: '4821 Meadow Dr, Sacramento, CA 95814',
    phone: '(916) 555-0142',
    email: 'accounts@greenvalleyauto.com',
    contacts: [
      { name: 'Marcus Greene', title: 'Owner', phone: '(916) 555-0142', email: 'marcus@greenvalleyauto.com' },
      { name: 'Sandra Kim', title: 'Accounts Manager', phone: '(916) 555-0199', email: 'sandra@greenvalleyauto.com' },
    ],
    bankAccount: { bankName: 'Chase Bank', lastFour: '4521', accountType: 'Checking', routingLastFour: '0021' },
    deal: {
      id: 'DEAL-GVA-2024-001',
      totalRTR: 45000,
      balanceRTR: 32400,
      percentPaid: 28,
      paymentFrequency: 'Weekly',
      paymentAmount: 375,
      startDate: '2024-10-07',
      expectedFinalDate: '2025-08-18',
      status: 'Active',
      renewalSubmitted: false,
    },
    payments: [
      { id: 'PAY-001', date: '2024-10-14', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7823491' },
      { id: 'PAY-002', date: '2024-10-21', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7831204' },
      { id: 'PAY-003', date: '2024-10-28', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7849023' },
      { id: 'PAY-004', date: '2024-11-04', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7862341' },
      { id: 'PAY-005', date: '2024-11-11', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7879102' },
      { id: 'PAY-006', date: '2024-11-18', amount: 375, status: 'paid', method: 'ACH', referenceId: 'ACH-7894567' },
      { id: 'PAY-007', date: '2024-11-25', amount: 375, status: 'pending', method: 'ACH', referenceId: 'ACH-7912345' },
      { id: 'PAY-008', date: '2025-05-12', amount: 375, status: 'pending', method: 'ACH', referenceId: 'ACH-8001234' },
    ],
    schedule: [
      { date: '2025-05-12', amount: 375 },
      { date: '2025-05-19', amount: 375 },
      { date: '2025-05-26', amount: 375 },
      { date: '2025-06-02', amount: 375 },
      { date: '2025-06-09', amount: 375 },
    ],
  },

  // 2. Summit Logistics LLC — 62% paid, renewal active
  {
    id: 'merchant-2',
    scenarioLabel: 'Above 40% — Renewal Active',
    companyName: 'Summit Logistics LLC',
    address: '1200 Commerce Blvd, Denver, CO 80202',
    phone: '(720) 555-0318',
    email: 'billing@summitlogistics.com',
    contacts: [
      { name: 'Rachel Torres', title: 'CFO', phone: '(720) 555-0318', email: 'rtorres@summitlogistics.com' },
      { name: 'Derek Walsh', title: 'Operations Director', phone: '(720) 555-0322', email: 'dwalsh@summitlogistics.com' },
    ],
    bankAccount: { bankName: 'Bank of America', lastFour: '8834', accountType: 'Checking', routingLastFour: '0058' },
    deal: {
      id: 'DEAL-SLL-2024-002',
      totalRTR: 60000,
      balanceRTR: 22800,
      percentPaid: 62,
      paymentFrequency: 'Daily',
      paymentAmount: 600,
      startDate: '2024-08-05',
      expectedFinalDate: '2025-06-10',
      status: 'Active',
      renewalSubmitted: false,
    },
    payments: [
      { id: 'PAY-001', date: '2024-08-06', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512001' },
      { id: 'PAY-002', date: '2024-08-07', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512102' },
      { id: 'PAY-003', date: '2024-08-08', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512203' },
      { id: 'PAY-004', date: '2024-08-09', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512304' },
      { id: 'PAY-005', date: '2024-08-12', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512405' },
      { id: 'PAY-006', date: '2024-08-13', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512506' },
      { id: 'PAY-007', date: '2024-08-14', amount: 600, status: 'paid', method: 'ACH', referenceId: 'ACH-6512607' },
      { id: 'PAY-008', date: '2025-05-07', amount: 600, status: 'pending', method: 'ACH', referenceId: 'ACH-7100001' },
    ],
    schedule: [
      { date: '2025-05-07', amount: 600 },
      { date: '2025-05-08', amount: 600 },
      { date: '2025-05-09', amount: 600 },
      { date: '2025-05-12', amount: 600 },
      { date: '2025-05-13', amount: 600 },
    ],
  },

  // 3. Pacific Rim Trading — 45% paid, has bounced payment
  {
    id: 'merchant-3',
    scenarioLabel: '45% Paid — Bounced Payment',
    companyName: 'Pacific Rim Trading',
    address: '350 Harbor View Pkwy, Seattle, WA 98101',
    phone: '(206) 555-0784',
    email: 'finance@pacificrimtrading.com',
    contacts: [
      { name: 'Jenny Lau', title: 'President', phone: '(206) 555-0784', email: 'jlau@pacificrimtrading.com' },
      { name: 'Carlos Rivera', title: 'Finance Manager', phone: '(206) 555-0790', email: 'crivera@pacificrimtrading.com' },
    ],
    bankAccount: { bankName: 'Wells Fargo', lastFour: '2290', accountType: 'Checking', routingLastFour: '0141' },
    deal: {
      id: 'DEAL-PRT-2024-003',
      totalRTR: 50000,
      balanceRTR: 27500,
      percentPaid: 45,
      paymentFrequency: 'Weekly',
      paymentAmount: 500,
      startDate: '2024-09-02',
      expectedFinalDate: '2025-07-14',
      status: 'Active',
      renewalSubmitted: false,
    },
    payments: [
      { id: 'PAY-001', date: '2024-09-09', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800001' },
      { id: 'PAY-002', date: '2024-09-16', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800102' },
      { id: 'PAY-003', date: '2024-09-23', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800203' },
      { id: 'PAY-004', date: '2024-09-30', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800304' },
      { id: 'PAY-005', date: '2024-10-07', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800405' },
      { id: 'PAY-006', date: '2024-10-14', amount: 500, status: 'bounced', method: 'ACH', referenceId: 'ACH-6800506', rejectionReason: 'Insufficient funds' },
      { id: 'PAY-007', date: '2024-10-21', amount: 500, status: 'pending', method: 'ACH', referenceId: 'ACH-6800607' },
      { id: 'PAY-008', date: '2024-10-28', amount: 500, status: 'paid', method: 'ACH', referenceId: 'ACH-6800708' },
    ],
    schedule: [
      { date: '2025-05-12', amount: 500 },
      { date: '2025-05-19', amount: 500 },
      { date: '2025-05-26', amount: 500 },
      { date: '2025-06-02', amount: 500 },
      { date: '2025-06-09', amount: 500 },
    ],
  },

  // 4. BlueStar Services — 35% paid, has pending payment
  {
    id: 'merchant-4',
    scenarioLabel: '35% Paid — Pending Payment',
    companyName: 'BlueStar Services',
    address: '789 Enterprise Way, Austin, TX 78701',
    phone: '(512) 555-0421',
    email: 'payments@bluestarservices.com',
    contacts: [
      { name: 'Thomas Nguyen', title: 'CEO', phone: '(512) 555-0421', email: 'tnguyen@bluestarservices.com' },
      { name: 'Amy Chen', title: 'Controller', phone: '(512) 555-0430', email: 'achen@bluestarservices.com' },
    ],
    bankAccount: { bankName: 'Frost Bank', lastFour: '6617', accountType: 'Checking', routingLastFour: '0113' },
    deal: {
      id: 'DEAL-BSS-2024-004',
      totalRTR: 35000,
      balanceRTR: 22750,
      percentPaid: 35,
      paymentFrequency: 'Weekly',
      paymentAmount: 350,
      startDate: '2024-11-04',
      expectedFinalDate: '2025-09-22',
      status: 'Active',
      renewalSubmitted: false,
    },
    payments: [
      { id: 'PAY-001', date: '2024-11-11', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200001' },
      { id: 'PAY-002', date: '2024-11-18', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200102' },
      { id: 'PAY-003', date: '2024-11-25', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200203' },
      { id: 'PAY-004', date: '2024-12-02', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200304' },
      { id: 'PAY-005', date: '2024-12-09', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200405' },
      { id: 'PAY-006', date: '2024-12-16', amount: 350, status: 'pending', method: 'ACH', referenceId: 'ACH-7200506' },
      { id: 'PAY-007', date: '2024-12-23', amount: 350, status: 'pending', method: 'ACH', referenceId: 'ACH-7200607' },
      { id: 'PAY-008', date: '2024-12-30', amount: 350, status: 'paid', method: 'ACH', referenceId: 'ACH-7200708' },
    ],
    schedule: [
      { date: '2025-05-12', amount: 350 },
      { date: '2025-05-19', amount: 350 },
      { date: '2025-05-26', amount: 350 },
      { date: '2025-06-02', amount: 350 },
      { date: '2025-06-09', amount: 350 },
    ],
  },

  // 5. Coastal Ventures — 72% paid, renewal already submitted
  {
    id: 'merchant-5',
    scenarioLabel: '72% Paid — Renewal Submitted',
    companyName: 'Coastal Ventures',
    address: '2100 Ocean Ave, Miami, FL 33101',
    phone: '(305) 555-0892',
    email: 'finance@coastalventures.com',
    contacts: [
      { name: 'Diana Ortiz', title: 'Managing Partner', phone: '(305) 555-0892', email: 'dortiz@coastalventures.com' },
      { name: 'Brian Foster', title: 'VP Finance', phone: '(305) 555-0900', email: 'bfoster@coastalventures.com' },
    ],
    bankAccount: { bankName: 'Citibank', lastFour: '3308', accountType: 'Checking', routingLastFour: '0089' },
    deal: {
      id: 'DEAL-CVT-2024-005',
      totalRTR: 80000,
      balanceRTR: 22400,
      percentPaid: 72,
      paymentFrequency: 'Daily',
      paymentAmount: 800,
      startDate: '2024-07-01',
      expectedFinalDate: '2025-05-30',
      status: 'Active',
      renewalSubmitted: true,
    },
    payments: [
      { id: 'PAY-001', date: '2024-07-02', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100001' },
      { id: 'PAY-002', date: '2024-07-03', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100102' },
      { id: 'PAY-003', date: '2024-07-05', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100203' },
      { id: 'PAY-004', date: '2024-07-08', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100304' },
      { id: 'PAY-005', date: '2024-07-09', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100405' },
      { id: 'PAY-006', date: '2024-07-10', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100506' },
      { id: 'PAY-007', date: '2024-07-11', amount: 800, status: 'paid', method: 'ACH', referenceId: 'ACH-6100607' },
      { id: 'PAY-008', date: '2025-05-07', amount: 800, status: 'pending', method: 'ACH', referenceId: 'ACH-7500001' },
    ],
    schedule: [
      { date: '2025-05-07', amount: 800 },
      { date: '2025-05-08', amount: 800 },
      { date: '2025-05-09', amount: 800 },
      { date: '2025-05-12', amount: 800 },
      { date: '2025-05-13', amount: 800 },
    ],
  },
];
