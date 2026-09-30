import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { WalletIcon, StarIcon, ReceiptTextIcon } from 'lucide-react';
import { Drawer } from '../Drawer';
import { receipts } from '../../../data/receipts';
import type { TimelineEntry } from '../../../utils/timeline';

type Filter = 'all' | 'card' | 'points';

const toneCls = { leaf: 'text-leaf', ink: 'text-ink', muted: 'text-muted' };

export function CustomerTimeline({ entries }: {entries: TimelineEntry[];}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<TimelineEntry | null>(null);
  const rows = filter === 'all' ? entries : entries.filter((e) => e.source === filter);
  const receipt = open ? receipts[open.id] : undefined;
  const total = receipt ? receipt.items.reduce((s, i) => s + i.price, 0) : 0;

  return (
    <>
      <div role="tablist" aria-label="Activity type" className="mb-3 inline-flex rounded-xl bg-sand p-1">
        {(['all', 'card', 'points'] as Filter[]).map((f) =>
        <button
          key={f}
          type="button"
          role="tab"
          aria-selected={filter === f}
          onClick={() => setFilter(f)}
          className={`rounded-lg px-3 py-1 text-sm font-bold capitalize transition-colors duration-150 ${filter === f ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
          
            {f}
          </button>
        )}
      </div>
      <ul className="divide-y divide-line">
        {rows.map((e) => {
          const hasReceipt = Boolean(receipts[e.id]);
          return (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => setOpen(e)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors duration-150 hover:bg-canvas">
                
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${e.source === 'card' ? 'bg-sand text-ink' : 'bg-gold-soft text-gold'}`}
                  aria-label={e.source === 'card' ? 'Card' : 'Points'}>
                  
                  {e.source === 'card' ? <WalletIcon className="h-4 w-4" aria-hidden="true" /> : <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-ink">{e.title}</span>
                    {hasReceipt && <ReceiptTextIcon className="h-3.5 w-3.5 shrink-0 text-muted" aria-label="Has receipt" />}
                  </span>
                  <span className="block truncate text-xs text-muted">{e.typeLabel} · {e.subtitle}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className={`num block text-sm font-extrabold ${toneCls[e.valueTone]}`}>{e.value}</span>
                  <span className="block text-xs text-muted">{e.date}</span>
                </span>
              </button>
            </li>);

        })}
      </ul>

      <AnimatePresence>
        {open &&
        <Drawer title={receipt ? 'Receipt' : 'Transaction'} subtitle={open.title} onClose={() => setOpen(null)}>
            <p className={`num text-3xl font-extrabold ${toneCls[open.valueTone]}`}>{receipt && open.source === 'points' ? `RWF ${total.toLocaleString('en-US')}` : open.value}</p>
            <dl className="mt-4 divide-y divide-line rounded-xl border border-line text-sm">
              {(receipt ?
            [
            ['Store', receipt.store],
            ['Date', receipt.dateTime],
            ['Paid with', receipt.payment],
            ['Receipt no.', receipt.reference],
            ['Points earned', `+${receipt.points.toLocaleString('en-US')}`]] :

            [
            ['Type', open.typeLabel],
            ['Details', open.subtitle],
            ['Date', open.date]]).

            map(([k, v]) =>
            <div key={k} className="flex justify-between gap-4 px-3 py-2.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="num text-right font-bold text-ink">{v}</dd>
                </div>
            )}
            </dl>
            {receipt &&
          <ul className="mt-4 space-y-2 rounded-xl bg-canvas p-4 text-sm">
                {receipt.items.map((i) =>
            <li key={i.name} className="flex justify-between gap-3">
                    <span className="text-ink">{i.name} <span className="text-muted">{i.qty}</span></span>
                    <span className="num font-semibold text-ink">{i.price.toLocaleString('en-US')}</span>
                  </li>
            )}
                <li className="flex justify-between border-t border-dashed border-line pt-2 font-extrabold text-ink">
                  <span>Total</span>
                  <span className="num">RWF {total.toLocaleString('en-US')}</span>
                </li>
              </ul>
          }
          </Drawer>
        }
      </AnimatePresence>
    </>);

}