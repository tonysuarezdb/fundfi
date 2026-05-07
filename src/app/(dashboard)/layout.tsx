import React from 'react';
import { MerchantProvider } from '@/contexts/MerchantContext';
import DashboardClientShell from './_components/DashboardClientShell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <MerchantProvider>
      <DashboardClientShell>{children}</DashboardClientShell>
    </MerchantProvider>
  );
}
