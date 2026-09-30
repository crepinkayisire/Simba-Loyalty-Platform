import React from 'react';
import { Link } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRightIcon, CalendarIcon } from 'lucide-react';
import { PageHeader } from '../../components/admin/PageHeader';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { SalesHero } from '../../components/admin/overview/SalesHero';
import { ChartCard } from '../../components/admin/overview/ChartCard';
import { useCollectionRows } from '../../contexts/ConsoleContext';
import { useCustomerDirectory } from '../../hooks/useCustomerDirectory';
import { useTierOptions } from '../../hooks/useTierOptions';
import { liveFeed, pointsIssuedRedeemed, redemptionsByOption, topupsVsSpend } from '../../data/admin/overview';
import { promotionSeed, type PromotionRow } from '../../data/admin/promotions';
import { formatNumber, formatRWFCompact } from '../../utils/format';

const axis = { tickLine: false, axisLine: false, tick: { fill: '#6E655B', fontSize: 12 } } as const;
const tooltipStyle = { borderRadius: 12, border: '1px solid #E8E1D6', fontSize: 12 };

export function Overview() {
  const { tiers } = useTierOptions();
  const promotions = useCollectionRows<PromotionRow>('promotions', promotionSeed);
  const { list: customerList } = useCustomerDirectory();

  const activeTiers = [...tiers].filter((t) => t.status === 'Active').sort((a, b) => a.rank - b.rank);
  const tierTotal = activeTiers.reduce((s, t) => s + t.members, 0) || 1;
  const redeemTotal = redemptionsByOption.reduce((s, r) => s + r.points, 0);
  const topPromotions = promotions.
  filter((p) => p.status === 'Active').
  sort((a, b) => b.redemptions30d - a.redemptions30d).
  slice(0, 5);
  const topRedemptions = Math.max(topPromotions[0]?.redemptions30d ?? 1, 1);
  const topCustomers = customerList.
  filter((c) => c.status !== 'Archived').
  sort((a, b) => b.spend - a.spend).
  slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="How Simba+ members shop, pay and earn across every store"
        actions={
        <span className="flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold text-ink">
            <CalendarIcon className="h-4 w-4 text-muted" aria-hidden="true" />
            September 2026
          </span>
        } />
      

      <SalesHero />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Top-ups vs card spend"
          subtitle="RWF millions per month"
          legend={[
          { label: 'Top-ups', color: '#D9531E' },
          { label: 'Card spend', color: '#F2A06B' }]
          }>
          
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topupsVsSpend} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barGap={4}>
                <CartesianGrid vertical={false} stroke="#E8E1D6" />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip cursor={{ fill: '#FAF7F2' }} contentStyle={tooltipStyle} formatter={(v: number) => `RWF ${v}M`} />
                <Bar dataKey="topups" name="Top-ups" fill="#D9531E" radius={[6, 6, 0, 0]} />
                <Bar dataKey="spend" name="Card spend" fill="#F2A06B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Points issued vs redeemed"
          subtitle="Millions of points per month"
          legend={[
          { label: 'Issued', color: '#E3B34C' },
          { label: 'Redeemed', color: '#1B1714' }]
          }>
          
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsIssuedRedeemed} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#E8E1D6" />
                <XAxis dataKey="month" {...axis} />
                <YAxis {...axis} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}M pts`} />
                <Line type="monotone" dataKey="issued" name="Issued" stroke="#E3B34C" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="redeemed" name="Redeemed" stroke="#1B1714" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ChartCard title="Members by tier" subtitle={`${formatNumber(tierTotal)} members in a tier`}>
          <ul className="space-y-3.5">
            {activeTiers.map((t) =>
            <li key={t.id}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-bold text-ink">{t.name}</span>
                  <span className="num font-semibold text-muted">
                    {formatNumber(t.members)} · {Math.round(t.members / tierTotal * 100)}%
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand">
                  <div className="h-full rounded-full" style={{ width: `${t.members / tierTotal * 100}%`, backgroundColor: t.color, boxShadow: 'inset 0 0 0 1px rgba(27,23,20,0.08)' }} />
                </div>
              </li>
            )}
          </ul>
        </ChartCard>

        <ChartCard title="How points are redeemed" subtitle={`${(redeemTotal / 1_000_000).toFixed(1)}M pts this month`}>
          <ul className="space-y-3.5">
            {redemptionsByOption.map((r, i) =>
            <li key={r.option}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-bold text-ink">{r.option}</span>
                  <span className="num font-semibold text-muted">{Math.round(r.points / redeemTotal * 100)}%</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand">
                  <div className="h-full rounded-full" style={{ width: `${r.points / redeemTotal * 100}%`, backgroundColor: i === 0 ? '#D9531E' : '#F2A06B' }} />
                </div>
              </li>
            )}
          </ul>
        </ChartCard>

        <ChartCard title="Top 5 customers" subtitle="By lifetime spend" className="md:col-span-2 xl:col-span-1">
          <ol className="-mx-5 divide-y divide-line/70">
            {topCustomers.map((c, i) =>
            <li key={c.id}>
                <Link to={`/admin/customers/${c.id}`} className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors duration-150 hover:bg-cream">
                  <span className="num w-4 shrink-0 font-bold text-muted">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-ink">{c.name}</span>
                    <span className="num block text-xs text-muted">
                      {c.tier} · {formatNumber(c.visits)} visits
                    </span>
                  </span>
                  <span className="num shrink-0 font-extrabold text-ink">{formatRWFCompact(c.spend)}</span>
                </Link>
              </li>
            )}
          </ol>
          <Link to="/admin/customers" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-simba hover:text-simba-dark">
            All customers
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </ChartCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ChartCard title="Live activity" subtitle="Latest events across stores and the app">
          <ul className="-mx-5 divide-y divide-line/70">
            {liveFeed.map((f) =>
            <li key={f.id} className="flex items-center gap-4 px-5 py-3 text-sm">
                <span className="num w-11 shrink-0 text-muted">{f.time}</span>
                <span className="w-44 shrink-0 truncate font-bold text-ink">{f.customer}</span>
                <span className="hidden min-w-0 flex-1 truncate text-ink-soft md:block">{f.detail}</span>
                <span className="ml-auto shrink-0">
                  <StatusBadge label={f.kind} />
                </span>
              </li>
            )}
          </ul>
        </ChartCard>

        <ChartCard title="Top performing promotions" subtitle="Redemptions in the last 30 days">
          {topPromotions.length === 0 ?
          <p className="py-6 text-center text-sm text-muted">No active promotions right now.</p> :

          <ul className="space-y-4">
              {topPromotions.map((p) =>
            <li key={p.id}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="truncate font-bold text-ink">{p.name}</span>
                    <span className="num shrink-0 font-extrabold text-ink">{formatNumber(p.redemptions30d)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {p.type} · {p.partner || 'Simba'} · {p.memberships}
                  </p>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-simba" style={{ width: `${p.redemptions30d / topRedemptions * 100}%` }} />
                  </div>
                </li>
            )}
            </ul>
          }
          <Link to="/admin/promotions" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-simba hover:text-simba-dark">
            Manage promotions
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </ChartCard>
      </div>
    </div>);

}