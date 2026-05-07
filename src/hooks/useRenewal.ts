'use client';

import { useState } from 'react';
import type { RenewalSubmitResponse, FileMetadata } from '@/types';
import { submitRenewal } from '@/services/renewalService';
import { RENEWAL_REQUIRED_DOCUMENTS, MAX_UPLOAD_SIZE_BYTES, ALLOWED_UPLOAD_TYPES } from '@/config';

type Step = 1 | 2 | 3;

interface FileState {
  name: string | null;
  size: number;
  type: string;
  uploaded: boolean;
}

const emptyFile: FileState = { name: null, size: 0, type: '', uploaded: false };

interface UseRenewalReturn {
  step: Step;
  desiredAmount: string;
  setDesiredAmount: (v: string) => void;
  files: FileState[];
  allFilesUploaded: boolean;
  isSubmitting: boolean;
  result: RenewalSubmitResponse | null;
  error: string | null;
  fileError: string | null;
  handleFileChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  goToStep: (s: Step) => void;
  submit: () => Promise<void>;
}

export function useRenewal(merchantId: string): UseRenewalReturn {
  const [step, setStep] = useState<Step>(1);
  const [desiredAmount, setDesiredAmount] = useState('');
  const [files, setFiles] = useState<FileState[]>(
    Array(RENEWAL_REQUIRED_DOCUMENTS).fill(null).map(() => ({ ...emptyFile })),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<RenewalSubmitResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const allFilesUploaded = files.every((f) => f.uploaded);

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_UPLOAD_TYPES.includes(file.type as (typeof ALLOWED_UPLOAD_TYPES)[number])) {
      setFileError('Only PDF, JPG, and PNG files are accepted.');
      return;
    }
    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
      setFileError(`File size must be under ${MAX_UPLOAD_SIZE_BYTES / 1024 / 1024} MB.`);
      return;
    }

    setFileError(null);
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = { name: file.name, size: file.size, type: file.type, uploaded: true };
      return updated;
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev];
      updated[index] = { ...emptyFile };
      return updated;
    });
  };

  const goToStep = (s: Step) => setStep(s);

  const submit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      const fileMetadata: FileMetadata[] = files.map((f) => ({
        name: f.name!,
        size: f.size,
        type: f.type,
      }));
      const response = await submitRenewal(merchantId, {
        desiredAmount: parseFloat(desiredAmount),
        files: fileMetadata,
      });
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step, desiredAmount, setDesiredAmount,
    files, allFilesUploaded,
    isSubmitting, result, error, fileError,
    handleFileChange, removeFile, goToStep, submit,
  };
}
