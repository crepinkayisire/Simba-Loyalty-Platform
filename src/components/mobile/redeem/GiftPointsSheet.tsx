import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BottomSheet } from '../BottomSheet';
import { ConfirmSummary } from './ConfirmSummary';
import { ConfirmButtons } from './ConfirmButtons';
import { RedeemSuccess } from './RedeemSuccess';
import { useLoyalty } from '../../../contexts/LoyaltyContext';
import { ContactBook } from './ContactBook';
import { BookUserIcon } from 'lucide-react';
import { giftMinPoints, giftPointOptions } from '../../../data/redeemOptions';

type Step = 'choose' | 'contacts' | 'confirm' | 'done';

interface PickedContact {
  name: string;
  phone: string;
}

/** Contact Picker API, available on some mobile browsers. */
type ContactsManager = {select: (props: string[], opts?: {multiple?: boolean;}) => Promise<{name?: string[];tel?: string[];}[]>;};

/** Keeps the 9 local digits of a Rwandan number, e.g. "+250 788 555 210" → "788555210". */
const localDigits = (tel: string) => tel.replace(/\D/g, '').replace(/^250/, '').replace(/^0/, '').slice(0, 9);

export function GiftPointsSheet({ onClose }: {onClose: () => void;}) {
  const { balance, spendPoints } = useLoyalty();
  const [phone, setPhone] = useState('');
  const [preset, setPreset] = useState<number | 'other'>(500);
  const [other, setOther] = useState('');
  const [step, setStep] = useState<Step>('choose');
  const [picked, setPicked] = useState<PickedContact | null>(null);

  const points = preset === 'other' ? Number(other || 0) : preset;
  const phoneOk = phone.length === 9 && /^7[2389]/.test(phone);
  const pointsOk = points >= giftMinPoints && points <= balance;
  const contact = picked && picked.phone === phone ? picked : undefined;

  const pick = (c: PickedContact) => {
    setPicked(c);
    setPhone(c.phone);
    setStep('choose');
  };

  const openContacts = async () => {
    const contacts = (navigator as Navigator & {contacts?: ContactsManager;}).contacts;
    if (contacts?.select) {
      try {
        const [c] = await contacts.select(['name', 'tel'], { multiple: false });
        if (c?.tel?.[0]) pick({ name: c.name?.[0] ?? '', phone: localDigits(c.tel[0]) });
        return;
      } catch {

        // Fall through to the in-app contact list.
      }}
    setStep('contacts');
  };
  const phoneLabel = `+250 ${phone.replace(/(\d{3})(?=\d)/g, '$1 ')}`;

  const tile = (on: boolean) =>
  `num h-12 rounded-2xl border-2 text-sm font-extrabold transition-colors duration-150 ${
  on ? 'border-leaf bg-leaf-soft text-leaf' : 'border-line text-ink hover:border-ink/30'}`;


  const title = step === 'done' ? 'Points sent' : step === 'confirm' ? 'Confirm gift' : step === 'contacts' ? 'Choose a contact' : 'Send to a friend';

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={title} onClose={onClose}>
      {step === 'done' &&
    <RedeemSuccess
      title={`${points.toLocaleString('en-US')} points sent`}
      text={`${contact ? contact.name : phoneLabel} will get an SMS with the points, ready to use at any Simba store.`}
      onDone={onClose} />

    }

      {step === 'choose' &&
    <>
          <label className="mt-3 block">
            <span className="text-sm font-extrabold text-ink">Recipient phone number</span>
            <span className="mt-2 flex h-16 items-center gap-3 rounded-2xl border-2 border-line bg-white px-4 focus-within:border-ink">
              <span className="num text-lg font-bold text-muted">+250</span>
              <input
            autoFocus
            inputMode="tel"
            placeholder="7XX XXX XXX"
            value={phone.replace(/(\d{3})(?=\d)/g, '$1 ')}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
            className="num min-w-0 flex-1 bg-transparent text-xl font-extrabold tracking-wide text-ink placeholder:text-line focus:outline-none" />
          
            </span>
          </label>
          <button
        type="button"
        onClick={openContacts}
        className="mt-2.5 flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm font-bold text-ink transition-colors duration-150 hover:border-ink/30">
        
            <BookUserIcon className="h-4 w-4 text-simba" aria-hidden="true" />
            {contact?.name ? contact.name : 'Choose from contacts'}
          </button>

          <p className="mt-5 text-sm font-extrabold text-ink">Points to send</p>
          <div className="mt-2 grid grid-cols-4 gap-2" role="radiogroup" aria-label="Points to send">
            {giftPointOptions.map((p) =>
        <button key={p} type="button" role="radio" aria-checked={preset === p} disabled={p > balance} onClick={() => setPreset(p)} className={`${tile(preset === p)} disabled:opacity-40`}>
                {p.toLocaleString('en-US')}
              </button>
        )}
            <button type="button" role="radio" aria-checked={preset === 'other'} onClick={() => setPreset('other')} className={tile(preset === 'other')}>
              Other
            </button>
          </div>
          {preset === 'other' &&
      <label className="mt-2.5 flex h-14 items-center gap-3 rounded-2xl border-2 border-ink bg-white px-4">
              <input
          autoFocus
          inputMode="numeric"
          aria-label="Points to send"
          placeholder="0"
          value={other ? Number(other).toLocaleString('en-US') : ''}
          onChange={(e) => setOther(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="num min-w-0 flex-1 bg-transparent text-xl font-extrabold text-ink placeholder:text-line focus:outline-none" />
        
              <span className="text-sm font-bold text-muted">pts</span>
            </label>
      }
          <p className="num mt-2 text-xs text-muted">
            {points > balance ? 'More than your balance' : `Minimum ${giftMinPoints} · you have ${balance.toLocaleString('en-US')} pts`}
          </p>

          <button
        type="button"
        disabled={!phoneOk || !pointsOk}
        onClick={() => setStep('confirm')}
        className="mt-5 h-14 w-full rounded-2xl bg-simba text-base font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted">
        
            CONTINUE
          </button>
        </>
    }

      {step === 'contacts' && <ContactBook onPick={pick} onBack={() => setStep('choose')} />}

      {step === 'confirm' &&
    <>
          <ConfirmSummary
        rows={[
        { label: 'Send to', value: contact ? `${contact.name} · ${phoneLabel}` : phoneLabel },
        { label: 'Gift', value: `${points.toLocaleString('en-US')} Simba Points` }]
        }
        points={points} />
      
          <p className="mt-3 text-xs text-muted">Gifts can't be reversed once sent.</p>
          <ConfirmButtons
        label={`GIFT ${points.toLocaleString('en-US')} POINTS`}
        onBack={() => setStep('choose')}
        onConfirm={() => {
          spendPoints(points, 'Gifted points', contact ? `To ${contact.name}` : `To ${phoneLabel}`);
          setStep('done');
        }} />
      
        </>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}