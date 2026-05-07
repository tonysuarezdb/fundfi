'use client';

import React from 'react';
import Link from 'next/link';
import { useMerchant } from '@/contexts/MerchantContext';
import { useMakePayment } from '@/hooks/useMakePayment';
import { formatCurrency } from '@/lib/format';

function BankIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

function PaymentMethodCard({ bankName, lastFour, accountType }: { bankName: string; lastFour: string; accountType: string }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#F5F7FA] border border-[#E5E7EB] rounded-xl">
      <div className="w-10 h-10 bg-[#16325C] rounded-lg flex items-center justify-center flex-shrink-0 text-white">
        <BankIcon />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#111827]">{bankName}</p>
        <p className="text-xs text-[#6B7280]">{accountType} ···· {lastFour}</p>
      </div>
      <span className="text-xs font-medium text-[#0057FF] bg-blue-50 border border-blue-200 px-2 py-1 rounded-full">ACH</span>
    </div>
  );
}

function StepIndicator({ step }: { step: number }) {
  const labels = ['Amount', 'Confirm', 'Receipt'];
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
              s < step ? 'bg-[#0057FF] text-white'
              : s === step ? 'bg-[#0057FF] text-white ring-4 ring-[#0057FF]/20'
              : 'bg-[#E5E7EB] text-[#6B7280]'
            }`}>
              {s < step
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                : s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all duration-500 ${s < step ? 'bg-[#0057FF]' : 'bg-[#E5E7EB]'}`} />}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between text-xs text-[#6B7280] px-0">
        {labels.map((label, i) => (
          <span key={label} className={`w-8 text-center ${i + 1 === step ? 'text-[#0057FF] font-semibold' : ''}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default function MakePaymentPage() {
  const { selectedMerchant } = useMerchant();
  const { deal, bankAccount } = selectedMerchant;

  const { step, amount, setAmount, parsedAmount, isProcessing, result, error, goToConfirm, goBack, confirm, reset } =
    useMakePayment({ merchantId: selectedMerchant.id, defaultAmount: deal.paymentAmount });

  const balanceAfter = deal.balanceRTR - parsedAmount;
  const processedAt = result?.processedAt
    ? new Date(result.processedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
    : '';

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {(step < 3 || isProcessing) && <StepIndicator step={step} />}

      {/* Step 1 — Amount */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-1">Enter Payment Amount</h2>
            <p className="text-sm text-[#6B7280]">Funds will be debited from your bank account on file.</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Payment method</p>
            <PaymentMethodCard bankName={bankAccount.bankName} lastFour={bankAccount.lastFour} accountType={bankAccount.accountType} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold text-lg">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                max={deal.balanceRTR}
                step="0.01"
                className="w-full pl-9 pr-4 py-3.5 border border-[#E5E7EB] rounded-xl text-[#111827] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all duration-200"
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-[#6B7280]">
              <span>Scheduled: <strong className="text-[#111827]">{formatCurrency(deal.paymentAmount)}</strong></span>
              <span>Balance: <strong className="text-[#111827]">{formatCurrency(deal.balanceRTR)}</strong></span>
            </div>
          </div>

          <button
            onClick={goToConfirm}
            disabled={parsedAmount <= 0 || parsedAmount > deal.balanceRTR}
            className="w-full bg-[#0057FF] hover:bg-[#004AE0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2 — Confirm */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-1">Confirm Payment</h2>
            <p className="text-sm text-[#6B7280]">Review the details below before authorizing.</p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            {[
              { label: 'Payment amount', value: <span className="font-bold text-[#111827] text-base">{formatCurrency(parsedAmount)}</span> },
              { label: 'Current balance', value: formatCurrency(deal.balanceRTR) },
              { label: 'Balance after payment', value: <span className="text-[#0057FF] font-semibold">{formatCurrency(Math.max(0, balanceAfter))}</span> },
              {
                label: 'Payment method',
                value: (
                  <div className="flex items-center gap-2">
                    <span className="text-[#111827] font-medium">{bankAccount.bankName} ···· {bankAccount.lastFour}</span>
                    <span className="text-xs text-[#0057FF] bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">ACH</span>
                  </div>
                ),
              },
              { label: 'Payment type', value: <span className="text-[#111827] font-medium">One-time payment</span> },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-[#6B7280]">{label}</span>
                <span className="font-semibold text-[#111827]">{value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#9CA3AF] text-center">
            By confirming, you authorize Fundfi to debit {formatCurrency(parsedAmount)} from your {bankAccount.accountType.toLowerCase()} account ending in {bankAccount.lastFour}.
          </p>

          <div className="space-y-3">
            <button onClick={confirm} className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white font-semibold py-3.5 rounded-lg transition-all duration-200">
              Authorize Payment
            </button>
            <button onClick={goBack} className="w-full text-sm text-[#6B7280] hover:text-[#111827] transition-colors py-2">
              &larr; Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Processing / Result */}
      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8">
          {isProcessing ? (
            <div className="text-center py-8">
              <svg className="animate-spin w-12 h-12 text-[#0057FF] mx-auto mb-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-base font-semibold text-[#111827]">Processing your payment...</p>
              <p className="text-sm text-[#6B7280] mt-1">Connecting to {bankAccount.bankName}</p>
            </div>
          ) : error ? (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-2">Payment Failed</h2>
              <p className="text-sm text-[#6B7280] mb-6">{error}</p>
              <div className="flex flex-col gap-2">
                <button onClick={reset} className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white text-sm font-semibold py-3 rounded-lg transition-all duration-200">Try Again</button>
                <Link href="/support" className="block text-sm text-[#6B7280] hover:text-[#111827] py-2 text-center">Contact Support</Link>
              </div>
            </div>
          ) : result?.outcome === 'success' ? (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-1">Payment Successful</h2>
              <p className="text-sm text-[#6B7280] mb-5">Your payment has been submitted for processing.</p>
              <div className="bg-[#F5F7FA] rounded-xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] text-left mb-6">
                {[
                  { label: 'Amount', value: <span className="font-bold">{formatCurrency(result.amount)}</span> },
                  { label: 'From', value: `${bankAccount.bankName} ···· ${bankAccount.lastFour}` },
                  { label: 'Date & Time', value: processedAt },
                  { label: 'Reference', value: <span className="font-mono font-semibold text-green-700">{result.referenceId}</span> },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-[#6B7280]">{label}</span>
                    <span className="text-[#111827]">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/dashboard" className="block w-full bg-[#0057FF] hover:bg-[#004AE0] text-white text-sm font-semibold py-3 rounded-lg transition-all duration-200 text-center">Return to Dashboard</Link>
                <button onClick={reset} className="text-sm text-[#6B7280] hover:text-[#111827] py-2">Make another payment</button>
              </div>
            </div>
          ) : result?.outcome === 'pending' ? (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-1">Payment Submitted</h2>
              <p className="text-sm text-[#6B7280] mb-5">Your ACH transfer is being processed. This typically takes 1–2 business days.</p>
              <div className="bg-[#F5F7FA] rounded-xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] text-left mb-6">
                {[
                  { label: 'Amount', value: <span className="font-bold">{formatCurrency(result.amount)}</span> },
                  { label: 'From', value: `${bankAccount.bankName} ···· ${bankAccount.lastFour}` },
                  { label: 'Status', value: <span className="text-amber-600 font-semibold">Pending ACH</span> },
                  { label: 'Reference', value: <span className="font-mono font-semibold text-amber-700">{result.referenceId}</span> },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3 text-sm">
                    <span className="text-[#6B7280]">{label}</span>
                    <span className="text-[#111827]">{value}</span>
                  </div>
                ))}
              </div>
              <Link href="/dashboard" className="block w-full bg-[#0057FF] hover:bg-[#004AE0] text-white text-sm font-semibold py-3 rounded-lg transition-all duration-200 text-center">Return to Dashboard</Link>
            </div>
          ) : (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <h2 className="text-xl font-bold text-[#111827] mb-1">Payment Failed</h2>
              <p className="text-sm text-[#6B7280] mb-2">We were unable to process your ACH debit from {bankAccount.bankName} ···· {bankAccount.lastFour}.</p>
              <p className="text-xs text-[#9CA3AF] mb-6">This may be due to insufficient funds or a bank hold. Please contact your bank or try again.</p>
              <div className="flex flex-col gap-2">
                <button onClick={reset} className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white text-sm font-semibold py-3 rounded-lg transition-all duration-200">Try Again</button>
                <Link href="/support" className="block text-sm text-[#6B7280] hover:text-[#111827] py-2 text-center">Contact Support</Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
