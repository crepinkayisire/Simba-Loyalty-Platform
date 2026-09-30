import React from 'react';
import { createPortal } from 'react-dom';
import { StarIcon } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { receipts } from '../../data/receipts';

export interface FeedRow {
  id: string;
  source: 'card' | 'points';
  typeLabel: string;
  title: string;
  subtitle: string;
  value: string;
  valueTone: 'leaf' | 'ink' | 'muted';
  date: string;
  icon: React.ComponentType<{className?: string;}>;
  iconCls: string;
}

interface ActivityDetailSheetProps {
  row: FeedRow;
  onClose: () => void;
}

const toneCls = { leaf: 'text-leaf', ink: 'text-ink', muted: 'text-ink' };

export function ActivityDetailSheet({ row, onClose }: ActivityDetailSheetProps) {
  const receipt = receipts[row.id];
  const Icon = row.icon;
  const total = receipt ? receipt.items.reduce((s, i) => s + i.price, 0) : 0;
  const reference = receipt?.reference ?? `SP-${row.id.replace(/[^a-z0-9]/gi, '').slice(-8).toUpperCase()}`;

  const details: {label: string;value: string;}[] = receipt ?
  [
  { label: 'Store', value: receipt.store },
  { label: 'Date', value: receipt.dateTime },
  { label: 'Paid with', value: receipt.payment },
  { label: 'Receipt no.', value: receipt.reference }] :

  [
  { label: 'Type', value: row.typeLabel },
  { label: 'Details', value: row.subtitle },
  { label: 'Date', value: row.date },
  { label: 'Reference', value: reference }];


  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={receipt ? 'Receipt' : 'Transaction details'} onClose={onClose}>
      <div className="mt-3 flex flex-col items-center text-center">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full ${row.iconCls}`}>
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="mt-3 text-base font-bold text-ink">{row.title}</p>
        <p className={`num mt-1 text-3xl font-extrabold ${toneCls[row.valueTone]}`}>
          {receipt && row.source === 'points' ? `RWF ${total.toLocaleString('en-US')}` : row.value}
        </p>
      </div>

      {receipt &&
    <div className="mt-5 flex items-center justify-between rounded-2xl bg-leaf-soft px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-bold text-leaf">
            <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />
            Simba+ points earned
          </span>
          <span className="num text-lg font-extrabold text-leaf">+{receipt.points.toLocaleString('en-US')}</span>
        </div>
    }

      <dl className="mt-4 divide-y divide-line rounded-2xl border border-line">
        {details.map((d) =>
      <div key={d.label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
            <dt className="text-muted">{d.label}</dt>
            <dd className="num text-right font-bold text-ink">{d.value}</dd>
          </div>
      )}
      </dl>

      {receipt &&
    <section className="mt-4 rounded-2xl bg-canvas p-4" aria-label="Items">
          <h3 className="text-xs font-bold text-muted">{receipt.items.length} items</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {receipt.items.map((item) =>
        <li key={item.name} className="flex justify-between gap-3">
                <span className="text-ink">
                  {item.name} <span className="text-muted">{item.qty}</span>
                </span>
                <span className="num font-semibold text-ink">{item.price.toLocaleString('en-US')}</span>
              </li>
        )}
          </ul>
          <div className="mt-3 flex justify-between border-t border-dashed border-line pt-3 text-sm">
            <span className="font-bold text-ink">Total</span>
            <span className="num font-extrabold text-ink">RWF {total.toLocaleString('en-US')}</span>
          </div>
        </section>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}