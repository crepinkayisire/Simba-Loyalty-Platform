import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUpIcon } from 'lucide-react';
import { memberSalesTrend, overviewKpis } from '../../../data/admin/overview';
import { programRules } from '../../../data/programRules';
import { formatNumber, formatRWFCompact } from '../../../utils/format';

const SIMBA = '#D9531E';

export function SalesHero() {
  const k = overviewKpis;
  const side = [
  { label: 'Total members', value: formatNumber(k.totalMembers), hint: `+${formatNumber(k.newMembers)} this month` },
  { label: 'Active members', value: formatNumber(k.activeMembers), hint: `${Math.round(k.activeMembers / k.totalMembers * 100)}% shopped in 30 days` },
  { label: 'Card balance held', value: formatRWFCompact(k.cardBalanceHeld), hint: 'Prepaid by customers' },
  { label: 'Points outstanding', value: `${(k.pointsOutstanding / 1_000_000).toFixed(1)}M pts`, hint: `${formatRWFCompact(k.pointsOutstanding * programRules.pointValueRWF)} liability` }];


  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <section aria-label="Member sales" className="rounded-2xl bg-white p-6 shadow-card">
        <p className="text-sm font-bold text-muted">Member sales</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <p className="num text-[52px] font-extrabold leading-none tracking-tight text-ink">{formatRWFCompact(k.memberSales)}</p>
          <span className="flex items-center gap-1 rounded-full bg-leaf-soft px-2.5 py-1 text-xs font-bold text-leaf">
            <TrendingUpIcon className="h-3.5 w-3.5" aria-hidden="true" />+{k.memberSalesChange}% vs August
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">{k.memberShareOfSales}% of all Simba sales now come from identified Simba+ members.</p>
        <div className="mt-5 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={memberSalesTrend} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#E8E1D6" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6E655B', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6E655B', fontSize: 12 }} tickFormatter={(v: number) => `${v}M`} width={52} />
              <Tooltip formatter={(v: number) => [`RWF ${v}M`, 'Member sales']} contentStyle={{ borderRadius: 12, border: '1px solid #E8E1D6', fontSize: 12 }} />
              <Area type="monotone" dataKey="sales" stroke={SIMBA} strokeWidth={2.5} fill="#FDEEE5" fillOpacity={1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section aria-label="Programme totals" className="rounded-2xl bg-white px-6 py-2 shadow-card">
        <dl className="divide-y divide-line">
          {side.map((s) =>
          <div key={s.label} className="py-4">
              <dt className="text-sm font-bold text-muted">{s.label}</dt>
              <dd className="mt-1">
                <span className="num block whitespace-nowrap text-[26px] font-extrabold leading-tight tracking-tight text-ink">{s.value}</span>
                <span className="num mt-0.5 block text-xs font-semibold text-muted">{s.hint}</span>
              </dd>
            </div>
          )}
        </dl>
      </section>
    </div>);

}