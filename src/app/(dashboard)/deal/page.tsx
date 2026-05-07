'use client';

import React from 'react';
import { useMerchant } from '@/contexts/MerchantContext';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency, formatDate } from '@/lib/format';

export default function DealPage() {
  const { selectedMerchant } = useMerchant();
  const { deal, schedule } = selectedMerchant;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Deal Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-[#16325C]">Deal Overview</h2>
            <p className="text-sm text-[#6B7280]">Deal ID: {deal.id}</p>
          </div>
          <Badge variant={deal.status === 'Active' ? 'info' : 'success'}>{deal.status}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Total RTR</p>
              <p className="text-xl font-bold text-[#16325C] mt-0.5">{formatCurrency(deal.totalRTR)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Balance RTR</p>
              <p className="text-xl font-bold text-[#16325C] mt-0.5">{formatCurrency(deal.balanceRTR)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Percent Paid</p>
              <p className="text-xl font-bold text-[#16325C] mt-0.5">{deal.percentPaid}%</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Payment Frequency</p>
              <p className="text-lg font-semibold text-[#16325C] mt-0.5">{deal.paymentFrequency}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Payment Amount</p>
              <p className="text-xl font-bold text-[#16325C] mt-0.5">{formatCurrency(deal.paymentAmount)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide">Start Date</p>
              <p className="text-lg font-semibold text-[#16325C] mt-0.5">{formatDate(deal.startDate)}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="border-t border-[#E5E7EB] pt-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#16325C]">Repayment Progress</p>
            <span className="text-sm font-semibold text-[#0057FF]">{deal.percentPaid}%</span>
          </div>
          <ProgressBar percent={deal.percentPaid} height="h-4" />
          <div className="flex justify-between mt-2 text-xs text-[#6B7280]">
            <span>Paid: {formatCurrency(deal.totalRTR - deal.balanceRTR)}</span>
            <span>Total: {formatCurrency(deal.totalRTR)}</span>
          </div>
        </div>

        {/* Expected Final Date */}
        <div className="mt-5 flex items-center gap-2 bg-[#F5F7FA] rounded-xl p-4 border border-[#E5E7EB]">
          <svg className="w-5 h-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <p className="text-xs text-[#6B7280]">Expected Final Payment Date</p>
            <p className="text-sm font-semibold text-[#16325C]">{formatDate(deal.expectedFinalDate)}</p>
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-4">Upcoming Payment Schedule</h2>
        <div className="space-y-2">
          {schedule.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-4 bg-[#F5F7FA] rounded-xl border border-[#E5E7EB]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0057FF]/10 flex items-center justify-center">
                  <span className="text-xs font-semibold text-[#0057FF]">{i + 1}</span>
                </div>
                <p className="text-sm font-medium text-[#16325C]">{formatDate(s.date)}</p>
              </div>
              <p className="text-sm font-semibold text-[#16325C]">{formatCurrency(s.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
