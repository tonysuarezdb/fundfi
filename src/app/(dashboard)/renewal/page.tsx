'use client';

import React from 'react';
import { useMerchant } from '@/contexts/MerchantContext';
import { useRenewal } from '@/hooks/useRenewal';
import ProgressBar from '@/components/ui/ProgressBar';
import Badge from '@/components/ui/Badge';
import { RENEWAL_ELIGIBILITY_THRESHOLD, ALLOWED_UPLOAD_EXTENSIONS } from '@/config';

function StepIndicator({ step }: { step: number }) {
  const labels = ['Amount', 'Documents', 'Review'];
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
      <div className="flex justify-between text-xs text-[#6B7280]">
        {labels.map((label, i) => (
          <span key={label} className={`w-8 text-center ${i + 1 === step ? 'text-[#0057FF] font-semibold' : ''}`}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default function RenewalPage() {
  const { selectedMerchant, updateRenewalSubmitted } = useMerchant();
  const { deal } = selectedMerchant;

  const {
    step, desiredAmount, setDesiredAmount,
    files, allFilesUploaded,
    isSubmitting, result, error, fileError,
    handleFileChange, removeFile, goToStep, submit,
  } = useRenewal(selectedMerchant.id);

  const handleSubmit = async () => {
    await submit();
    updateRenewalSubmitted(true);
  };

  if (deal.renewalSubmitted || result) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#111827] mb-2">Renewal Request Submitted</h2>
          <p className="text-sm text-[#6B7280] mb-5">Our team will review your request and contact you within 2–3 business days.</p>
          {result && (
            <div className="inline-flex items-center gap-2 bg-[#F5F7FA] rounded-xl px-4 py-2 border border-[#E5E7EB]">
              <span className="text-xs font-medium text-[#6B7280]">Submission ID</span>
              <span className="text-xs font-mono font-semibold text-[#111827]">{result.submissionId}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (deal.percentPaid < RENEWAL_ELIGIBILITY_THRESHOLD) {
    const progressTo40 = (deal.percentPaid / RENEWAL_ELIGIBILITY_THRESHOLD) * 100;
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#111827]">Renewal Locked</h2>
              <Badge variant="warning">Renewal Locked</Badge>
            </div>
          </div>
          <p className="text-sm text-[#6B7280] mb-6">
            You need to reach <strong className="text-[#111827]">{RENEWAL_ELIGIBILITY_THRESHOLD}%</strong> paid to unlock renewal. You&apos;re currently at{' '}
            <strong className="text-[#111827]">{deal.percentPaid}%</strong>.
          </p>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium text-[#111827]">Progress to renewal eligibility</span>
              <span className="text-[#6B7280]">{deal.percentPaid}% / {RENEWAL_ELIGIBILITY_THRESHOLD}%</span>
            </div>
            <ProgressBar percent={progressTo40} color="#F59E0B" height="h-4" />
          </div>
          <p className="text-xs text-[#6B7280] mt-2">
            {Math.round(RENEWAL_ELIGIBILITY_THRESHOLD - deal.percentPaid)}% more to go before renewal becomes available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <StepIndicator step={step} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-1">Renewal Amount</h2>
            <p className="text-sm text-[#6B7280]">Fundfi will review your request and contact you with terms.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Desired Renewal Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold text-lg">$</span>
              <input
                type="number"
                value={desiredAmount}
                onChange={(e) => setDesiredAmount(e.target.value)}
                min="1000"
                step="500"
                placeholder="0.00"
                className="w-full pl-9 pr-4 py-3.5 border border-[#E5E7EB] rounded-xl text-[#111827] text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0057FF] transition-all duration-200"
              />
            </div>
          </div>
          <button
            onClick={() => goToStep(2)}
            disabled={!desiredAmount || parseFloat(desiredAmount) <= 0}
            className="w-full bg-[#0057FF] hover:bg-[#004AE0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-1">Upload Bank Statements</h2>
            <p className="text-sm text-[#6B7280]">Please upload your 3 most recent bank statements.</p>
          </div>

          {fileError && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{fileError}</div>
          )}

          <div className="space-y-3">
            {([0, 1, 2] as const).map((i) => (
              <div key={i}>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Statement {i + 1}</label>
                {files[i].uploaded ? (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-green-800 font-medium truncate">{files[i].name}</span>
                    <button onClick={() => removeFile(i)} className="ml-auto text-xs text-green-600 hover:text-red-500 transition-colors">Remove</button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[#E5E7EB] rounded-xl cursor-pointer hover:border-[#0057FF] hover:bg-blue-50/30 transition-all duration-200">
                    <svg className="w-8 h-8 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-[#6B7280]">Drag & drop or click to upload</span>
                    <span className="text-xs text-[#9CA3AF]">{ALLOWED_UPLOAD_EXTENSIONS} accepted</span>
                    <input type="file" accept={ALLOWED_UPLOAD_EXTENSIONS} className="hidden" onChange={(e) => handleFileChange(i, e)} />
                  </label>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => goToStep(3)}
              disabled={!allFilesUploaded}
              className="w-full bg-[#0057FF] hover:bg-[#004AE0] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-lg transition-all duration-200"
            >
              {allFilesUploaded ? 'Continue' : 'Upload all 3 statements to continue'}
            </button>
            <button onClick={() => goToStep(1)} className="w-full text-sm text-[#6B7280] hover:text-[#111827] py-2 transition-colors">&larr; Back</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-1">Review & Submit</h2>
            <p className="text-sm text-[#6B7280]">Please review your renewal request before submitting.</p>
          </div>

          <div className="bg-[#F5F7FA] rounded-xl border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            <div className="flex justify-between items-center px-4 py-3 text-sm">
              <span className="text-[#6B7280]">Desired renewal amount</span>
              <span className="font-bold text-[#111827]">
                ${parseFloat(desiredAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-[#6B7280] mb-2">Bank statements ({files.length})</p>
              <div className="space-y-1.5">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-[#111827] truncate">{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#0057FF] hover:bg-[#004AE0] disabled:opacity-70 text-white font-semibold py-3.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : 'Submit Renewal Request'}
            </button>
            <button onClick={() => goToStep(2)} className="w-full text-sm text-[#6B7280] hover:text-[#111827] py-2 transition-colors">&larr; Back</button>
          </div>
        </div>
      )}
    </div>
  );
}
