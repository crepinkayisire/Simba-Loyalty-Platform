import React from 'react';
import { topUpAmounts } from '../../../data/shoppingCard';

interface AmountPickerProps {
  preset: number | 'other';
  onPreset: (v: number | 'other') => void;
  other: string;
  onOther: (v: string) => void;
}

export function AmountPicker({ preset, onPreset, other, onOther }: AmountPickerProps) {
  const tile = (on: boolean) =>
  `num h-14 rounded-2xl border-2 bg-white text-base font-extrabold transition-colors duration-150 ${
  on ? 'border-simba bg-simba-soft text-simba' : 'border-line text-ink hover:border-ink/30'}`;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Amount">
        {topUpAmounts.map((a) =>
        <button key={a} type="button" role="radio" aria-checked={preset === a} onClick={() => onPreset(a)} className={tile(preset === a)}>
            RWF {a.toLocaleString('en-US')}
          </button>
        )}
        <button
          type="button"
          role="radio"
          aria-checked={preset === 'other'}
          onClick={() => onPreset('other')}
          className={`col-span-2 ${tile(preset === 'other')}`}>
          
          Other amount
        </button>
      </div>
      {preset === 'other' &&
      <label className="mt-3 flex h-16 items-center gap-3 rounded-2xl border-2 border-ink bg-white px-4">
          <span className="text-base font-bold text-muted">RWF</span>
          <input
          autoFocus
          inputMode="numeric"
          aria-label="Top up amount in RWF"
          placeholder="0"
          value={other ? Number(other).toLocaleString('en-US') : ''}
          onChange={(e) => onOther(e.target.value.replace(/\D/g, '').slice(0, 7))}
          className="num min-w-0 flex-1 bg-transparent text-2xl font-extrabold text-ink placeholder:text-line focus:outline-none" />
        
        </label>
      }
    </div>);

}