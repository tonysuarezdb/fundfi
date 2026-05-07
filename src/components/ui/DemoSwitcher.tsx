'use client';

import React from 'react';
import { merchants } from '@/data/mock';
import { useMerchant } from '@/contexts/MerchantContext';

export default function DemoSwitcher() {
  const { selectedMerchant, setSelectedMerchantId } = useMerchant();

  return (
    <div className="px-4 py-3 border-t border-[#1e3f78]">
      <p className="text-xs text-[#9CA3AF] mb-1.5 uppercase tracking-wide font-medium">Demo Scenario</p>
      <select
        value={selectedMerchant.id}
        onChange={(e) => setSelectedMerchantId(e.target.value)}
        className="w-full text-xs bg-[#1e3f78] text-white border border-[#2d5096] rounded-lg px-2 py-2 focus:outline-none focus:ring-1 focus:ring-[#0057FF] cursor-pointer"
      >
        {merchants.map((m) => (
          <option key={m.id} value={m.id}>
            {m.scenarioLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
