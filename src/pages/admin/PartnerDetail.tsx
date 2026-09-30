import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, PencilIcon, GlobeIcon, MailIcon, PhoneIcon, FileTextIcon, DownloadIcon, PlusIcon } from 'lucide-react';
import { Panel } from '../../components/admin/Panel';
import { MetricRow } from '../../components/admin/module/MetricRow';
import { RecordDrawer } from '../../components/admin/module/RecordDrawer';
import { PartnerLogo } from '../../components/mobile/PartnerLogo';
import { RedemptionTable } from '../../components/admin/partners/RedemptionTable';
import { partnerFields, toLogo } from '../../components/admin/partners/partnerFields';
import { useCollection } from '../../contexts/ConsoleContext';
import { usePartnerStats } from '../../hooks/usePartnerStats';
import { partnerSeed, type PartnerRow } from '../../data/admin/partners';
import { formatNumber, formatRWF } from '../../utils/format';
import { buttonSecondary } from '../../utils/styles';

export function PartnerDetail() {
  const { partnerId } = useParams();
  const { rows, save } = useCollection<PartnerRow>('partners', partnerSeed);
  const stats = usePartnerStats();
  const [editing, setEditing] = useState(false);
  const partner = rows.find((p) => p.id === partnerId);
  if (!partner) return <Navigate to="/admin/partners" replace />;

  const s = stats(partner);
  const partnerName = (id: string) => rows.find((p) => p.id === id)?.name ?? id;

  return (
    <>
      <Link to="/admin/partners" className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        Partners
      </Link>

      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-4">
          <PartnerLogo partner={toLogo(partner)} />
          <div>
            <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink">{partner.name}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span>{partner.category}</span>
              {partner.website &&
              <a href={`https://${partner.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-ink">
                  <GlobeIcon className="h-3.5 w-3.5" aria-hidden="true" /> {partner.website}
                </a>
              }
              {partner.email &&
              <a href={`mailto:${partner.email}`} className="inline-flex items-center gap-1 hover:text-ink">
                  <MailIcon className="h-3.5 w-3.5" aria-hidden="true" /> {partner.email}
                </a>
              }
              {partner.phone &&
              <span className="num inline-flex items-center gap-1">
                  <PhoneIcon className="h-3.5 w-3.5" aria-hidden="true" /> {partner.phone}
                </span>
              }
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/promotions" className={buttonSecondary}>
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            New offer
          </Link>
          <button type="button" onClick={() => setEditing(true)} className={buttonSecondary}>
            <PencilIcon className="h-4 w-4" aria-hidden="true" />
            Edit partner
          </button>
        </div>
      </header>

      <MetricRow
        metrics={[
        {
          label: 'Active promotions',
          value: `${s.activeOffers.length}`,
          hint: 'View in Promotions',
          to: partner.id === 'simba' ? '/admin/promotions' : `/admin/promotions?partner=${encodeURIComponent(partner.name)}`
        },
        { label: 'Points redeemed', value: formatNumber(s.points), hint: `${s.redemptions.length} redemptions` },
        { label: 'Partner payable', value: formatRWF(s.payable), hint: 'Pending and invoiced', tone: s.payable ? 'down' : 'neutral' }]
        } />
      

      <div className="mt-6 grid gap-5 xl:grid-cols-[360px_1fr]">
        <div className="space-y-5">
          <Panel title="Contact person">
            {partner.contactName ?
            <dl className="divide-y divide-line text-sm">
                {[
              ['Name', partner.contactName],
              ['Job title', partner.contactTitle],
              ['Email', partner.contactEmail],
              ['Phone', partner.contactPhone]].
              map(([k, v]) =>
              <div key={k} className="flex justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="num min-w-0 break-words text-right font-bold text-ink">{v || '—'}</dd>
                  </div>
              )}
              </dl> :

            <p className="text-sm text-muted">No contact person yet.</p>
            }
          </Panel>

          <Panel title="Documents" action={<button type="button" onClick={() => setEditing(true)} className="text-sm font-bold text-simba hover:text-simba-dark">Upload</button>}>
            {partner.documents.length ?
            <ul className="divide-y divide-line">
                {partner.documents.map((d, i) =>
              <li key={`${d.name}-${i}`} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                    <FileTextIcon className="h-4 w-4 shrink-0 text-simba" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-ink">{d.name}</span>
                      <span className="num text-xs text-muted">{d.size} · {d.uploaded}</span>
                    </span>
                    <button type="button" aria-label={`Download ${d.name}`} className="rounded-lg p-1.5 text-muted transition-colors duration-150 hover:bg-sand hover:text-ink">
                      <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
              )}
              </ul> :

            <p className="text-sm text-muted">No documents uploaded.</p>
            }
          </Panel>
        </div>

        <div className="min-w-0 space-y-5">
          <RedemptionTable
            title="Redemption activity"
            subtitle="Points members redeemed here and what Simba owes for them"
            rows={s.redemptions}
            counterpart="customer"
            partnerName={partnerName} />
          
        </div>
      </div>

      <AnimatePresence>
        {editing &&
        <RecordDrawer
          entity="partner"
          record={partner}
          isNew={false}
          fields={partnerFields}
          onClose={() => setEditing(false)}
          onSave={(p) => {
            save(p);
            setEditing(false);
          }} />

        }
      </AnimatePresence>
    </>);

}