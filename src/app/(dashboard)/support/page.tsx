'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E7EB] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-sm font-medium text-[#16325C]">{question}</span>
        <span
          className={`text-[#6B7280] transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && <div className="pb-4 text-sm text-[#6B7280] leading-relaxed">{answer}</div>}
    </div>
  );
}

export default function SupportPage() {
  const t = useTranslations('Support');

  const faqs = [
    { question: t('faq1Question'), answer: t('faq1Answer') },
    { question: t('faq2Question'), answer: t('faq2Answer') },
    { question: t('faq3Question'), answer: t('faq3Answer') },
    { question: t('faq4Question'), answer: t('faq4Answer') },
    { question: t('faq5Question'), answer: t('faq5Answer') },
    { question: t('faq6Question'), answer: t('faq6Answer') },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Contact Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-4">{t('contactTitle')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#0057FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">
                {t('emailLabel')}
              </p>
              <a
                href="mailto:support@fundfi.com"
                className="text-sm font-medium text-[#0057FF] hover:underline"
              >
                support@fundfi.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#0057FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">
                {t('phoneLabel')}
              </p>
              <a
                href="tel:+18005553867"
                className="text-sm font-medium text-[#0057FF] hover:underline"
              >
                (800) 555-3867
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-[#0057FF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">
                {t('hoursLabel')}
              </p>
              <p className="text-sm font-medium text-[#16325C]">{t('hours')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-2">{t('faqTitle')}</h2>
        <p className="text-sm text-[#6B7280] mb-5">{t('faqSubtitle')}</p>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
