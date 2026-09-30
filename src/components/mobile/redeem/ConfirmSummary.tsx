import React from 'react';
import { useLoyalty } from '../../../contexts/LoyaltyContext';

interface ConfirmSummaryProps {
  rows: {label: string;value: string;}[];
  points: number;
}

/** "What you're redeeming" summary with the points cost and the balance afterwards. */
export function ConfirmSummary({ rows, points }: ConfirmSummaryProps) {
  const { balance } = useLoyalty();
  return (
    <dl className="mt-4 space-y-2.5 rounded-2xl bg-canvas p-4 text-sm">
      {rows.map((r) =>
      <div key={r.label} className="flex justify-between gap-4">
          <dt className="text-muted">{r.label}</dt>
          <dd className="num text-right font-bold text-ink">{r.value}</dd>
        </div>
      )}
      <div className="flex justify-between gap-4">
        <dt className="text-muted">Points used</dt>
        <dd className="num font-extrabold text-ink">−{points.toLocaleString('en-US')}</dd>
      </div>
      <div className="flex justify-between gap-4 border-t border-line pt-2.5">
        <dt className="font-bold text-ink">Balance after</dt>
        <dd className="num text-base font-extrabold text-ink">{(balance - points).toLocaleString('en-US')} pts</dd>
      </div>
    </dl>);

}