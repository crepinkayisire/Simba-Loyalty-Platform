import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../StatusBadge';
import { DateRangeFilter } from '../DateRangeFilter';
import type { PartnerRedemption } from '../../../data/admin/partnerRedemptions';
import { formatNumber, formatRWF } from '../../../utils/format';
import { allTime, formatAt, inRange, type DateRange } from '../../../utils/dateRange';

interface RedemptionTableProps {
  rows: PartnerRedemption[];
  /** What the second column shows: the partner (on a customer) or the customer (on a partner). */
  counterpart: 'partner' | 'customer';
  partnerName: (id: string) => string;
  title: string;
  subtitle?: string;
}

/** Points redeemed at partners and what Simba owes each partner for them. */
export function RedemptionTable({ rows, counterpart, partnerName, title, subtitle }: RedemptionTableProps) {
  const [range, setRange] = useState<DateRange>(allTime);
  const visible = rows.filter((r) => inRange(r.at, range)).sort((a, b) => a.at < b.at ? 1 : -1);
  const points = visible.reduce((s, r) => s + r.points, 0);
  const payable = visible.reduce((s, r) => s + r.payable, 0);
  const owed = visible.filter((r) => r.status !== 'Paid').reduce((s, r) => s + r.payable, 0);

  return (
    <section className="rounded-2xl bg-white shadow-card" aria-label={title}>
      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center">
        <div className="md:mr-auto">
          <h2 className="text-base font-extrabold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
        <DateRangeFilter value={range} onChange={setRange} />
      </div>
      <div className="thin-scrollbar overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs font-bold text-muted">
              <th scope="col" className="px-5 py-3">Date & time</th>
              <th scope="col" className="px-5 py-3">{counterpart === 'partner' ? 'Partner' : 'Customer'}</th>
              <th scope="col" className="px-5 py-3">Offer</th>
              <th scope="col" className="px-5 py-3 text-right">Points</th>
              <th scope="col" className="px-5 py-3 text-right">Partner payable</th>
              <th scope="col" className="px-5 py-3">Settlement</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) =>
            <tr key={r.id} className="border-b border-line/70 last:border-0">
                <td className="num whitespace-nowrap px-5 py-3 text-ink-soft">{formatAt(r.at)}</td>
                <td className="whitespace-nowrap px-5 py-3 font-bold text-ink">
                  {counterpart === 'partner' ?
                <Link to={`/admin/partners/${r.partnerId}`} className="hover:text-simba">
                      {partnerName(r.partnerId)}
                    </Link> :

                <span className="flex items-center gap-2">
                      <Link to={`/admin/customers/${r.customerId}`} className="hover:text-simba">
                        {r.customer}
                      </Link>
                      <span className="num rounded-md bg-sand px-1.5 py-0.5 text-[11px] font-bold tracking-wide text-ink-soft">{r.code}</span>
                    </span>
                }
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-ink-soft">{r.offer}</td>
                <td className="num whitespace-nowrap px-5 py-3 text-right font-bold text-ink">−{formatNumber(r.points)}</td>
                <td className="num whitespace-nowrap px-5 py-3 text-right font-extrabold text-ink">{formatRWF(r.payable)}</td>
                <td className="px-5 py-3">
                  <StatusBadge label={r.status} />
                </td>
              </tr>
            )}
          </tbody>
          {visible.length > 0 &&
          <tfoot>
              <tr className="border-t border-line bg-canvas text-sm font-extrabold text-ink">
                <td className="px-5 py-3" colSpan={3}>
                  Total · <span className="font-semibold text-muted">{formatRWF(owed)} still owed</span>
                </td>
                <td className="num px-5 py-3 text-right">−{formatNumber(points)}</td>
                <td className="num px-5 py-3 text-right">{formatRWF(payable)}</td>
                <td />
              </tr>
            </tfoot>
          }
        </table>
        {visible.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted">No partner redemptions in this range.</p>}
      </div>
    </section>);

}