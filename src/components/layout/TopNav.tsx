'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useMerchant } from '@/contexts/MerchantContext';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/deal': 'My Deal',
  '/payments': 'Payments',
  '/make-payment': 'Make a Payment',
  '/renewal': 'Renewal',
  '/profile': 'Profile',
  '/support': 'Support',
};

interface TopNavProps {
  onMenuClick: () => void;
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const pathname = usePathname();
  const { selectedMerchant } = useMerchant();
  const title = pageTitles[pathname] || 'Portal';

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-[#6B7280] hover:bg-[#F5F7FA] transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        <h1 className="text-lg font-semibold text-[#16325C]">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-[#F5F7FA] border border-[#E5E7EB] text-sm font-medium text-[#16325C]">
          {selectedMerchant.companyName}
        </span>
      </div>
    </header>
  );
}
