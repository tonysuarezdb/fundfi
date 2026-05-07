import React from 'react';

interface ProgressBarProps {
  percent: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
}

export default function ProgressBar({
  percent,
  color = '#0057FF',
  height = 'h-4',
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-sm text-[#6B7280] mb-1">
          <span>{clamped}% paid</span>
          <span>100%</span>
        </div>
      )}
      <div className={`w-full bg-[#E5E7EB] rounded-full ${height} overflow-hidden`}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${clamped}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
