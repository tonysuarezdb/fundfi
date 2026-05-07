'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('ForgotPassword');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#16325C] flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0057FF]/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0057FF]/5 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/fundfi-logo.webp"
            alt="Fundfi"
            width={159}
            height={40}
            className="h-10 w-auto mx-auto brightness-0 invert"
            priority
          />
          <p className="text-[#9CA3AF] mt-2 text-xs tracking-widest uppercase">Customer Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!submitted ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#16325C] mb-1">{t('title')}</h2>
                <p className="text-sm text-[#6B7280]">{t('subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#16325C] mb-1.5"
                  >
                    {t('emailLabel')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#16325C] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t('submitting')}
                    </>
                  ) : (
                    t('submit')
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#16325C] mb-2">{t('successTitle')}</h2>
              <p className="text-sm text-[#6B7280]">{t('successMessage', { email })}</p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-[#0057FF] hover:text-[#004AE0] transition-colors"
            >
              {t('backToSignIn')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
