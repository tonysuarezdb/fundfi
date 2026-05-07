'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('Errors');

  useEffect(() => {
    console.error('[Portal error]', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-red-600"
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
        </div>
        <h2 className="text-lg font-semibold text-[#111827] mb-2">{t('genericTitle')}</h2>
        <p className="text-sm text-[#6B7280] mb-6">{t('genericDesc')}</p>
        <button
          onClick={reset}
          className="w-full bg-[#0057FF] hover:bg-[#004AE0] text-white font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm"
        >
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
