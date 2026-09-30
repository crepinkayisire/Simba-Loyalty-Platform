import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChevronLeftIcon, StarIcon, UndoIcon, CrownIcon, SnowflakeIcon, CircleCheckIcon, CheckIcon, XIcon } from 'lucide-react';
import { Panel } from '../../components/admin/Panel';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { TierPill } from '../../components/admin/TierPill';
import { DateRangeFilter } from '../../components/admin/DateRangeFilter';
import { DebitCard } from '../../components/mobile/DebitCard';
import { CustomerTimeline } from '../../components/admin/customer/CustomerTimeline';
import { StaffActionDrawer, type StaffAction, type StaffActionResult } from '../../components/admin/customer/StaffActionDrawer';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { useCollectionRows } from '../../contexts/ConsoleContext';
import { useTierOptions } from '../../hooks/useTierOptions';
import { customers, customerIdFor, profileExtras, JOSEPH_ID, type CustomerRow } from '../../data/admin/customers';
import { partnerSeed, type PartnerRow } from '../../data/admin/partners';
import { partnerRedemptions } from '../../data/admin/partnerRedemptions';
import { formatRWF, formatRWFCompact, initials } from '../../utils/format';
import { buildTimeline, type TimelineEntry } from '../../utils/timeline';
import { allTime, formatAt, inRange, parseDisplayDate, type DateRange } from '../../utils/dateRange';
import { tooltipStyle, chartColors, chartAxis, buttonSecondary } from '../../utils/styles';
import type { CardLevel } from '../../types/loyalty';

type ConsoleCustomer = Omit<CustomerRow, 'tier'> & {tier: string;};

const actions: {id: StaffAction;label: string;icon: typeof StarIcon;}[] = [
{ id: 'points', label: 'Adjust points', icon: StarIcon },
{ id: 'refund', label: 'Refund to card', icon: UndoIcon },
{ id: 'tier', label: 'Change membership', icon: CrownIcon },
{ id: 'freeze', label: 'Freeze card', icon: SnowflakeIcon }];


const formatDob = (d: string) => {
  if (!d) return '—';
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

export function Customer360() {
  const { customerId } = useParams();
  const loyalty = useLoyalty();
  const rows = useCollectionRows<ConsoleCustomer>('customers', customers);
  const partners = useCollectionRows<PartnerRow>('partners', partnerSeed);
  const { colorOf } = useTierOptions();
  const base = rows.find((c) => c.id === customerId);
  const isJoseph = customerId === JOSEPH_ID;

  const [pointsDelta, setPointsDelta] = useState(0);
  const [refunds, setRefunds] = useState(0);
  const [tierOverride, setTierOverride] = useState<CardLevel | null>(null);
  const [frozenOverride, setFrozenOverride] = useState<boolean | null>(null);
  const [staffEntries, setStaffEntries] = useState<TimelineEntry[]>([]);
  const [action, setAction] = useState<StaffAction | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange>(allTime);

  const entries = useMemo(() => {
    if (!base) return [];
    const history = isJoseph ?
    buildTimeline(loyalty.cardHistory, loyalty.activity) :
    buildTimeline(
      [
      { id: `${base.id}-pay`, group: 'Sep 27', title: `Simba ${base.store}`, subtitle: 'Paid with shopping card', amount: -Math.round(base.spend / Math.max(1, base.visits) / 100) * 100, kind: 'payment', time: '17:40' },
      { id: `${base.id}-top`, group: 'Sep 22', title: 'Top up', subtitle: `MTN MoMo · ${base.phone}`, amount: 50_000, kind: 'topup', time: '09:10' }],

      [{ id: `${base.id}-earn`, group: 'Sep 27', title: `Simba ${base.store}`, subtitle: 'Purchase', points: Math.round(base.spend / Math.max(1, base.visits) / 100), kind: 'earned', time: '17:40' }]
    );
    // Partner redemptions join the same history, newest first.
    const redeemed: TimelineEntry[] = partnerRedemptions.
    filter((r) => r.customerId === base.id).
    map((r) => ({
      id: r.id,
      source: 'points',
      typeLabel: 'Partner redemption',
      title: partners.find((p) => p.id === r.partnerId)?.name ?? r.partnerId,
      subtitle: `${r.offer} · Code ${r.code} · ${formatRWF(r.payable)} payable`,
      value: `−${r.points.toLocaleString('en-US')} pts`,
      valueTone: 'ink',
      date: formatAt(r.at)
    }));
    const merged = [...history, ...redeemed].
    map((e, i) => ({ e, i, at: parseDisplayDate(e.date) })).
    sort((a, b) => a.at === b.at ? a.i - b.i : a.at < b.at ? 1 : -1).
    map(({ e }) => e);
    return [...staffEntries, ...merged];
  }, [base, isJoseph, loyalty.cardHistory, loyalty.activity, staffEntries, partners]);

  if (!base) return <Navigate to="/admin/customers" replace />;

  const tier = tierOverride ?? (isJoseph ? loyalty.cardLevel : base.tier);
  const points = (isJoseph ? loyalty.balance : base.points) + pointsDelta;
  const cardBalance = (isJoseph ? loyalty.cardBalance : base.cardBalance) + refunds;
  const frozen = frozenOverride ?? base.status === 'Frozen';
  const status = frozen ? 'Frozen' : base.status === 'Frozen' ? 'Active' : base.status;
  const avgBasket = isJoseph ? 78_900 : Math.round(base.spend / Math.max(1, base.visits) / 100) * 100;
  const x = profileExtras;
  const visibleEntries = entries.filter((e) => inRange(parseDisplayDate(e.date), range));


  const applyAction = (r: StaffActionResult) => {
    const id = `staff-${Date.now()}`;
    const by = 'Staff · Diane Mutesi';
    if (r.pointsDelta) {
      setPointsDelta((d) => d + r.pointsDelta!);
      setStaffEntries((l) => [{ id, source: 'points', typeLabel: 'Staff adjustment', title: r.reason, subtitle: by, value: `${r.pointsDelta! > 0 ? '+' : '−'}${Math.abs(r.pointsDelta!).toLocaleString('en-US')} pts`, valueTone: r.pointsDelta! > 0 ? 'leaf' : 'ink', date: 'Just now' }, ...l]);
      setNotice(`${Math.abs(r.pointsDelta).toLocaleString('en-US')} points ${r.pointsDelta > 0 ? 'added' : 'removed'}.`);
    }
    if (r.refund) {
      setRefunds((v) => v + r.refund!);
      setStaffEntries((l) => [{ id, source: 'card', typeLabel: 'Refund', title: r.reason, subtitle: by, value: `+RWF ${r.refund!.toLocaleString('en-US')}`, valueTone: 'leaf', date: 'Just now' }, ...l]);
      setNotice(`${formatRWF(r.refund)} refunded to the card.`);
    }
    if (r.tier) {
      setTierOverride(r.tier);
      setNotice(`Membership changed to ${r.tier}.`);
    }
    if (r.action === 'freeze') {
      setFrozenOverride(Boolean(r.frozen));
      setNotice(r.frozen ? 'Card frozen. Checkout code and top-ups are blocked.' : 'Card unfrozen.');
    }
  };

  const personal = [
  { label: 'Customer ID', value: customerIdFor(base.id, customers.findIndex((c) => c.id === base.id)) },
  { label: 'Full name', value: base.name },
  { label: 'Phone', value: base.phone },
  { label: 'Email', value: base.email || '—' },
  { label: 'Date of birth', value: formatDob(base.dob) },
  { label: 'Gender', value: base.gender || '—' },
  { label: 'Street number', value: base.street || '—' },
  { label: 'Cell, Sector', value: [base.cell, base.sector].filter(Boolean).join(', ') || '—' },
  { label: 'District, Province/City', value: [base.district, base.province].filter(Boolean).join(', ') || '—' },
  { label: 'Country', value: base.country || '—' },
  { label: 'Favourite store', value: `Simba ${base.store}` },
  { label: 'Favourite language', value: base.language || '—' },
  { label: 'Customer since', value: base.customerSince }];


  const habits = [
  { label: 'Lifetime spend', value: formatRWFCompact(base.spend) },
  { label: 'Visits', value: String(base.visits) },
  { label: 'Average basket', value: formatRWF(avgBasket) },
  { label: 'Last visit', value: base.lastVisit }];


  return (
    <>
      <Link to="/admin/customers" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        Customers
      </Link>

      <header className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-extrabold text-white">{initials(base.name)}</span>
          <div>
            <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink">{base.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
              <TierPill tier={tier} color={colorOf(tier)} />
              <StatusBadge label={status} />
              <span className="num">{base.phone}</span>
              <span>· Customer since {base.customerSince}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {actions.map(({ id, label, icon: Icon }) =>
          <button key={id} type="button" onClick={() => setAction(id)} className={buttonSecondary}>
              <Icon className="h-4 w-4" aria-hidden="true" />
              {id === 'freeze' && frozen ? 'Unfreeze card' : label}
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {notice &&
        <div role="status" className="mb-5 flex items-center gap-2 rounded-xl bg-leaf-soft px-4 py-3 text-sm font-bold text-leaf">
            <CircleCheckIcon className="h-5 w-5" aria-hidden="true" />
            <span className="flex-1">{notice} Logged to the audit trail.</span>
            <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss" className="rounded-full p-1 hover:bg-leaf/10">
              <XIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        }
      </AnimatePresence>

      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <div className="space-y-5">
          <div className={`relative ${frozen ? 'opacity-60 grayscale' : ''}`}>
            <DebitCard name={base.name} level={tier as CardLevel} customerSince={base.customerSince} cardBalance={cardBalance} points={points} />
            {frozen &&
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-extrabold text-white">
                  <SnowflakeIcon className="h-3.5 w-3.5" aria-hidden="true" /> Frozen
                </span>
              </span>
            }
          </div>

          <Panel title="Personal details">
            <dl className="divide-y divide-line">
              {personal.map((s) =>
              <div key={s.label} className="flex items-start justify-between gap-3 py-2.5 text-sm first:pt-0 last:pb-0">
                  <dt className="shrink-0 text-muted">{s.label}</dt>
                  <dd className="num min-w-0 whitespace-pre-line break-words text-right font-bold text-ink">{s.value}</dd>
                </div>
              )}
            </dl>
          </Panel>

          <Panel title="Contact preferences">
            <ul className="flex flex-wrap gap-2">
              {(['app', 'sms', 'whatsapp', 'email'] as const).map((k) =>
              <li key={k} className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${x.contact[k] ? 'bg-ink text-white' : 'bg-sand text-muted line-through'}`}>
                  {x.contact[k] && <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" />}
                  {k === 'sms' ? 'SMS' : k === 'whatsapp' ? 'WhatsApp' : k === 'app' ? 'App' : 'Email'}
                </li>
              )}
            </ul>
            <p className="mt-3 text-xs text-muted">Promos & partner offers: <span className="font-bold text-ink">{x.contact.promos ? 'On' : 'Off'}</span></p>
          </Panel>
        </div>

        <div className="min-w-0 space-y-5">
          <Panel title="Shopping habits" subtitle="Spend, visits and what they buy most">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
              {habits.map((s) =>
              <div key={s.label}>
                  <dt className="text-xs font-semibold text-muted">{s.label}</dt>
                  <dd className="num mt-0.5 text-sm font-extrabold text-ink">{s.value}</dd>
                </div>
              )}
            </dl>
            <div className="mt-5 grid gap-6 border-t border-line pt-5 lg:grid-cols-[1fr_300px]">
              <div>
                <h3 className="text-sm font-extrabold text-ink">Spending, last 6 months</h3>
                <div className="mt-2 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={x.spendByMonth} layout="vertical" margin={{ left: -14, right: 8 }}>
                      <CartesianGrid horizontal={false} stroke={chartColors.grid} />
                      <XAxis type="number" {...chartAxis} tickFormatter={(v) => `${v / 1000}K`} />
                      <YAxis type="category" dataKey="month" {...chartAxis} width={44} />
                      <Tooltip {...tooltipStyle} formatter={(v: number) => [formatRWF(v), 'Spend']} />
                      <Bar dataKey="spend" fill={chartColors.simba} radius={[0, 6, 6, 0]} maxBarSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-ink">Top 5 items bought</h3>
                <ol className="mt-2 divide-y divide-line">
                  {x.topItems.map((item, i) =>
                  <li key={item.name} className="flex items-center gap-3 py-2 text-sm">
                      <span className="num w-4 shrink-0 text-xs font-bold text-muted">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-ink">{item.name}</span>
                        <span className="num text-xs text-muted">{item.times}× · {formatRWF(item.spend)}</span>
                      </span>
                    </li>
                  )}
                </ol>
              </div>
            </div>
          </Panel>

          <Panel
            title="Transactions"
            subtitle="Card, points and partner redemptions in one history · click any item for details"
            action={<DateRangeFilter value={range} onChange={setRange} />}>
            
            {visibleEntries.length ?
            <CustomerTimeline entries={visibleEntries} /> :

            <p className="py-8 text-center text-sm text-muted">No transactions in this range.</p>
            }
          </Panel>
        </div>
      </div>

      <AnimatePresence>
        {action &&
        <StaffActionDrawer
          key={action}
          action={action}
          customerName={base.name}
          currentTier={tier as CardLevel}
          frozen={frozen}
          onConfirm={applyAction}
          onClose={() => setAction(null)} />

        }
      </AnimatePresence>
    </>);

}