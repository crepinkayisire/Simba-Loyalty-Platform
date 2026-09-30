import React, { useState } from 'react';
import { Drawer } from '../Drawer';
import { levelOrder } from '../../../data/benefits';
import { inputClass, labelClass, buttonPrimary, buttonSecondary } from '../../../utils/styles';
import type { CardLevel } from '../../../types/loyalty';

export type StaffAction = 'points' | 'refund' | 'tier' | 'freeze';

export interface StaffActionResult {
  action: StaffAction;
  pointsDelta?: number;
  refund?: number;
  tier?: CardLevel;
  frozen?: boolean;
  reason: string;
}

interface StaffActionDrawerProps {
  action: StaffAction;
  customerName: string;
  currentTier: CardLevel;
  frozen: boolean;
  onConfirm: (result: StaffActionResult) => void;
  onClose: () => void;
}

const titles: Record<StaffAction, string> = {
  points: 'Adjust points',
  refund: 'Refund to card',
  tier: 'Change tier',
  freeze: 'Freeze card'
};

const pointReasons = ['Missed points at checkout', 'Goodwill after complaint', 'Duplicate points removed', 'Other'];
const refundReasons = ['Returned item', 'Overcharged at till', 'Failed top-up', 'Other'];

export function StaffActionDrawer({ action, customerName, currentTier, frozen, onConfirm, onClose }: StaffActionDrawerProps) {
  const [direction, setDirection] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState('');
  const [tier, setTier] = useState<CardLevel>(currentTier);
  const [reason, setReason] = useState(action === 'refund' ? refundReasons[0] : action === 'points' ? pointReasons[0] : '');
  const [note, setNote] = useState('');

  const value = Number(amount.replace(/[^\d]/g, ''));
  const valid =
  action === 'points' ? value > 0 : action === 'refund' ? value > 0 : action === 'tier' ? tier !== currentTier && note.trim().length > 0 : note.trim().length > 0;

  const confirm = () => {
    if (!valid) return;
    const why = [reason, note.trim()].filter(Boolean).join(' · ');
    if (action === 'points') onConfirm({ action, pointsDelta: direction === 'add' ? value : -value, reason: why });
    if (action === 'refund') onConfirm({ action, refund: value, reason: why });
    if (action === 'tier') onConfirm({ action, tier, reason: why });
    if (action === 'freeze') onConfirm({ action, frozen: !frozen, reason: why });
    onClose();
  };

  const title = action === 'freeze' && frozen ? 'Unfreeze card' : titles[action];

  return (
    <Drawer
      title={title}
      subtitle={customerName}
      onClose={onClose}
      footer={
      <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={buttonSecondary}>Cancel</button>
          <button type="button" onClick={confirm} disabled={!valid} className={buttonPrimary}>{title}</button>
        </div>
      }>
      
      <div className="space-y-5">
        {action === 'points' &&
        <>
            <div role="radiogroup" aria-label="Add or remove" className="grid grid-cols-2 rounded-xl bg-sand p-1">
              {(['add', 'remove'] as const).map((d) =>
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={direction === d}
              onClick={() => setDirection(d)}
              className={`rounded-lg py-2 text-sm font-bold transition-colors duration-150 ${direction === d ? 'bg-white text-ink shadow-sm' : 'text-muted'}`}>
              
                  {d === 'add' ? 'Add points' : 'Remove points'}
                </button>
            )}
            </div>
            <Field label="Points">
              <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 250" className={inputClass} />
            </Field>
            <ReasonSelect options={pointReasons} value={reason} onChange={setReason} />
          </>
        }

        {action === 'refund' &&
        <>
            <Field label="Amount (RWF)">
              <input inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 4,800" className={inputClass} />
            </Field>
            <ReasonSelect options={refundReasons} value={reason} onChange={setReason} />
            <p className="rounded-xl bg-canvas p-3 text-xs text-muted">The amount is added to the customer's shopping card straight away and appears in their app activity.</p>
          </>
        }

        {action === 'tier' &&
        <div>
            <span className={labelClass}>New tier</span>
            <div className="grid grid-cols-2 gap-2">
              {levelOrder.map((l) =>
            <button
              key={l}
              type="button"
              aria-pressed={tier === l}
              onClick={() => setTier(l)}
              className={`h-11 rounded-xl border-2 text-sm font-bold transition-colors duration-150 ${tier === l ? 'border-simba bg-simba-soft text-ink' : 'border-line text-ink-soft hover:border-ink/30'}`}>
              
                  {l}
                  {l === currentTier && <span className="ml-1 text-xs font-semibold text-muted">(current)</span>}
                </button>
            )}
            </div>
          </div>
        }

        {action === 'freeze' &&
        <p className="rounded-xl bg-simba-soft p-3 text-sm text-ink">
            {frozen ?
          'The customer will be able to pay with their card and use their checkout code again.' :
          'The card balance and points are kept, but the checkout code stops working and top-ups are blocked until the card is unfrozen.'}
          </p>
        }

        <Field label={action === 'tier' || action === 'freeze' ? 'Reason (required)' : 'Note (optional)'}>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className={`${inputClass} h-auto py-2.5`} placeholder="Visible to other staff in the audit log" />
        </Field>
      </div>
    </Drawer>);

}

function Field({ label, children }: {label: string;children: React.ReactNode;}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>);

}

function ReasonSelect({ options, value, onChange }: {options: string[];value: string;onChange: (v: string) => void;}) {
  return (
    <Field label="Reason">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
        {options.map((o) =>
        <option key={o}>{o}</option>
        )}
      </select>
    </Field>);

}