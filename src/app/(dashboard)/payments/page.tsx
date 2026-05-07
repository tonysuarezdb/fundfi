'use client';

import React from 'react';
import { useMerchant } from '@/contexts/MerchantContext';
import Badge from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/format';
import { PaymentStatus } from '@/data/mock';

function statusBadgeVariant(status: PaymentStatus): 'success' | 'warning' | 'error' | 'info' | 'neutral' {
  switch (status) {
    case 'paid': return 'success';
    case 'pending': return 'warning';
    case 'bounced':
    case 'failed': return 'error';
    default: return 'neutral';
  }
}

function statusLabel(status: PaymentStatus): string {
  switch (status) {
    case 'paid': return 'Paid';
    case 'pending': return 'Pending';
    case 'bounced': return 'Bounced';
    case 'failed': return 'Failed';
    default: return status;
  }
}

export default function PaymentsPage() {
  const { selectedMerchant } = useMerchant();
  const { payments } = selectedMerchant;
  const sorted = [...payments].reverse();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#16325C]">Payment History</h2>
          <p className="text-sm text-[#6B7280]">{payments.length} total payments</p>
        </div>
      </div>

      {/* Desktop Table — hidden on mobile */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F5F7FA]">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Amount</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Method</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Reference ID</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const isProblematic = p.status === 'bounced' || p.status === 'failed';
                return (
                  <tr
                    key={p.id}
                    className={`border-b border-[#E5E7EB] last:border-0 transition-colors ${
                      isProblematic ? 'bg-red-50' : i % 2 === 0 ? 'bg-white' : 'bg-[#F5F7FA]/50'
                    }`}
                  >
                    <td className="px-5 py-3.5 font-medium text-[#16325C]">{formatDate(p.date)}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#16325C]">{formatCurrency(p.amount)}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusBadgeVariant(p.status)}>{statusLabel(p.status)}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-[#6B7280]">{p.method}</td>
                    <td className="px-5 py-3.5 text-[#6B7280] font-mono text-xs">{p.referenceId}</td>
                    <td className="px-5 py-3.5">
                      {p.rejectionReason ? (
                        <span className="text-red-600 italic text-xs">{p.rejectionReason}</span>
                      ) : (
                        <span className="text-[#9CA3AF]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards — visible only on small screens */}
      <div className="md:hidden space-y-3">
        {sorted.map((p) => {
          const isProblematic = p.status === 'bounced' || p.status === 'failed';
          return (
            <div
              key={p.id}
              className={`rounded-xl border p-4 shadow-sm ${isProblematic ? 'bg-red-50 border-red-200' : 'bg-white border-[#E5E7EB]'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-[#16325C]">{formatDate(p.date)}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{p.method}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="text-base font-bold text-[#16325C]">{formatCurrency(p.amount)}</span>
                  <Badge variant={statusBadgeVariant(p.status)}>{statusLabel(p.status)}</Badge>
                </div>
              </div>
              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-xs text-[#9CA3AF] font-mono">{p.referenceId}</span>
                {p.rejectionReason && (
                  <span className="text-xs text-red-600 italic">{p.rejectionReason}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
