'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMerchant } from '@/contexts/MerchantContext';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency, formatDate } from '@/lib/format';
import { useTranslations } from 'next-intl';
import { PaymentStatus } from '@/types';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5 animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
      <div className="h-7 bg-slate-200 rounded w-3/4" />
    </div>
  );
}

function statusBadgeVariant(status: PaymentStatus) {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
      return 'warning';
    case 'bounced':
    case 'failed':
      return 'error';
    default:
      return 'neutral';
  }
}

export default function DashboardPage() {
  const { selectedMerchant } = useMerchant();
  const t = useTranslations('Dashboard');
  const tStatus = useTranslations('PaymentStatus');
  const tCommon = useTranslations('Common');
  const { deal, payments, schedule } = selectedMerchant;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, [selectedMerchant.id]);

  // Reset skeleton when merchant changes
  useEffect(() => {
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(t);
  }, [selectedMerchant.id]);

  const nextPayment = schedule[0];
  const recentPayments = [...payments].reverse().slice(0, 3);

  const percentBadgeVariant =
    deal.percentPaid < 20 ? 'error' : deal.percentPaid < 40 ? 'warning' : 'info';

  if (!loaded) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 animate-pulse">
          <div className="h-5 bg-slate-200 rounded w-1/3 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-full mb-2" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5">
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1">
            {t('totalRTR')}
          </p>
          <p className="text-2xl font-bold text-[#16325C]">{formatCurrency(deal.totalRTR)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5">
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1">
            {t('balanceRTR')}
          </p>
          <p className="text-2xl font-bold text-[#16325C]">{formatCurrency(deal.balanceRTR)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5">
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1">
            {t('percentPaid')}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-[#16325C]">{deal.percentPaid}%</p>
            <Badge variant={percentBadgeVariant}>
              {t('paidBadge', { percent: deal.percentPaid })}
            </Badge>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-5">
          <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-1">
            {t('nextPayment')}
          </p>
          <p className="text-xl font-bold text-[#16325C]">
            {nextPayment ? formatDate(nextPayment.date) : tCommon('na')}
          </p>
          {nextPayment && (
            <p className="text-sm text-[#6B7280] mt-0.5">{formatCurrency(nextPayment.amount)}</p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-[#16325C]">
            {t('paidOff', { percent: deal.percentPaid })}
          </h2>
          <span className="text-sm text-[#6B7280]">{deal.paymentFrequency} payments</span>
        </div>
        <ProgressBar percent={deal.percentPaid} height="h-5" />
        <div className="flex justify-between mt-2 text-sm text-[#6B7280]">
          <span>{t('paidLabel', { amount: formatCurrency(deal.totalRTR - deal.balanceRTR) })}</span>
          <span>{t('totalLabel', { amount: formatCurrency(deal.totalRTR) })}</span>
        </div>
      </div>

      {/* Renewal Eligibility Banner */}
      {deal.renewalSubmitted ? (
        <div className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p className="font-medium text-green-800 text-sm">{t('renewalSubmitted')}</p>
            <p className="text-green-700 text-sm mt-0.5">{t('renewalSubmittedDesc')}</p>
          </div>
        </div>
      ) : deal.percentPaid >= 40 ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[#0057FF] flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-medium text-blue-800 text-sm">{t('renewalEligible')}</p>
              <p className="text-blue-700 text-sm mt-0.5">
                {t('renewalEligibleDesc', { percent: deal.percentPaid })}
              </p>
            </div>
          </div>
          <Link
            href="/renewal"
            className="text-sm font-semibold text-[#0057FF] hover:text-[#004AE0] whitespace-nowrap transition-colors"
          >
            {t('renewNow')}
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <p className="font-medium text-amber-800 text-sm">{t('renewalLocked')}</p>
            <p className="text-amber-700 text-sm mt-0.5">
              {t('renewalLockedDesc', { percent: deal.percentPaid })}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Make Payment CTA */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 flex flex-col">
          <h2 className="text-base font-semibold text-[#16325C] mb-1">{t('makePaymentTitle')}</h2>
          <p className="text-sm text-[#6B7280] mb-4">{t('makePaymentDesc')}</p>

          {/* Next scheduled payment info */}
          {nextPayment && (
            <div className="bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl px-4 py-3 mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6B7280]">{t('nextScheduled')}</p>
                <p className="text-sm font-semibold text-[#16325C]">
                  {formatCurrency(nextPayment.amount)} · {formatDate(nextPayment.date)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                <svg
                  className="w-4 h-4 text-[#0057FF]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                {tCommon('ach')}
              </div>
            </div>
          )}

          <Link
            href="/make-payment"
            className="inline-flex items-center justify-center gap-2 bg-[#0057FF] hover:bg-[#004AE0] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 mt-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t('makePaymentBtn')}
          </Link>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#16325C]">{t('recentPayments')}</h2>
            <Link
              href="/payments"
              className="text-xs text-[#0057FF] hover:text-[#004AE0] font-medium transition-colors"
            >
              {tCommon('viewAll')}
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.map((p) => (
              <div
                key={p.id}
                className={`flex items-center justify-between py-2 border-b border-[#E5E7EB] last:border-0 ${
                  p.status === 'bounced' || p.status === 'failed'
                    ? 'bg-red-50 -mx-2 px-2 rounded-lg'
                    : ''
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-[#16325C]">{formatDate(p.date)}</p>
                  <p className="text-xs text-[#6B7280]">
                    {p.method} · {p.referenceId}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-[#16325C]">
                    {formatCurrency(p.amount)}
                  </span>
                  <Badge variant={statusBadgeVariant(p.status)}>{tStatus(p.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
