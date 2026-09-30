import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronRightIcon, CopyIcon, CheckIcon, LogOutIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { EditFieldSheet, type EditableField } from '../../components/mobile/EditFieldSheet';
import { Toggle } from '../../components/admin/Toggle';
import { TabTopBar } from '../../components/mobile/TabTopBar';
import { customer } from '../../data/customer';
import { initials } from '../../utils/format';

const stores = ['Simba Kigali Heights', 'Simba Kimironko', 'Simba Gishushu', 'Simba Kicukiro', 'Simba Nyarutarama'];
const languages = ['English', 'Kinyarwanda', 'Français'];

const channels = [
{ key: 'push', label: 'App' },
{ key: 'sms', label: 'SMS' },
{ key: 'whatsapp', label: 'WhatsApp' },
{ key: 'email', label: 'Email' }];


const legal = ['Help & support', 'Terms & Conditions', 'Privacy policy'];

export function Profile() {
  const { cardLevel } = useLoyalty();
  const [values, setValues] = useState<Record<string, string>>({
    name: customer.name,
    phone: customer.phone,
    email: customer.email,
    birthday: customer.birthday,
    store: customer.preferredStore,
    language: 'English'
  });
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    push: true,
    sms: true,
    email: false,
    whatsapp: true,
    promos: true,
    points: true,
    birthday: true,
    biometric: true
  });
  const [editing, setEditing] = useState<EditableField | null>(null);
  const [copied, setCopied] = useState(false);

  const personal: EditableField[] = [
  { key: 'name', label: 'Full name', value: values.name },
  { key: 'phone', label: 'Phone', value: values.phone, type: 'tel', hint: "We'll send a code to confirm your new number." },
  { key: 'email', label: 'Email', value: values.email, type: 'email' },
  { key: 'birthday', label: 'Birthday', value: values.birthday, hint: 'Used for your birthday bonus points.' }];


  const shopping: EditableField[] = [
  { key: 'store', label: 'Favourite store', value: values.store, options: stores },
  { key: 'language', label: 'Language', value: values.language, options: languages }];


  const copyId = () => {
    navigator.clipboard?.writeText(customer.customerId).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const setPref = (key: string, on: boolean) => setPrefs((p) => ({ ...p, [key]: on }));

  return (
    <div className="pb-10">
      <div className="px-5">
        <TabTopBar />
        <h1 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink">Profile</h1>
      </div>

      <section className="mt-4 flex items-center gap-4 px-5" aria-label="Member">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-xl font-extrabold text-white">
          {initials(values.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-extrabold text-ink">{values.name}</p>
          <p className="mt-0.5 text-sm text-muted">
            Simba+ <span className="font-bold text-ink">{cardLevel}</span> · Customer since {customer.customerSince}
          </p>
        </div>
      </section>


      <Section title="Personal details">
        {personal.map((f) =>
        <EditRow key={f.key} field={f} onEdit={() => setEditing(f)} />
        )}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5">
          <span className="text-sm text-muted">Customer ID</span>
          <span className="flex items-center gap-2 text-sm font-bold text-ink">
            <span className="num">{customer.customerId}</span>
            <button type="button" onClick={copyId} className="text-muted hover:text-ink" aria-label="Copy customer ID">
              {copied ? <CheckIcon className="h-4 w-4 text-leaf" aria-hidden="true" /> : <CopyIcon className="h-4 w-4" aria-hidden="true" />}
            </button>
          </span>
        </div>
      </Section>

      <Section title="Notifications">
        <div className="px-4 py-3.5">
          <p className="text-sm text-muted">Reach me by</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {channels.map((c) => {
              const on = prefs[c.key];
              return (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPref(c.key, !on)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors duration-150 ${
                  on ? 'border-ink bg-ink text-white' : 'border-line text-ink-soft hover:border-ink/40'}`
                  }>
                  
                  {on && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                  {c.label}
                </button>);

            })}
          </div>
        </div>
        <ToggleRow label="Promos & partner offers" checked={prefs.promos} onChange={(on) => setPref('promos', on)} />
        <p className="px-4 py-3 text-xs text-muted">Points, receipts and account alerts are always sent.</p>
      </Section>

      <Section title="Shopping">
        {shopping.map((f) =>
        <EditRow key={f.key} field={f} onEdit={() => setEditing(f)} />
        )}
      </Section>

      <Section title="Security">
        <LinkRow label="Change PIN" />
        <ToggleRow label="Face ID / fingerprint login" checked={prefs.biometric} onChange={(on) => setPref('biometric', on)} />
      </Section>

      <Section title="About">
        {legal.map((l) =>
        <LinkRow key={l} label={l} />
        )}
      </Section>

      <button
        type="button"
        className="mx-5 mt-6 flex w-[calc(100%-40px)] items-center justify-center gap-2 rounded-2xl border border-line py-3.5 text-sm font-bold text-simba transition-colors duration-150 hover:bg-simba-soft">
        
        <LogOutIcon className="h-4 w-4" aria-hidden="true" />
        Log Out
      </button>
      <p className="mt-4 text-center text-xs text-muted">Simba+ · version 1.0</p>

      <AnimatePresence>
        {editing &&
        <EditFieldSheet
          key={editing.key}
          field={editing}
          onSave={(v) => setValues((prev) => ({ ...prev, [editing.key]: v }))}
          onClose={() => setEditing(null)} />

        }
      </AnimatePresence>
    </div>);

}

function Section({ title, note, children }: {title: string;note?: string;children: React.ReactNode;}) {
  return (
    <section className="mx-5 mt-7" aria-label={title}>
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-sm font-extrabold text-ink">{title}</h2>
        {note && <span className="text-xs text-muted">{note}</span>}
      </div>
      <div className="mt-2 divide-y divide-line rounded-2xl bg-white shadow-card">{children}</div>
    </section>);

}

function EditRow({ field, onEdit }: {field: EditableField;onEdit: () => void;}) {
  return (
    <button
      type="button"
      onClick={onEdit}
      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl hover:bg-canvas"
      aria-label={`Edit ${field.label}, currently ${field.value}`}>
      
      <span className="shrink-0 text-sm text-muted">{field.label}</span>
      <span className="flex min-w-0 items-center gap-1.5">
        <span className="num truncate text-sm font-bold text-ink">{field.value}</span>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
      </span>
    </button>);

}

function ToggleRow({ label, checked, onChange }: {label: string;checked: boolean;onChange: (on: boolean) => void;}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <span className="text-[15px] font-semibold text-ink">{label}</span>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>);

}

function LinkRow({ label }: {label: string;}) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-semibold text-ink transition-colors duration-150 first:rounded-t-2xl last:rounded-b-2xl hover:bg-canvas">
      
      {label}
      <ChevronRightIcon className="h-4 w-4 text-muted" aria-hidden="true" />
    </button>);

}