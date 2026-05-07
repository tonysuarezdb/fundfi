'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Merchant } from '@/types';
import { merchants, MockMerchant } from '@/data/mock';

interface MerchantContextValue {
  selectedMerchant: MockMerchant;
  setSelectedMerchantId: (id: string) => void;
  updateRenewalSubmitted: (submitted: boolean) => void;
}

const MerchantContext = createContext<MerchantContextValue | undefined>(undefined);

export function MerchantProvider({ children }: { children: React.ReactNode }) {
  const [selectedMerchantId, setSelectedMerchantIdState] = useState<string>(merchants[0].id);
  const [renewalOverrides, setRenewalOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('fundfi_merchant_id') : null;
    if (stored && merchants.find((m) => m.id === stored)) {
      setSelectedMerchantIdState(stored);
    }
  }, []);

  const setSelectedMerchantId = (id: string) => {
    setSelectedMerchantIdState(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fundfi_merchant_id', id);
    }
  };

  const updateRenewalSubmitted = (submitted: boolean) => {
    setRenewalOverrides((prev) => ({ ...prev, [selectedMerchantId]: submitted }));
  };

  const baseMerchant = merchants.find((m) => m.id === selectedMerchantId) || merchants[0];
  const selectedMerchant: MockMerchant = {
    ...baseMerchant,
    deal: {
      ...baseMerchant.deal,
      renewalSubmitted:
        selectedMerchantId in renewalOverrides
          ? renewalOverrides[selectedMerchantId]
          : baseMerchant.deal.renewalSubmitted,
    },
  };

  return (
    <MerchantContext.Provider value={{ selectedMerchant, setSelectedMerchantId, updateRenewalSubmitted }}>
      {children}
    </MerchantContext.Provider>
  );
}

export function useMerchant() {
  const ctx = useContext(MerchantContext);
  if (!ctx) throw new Error('useMerchant must be used within MerchantProvider');
  return ctx;
}
