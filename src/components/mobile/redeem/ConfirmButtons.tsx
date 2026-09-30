import React from 'react';

interface ConfirmButtonsProps {
  label: string;
  onBack: () => void;
  onConfirm: () => void;
}

export function ConfirmButtons({ label, onBack, onConfirm }: ConfirmButtonsProps) {
  return (
    <div className="mt-5 grid grid-cols-[auto_1fr] gap-3">
      <button
        type="button"
        onClick={onBack}
        className="h-14 rounded-2xl border-2 border-line px-5 text-sm font-extrabold text-ink transition-colors duration-150 hover:border-ink/30">
        
        Back
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="num h-14 whitespace-nowrap rounded-2xl bg-simba px-4 text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-simba-dark">
        
        {label}
      </button>
    </div>);

}