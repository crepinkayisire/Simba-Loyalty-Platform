import React from 'react';
import { ModulePage } from '../../components/admin/module/ModulePage';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { MembershipCover } from '../../components/admin/memberships/MembershipCover';
import { membershipFields } from '../../components/admin/memberships/membershipFields';
import { useCollection, useCollectionRows } from '../../contexts/ConsoleContext';
import { artworkColors, membershipSeed, membershipStatuses, type MembershipRow } from '../../data/admin/memberships';
import { promotionSeed, type PromotionRow } from '../../data/admin/promotions';
import { formatNumber, formatRWF, formatRWFCompact } from '../../utils/format';
import { newId } from '../../utils/id';
import { matchesFilter, type ColumnDef } from '../../types/console';

export function Memberships() {
  const { rows, save, remove } = useCollection<MembershipRow>('memberships', membershipSeed);
  const promotions = useCollectionRows<PromotionRow>('promotions', promotionSeed);
  const sorted = [...rows].sort((a, b) => a.rank - b.rank);
  const active = rows.filter((t) => t.status === 'Active');
  const members = rows.reduce((s, t) => s + t.members, 0);
  const upgrades = rows.reduce((s, t) => s + t.upgradesThisMonth, 0);
  const paidIncome = rows.reduce((s, t) => s + t.upgradesThisMonth * (t.buyWithAmount ? t.purchaseAmount : 0) * 0.3, 0);
  const promoCount = (name: string) => promotions.filter((p) => p.status === 'Active' && matchesFilter(p.memberships, name)).length;

  const columns: ColumnDef<MembershipRow>[] = [
  { id: 'rank', header: 'Rank', cell: (t) => <span className="num font-bold text-muted">{t.rank}</span>, sortValue: (t) => t.rank },
  {
    id: 'name',
    header: 'Membership',
    cell: (t) =>
    <span className="flex items-center gap-3">
          <MembershipCover cover={t.cover} name={t.name} size="sm" />
          <span className="font-bold text-ink">{t.name}</span>
        </span>,

    sortValue: (t) => t.name
  },
  { id: 'pts', header: 'Purchase points', align: 'right', cell: (t) => t.buyWithPoints ? `${formatNumber(t.purchasePoints)} pts` : '—', sortValue: (t) => t.buyWithPoints ? t.purchasePoints : 0 },
  { id: 'rwf', header: 'Purchase amount', align: 'right', cell: (t) => t.buyWithAmount ? formatRWF(t.purchaseAmount) : '—', sortValue: (t) => t.buyWithAmount ? t.purchaseAmount : 0 },
  {
    id: 'billing',
    header: 'Billing',
    cell: (t) =>
    <span className="text-ink-soft">
          {t.billingPeriod}
          {t.autoDeduct && t.billingPeriod !== 'One Time' && <span className="text-muted"> · auto</span>}
        </span>,

    sortValue: (t) => t.billingPeriod,
    hideBelow: 'md'
  },
  { id: 'promos', header: 'Promotions', align: 'right', cell: (t) => promoCount(t.name), sortValue: (t) => promoCount(t.name), hideBelow: 'lg' },
  { id: 'members', header: 'Members', align: 'right', cell: (t) => formatNumber(t.members), sortValue: (t) => t.members },
  { id: 'status', header: 'Status', cell: (t) => <StatusBadge label={t.status} /> }];


  return (
    <ModulePage
      title="Memberships"
      subtitle="Simba+ memberships, how members get them and what they cost. Each membership's discounts, rewards and offers live in Promotions."
      metrics={[
      { label: 'Active memberships', value: `${active.length}`, hint: `${rows.length - active.length} disabled, hidden or archived` },
      { label: 'Members', value: formatNumber(members) },
      { label: 'Upgrades this month', value: formatNumber(upgrades), hint: '+12% vs August', tone: 'up' },
      { label: 'Membership income', value: formatRWFCompact(Math.round(paidIncome)), hint: 'This month, est.' }]
      }
      tableTitle="Memberships"
      entity="membership"
      rows={sorted}
      columns={columns}
      searchKeys={['name']}
      filter={{ key: 'status', label: 'Statuses', options: membershipStatuses }}
      fields={membershipFields}
      newRecord={() => ({
        id: newId('tier'),
        name: '',
        rank: Math.max(0, ...rows.map((t) => t.rank)) + 1,
        cover: 'Platinum',
        color: artworkColors.Platinum,
        status: 'Disabled',
        buyWithPoints: true,
        purchasePoints: 0,
        buyWithAmount: true,
        purchaseAmount: 0,
        billingPeriod: 'Annually',
        autoDeduct: true,
        members: 0,
        upgradesThisMonth: 0
      })}
      onSave={save}
      onDelete={remove}
      recordLabel={(t) => `${t.name || 'New'} membership`} />);


}