import React from 'react';
import { PartnerLogo } from '../../mobile/PartnerLogo';
import { DocumentsField } from './DocumentsField';
import { partners as appPartners, type Partner } from '../../../data/benefits';
import { partnerCategories, type PartnerRow } from '../../../data/admin/partners';
import { initials } from '../../../utils/format';
import type { FieldDef } from '../../../types/console';

/** Shape PartnerLogo expects, for partners created in the console too. */
export function toLogo(p: PartnerRow): Partner {
  const known = appPartners[p.id];
  return { id: p.id, name: p.name, short: known?.short ?? initials(p.name || '?'), color: known?.color ?? '#4F5866', category: p.category, logo: p.logo };
}

export const partnerFields: FieldDef<PartnerRow>[] = [
{ key: 'name', label: 'Name', type: 'text', required: true },
{ key: 'category', label: 'Category', type: 'select', options: partnerCategories, half: true },
{ key: 'website', label: 'Website', type: 'text', half: true, placeholder: 'example.rw' },
{ key: 'phone', label: 'Phone', type: 'text', half: true, placeholder: '+250 7XX XXX XXX' },
{ key: 'email', label: 'Email', type: 'text', half: true },
{
  key: 'logo',
  label: 'Logo',
  type: 'custom',
  render: ({ draft, set }) =>
  <div>
        <label htmlFor="partner-logo" className="mb-1.5 block text-xs font-bold text-muted">
          Logo
        </label>
        <div className="flex items-center gap-3">
          <PartnerLogo key={draft.logo} partner={toLogo(draft)} />
          <input
        id="partner-logo"
        value={draft.logo}
        onChange={(e) => set('logo', e.target.value)}
        placeholder="https://… logo image URL"
        className="h-11 min-w-0 flex-1 rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-muted focus:border-ink focus:outline-none" />
      
        </div>
      </div>

},
{ key: 'contactName', label: 'Name', type: 'text', half: true, section: 'Contact person' },
{ key: 'contactTitle', label: 'Job title', type: 'text', half: true },
{ key: 'contactEmail', label: 'Email', type: 'text', half: true },
{ key: 'contactPhone', label: 'Phone', type: 'text', half: true },
{
  key: 'documents',
  label: 'Documents',
  type: 'custom',
  section: 'Documents',
  render: ({ draft, set }) => <DocumentsField value={draft.documents} onChange={(d) => set('documents', d)} />
}];