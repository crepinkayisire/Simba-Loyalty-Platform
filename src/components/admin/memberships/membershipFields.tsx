import React from 'react';
import { CheckIcon, ImagePlusIcon } from 'lucide-react';
import { MembershipCover } from './MembershipCover';
import {
  artworkColors,
  billingPeriods,
  coverArtworks,
  isArtwork,
  membershipStatuses,
  type MembershipRow } from
'../../../data/admin/memberships';
import type { FieldDef } from '../../../types/console';

const billingHelp: Record<MembershipRow['billingPeriod'], string> = {
  Monthly: 'Renews every month',
  Annually: 'Renews every 12 months',
  'One Time': 'Pay once, keep it'
};

export const membershipFields: FieldDef<MembershipRow>[] = [
{ key: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g. Diamond' },
{ key: 'rank', label: 'Rank', type: 'number', required: true, half: true, help: '1 is the entry membership' },
{ key: 'status', label: 'Status', type: 'select', options: membershipStatuses, half: true, help: 'Hidden: staff can assign, not shown in the app' },
{
  key: 'cover',
  label: 'Cover image',
  type: 'custom',
  render: ({ draft, set }) =>
  <fieldset>
        <legend className="mb-1.5 block text-xs font-bold text-muted">Cover image</legend>
        <div className="grid grid-cols-[140px_1fr] gap-4">
          <MembershipCover cover={draft.cover} name={draft.name} />
          <div>
            <div className="grid grid-cols-4 gap-2">
              {coverArtworks.map((a) => {
            const on = draft.cover === a;
            return (
              <button
                key={a}
                type="button"
                aria-pressed={on}
                aria-label={`${a} card artwork`}
                onClick={() => {
                  set('cover', a);
                  set('color', artworkColors[a]);
                }}
                className={`relative rounded-lg p-0.5 ring-2 transition-shadow duration-150 ${on ? 'ring-simba' : 'ring-transparent hover:ring-line'}`}>
                
                    <MembershipCover cover={a} name={a} size="sm" />
                    {on &&
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-simba text-white">
                        <CheckIcon className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden="true" />
                      </span>
                }
                  </button>);

          })}
            </div>
            <label className="mt-2.5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-simba hover:text-simba-dark">
              <ImagePlusIcon className="h-4 w-4" aria-hidden="true" />
              {isArtwork(draft.cover) ? 'Upload an image' : 'Replace image'}
              <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) set('cover', URL.createObjectURL(file));
            }} />
          
            </label>
            <p className="mt-1 text-xs text-muted">Uses the membership card artwork from the customer app</p>
          </div>
        </div>
      </fieldset>

},
{ key: 'buyWithPoints', label: 'Purchase with points', type: 'toggle', section: 'How members get it' },
{ key: 'purchasePoints', label: 'Points', type: 'number', suffix: 'pts', required: true, showWhen: (d) => d.buyWithPoints },
{ key: 'buyWithAmount', label: 'Purchase with amount', type: 'toggle' },
{ key: 'purchaseAmount', label: 'Amount', type: 'number', prefix: 'RWF', required: true, showWhen: (d) => d.buyWithAmount },
{
  key: 'billingPeriod',
  label: 'Billing period',
  type: 'custom',
  render: ({ draft, set }) =>
  <fieldset>
        <legend className="mb-1.5 block text-xs font-bold text-muted">Billing period</legend>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Billing period">
          {billingPeriods.map((b) => {
        const on = draft.billingPeriod === b;
        return (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => {
              set('billingPeriod', b);
              if (b === 'One Time') set('autoDeduct', false);
            }}
            className={`rounded-xl border-2 px-3 py-3 text-left transition-colors duration-150 ${on ? 'border-simba bg-simba-soft' : 'border-line bg-white hover:border-ink/30'}`}>
            
                <span className={`block text-sm font-extrabold ${on ? 'text-simba' : 'text-ink'}`}>{b}</span>
                <span className="mt-0.5 block text-xs text-muted">{billingHelp[b]}</span>
              </button>);

      })}
        </div>
      </fieldset>

},
{
  key: 'autoDeduct',
  label: 'Auto-deduct',
  type: 'toggle',
  help: 'Renew automatically from the member’s Simba+ card or points',
  showWhen: (d) => d.billingPeriod !== 'One Time'
}];