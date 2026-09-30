import React, { useState } from 'react';
import { ChevronLeftIcon, SearchIcon } from 'lucide-react';
import { phoneContacts } from '../../../data/redeemOptions';
import { initials } from '../../../utils/format';

interface ContactBookProps {
  onPick: (contact: {name: string;phone: string;}) => void;
  onBack: () => void;
}

/** The phone's contact book, shown inside the send-points sheet. */
export function ContactBook({ onPick, onBack }: ContactBookProps) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = phoneContacts.filter((c) => !q || c.name.toLowerCase().includes(q) || c.phone.includes(q.replace(/\D/g, '') || '~'));

  return (
    <div className="mt-2">
      <button type="button" onClick={onBack} className="-ml-2 flex items-center gap-1 rounded-full px-2 py-1 text-sm font-bold text-ink-soft hover:bg-sand">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back
      </button>
      <label className="relative mt-2 block">
        <span className="sr-only">Search contacts</span>
        <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search contacts"
          className="h-12 w-full rounded-2xl border-2 border-line bg-white pl-10 pr-3 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none" />
        
      </label>
      <ul className="mt-3 max-h-[320px] divide-y divide-line overflow-y-auto" aria-label="Contacts">
        {list.map((c) =>
        <li key={c.phone}>
            <button type="button" onClick={() => onPick(c)} className="flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left transition-colors duration-150 hover:bg-canvas">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-sm font-extrabold text-ink">{initials(c.name)}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[15px] font-bold text-ink">{c.name}</span>
                <span className="num block text-sm text-muted">+250 {c.phone.replace(/(\d{3})(?=\d)/g, '$1 ')}</span>
              </span>
            </button>
          </li>
        )}
      </ul>
      {list.length === 0 && <p className="py-8 text-center text-sm text-muted">No contacts match.</p>}
    </div>);

}