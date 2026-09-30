import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ModulePage } from '../../components/admin/module/ModulePage';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { useCollection, useCollectionRows } from '../../contexts/ConsoleContext';
import { useTierOptions } from '../../hooks/useTierOptions';
import { partnerSeed, type PartnerRow } from '../../data/admin/partners';
import {
  ALL_MEMBERSHIPS,
  conversionTypes,
  promotionSeed,
  promotionStatuses,
  promotionTypes,
  promotionValue,
  recurrences,
  reduceByOptions,
  type PromotionRow } from
'../../data/admin/promotions';
import { formatNumber } from '../../utils/format';
import { newId } from '../../utils/id';
import type { ColumnDef, FieldDef } from '../../types/console';

const typeTone: Record<PromotionRow['type'], string> = {
  Discount: 'bg-simba-soft text-simba',
  Reward: 'bg-gold-soft text-gold',
  Offer: 'bg-platinum-soft text-platinum'
};

const shortDate = (d: string) => {
  if (!d) return '—';
  const [y, m, day] = d.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export function Promotions() {
  const { rows, save, remove } = useCollection<PromotionRow>('promotions', promotionSeed);
  const { names } = useTierOptions();
  const partnerNames = useCollectionRows<PartnerRow>('partners', partnerSeed).
  filter((p) => p.id !== 'simba').
  map((p) => p.name);
  const [params] = useSearchParams();
  const partnerParam = params.get('partner') ?? '';

  const active = rows.filter((p) => p.status === 'Active');
  const count = (t: PromotionRow['type']) => active.filter((p) => p.type === t).length;
  const used = active.reduce((s, p) => s + p.redemptions30d, 0);

  const is = (t: PromotionRow['type']) => (d: PromotionRow) => d.type === t;
  const reduces = (d: PromotionRow) => d.type === 'Discount' || d.type === 'Offer';

  const columns: ColumnDef<PromotionRow>[] = [
  {
    id: 'name',
    header: 'Promotion',
    cell: (p) =>
    <div className="max-w-[300px]">
          <p className="truncate font-bold text-ink">{p.name}</p>
          <p className="truncate text-xs text-muted">{p.type === 'Offer' ? p.partner : p.description}</p>
        </div>,

    sortValue: (p) => p.name
  },
  { id: 'type', header: 'Type', cell: (p) => <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${typeTone[p.type]}`}>{p.type}</span>, sortValue: (p) => p.type },
  { id: 'value', header: 'Gives', cell: (p) => <span className="num text-ink-soft">{promotionValue(p)}</span>, hideBelow: 'md' },
  { id: 'memberships', header: 'Memberships', cell: (p) => <span className="text-ink-soft">{p.memberships}</span>, sortValue: (p) => p.memberships, hideBelow: 'lg' },
  {
    id: 'dates',
    header: 'Runs',
    cell: (p) =>
    <span className="num text-ink-soft">
          {shortDate(p.startDate)} – {shortDate(p.endDate)}
          {p.recurring !== 'Does not repeat' && <span className="text-muted"> · {p.recurring}</span>}
        </span>,

    sortValue: (p) => p.startDate,
    hideBelow: 'xl'
  },
  { id: 'used', header: 'Used, 30d', align: 'right', cell: (p) => formatNumber(p.redemptions30d), sortValue: (p) => p.redemptions30d, hideBelow: 'lg' },
  { id: 'status', header: 'Status', cell: (p) => <StatusBadge label={p.status} /> }];


  const fields: FieldDef<PromotionRow>[] = [
  { key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. 50 points per visit' },
  { key: 'description', label: 'Description', type: 'textarea', help: 'Shown to members in the app under their membership' },
  { key: 'type', label: 'Type', type: 'select', options: promotionTypes, half: true, help: 'Discount at Simba, points reward, or partner offer' },
  { key: 'status', label: 'Status', type: 'select', options: promotionStatuses, half: true },
  { key: 'memberships', label: 'Membership(s)', type: 'multiselect', options: names, allLabel: ALL_MEMBERSHIPS, required: true },
  { key: 'startDate', label: 'Start date', type: 'date', half: true, required: true, section: 'Schedule' },
  { key: 'endDate', label: 'End date', type: 'date', half: true },
  { key: 'recurring', label: 'Recurring', type: 'select', options: recurrences },

  // Discount + Offer
  { key: 'partner', label: 'Partner', type: 'select', options: partnerNames, required: true, showWhen: is('Offer'), section: 'Offer' },
  { key: 'reduceBy', label: 'Reduce by', type: 'select', options: reduceByOptions, half: true, showWhen: is('Discount'), section: 'Discount' },
  { key: 'reduceBy', label: 'Reduce by', type: 'select', options: reduceByOptions, half: true, showWhen: is('Offer') },
  {
    key: 'reduceValue',
    label: 'Reduce amount / percentage',
    type: 'number',
    half: true,
    showWhen: reduces,
    help: 'RWF or %, depending on "Reduce by"'
  },
  { key: 'minBasket', label: 'Min basket size', type: 'number', prefix: 'RWF', half: true, help: '0 = no minimum', showWhen: is('Discount') },
  { key: 'maxBasket', label: 'Max basket size', type: 'number', prefix: 'RWF', half: true, help: '0 = no maximum', showWhen: is('Discount') },
  { key: 'minVisits', label: 'Min store visits', type: 'number', suffix: 'per month', half: true, help: '0 = any', showWhen: is('Discount') },
  { key: 'maxVisits', label: 'Max store visits', type: 'number', suffix: 'per month', half: true, help: '0 = no limit', showWhen: is('Discount') },

  // Reward
  { key: 'pointsPerVisit', label: 'Points per store visit', type: 'number', suffix: 'pts', help: 'e.g. 50 points per visit. 0 = off', showWhen: is('Reward'), section: 'Reward' },
  { key: 'pointsPerBasket', label: 'Points per basket size', type: 'number', suffix: 'pts', half: true, help: 'e.g. 10 points…', showWhen: is('Reward') },
  { key: 'basketStep', label: 'For every', type: 'number', prefix: 'RWF', half: true, help: '…per RWF 1,000 spent', showWhen: is('Reward') },

  // Offer point conversion
  { key: 'conversionType', label: 'Point conversion', type: 'select', options: conversionTypes, half: true, showWhen: is('Offer'), help: '1 point = RWF 100, or 1 point = 0.1%' },
  { key: 'conversionValue', label: 'Value of 1 point', type: 'number', half: true, showWhen: is('Offer'), help: 'RWF or %. 0 = points not accepted' }];


  return (
    <ModulePage
      key={partnerParam}
      initialFilters={partnerParam ? { partner: partnerParam } : undefined}
      title="Promotions"
      subtitle="Discounts, rewards and partner offers for each membership. Active promotions show in the customer app under Memberships."
      metrics={[
      { label: 'Active promotions', value: `${active.length}`, hint: `${rows.length - active.length} disabled or archived` },
      { label: 'Discounts', value: `${count('Discount')}`, hint: 'Money off at Simba' },
      { label: 'Rewards', value: `${count('Reward')}`, hint: 'Points for visits and spend' },
      { label: 'Partner offers', value: `${count('Offer')}`, hint: `${formatNumber(used)} uses in 30 days` }]
      }
      tableTitle="Promotions"
      entity="promotion"
      rows={rows}
      columns={columns}
      searchKeys={['name', 'description', 'partner', 'memberships']}
      filter={{ key: 'type', label: 'Types', options: promotionTypes }}
      filters={[
      { key: 'memberships', label: 'Memberships', options: names },
      { key: 'partner', label: 'Partners', options: partnerNames },
      { key: 'status', label: 'Statuses', options: promotionStatuses }]
      }
      fields={fields}
      newRecord={() => ({
        id: newId('pr'),
        name: '',
        description: '',
        status: 'Active',
        startDate: '2026-10-01',
        endDate: '2026-12-31',
        recurring: 'Does not repeat',
        memberships: ALL_MEMBERSHIPS,
        type: 'Discount',
        reduceBy: 'Percentage',
        reduceValue: 0,
        minBasket: 0,
        maxBasket: 0,
        minVisits: 0,
        maxVisits: 0,
        pointsPerVisit: 0,
        pointsPerBasket: 0,
        basketStep: 1_000,
        partner: '',
        conversionType: 'RWF per point',
        conversionValue: 1,
        redemptions30d: 0
      })}
      onSave={(p) => save(p.type === 'Offer' ? p : { ...p, partner: '' })}
      onDelete={remove}
      recordLabel={(p) => p.name || 'Promotion'} />);


}