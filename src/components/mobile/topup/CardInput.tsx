import React, { useState } from 'react';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import { cardBrand, emptyCard, expiryValid, type CardDetails } from '../../../utils/cardPayment';

interface CardInputProps {
  value: string;
  onChange: (v: string) => void;
  details: CardDetails;
  onDetails: (d: CardDetails) => void;
  saved: string;
  disabled: boolean;
}

const fieldCls =
'num h-14 w-full rounded-2xl border-2 bg-white px-4 text-base font-bold text-ink placeholder:font-semibold placeholder:text-muted focus:border-ink focus:outline-none disabled:opacity-60';

export function CardInput({ value, onChange, details, onDetails, saved, disabled }: CardInputProps) {
  const [newCard, setNewCard] = useState(value !== saved);
  const set = (patch: Partial<CardDetails>) => onDetails({ ...details, ...patch });
  const expiryShown = details.expiry.length > 2 ? `${details.expiry.slice(0, 2)}/${details.expiry.slice(2)}` : details.expiry;
  const expiryError = details.expiry.length === 4 && !expiryValid(details.expiry);
  const brand = value.length >= 2 ? cardBrand(value) : null;

  const useSaved = () => {
    setNewCard(false);
    onChange(saved);
    onDetails(emptyCard);
  };

  const cvvField =
  <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-muted">CVV</span>
      <input
      disabled={disabled}
      inputMode="numeric"
      type="password"
      autoComplete="cc-csc"
      placeholder="•••"
      value={details.cvv}
      onChange={(e) => set({ cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
      className={`${fieldCls} border-line tracking-[0.3em]`} />
    
    </label>;


  return (
    <div>
      <p className="text-sm font-extrabold text-ink">Card</p>
      <button
        type="button"
        disabled={disabled}
        onClick={useSaved}
        aria-pressed={!newCard}
        className={`mt-2 flex w-full items-center gap-3 rounded-2xl border-2 bg-white p-3 text-left transition-colors duration-150 ${
        !newCard ? 'border-simba bg-simba-soft' : 'border-line hover:border-ink/30'}`
        }>
        
        <CreditCardIcon className="h-5 w-5 text-ink" aria-hidden="true" />
        <span className="flex-1">
          <span className="num block text-sm font-bold text-ink">Visa •••• {saved}</span>
          <span className="num block text-xs text-muted">Expires 08/28</span>
        </span>
        <span className="text-xs font-semibold text-muted">Last used</span>
      </button>

      {!newCard &&
      <div className="mt-3 grid grid-cols-[1fr_120px] items-end gap-3">
          <p className="pb-4 text-xs text-muted">Enter the 3-digit code on the back of your card to confirm.</p>
          {cvvField}
        </div>
      }

      {newCard ?
      <div className="mt-3 space-y-3 rounded-2xl border-2 border-simba bg-white p-3">
          <p className="text-xs font-extrabold text-simba">New card</p>
          <label className="block">
            <span className="mb-1.5 flex items-center justify-between text-xs font-bold text-muted">
              Card number
              {brand && <span className="text-ink">{brand}</span>}
            </span>
            <input
            autoFocus
            disabled={disabled}
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="0000 0000 0000 0000"
            value={value.replace(/(\d{4})(?=\d)/g, '$1 ')}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 16))}
            className={`${fieldCls} border-line tracking-wider`} />
          
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-muted">Name on card</span>
            <input
            disabled={disabled}
            autoComplete="cc-name"
            placeholder="JOSEPH MUTABAZI"
            value={details.name}
            onChange={(e) => set({ name: e.target.value.toUpperCase() })}
            className={`${fieldCls} border-line`} />
          
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-muted">Expiry (MM/YY)</span>
              <input
              disabled={disabled}
              inputMode="numeric"
              autoComplete="cc-exp"
              placeholder="MM/YY"
              aria-invalid={expiryError}
              value={expiryShown}
              onChange={(e) => set({ expiry: e.target.value.replace(/\D/g, '').slice(0, 4) })}
              className={`${fieldCls} ${expiryError ? 'border-simba' : 'border-line'}`} />
            
            </label>
            {cvvField}
          </div>
          {expiryError && <p role="alert" className="text-xs font-semibold text-simba-dark">This card has expired or the date isn't valid.</p>}
          <label className="flex items-center gap-2.5 pt-1 text-sm font-semibold text-ink">
            <input
            type="checkbox"
            disabled={disabled}
            checked={details.save}
            onChange={(e) => set({ save: e.target.checked })}
            className="h-4 w-4 accent-simba" />
          
            Save this card for next time
          </label>
          <button type="button" disabled={disabled} onClick={useSaved} className="text-sm font-bold text-muted hover:text-ink">
            Cancel
          </button>
        </div> :

      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          setNewCard(true);
          onChange('');
          onDetails(emptyCard);
        }}
        className="mt-3 text-sm font-bold text-simba hover:text-simba-dark">
        
          + Use another card
        </button>
      }

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
        <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Card details are encrypted and never stored by Simba.
      </p>
    </div>);

}