import React from 'react';
import type { PaymentMethod } from '../../../data/paymentMethods';

interface PhoneInputProps {
  method: PaymentMethod;
  value: string;
  onChange: (v: string) => void;
  isLast: boolean;
  disabled: boolean;
}

export function PhoneInput({ method, value, onChange, isLast, disabled }: PhoneInputProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm font-extrabold text-ink">
        {method.id === 'mtn' ? 'MoMo number' : 'Airtel Money number'}
        {isLast && <span className="text-xs font-semibold text-muted">Last used</span>}
      </span>
      <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border-2 border-line bg-white px-4 focus-within:border-ink">
        <span className="num text-lg font-bold text-muted">+250</span>
        <input
          autoFocus
          disabled={disabled}
          inputMode="tel"
          placeholder={method.id === 'mtn' ? '78X XXX XXX' : '73X XXX XXX'}
          value={value.replace(/(\d{3})(?=\d)/g, '$1 ')}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 9))}
          className="num min-w-0 flex-1 bg-transparent text-xl font-extrabold tracking-wide text-ink placeholder:text-line focus:outline-none" />
        
      </span>
      <span className="mt-2 block text-xs text-muted">You'll get a prompt on this phone to approve the payment.</span>
    </label>);

}