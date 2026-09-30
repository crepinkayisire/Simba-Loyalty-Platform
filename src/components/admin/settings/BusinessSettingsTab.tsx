import React, { useState } from 'react';
import { CircleCheckIcon, ImagePlusIcon } from 'lucide-react';
import { Panel } from '../Panel';
import { SIMBA_LOGO_URL } from '../../brand/SimbaLogo';
import { buttonPrimary, buttonSecondary, inputClass, labelClass } from '../../../utils/styles';

type BusinessProfile = {
  legalName: string;
  tradingName: string;
  tin: string;
  registration: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logo: string;
};

type ProgrammeInfo = {
  programmeName: string;
  currency: string;
  earnRate: string;
  pointValue: string;
  budgetCeiling: string;
  pointExpiry: string;
  supportPhone: string;
  supportEmail: string;
  terms: string;
};

const profileSeed: BusinessProfile = {
  legalName: 'Simba Supermarket Ltd',
  tradingName: 'Simba Supermarket',
  tin: '100 456 789',
  registration: 'RDB 102938475',
  phone: '+250 788 300 100',
  email: 'info@simba.rw',
  website: 'simba.rw',
  address: 'KN 4 Ave, Kigali Heights, Kigali, Rwanda',
  logo: SIMBA_LOGO_URL
};

const infoSeed: ProgrammeInfo = {
  programmeName: 'Simba+',
  currency: 'RWF',
  earnRate: '10',
  pointValue: '1',
  budgetCeiling: '1.5',
  pointExpiry: '12',
  supportPhone: '+250 788 300 200',
  supportEmail: 'simbaplus@simba.rw',
  terms: 'simba.rw/simbaplus/terms'
};

/** A panel of text inputs with Save / Discard, used for both business sections. */
function EditableSection<T extends Record<string, string>>({
  title,
  subtitle,
  seed,
  fields,
  children






}: {title: string;subtitle: string;seed: T;fields: {key: keyof T & string;label: string;prefix?: string;suffix?: string;full?: boolean;inputMode?: 'numeric' | 'decimal' | 'email' | 'tel';}[];children?: (draft: T, set: (key: keyof T, value: string) => void) => React.ReactNode;}) {
  const [saved, setSaved] = useState<T>(seed);
  const [draft, setDraft] = useState<T>(seed);
  const [notice, setNotice] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const set = (key: keyof T, value: string) => {
    setNotice(false);
    setDraft((d) => ({ ...d, [key]: value }));
  };

  return (
    <Panel title={title} subtitle={subtitle}>
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(draft);
          setNotice(true);
        }}>
        
        {children?.(draft, set)}
        {fields.map((f) =>
        <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
            <label htmlFor={`${title}-${f.key}`} className={labelClass}>
              {f.label}
            </label>
            <span className="relative flex items-center">
              {f.prefix && <span className="pointer-events-none absolute left-3.5 text-sm font-bold text-muted">{f.prefix}</span>}
              <input
              id={`${title}-${f.key}`}
              inputMode={f.inputMode}
              value={draft[f.key]}
              onChange={(e) => set(f.key, e.target.value)}
              className={`${inputClass} ${f.prefix ? 'pl-12' : ''} ${f.suffix ? 'pr-28' : ''}`} />
            
              {f.suffix && <span className="pointer-events-none absolute right-3.5 text-xs font-bold text-muted">{f.suffix}</span>}
            </span>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 md:col-span-2">
          {notice && !dirty &&
          <span role="status" className="mr-auto flex items-center gap-1.5 text-sm font-bold text-leaf">
              <CircleCheckIcon className="h-4 w-4" aria-hidden="true" />
              Saved
            </span>
          }
          <button type="button" disabled={!dirty} onClick={() => setDraft(saved)} className={`${buttonSecondary} disabled:opacity-50`}>
            Discard
          </button>
          <button type="submit" disabled={!dirty} className={buttonPrimary}>
            Save changes
          </button>
        </div>
      </form>
    </Panel>);

}

/** Business profile and the Simba+ programme's business information. */
export function BusinessSettingsTab() {
  return (
    <div className="space-y-5">
      <EditableSection
        title="Business profile"
        subtitle="The company behind Simba+, shown on receipts, invoices and partner statements"
        seed={profileSeed}
        fields={[
        { key: 'legalName', label: 'Legal name' },
        { key: 'tradingName', label: 'Trading name' },
        { key: 'tin', label: 'TIN', inputMode: 'numeric' },
        { key: 'registration', label: 'RDB registration number' },
        { key: 'phone', label: 'Phone', inputMode: 'tel' },
        { key: 'email', label: 'Email', inputMode: 'email' },
        { key: 'website', label: 'Website' },
        { key: 'address', label: 'Head office address' }]
        }>
        
        {(draft, set) =>
        <div className="flex items-center gap-4 md:col-span-2">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-white p-1.5">
              <img src={draft.logo} alt="Business logo" className="h-full w-full object-contain" />
            </span>
            <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-simba hover:text-simba-dark">
              <ImagePlusIcon className="h-4 w-4" aria-hidden="true" />
              Replace logo
              <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) set('logo', URL.createObjectURL(file));
              }} />
            
            </label>
          </div>
        }
      </EditableSection>

      <EditableSection
        title="Simba+ business information"
        subtitle="Simba controls the economics: earning rate, point value and maximum reward cost"
        seed={infoSeed}
        fields={[
        { key: 'programmeName', label: 'Programme name' },
        { key: 'currency', label: 'Currency' },
        { key: 'earnRate', label: 'Earning rate', suffix: 'pts per RWF 1,000', inputMode: 'decimal' },
        { key: 'pointValue', label: 'Point value', prefix: 'RWF', suffix: 'per point', inputMode: 'decimal' },
        { key: 'budgetCeiling', label: 'Loyalty budget ceiling', suffix: '% of sales', inputMode: 'decimal' },
        { key: 'pointExpiry', label: 'Points expire after', suffix: 'months', inputMode: 'numeric' },
        { key: 'supportPhone', label: 'Member support phone', inputMode: 'tel' },
        { key: 'supportEmail', label: 'Member support email', inputMode: 'email' },
        { key: 'terms', label: 'Programme terms link', full: true }]
        } />
      
    </div>);

}