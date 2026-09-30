import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModulePage } from '../../components/admin/module/ModulePage';
import { StatusBadge } from '../../components/admin/StatusBadge';
import { TierPill } from '../../components/admin/TierPill';
import { useCollection, useCollectionRows } from '../../contexts/ConsoleContext';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { useTierOptions } from '../../hooks/useTierOptions';
import {
  addressDistricts,
  countries,
  customers,
  customerStatuses as statuses,
  genders,
  JOSEPH_ID,
  languages,
  provinces,
  type CustomerRow } from
'../../data/admin/customers';
import { overviewKpis } from '../../data/admin/overview';
import { stores, type StoreRow } from '../../data/admin/stores';
import { formatNumber, formatRWF, formatRWFCompact } from '../../utils/format';
import { newId } from '../../utils/id';
import type { ColumnDef, FieldDef } from '../../types/console';

/** Console customers can hold any membership created in the console. */
type ConsoleCustomer = Omit<CustomerRow, 'tier'> & {tier: string;};

export function Customers() {
  const navigate = useNavigate();
  const loyalty = useLoyalty();
  const { rows, save, remove } = useCollection<ConsoleCustomer>('customers', customers);
  const { names, colorOf } = useTierOptions();
  const storeNames = useCollectionRows<StoreRow>('stores', stores).map((s) => s.name.replace(/^Simba /, ''));

  // Joseph's row mirrors the customer app live.
  const live = rows.map((c) =>
  c.id === JOSEPH_ID ? { ...c, points: loyalty.balance, cardBalance: loyalty.cardBalance, tier: loyalty.cardLevel, memberships: loyalty.cardLevel } : c
  );
  const added = rows.filter((r) => !customers.some((c) => c.id === r.id)).length;

  const columns: ColumnDef<ConsoleCustomer>[] = [
  {
    id: 'name',
    header: 'Customer',
    cell: (c) =>
    <div>
          <p className="font-bold text-ink">{c.name}</p>
          <p className="num text-xs text-muted">{c.phone}</p>
        </div>,

    sortValue: (c) => c.name
  },
  {
    id: 'tier',
    header: 'Membership',
    cell: (c) => <TierPill tier={c.tier} color={colorOf(c.tier)} />,
    sortValue: (c) => c.tier
  },
  { id: 'card', header: 'Card balance', align: 'right', cell: (c) => formatRWF(c.cardBalance), sortValue: (c) => c.cardBalance },
  { id: 'points', header: 'Points', align: 'right', cell: (c) => formatNumber(c.points), sortValue: (c) => c.points },
  { id: 'spend', header: 'Lifetime spend', align: 'right', cell: (c) => formatRWFCompact(c.spend), sortValue: (c) => c.spend, hideBelow: 'xl' },
  { id: 'last', header: 'Last visit', cell: (c) => <span className="text-ink-soft">{c.lastVisit}</span>, hideBelow: 'md' },
  { id: 'store', header: 'Favourite store', cell: (c) => <span className="text-ink-soft">{c.store}</span>, hideBelow: 'lg' },
  { id: 'status', header: 'Status', cell: (c) => <StatusBadge label={c.status} /> }];


  const fields: FieldDef<ConsoleCustomer>[] = [
  { key: 'name', label: 'Full name', type: 'text', required: true },
  { key: 'phone', label: 'Phone', type: 'text', required: true, half: true, placeholder: '+250 7XX XXX XXX' },
  { key: 'email', label: 'Email', type: 'text', half: true },
  { key: 'dob', label: 'Date of birth', type: 'date', half: true },
  { key: 'gender', label: 'Gender', type: 'select', options: genders, half: true },
  { key: 'country', label: 'Country', type: 'select', options: countries, half: true, section: 'Address' },
  { key: 'province', label: 'Province / City', type: 'select', options: provinces, half: true },
  { key: 'district', label: 'District', type: 'select', options: addressDistricts, half: true },
  { key: 'sector', label: 'Sector', type: 'text', half: true },
  { key: 'cell', label: 'Cell', type: 'text', half: true },
  { key: 'street', label: 'Street number', type: 'text', half: true, placeholder: 'e.g. KG 9 Ave, No. 14' },
  { key: 'store', label: 'Favourite store', type: 'select', options: storeNames, half: true, section: 'Preferences' },
  { key: 'language', label: 'Favourite language', type: 'select', options: languages, half: true },
  { key: 'tier', label: 'Membership', type: 'select', options: names, required: true, half: true, help: 'One membership per customer' },
  { key: 'status', label: 'Status', type: 'select', options: statuses, half: true },
  { key: 'points', label: 'Points', type: 'number', readOnly: true }];


  return (
    <ModulePage
      title="Customers"
      subtitle="Every member, their memberships, balances and status. Open a row for the full profile."
      metrics={[
      { label: 'Total members', value: formatNumber(overviewKpis.totalMembers + added), hint: `+${formatNumber(overviewKpis.newMembers + added)} this month`, tone: 'up' },
      { label: 'Active, 30 days', value: formatNumber(overviewKpis.activeMembers), hint: `${Math.round(overviewKpis.activeMembers / overviewKpis.totalMembers * 100)}% of members` },
      { label: 'Dormant', value: `${live.filter((c) => c.status === 'Dormant').length}`, hint: 'No visit in 30+ days', tone: 'down' },
      { label: 'Average basket', value: formatRWF(overviewKpis.avgBasket) }]
      }
      tableTitle="Members"
      entity="customer"
      rows={live}
      columns={columns}
      searchKeys={['name', 'phone', 'email']}
      filter={{ key: 'tier', label: 'Memberships', options: names }}
      filters={[{ key: 'status', label: 'Statuses', options: statuses }]}
      fields={fields}
      newRecord={() => ({
        id: newId('cus'),
        name: '',
        phone: '+250 7',
        email: '',
        dob: '',
        gender: genders[0],
        country: 'Rwanda',
        province: 'Kigali City',
        district: 'Gasabo',
        sector: '',
        cell: '',
        street: '',
        store: storeNames[0] ?? '',
        language: languages[0],
        tier: names[0] ?? '',
        memberships: names[0] ?? '',
        cardBalance: 0,
        points: 0,
        spend: 0,
        visits: 0,
        lastVisit: '—',
        status: 'Active',
        customerSince: '09/2026'
      })}
      onSave={(c) => save({ ...c, memberships: c.tier })}
      onDelete={remove}
      onRowClick={(c) => navigate(`/admin/customers/${c.id}`)}
      recordLabel={(c) => c.name || 'Customer'} />);


}