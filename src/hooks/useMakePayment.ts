'use client';

import { useState } from 'react';
import type { PaymentOutcome, PaymentInitiateResponse } from '@/types';
import { initiatePayment } from '@/services/paymentService';

type Step = 1 | 2 | 3;

interface UseMakePaymentOptions {
  merchantId: string;
  defaultAmount: number;
}

interface UseMakePaymentReturn {
  step: Step;
  amount: string;
  setAmount: (v: string) => void;
  parsedAmount: number;
  isProcessing: boolean;
  result: PaymentInitiateResponse | null;
  error: string | null;
  goToConfirm: () => void;
  goBack: () => void;
  confirm: () => Promise<void>;
  reset: () => void;
}

export function useMakePayment({ merchantId, defaultAmount }: UseMakePaymentOptions): UseMakePaymentReturn {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState(defaultAmount.toString());
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PaymentInitiateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parsedAmount = parseFloat(amount) || 0;

  const goToConfirm = () => {
    if (parsedAmount > 0) setStep(2);
  };

  const goBack = () => {
    if (step === 2) setStep(1);
  };

  const confirm = async () => {
    setError(null);
    setStep(3);
    setIsProcessing(true);
    try {
      const response = await initiatePayment(merchantId, { amount: parsedAmount });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setStep(1);
    setAmount(defaultAmount.toString());
    setResult(null);
    setError(null);
    setIsProcessing(false);
  };

  return { step, amount, setAmount, parsedAmount, isProcessing, result, error, goToConfirm, goBack, confirm, reset };
}
