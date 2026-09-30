import React, { useState } from 'react';
import { BanknoteIcon, CalendarClockIcon, CircleCheckIcon } from 'lucide-react';
import { Drawer } from '../Drawer';
import { StatusBadge } from '../StatusBadge';
import { Toggle } from '../Toggle';
import {
  monthDays,
  payoutAccounts,
  weekdays,
  type Payout,
  type PayoutFrequency,
  type PayoutSchedule } from
'../../../data/admin/disbursements';
import { formatRWF } from '../../../utils/format';
import { inputClass, labelClass } from '../../../utils/styles';

interface DisbursementDrawerProps {
  available: number;
  schedule: PayoutSchedule;
  payouts: Payout[];
  onCashOut: (amount: number, accountId: string) => void;
  onSaveSchedule: (s: PayoutSchedule) => void;
  onClose: () => void;
}

type Mode = 'manual' | 'auto';
const frequencies: PayoutFrequency[] = ['Daily', 'Weekly', 'Monthly'];

export function DisbursementDrawer({ available, schedule, payouts, onCashOut, onSaveSchedule, onClose }: DisbursementDrawerProps) {
  const [mode, setMode] = useState<Mode>('manual');
  const [amount, setAmount] = useState(String(available));
  const [accountId, setAccountId] = useState(schedule.accountId);
  const [draft, setDraft] = useState<PayoutSchedule>(schedule);
  const [done, setDone] = useState<string | null>(null);

  const value = Number(amount || 0);
  const amountOk = value > 0 && value <= available;
  const accountName = (id: string) => payoutAccounts.find((a) => a.id === id)?.label ?? id;
  const dayOptions = draft.frequency === 'Weekly' ? weekdays : draft.frequency === 'Monthly' ? monthDays : [];

  const segment = (m: Mode, label: string) =>
  <button
    type="button"
    role="tab"
    aria-selected={mode === m}
    onClick={() => {
      setMode(m);
      setDone(null);
    }}
    className={`h-9 flex-1 rounded-lg text-sm font-bold transition-colors duration-150 ${mode === m ? 'bg-white text-ink shadow-card' : 'text-muted hover:text-ink'}`}>
    
      {label}
    </button>;


  const footer =
  mode === 'manual' ?
  <button
    type="button"
    disabled={!amountOk}
    onClick={() => {
      onCashOut(value, accountId);
      setDone(`${formatRWF(value)} is on its way to ${accountName(accountId)}.`);
      setAmount('0');
    }}
    className="h-11 w-full rounded-xl bg-simba text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:opacity-50">
    
        Cash out {amountOk ? formatRWF(value) : ''}
      </button> :

  <button
    type="button"
    onClick={() => {
      onSaveSchedule(draft);
      setDone(draft.enabled ? `Automatic payouts saved: ${summary(draft, accountName(draft.accountId))}.` : 'Automatic payouts turned off.');
    }}
    className="h-11 w-full rounded-xl bg-simba text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark">
    
        Save schedule
      </button>;


  return (
    <Drawer title="Disbursements" subtitle="Cash out top-up money from shopping cards to Simba's accounts." onClose={onClose} footer={footer}>
      <section className="rounded-2xl bg-canvas p-4">
        <p className="text-xs font-bold text-muted">Available to disburse</p>
        <p className="num mt-1 text-[28px] font-extrabold leading-none tracking-tight text-ink">{formatRWF(available)}</p>
        <p className="mt-2 text-xs text-muted">
          {schedule.enabled ?
          <>
              <CalendarClockIcon className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />
              Auto payout {summary(schedule, accountName(schedule.accountId))}
            </> :

          'Automatic payouts are off'
          }
        </p>
      </section>

      <div role="tablist" aria-label="Payout mode" className="mt-5 flex gap-1 rounded-xl bg-sand p-1">
        {segment('manual', 'Cash out now')}
        {segment('auto', 'Automatic')}
      </div>

      {done &&
      <p role="status" className="mt-4 flex items-start gap-2 rounded-xl bg-leaf-soft px-3 py-2.5 text-sm font-bold text-leaf">
          <CircleCheckIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {done}
        </p>
      }

      {mode === 'manual' ?
      <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="payout-amount" className={labelClass}>
              Amount
            </label>
            <span className="relative flex items-center">
              <span className="pointer-events-none absolute left-3.5 text-sm font-bold text-muted">RWF</span>
              <input
              id="payout-amount"
              inputMode="numeric"
              value={value ? value.toLocaleString('en-US') : ''}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`${inputClass} num pl-14`} />
            
            </span>
            <div className="mt-2 flex gap-2">
              {[0.25, 0.5, 1].map((f) =>
            <button
              key={f}
              type="button"
              onClick={() => setAmount(String(Math.floor(available * f)))}
              className="h-8 rounded-full border border-line px-3 text-xs font-bold text-ink-soft transition-colors duration-150 hover:border-ink/40">
              
                  {f === 1 ? 'All' : `${f * 100}%`}
                </button>
            )}
            </div>
            {value > available && <p className="mt-1 text-xs font-semibold text-simba-dark">More than is available</p>}
          </div>
          <AccountPicker value={accountId} onChange={setAccountId} />
        </div> :

      <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl border border-line px-3 py-2.5">
            <span>
              <span className="block text-sm font-bold text-ink">Automatic payouts</span>
              <span className="block text-xs text-muted">Pay out everything above the reserve</span>
            </span>
            <Toggle checked={draft.enabled} onChange={(v) => setDraft((d) => ({ ...d, enabled: v }))} label="Automatic payouts" />
          </div>

          <fieldset disabled={!draft.enabled} className="space-y-4 disabled:opacity-50">
            <div>
              <p className={labelClass}>How often</p>
              <div className="grid grid-cols-3 gap-2">
                {frequencies.map((f) =>
              <button
                key={f}
                type="button"
                aria-pressed={draft.frequency === f}
                onClick={() => setDraft((d) => ({ ...d, frequency: f, day: f === 'Weekly' ? weekdays[0] : f === 'Monthly' ? monthDays[0] : '' }))}
                className={`h-10 rounded-xl border text-sm font-bold transition-colors duration-150 ${
                draft.frequency === f ? 'border-simba bg-simba-soft text-simba' : 'border-line text-ink-soft hover:border-ink/40'}`
                }>
                
                    {f}
                  </button>
              )}
              </div>
            </div>
            {dayOptions.length > 0 &&
          <div>
                <label htmlFor="payout-day" className={labelClass}>
                  {draft.frequency === 'Weekly' ? 'Day of the week' : 'Day of the month'}
                </label>
                <select id="payout-day" value={draft.day} onChange={(e) => setDraft((d) => ({ ...d, day: e.target.value }))} className={inputClass}>
                  {dayOptions.map((d) =>
              <option key={d}>{d}</option>
              )}
                </select>
              </div>
          }
            <div>
              <label htmlFor="payout-reserve" className={labelClass}>
                Keep in reserve
              </label>
              <span className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 text-sm font-bold text-muted">RWF</span>
                <input
                id="payout-reserve"
                inputMode="numeric"
                value={draft.reserve ? draft.reserve.toLocaleString('en-US') : ''}
                onChange={(e) => setDraft((d) => ({ ...d, reserve: Number(e.target.value.replace(/\D/g, '').slice(0, 10) || 0) }))}
                className={`${inputClass} num pl-14`} />
              
              </span>
              <p className="mt-1 text-xs text-muted">Covers refunds and card payments still in transit</p>
            </div>
            <AccountPicker value={draft.accountId} onChange={(id) => setDraft((d) => ({ ...d, accountId: id }))} />
          </fieldset>
        </div>
      }

      <section className="mt-7" aria-labelledby="payout-history">
        <h3 id="payout-history" className="text-sm font-extrabold text-ink">
          Recent disbursements
        </h3>
        <ul className="mt-2 divide-y divide-line">
          {payouts.map((p) =>
          <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-simba-soft text-simba">
                <BanknoteIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="num block font-bold text-ink">{formatRWF(p.amount)}</span>
                <span className="block truncate text-xs text-muted">
                  {p.date} · {accountName(p.accountId)} · {p.mode}
                </span>
              </span>
              <StatusBadge label={p.status} />
            </li>
          )}
        </ul>
      </section>
    </Drawer>);

}

function AccountPicker({ value, onChange }: {value: string;onChange: (id: string) => void;}) {
  return (
    <fieldset>
      <legend className={labelClass}>Pay into</legend>
      <div className="space-y-2">
        {payoutAccounts.map((a) =>
        <label
          key={a.id}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-150 ${
          value === a.id ? 'border-simba bg-simba-soft' : 'border-line hover:border-ink/40'}`
          }>
          
            <input type="radio" name="payout-account" checked={value === a.id} onChange={() => onChange(a.id)} className="accent-simba" />
            <span className="min-w-0">
              <span className="block text-sm font-bold text-ink">{a.label}</span>
              <span className="num block truncate text-xs text-muted">{a.detail}</span>
            </span>
          </label>
        )}
      </div>
    </fieldset>);

}

function summary(s: PayoutSchedule, account: string): string {
  const when = s.frequency === 'Daily' ? 'every day' : s.frequency === 'Weekly' ? `every ${s.day}` : `monthly on the ${s.day === 'Last day' ? 'last day' : s.day}`;
  return `${when} to ${account}`;
}