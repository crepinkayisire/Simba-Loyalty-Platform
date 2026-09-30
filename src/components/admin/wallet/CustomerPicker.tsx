import React, { useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { TierPill } from '../TierPill';
import { StatusBadge } from '../StatusBadge';
import { useCustomerDirectory } from '../../../hooks/useCustomerDirectory';
import { formatNumber, formatRWF } from '../../../utils/format';

interface CustomerPickerProps {
  value: string;
  onChange: (name: string) => void;
  /** Amount of the transaction being entered, used for the "after" balance. */
  amount: number;
  isNew: boolean;
  /** Saved balance after an existing transaction. */
  balanceAfter?: number;
}

/** Search the customer list, then show the picked customer's details and card balance. */
export function CustomerPicker({ value, onChange, amount, isNew, balanceAfter }: CustomerPickerProps) {
  const { list, find } = useCustomerDirectory();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const picked = find(value);

  const q = query.trim().toLowerCase();
  const matches = list.filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.replace(/\s/g, '').includes(q.replace(/\s/g, ''))).slice(0, 6);
  const after = isNew ? picked ? picked.cardBalance + (Number(amount) || 0) : undefined : balanceAfter;

  return (
    <div>
      <label htmlFor="customer-search" className="mb-1.5 block text-xs font-bold text-muted">
        Customer<span className="text-simba"> *</span>
      </label>

      {picked && !open ?
      <div className="rounded-xl border border-line p-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-extrabold text-ink">{picked.name}</p>
              <p className="num text-xs text-muted">{picked.phone}</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <TierPill tier={picked.tier} />
                <StatusBadge label={picked.status} />
                <span className="text-xs text-muted">· {picked.store}</span>
              </p>
            </div>
            {isNew &&
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setQuery('');
            }}
            className="shrink-0 text-xs font-bold text-simba hover:text-simba-dark">
            
                Change
              </button>
          }
          </div>
          <dl className="num mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-sm">
            <div>
              <dt className="text-[11px] font-bold text-muted">{isNew ? 'Card balance now' : 'Card balance today'}</dt>
              <dd className="font-extrabold text-ink">{formatRWF(picked.cardBalance)}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold text-muted">Points</dt>
              <dd className="font-extrabold text-ink">{formatNumber(picked.points)}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-bold text-muted">{isNew ? 'After this' : 'After this txn'}</dt>
              <dd className={`font-extrabold ${after !== undefined && after < 0 ? 'text-simba-dark' : 'text-ink'}`}>{after !== undefined ? formatRWF(after) : '—'}</dd>
            </div>
          </dl>
        </div> :

      <div className="relative">
          <span className="relative flex items-center">
            <SearchIcon className="pointer-events-none absolute left-3 h-4 w-4 text-muted" aria-hidden="true" />
            <input
            id="customer-search"
            autoFocus={isNew}
            role="combobox"
            aria-expanded={true}
            aria-controls="customer-results"
            placeholder="Search by name or phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-xl border border-line bg-white pl-9 pr-9 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-muted focus:border-ink focus:outline-none" />
          
            {picked &&
          <button type="button" onClick={() => setOpen(false)} aria-label="Cancel search" className="absolute right-2 rounded-full p-1 text-muted hover:bg-sand">
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
          }
          </span>
          <ul id="customer-results" role="listbox" className="mt-1.5 divide-y divide-line overflow-hidden rounded-xl border border-line">
            {matches.length === 0 && <li className="px-3 py-3 text-sm text-muted">No customer matches "{query}"</li>}
            {matches.map((c) =>
          <li key={c.id} role="option" aria-selected={c.name === value}>
                <button
              type="button"
              onClick={() => {
                onChange(c.name);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-canvas">
              
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{c.name}</span>
                    <span className="num block text-xs text-muted">{c.phone}</span>
                  </span>
                  <span className="num shrink-0 text-xs font-bold text-ink-soft">{formatRWF(c.cardBalance)}</span>
                </button>
              </li>
          )}
          </ul>
        </div>
      }
    </div>);

}