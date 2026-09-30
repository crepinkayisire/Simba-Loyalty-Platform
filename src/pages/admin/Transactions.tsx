import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LandmarkIcon } from 'lucide-react';
import { ModulePage } from '../../components/admin/module/ModulePage';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { TierPill } from '../../components/admin/TierPill';
import { DateRangeFilter } from '../../components/admin/DateRangeFilter';
import { CustomerPicker } from '../../components/admin/wallet/CustomerPicker';
import { DisbursementDrawer } from '../../components/admin/wallet/DisbursementDrawer';
import { useCollection, useCollectionRows } from '../../contexts/ConsoleContext';
import { useCustomerDirectory } from '../../hooks/useCustomerDirectory';
import { useTierOptions } from '../../hooks/useTierOptions';
import { stores, type StoreRow } from '../../data/admin/stores';
import { partnerSeed, type PartnerRow } from '../../data/admin/partners';
import { partnerRedemptions } from '../../data/admin/partnerRedemptions';
import { availableToDisburse, payoutSeed, scheduleSeed, type Payout, type PayoutSchedule } from '../../data/admin/disbursements';
import {
  baseLocations,
  ledgerSeed,
  paymentMethods,
  transactionKpis,
  txnStatuses,
  txnTypes,
  type LedgerTxn } from
'../../data/admin/transactions';
import { formatNumber, formatRWF, formatRWFCompact } from '../../utils/format';
import { allTime, DEMO_TODAY, formatAt, inRange, type DateRange } from '../../utils/dateRange';
import { newId } from '../../utils/id';
import { buttonSecondary } from '../../utils/styles';
import type { ColumnDef, FieldDef } from '../../types/console';

/** Partner redemptions from the Partners ledger, shown as rows here too. */
function partnerRows(partnerName: (id: string) => string, membershipOf: (customer: string) => string): LedgerTxn[] {
  return partnerRedemptions.map((r) => ({
    id: `pr-${r.id}`,
    at: r.at,
    customer: r.customer,
    type: 'Partner redemption',
    points: -r.points,
    amount: 0,
    location: partnerName(r.partnerId),
    method: 'Points',
    membership: membershipOf(r.customer),
    balanceAfter: 0,
    status: r.status === 'Paid' ? 'Completed' : 'Pending',
    note: `${r.offer} · payable ${formatRWF(r.payable)}`
  }));
}

export function Transactions() {
  const { rows, save } = useCollection<LedgerTxn>('transactions', ledgerSeed);
  const { find } = useCustomerDirectory();
  const { names: memberships, colorOf } = useTierOptions();
  const partners = useCollectionRows<PartnerRow>('partners', partnerSeed);
  const storeNames = useCollectionRows<StoreRow>('stores', stores).map((s) => s.name.replace(/^Simba /, ''));
  const locations = [...baseLocations, ...storeNames, ...partners.filter((p) => p.id !== 'simba').map((p) => p.name)];

  const [range, setRange] = useState<DateRange>(allTime);
  const [showPayouts, setShowPayouts] = useState(false);
  const [payouts, setPayouts] = useState<Payout[]>(payoutSeed);
  const [schedule, setSchedule] = useState<PayoutSchedule>(scheduleSeed);
  const paidOutManually = payouts.filter((p) => !payoutSeed.includes(p)).reduce((s, p) => s + p.amount, 0);
  const available = availableToDisburse - paidOutManually;

  const partnerName = (id: string) => partners.find((p) => p.id === id)?.name ?? id;
  const all = [...rows, ...partnerRows(partnerName, (c) => find(c)?.tier ?? '')].sort((a, b) => a.at < b.at ? 1 : -1);
  const visible = all.filter((t) => inRange(t.at, range));

  const earned = visible.reduce((s, t) => s + Math.max(0, t.points), 0);
  const redeemed = visible.reduce((s, t) => s + Math.max(0, -t.points), 0);
  const flagged = visible.filter((t) => t.status === 'Flagged').length;
  const topups = visible.filter((t) => t.type === 'Top-up' && t.status !== 'Reversed').reduce((s, t) => s + t.amount, 0);
  const isAllTime = range.preset === 'all';

  const columns: ColumnDef<LedgerTxn>[] = [
  { id: 'at', header: 'Date & time', cell: (t) => <span className="num text-ink-soft">{formatAt(t.at)}</span>, sortValue: (t) => t.at },
  { id: 'customer', header: 'Customer', cell: (t) => <span className="font-bold">{t.customer}</span>, sortValue: (t) => t.customer },
  { id: 'type', header: 'Type', cell: (t) => <span className="text-ink-soft">{t.type}</span>, sortValue: (t) => t.type },
  {
    id: 'points',
    header: 'Points',
    align: 'right',
    cell: (t) => t.points ? <span className={`font-bold ${t.points > 0 ? 'text-leaf' : 'text-ink'}`}>{t.points > 0 ? '+' : '−'}{formatNumber(Math.abs(t.points))}</span> : <span className="text-muted">—</span>,
    sortValue: (t) => t.points
  },
  {
    id: 'amount',
    header: 'RWF',
    align: 'right',
    cell: (t) => t.amount ? <span className={`font-extrabold ${t.amount > 0 ? 'text-leaf' : 'text-ink'}`}>{t.amount > 0 ? '+' : '−'}{formatRWF(Math.abs(t.amount))}</span> : <span className="text-muted">—</span>,
    sortValue: (t) => t.amount
  },
  { id: 'location', header: 'Store / partner', cell: (t) => <span className="text-ink-soft">{t.location}</span>, sortValue: (t) => t.location, hideBelow: 'md' },
  { id: 'membership', header: 'Membership', cell: (t) => t.membership ? <TierPill tier={t.membership} color={colorOf(t.membership)} /> : '—', sortValue: (t) => t.membership, hideBelow: 'lg' },
  { id: 'status', header: 'Status', cell: (t) => <StatusBadge label={t.status} /> }];


  const fields: FieldDef<LedgerTxn>[] = [
  {
    key: 'customer',
    label: 'Customer',
    type: 'custom',
    required: true,
    render: ({ draft, set, isNew }) =>
    <CustomerPicker value={draft.customer} onChange={(name) => set('customer', name)} amount={draft.amount} isNew={isNew} balanceAfter={draft.balanceAfter} />

  },
  { key: 'type', label: 'Transaction type', type: 'select', options: txnTypes, half: true },
  { key: 'status', label: 'Status', type: 'select', options: txnStatuses, half: true },
  { key: 'location', label: 'Store / partner', type: 'select', options: locations, half: true },
  { key: 'method', label: 'Payment method', type: 'select', options: paymentMethods, half: true },
  { key: 'points', label: 'Points', type: 'number', suffix: 'pts', half: true, help: 'Negative for points redeemed' },
  { key: 'amount', label: 'Amount', type: 'number', prefix: 'RWF', half: true, help: 'Negative for money leaving the card' },
  { key: 'note', label: 'Reason', type: 'textarea', help: 'Why the transaction was adjusted, flagged or reversed. Kept in the audit trail.' }];


  return (
    <>
      <ModulePage
        title="Transactions"
        subtitle="Every purchase, top-up, redemption and adjustment across stores, partners and the app"
        headerActions={
        <button type="button" onClick={() => setShowPayouts(true)} className={buttonSecondary}>
            <LandmarkIcon className="h-4 w-4" aria-hidden="true" />
            Disbursements
          </button>
        }
        metrics={[
        {
          label: 'Balance held on cards',
          value: formatRWFCompact(transactionKpis.balanceHeld),
          hint: `${formatNumber(transactionKpis.cardsWithBalance)} cards · ${formatRWFCompact(available)} to disburse`
        },
        {
          label: isAllTime ? 'Top-ups this month' : 'Top-ups in range',
          value: formatRWFCompact(isAllTime ? transactionKpis.topupsThisMonth : topups),
          hint: isAllTime ? '+7.6% vs August' : `${visible.length} transactions`,
          tone: isAllTime ? 'up' : 'neutral'
        },
        { label: 'Points earned vs redeemed', value: `${formatNumber(earned)} / ${formatNumber(redeemed)}`, hint: isAllTime ? 'Rows in the ledger' : 'In the selected range' },
        { label: 'Flagged', value: `${flagged}`, hint: flagged ? 'Review and resolve' : 'Nothing to review', tone: flagged ? 'down' : 'neutral' }]
        }
        tableTitle="Ledger"
        entity="adjustment"
        rows={visible}
        columns={columns}
        searchKeys={['customer', 'location', 'type', 'note']}
        filter={{ key: 'type', label: 'Types', options: txnTypes }}
        filters={[
        { key: 'membership', label: 'Memberships', options: memberships },
        { key: 'status', label: 'Statuses', options: txnStatuses }]
        }
        toolbar={<DateRangeFilter value={range} onChange={setRange} />}
        fields={fields}
        newRecord={() => {
          const d = new Date();
          return {
            id: newId('tx'),
            at: `${DEMO_TODAY}T${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
            customer: '',
            type: 'Adjustment',
            points: 0,
            amount: 0,
            location: 'HQ',
            method: 'Cash',
            membership: '',
            balanceAfter: 0,
            status: 'Completed',
            note: ''
          };
        }}
        onSave={(t) => {
          if (t.id.startsWith('pr-')) return; // partner redemptions are managed in Partners
          const isNew = !rows.some((r) => r.id === t.id);
          const c = find(t.customer);
          save(isNew ? { ...t, membership: c?.tier ?? '', balanceAfter: (c?.cardBalance ?? 0) + (Number(t.amount) || 0) } : t);
        }}
        recordLabel={(t) => `${t.type} for ${t.customer || 'customer'}`} />
      

      <AnimatePresence>
        {showPayouts &&
        <DisbursementDrawer
          available={available}
          schedule={schedule}
          payouts={payouts}
          onCashOut={(amount, accountId) => setPayouts((p) => [{ id: newId('po'), date: 'Today', amount, accountId, mode: 'Manual', status: 'Processing' }, ...p])}
          onSaveSchedule={setSchedule}
          onClose={() => setShowPayouts(false)} />

        }
      </AnimatePresence>
    </>);

}