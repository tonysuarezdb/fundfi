'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { login } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations('Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(t('errorEmpty'));
      return;
    }
    setLoading(true);
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#16325C] flex flex-col items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0057FF]/5 rounded-full" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#0057FF]/5 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white rounded-2xl px-5 py-3 inline-flex shadow-sm">
            <Image
              src="/fundfi-logo.webp"
              alt="Fundfi"
              width={140}
              height={35}
              className="h-9 w-auto"
              priority
            />
          </div>
          <p className="text-[#9CA3AF] mt-3 text-xs tracking-widest uppercase">Customer Portal</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-[#16325C] mb-1">{t('title')}</h2>
          <p className="text-sm text-[#6B7280] mb-6">{t('subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#16325C] mb-1.5">
                {t('emailLabel')}
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#16325C] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-[#16325C]">
                  {t('passwordLabel')}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#0057FF] hover:text-[#004AE0] transition-colors"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl text-[#16325C] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent transition-all duration-200"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-[#6B7280] bg-[#1e3f78] rounded-xl px-4 py-3 inline-block">
            {t('demoHint')}
          </p>
        </div>
      </div>
    </div>
  );
}
