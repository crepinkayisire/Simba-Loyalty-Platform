import React from 'react';
import { ModulePage } from '../module/ModulePage';
import { StatusBadge } from '../StatusBadge';
import { useCollection } from '../../../contexts/ConsoleContext';
import { districts, stores, type StoreRow } from '../../../data/admin/stores';
import { formatRWFCompact } from '../../../utils/format';
import { newId } from '../../../utils/id';
import type { ColumnDef, FieldDef } from '../../../types/console';

const columns: ColumnDef<StoreRow>[] = [
{
  id: 'name',
  header: 'Store',
  cell: (s) =>
  <div>
        <p className="font-bold text-ink">{s.name}</p>
        <p className="text-xs text-muted">{s.district}</p>
      </div>,

  sortValue: (s) => s.name
},
{ id: 'tills', header: 'Tills', align: 'right', cell: (s) => s.tills, sortValue: (s) => s.tills, hideBelow: 'md' },
{ id: 'sales', header: 'Member sales', align: 'right', cell: (s) => s.memberSales ? formatRWFCompact(s.memberSales) : '—', sortValue: (s) => s.memberSales },
{ id: 'ident', header: 'Identified', align: 'right', cell: (s) => s.participating ? `${s.identRate}%` : '—', sortValue: (s) => s.identRate },
{ id: 'code', header: 'By checkout code', align: 'right', cell: (s) => s.participating ? `${s.codeShare}%` : '—', sortValue: (s) => s.codeShare, hideBelow: 'lg' },
{ id: 'failed', header: 'Failed codes, 24h', align: 'right', cell: (s) => <span className={s.failedCodes > 60 ? 'font-bold text-simba-dark' : ''}>{s.failedCodes}</span>, sortValue: (s) => s.failedCodes, hideBelow: 'lg' },
{ id: 'status', header: 'Loyalty', cell: (s) => <StatusBadge label={s.participating ? 'Active' : 'Not live'} /> }];


const fields: FieldDef<StoreRow>[] = [
{ key: 'name', label: 'Store name', type: 'text', required: true },
{ key: 'district', label: 'District', type: 'select', options: districts, half: true },
{ key: 'tills', label: 'Tills', type: 'number', half: true },
{ key: 'participating', label: 'Loyalty live in this store', type: 'toggle', help: 'Tills accept checkout codes and award points' },
{ key: 'memberSales', label: 'Member sales this month', type: 'number', prefix: 'RWF', readOnly: true },
{ key: 'identRate', label: 'Identified', type: 'number', suffix: '%', readOnly: true, half: true },
{ key: 'failedCodes', label: 'Failed codes, 24h', type: 'number', readOnly: true, half: true }];


/** Where Simba+ is live, and how well tills identify members. */
export function StoreLocationsTab() {
  const { rows, save, remove } = useCollection<StoreRow>('stores', stores);

  return (
    <ModulePage
      hideHeader
      title="Store locations"
      subtitle=""
      metrics={[]}
      tableTitle="Stores"
      entity="store"
      rows={rows}
      columns={columns}
      searchKeys={['name', 'district']}

      filter={{ key: 'district', label: 'Districts', options: districts }}
      fields={fields}
      newRecord={() => ({ id: newId('st'), name: 'Simba ', district: districts[0], tills: 4, memberSales: 0, identRate: 0, codeShare: 0, failedCodes: 0, participating: false })}
      onSave={save}
      onDelete={remove}
      recordLabel={(s) => s.name} />);


}