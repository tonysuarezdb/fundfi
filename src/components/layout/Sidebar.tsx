'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMerchant } from '@/contexts/MerchantContext';
import DemoSwitcher from '@/components/ui/DemoSwitcher';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

function HomeIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function DealIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
function PaymentsIcon() {
  return (
    <svg
      className="w-5 h-5"
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
  );
}
function MakePaymentIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
function RenewalIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}
function ProfileIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
function SignOutIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { selectedMerchant } = useMerchant();
  const t = useTranslations();
  const tCommon = useTranslations('Common');

  const navItems: NavItem[] = [
    { label: t('Nav.dashboard'), href: '/dashboard', icon: <HomeIcon /> },
    { label: t('Nav.myDeal'), href: '/deal', icon: <DealIcon /> },
    { label: t('Nav.payments'), href: '/payments', icon: <PaymentsIcon /> },
    { label: t('Nav.makePayment'), href: '/make-payment', icon: <MakePaymentIcon /> },
    { label: t('Nav.renewal'), href: '/renewal', icon: <RenewalIcon /> },
    { label: t('Nav.profile'), href: '/profile', icon: <ProfileIcon /> },
    { label: t('Nav.support'), href: '/support', icon: <SupportIcon /> },
  ];

  const handleSignOut = () => {
    document.cookie = 'fundfi_auth=; path=/; max-age=0';
    router.push('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#16325C] text-white">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-[#1e3f78]">
        <div className="inline-flex">
          <span className="text-xl font-bold text-[#59b5e4]">Fundfi</span>
        </div>
        <p className="text-[10px] text-[#6B7280] mt-2 tracking-widest uppercase font-medium">
          {tCommon('customerPortal')}
        </p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#0057FF]/10 text-[#0057FF] border-l-2 border-[#0057FF]'
                  : 'text-[#9CA3AF] hover:bg-[#1e3f78] hover:text-white border-l-2 border-transparent'
              }`}
            >
              <span
                className={isActive ? 'text-[#0057FF]' : 'text-[#6B7280] group-hover:text-white'}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Demo Switcher */}
      <DemoSwitcher />

      {/* User Info & Sign Out */}
      <div className="px-4 py-4 border-t border-[#1e3f78]">
        <p className="text-xs text-[#6B7280] mb-0.5">{tCommon('signedInAs')}</p>
        <p className="text-sm text-white font-medium truncate">{selectedMerchant.companyName}</p>
        <button
          onClick={handleSignOut}
          className="mt-3 flex items-center gap-2 text-xs text-[#6B7280] hover:text-red-400 transition-colors duration-200"
        >
          <SignOutIcon />
          {tCommon('signOut')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <aside className="relative w-60 flex-shrink-0 h-full z-10">{sidebarContent}</aside>
        </div>
      )}
    </>
  );
}
