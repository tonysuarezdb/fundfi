'use client';

import React from 'react';
import { useMerchant } from '@/contexts/MerchantContext';
import Badge from '@/components/ui/Badge';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-[#16325C]">{value}</p>
    </div>
  );
}

export default function ProfilePage() {
  const { selectedMerchant } = useMerchant();
  const { companyName, address, phone, email, contacts } = selectedMerchant;

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Read-only badge */}
      <div className="flex items-center gap-2">
        <Badge variant="neutral">Read-only view</Badge>
        <span className="text-xs text-[#6B7280]">Contact Fundfi support to update your information</span>
      </div>

      {/* Company Information */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-5">Company Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Company Name" value={companyName} />
          <Field label="Email" value={email} />
          <Field label="Phone" value={phone} />
          <Field label="Address" value={address} />
        </div>
      </div>

      {/* Authorized Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h2 className="text-base font-semibold text-[#16325C] mb-5">Authorized Contacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="text-left pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Name</th>
                <th className="text-left pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide pl-4">Title</th>
                <th className="text-left pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide pl-4">Phone</th>
                <th className="text-left pb-3 text-xs font-semibold text-[#6B7280] uppercase tracking-wide pl-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] last:border-0">
                  <td className="py-3 font-medium text-[#16325C]">{c.name}</td>
                  <td className="py-3 text-[#6B7280] pl-4">{c.title}</td>
                  <td className="py-3 text-[#6B7280] pl-4">{c.phone}</td>
                  <td className="py-3 text-[#6B7280] pl-4">{c.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
