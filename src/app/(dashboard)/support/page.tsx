'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'How is my RTR balance calculated?',
    answer:
      'Your RTR (Return to Revenue) balance represents the total amount remaining to be repaid on your advance. It starts at your Total RTR amount and decreases with each payment processed. Your percent paid reflects how much of the original balance has been repaid.',
  },
  {
    question: 'When will my payment process?',
    answer:
      'ACH payments typically process within 1-2 business days after initiation. Daily payments are debited on business days only. If a payment falls on a weekend or holiday, it will process the next business day. You can view the status of all payments in the Payments section.',
  },
  {
    question: 'What happens if a payment bounces?',
    answer:
      'If a payment is returned due to insufficient funds or other reasons, it will be marked as "Bounced" in your payment history with a rejection reason. Fundfi will typically re-attempt the payment. Repeated bounces may affect your account status. Please contact us immediately if you anticipate payment issues.',
  },
  {
    question: 'How do I request a renewal?',
    answer:
      'Once you have paid at least 40% of your original RTR balance, the Renewal section will unlock. You can submit a renewal request by entering your desired renewal amount and uploading 3 recent bank statements. Our team will review your application and contact you within 2-3 business days.',
  },
  {
    question: 'How do I update my contact information?',
    answer:
      'Your profile information is read-only in the portal. To update your company name, address, phone number, email, or authorized contacts, please contact your Fundfi account representative or reach our support team at support@fundfi.com.',
  },
  {
    question: 'How do I reach Fundfi support?',
    answer:
      'You can reach our support team by email at support@fundfi.com or by phone at (800) 555-3867 during business hours, Monday through Friday, 9am to 6pm Eastern Time. For urgent matters, please call us directly.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E7EB] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className="text-sm font-medium text-[#16325C]">{question}</span>
        <span className={`text-[#6B7280] transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-4 text-sm text-[#6B7280] leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function SupportPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Contact Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-4">Contact Fundfi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#0057FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">Email</p>
              <a href="mailto:support@fundfi.com" className="text-sm font-medium text-[#0057FF] hover:underline">
                support@fundfi.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#0057FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">Phone</p>
              <a href="tel:+18005553867" className="text-sm font-medium text-[#0057FF] hover:underline">
                (800) 555-3867
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#0057FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">Business Hours</p>
              <p className="text-sm font-medium text-[#16325C]">Mon–Fri, 9am–6pm ET</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-2">Frequently Asked Questions</h2>
        <p className="text-sm text-[#6B7280] mb-5">Find answers to common questions about your Fundfi account.</p>

        <div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
