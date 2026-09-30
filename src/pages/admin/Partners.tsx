import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ModulePage } from '../../components/admin/module/ModulePage';
import { PartnerLogo } from '../../components/mobile/PartnerLogo';
import { partnerFields, toLogo } from '../../components/admin/partners/partnerFields';
import { useCollection } from '../../contexts/ConsoleContext';
import { usePartnerStats } from '../../hooks/usePartnerStats';
import { partnerCategories, partnerSeed, type PartnerRow } from '../../data/admin/partners';
import { formatNumber, formatRWF, formatRWFCompact } from '../../utils/format';
import { newId } from '../../utils/id';
import type { ColumnDef } from '../../types/console';

export function Partners() {
  const navigate = useNavigate();
  const { rows, save, remove } = useCollection<PartnerRow>('partners', partnerSeed);
  const stats = usePartnerStats();
  const totals = rows.map(stats);
  const payable = totals.reduce((s, t) => s + t.payable, 0);
  const offers = totals.reduce((s, t) => s + t.activeOffers.length, 0);

  const columns: ColumnDef<PartnerRow>[] = [
  {
    id: 'name',
    header: 'Partner',
    cell: (p) =>
    <div className="flex items-center gap-3">
          <PartnerLogo partner={toLogo(p)} size="sm" />
          <div>
            <p className="font-bold text-ink">{p.name}</p>
            <p className="text-xs text-muted">{p.website || p.category}</p>
          </div>
        </div>,

    sortValue: (p) => p.name
  },
  { id: 'category', header: 'Category', cell: (p) => <span className="text-ink-soft">{p.category}</span>, sortValue: (p) => p.category, hideBelow: 'md' },
  {
    id: 'contact',
    header: 'Contact person',
    cell: (p) =>
    <div>
          <p className="font-semibold text-ink">{p.contactName || '—'}</p>
          <p className="text-xs text-muted">{p.contactTitle}</p>
        </div>,

    hideBelow: 'xl'
  },
  { id: 'offers', header: 'Active promotions', align: 'right', cell: (p) => stats(p).activeOffers.length, sortValue: (p) => stats(p).activeOffers.length },
  { id: 'points', header: 'Points redeemed', align: 'right', cell: (p) => formatNumber(stats(p).points), sortValue: (p) => stats(p).points, hideBelow: 'lg' },
  {
    id: 'payable',
    header: 'Partner payable',
    align: 'right',
    cell: (p) => <span className="font-extrabold">{formatRWF(stats(p).payable)}</span>,
    sortValue: (p) => stats(p).payable
  }];


  return (
    <ModulePage
      title="Partners"
      subtitle="Businesses that honour Simba+ memberships, their offers, and what Simba owes them for points redeemed. Open a partner for its full record."
      metrics={[
      { label: 'Number of partners', value: `${rows.length}` },
      { label: 'Active promotions', value: `${offers}`, hint: 'Across all memberships' },
      { label: 'Total partner payable', value: formatRWFCompact(payable), hint: 'Pending and invoiced', tone: payable ? 'down' : 'neutral' }]
      }
      tableTitle="Partners"
      entity="partner"
      rows={rows}
      columns={columns}
      searchKeys={['name', 'contactName', 'email', 'website']}
      filter={{ key: 'category', label: 'Categories', options: partnerCategories }}
      fields={partnerFields}
      newRecord={() => ({
        id: newId('partner'),
        name: '',
        category: 'Retail',
        phone: '+250 7',
        email: '',
        website: '',
        logo: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        contactTitle: '',
        documents: []
      })}
      onSave={save}
      onDelete={remove}
      onRowClick={(p) => navigate(`/admin/partners/${p.id}`)}
      recordLabel={(p) => p.name || 'Partner'} />);


}