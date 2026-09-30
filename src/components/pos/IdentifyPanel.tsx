import React, { useState } from 'react';
import { KeyRoundIcon, SmartphoneIcon, CircleAlertIcon } from 'lucide-react';
import { customer } from '../../data/customer';
import { currentCode, isValidCode, CODE_PERIOD } from '../../utils/checkoutCode';
import { PhoneOtpStep } from './PhoneOtpStep';

export type IdentifyVia = 'code' | 'phone';

interface IdentifyPanelProps {
  initialCode?: string;
  onIdentified: (via: IdentifyVia) => void;
}

const JOSEPH_PHONE = customer.phone.replace('+250', '').replace(/\D/g, '');

export function IdentifyPanel({ initialCode = '', onIdentified }: IdentifyPanelProps) {
  const [tab, setTab] = useState<IdentifyVia>('code');
  const [code, setCode] = useState(initialCode.replace(/\D/g, ''));
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const digits = code.replace(/\D/g, '').slice(0, 6);
  const formatted = digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits;
  const phoneDigits = phone.replace(/\D/g, '').slice(0, 9);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'code') {
      if (digits.length < 6) return setError('Enter all 6 digits of the checkout code.');
      if (!isValidCode(customer.name, digits)) return setError('Code not recognised or expired. Ask the customer to read the code on their card again.');
    } else {
      if (phoneDigits.length < 9) return setError('Enter the 9-digit phone number.');
      if (phoneDigits !== JOSEPH_PHONE) return setError('No Simba+ member with this number.');
      setError(null);
      setVerifying(true);
      return;
    }
    setError(null);
    onIdentified(tab);
  };

  if (verifying) {
    return <PhoneOtpStep phoneDigits={phoneDigits} onVerified={() => onIdentified('phone')} onBack={() => setVerifying(false)} />;
  }

  const fillDemo = () => {
    setError(null);
    if (tab === 'code') setCode(currentCode(customer.name).replace(' ', ''));else
    setPhone(JOSEPH_PHONE);
  };

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col" noValidate>
      <h2 className="text-xl font-extrabold text-ink">Identify customer</h2>
      <p className="mt-1 text-sm text-muted">Ask for the checkout code on their Simba+ card.</p>

      <div role="tablist" aria-label="Identify by" className="mt-5 grid grid-cols-2 rounded-xl bg-sand p-1">
        {(
        [
        { id: 'code', label: 'Checkout code', icon: KeyRoundIcon },
        { id: 'phone', label: 'Phone number', icon: SmartphoneIcon }] as
        const).
        map((t) =>
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={tab === t.id}
          onClick={() => {
            setTab(t.id);
            setError(null);
          }}
          className={`flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-bold transition-colors duration-150 ${
          tab === t.id ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}`
          }>
          
            <t.icon className="h-4 w-4" aria-hidden="true" />
            {t.label}
          </button>
        )}
      </div>

      <div className="mt-6">
        {tab === 'code' ?
        <label className="block">
            <span className="sr-only">6-digit checkout code</span>
            <input
            value={formatted}
            onChange={(e) => {
              setError(null);
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            placeholder="000 000"
            className={`num h-20 w-full rounded-2xl border-2 bg-white text-center text-4xl font-extrabold tracking-[0.2em] text-ink placeholder:text-line focus:outline-none ${
            error ? 'border-simba' : 'border-line focus:border-ink'}`
            } />
          
            <span className="mt-2 block text-center text-xs text-muted">Codes change every {CODE_PERIOD} seconds</span>
          </label> :

        <label className="block">
            <span className="sr-only">Customer phone number</span>
            <span
            className={`flex h-20 items-center gap-3 rounded-2xl border-2 bg-white px-5 focus-within:border-ink ${error ? 'border-simba' : 'border-line'}`}>
            
              <span className="num text-2xl font-bold text-muted">+250</span>
              <input
              value={phoneDigits.replace(/(\d{3})(?=\d)/g, '$1 ')}
              onChange={(e) => {
                setError(null);
                setPhone(e.target.value);
              }}
              inputMode="tel"
              autoFocus
              placeholder="7XX XXX XXX"
              className="num min-w-0 flex-1 bg-transparent text-2xl font-extrabold tracking-wide text-ink placeholder:text-line focus:outline-none" />
            
            </span>
            <span className="mt-2 block text-center text-xs text-muted">We'll text a one-time code to this number to confirm it's them</span>
          </label>
        }

        {error &&
        <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-simba-soft p-3 text-sm font-semibold text-simba-dark">
            <CircleAlertIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        }
      </div>

      <div className="mt-auto pt-6">
        <button type="submit" className="h-14 w-full rounded-2xl bg-simba text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-simba-dark">
          {tab === 'code' ? 'IDENTIFY CUSTOMER' : 'SEND VERIFICATION CODE'}
        </button>
        <button
          type="button"
          onClick={fillDemo}
          className="mt-3 w-full rounded-xl border border-dashed border-line py-2.5 text-xs font-bold text-muted transition-colors duration-150 hover:border-ink/30 hover:text-ink">
          
          Demo: {tab === 'code' ? "enter Joseph's current card code" : "enter Joseph's phone number"}
        </button>
      </div>
    </form>);

}