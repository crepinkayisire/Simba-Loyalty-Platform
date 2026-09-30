import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, ChevronRightIcon, WalletIcon } from 'lucide-react';
import { ScreenHeader } from '../../components/mobile/ScreenHeader';
import { AmountPicker } from '../../components/mobile/topup/AmountPicker';
import { PhoneInput } from '../../components/mobile/topup/PhoneInput';
import { CardInput } from '../../components/mobile/topup/CardInput';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { paymentMethods, topUpLimits, type PaymentMethod, type PaymentMethodId } from '../../data/paymentMethods';
import { cardBrand, cardValid, emptyCard, formatPhone, type CardDetails } from '../../utils/cardPayment';

// Remembers the account used for each method across top-ups during the session.
const lastUsed: Record<PaymentMethodId, string> = Object.fromEntries(
  paymentMethods.map((m) => [m.id, m.lastUsed])
) as Record<PaymentMethodId, string>;

type Step = 'amount' | 'details' | 'pending' | 'done';

const ease = [0.23, 1, 0.32, 1] as const;

export function TopUpCard() {
  const navigate = useNavigate();
  const { cardBalance, topUpCard } = useLoyalty();
  const [preset, setPreset] = useState<number | 'other'>(20000);
  const [other, setOther] = useState('');
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [account, setAccount] = useState('');
  const [card, setCard] = useState<CardDetails>(emptyCard);
  const [step, setStep] = useState<Step>('amount');
  const [paidVia, setPaidVia] = useState('');

  const amount = preset === 'other' ? Number(other || 0) : preset;
  const amountOk = amount >= topUpLimits.min && amount <= topUpLimits.max;
  const accountOk = method ? method.id === 'card' ? cardValid(account, card, lastUsed.card) : account.length === 9 : false;

  const choose = (m: PaymentMethod) => {
    setMethod(m);
    setAccount(lastUsed[m.id]);
    setCard(emptyCard);
    setStep('details');
  };

  const pay = () => {
    if (!method || !accountOk) return;
    setStep('pending');
    const label = method.id === 'card' ? `${cardBrand(account)} · •••• ${account.slice(-4)}` : `${method.name} · ${formatPhone(account)}`;
    window.setTimeout(() => {
      lastUsed[method.id] = method.id === 'card' ? account.slice(-4) : account;
      topUpCard(amount, label);
      setPaidVia(label);
      setStep('done');
    }, 900);
  };

  if (step === 'done') {
    return (
      <div className="flex min-h-full flex-col px-5 pb-8">
        <div className="flex flex-1 flex-col items-center justify-center pt-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-white">
            
            <CheckIcon className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
          </motion.span>
          <h1 className="mt-5 text-sm font-bold text-muted">Top up complete</h1>
          <p className="num mt-1 text-[34px] font-extrabold leading-tight text-ink">+RWF {amount.toLocaleString('en-US')}</p>
          <p className="mt-1 text-sm text-muted">Paid with {paidVia}</p>

          <div className="mt-8 flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-card">
            <span className="flex items-center gap-2 text-sm font-semibold text-muted">
              <WalletIcon className="h-4 w-4 text-simba" aria-hidden="true" />
              New card balance
            </span>
            <span className="num text-lg font-extrabold text-ink">RWF {cardBalance.toLocaleString('en-US')}</span>
          </div>
        </div>
        <div className="mt-10 space-y-3">
          <Link to="/app" className="flex h-14 w-full items-center justify-center rounded-2xl bg-ink text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-ink-soft">
            DONE
          </Link>
          <Link to="/app/activity" className="flex h-12 w-full items-center justify-center rounded-2xl text-sm font-bold text-ink-soft transition-colors duration-150 hover:bg-sand">
            View activity
          </Link>
        </div>
      </div>);

  }

  const onDetails = step === 'details' || step === 'pending';

  return (
    <div className="pb-8">
      <ScreenHeader
        title={onDetails && method ? method.name : 'Top up card'}
        onBack={onDetails ? () => step !== 'pending' && setStep('amount') : () => navigate('/app')} />
      

      <div className="px-5">
        {!onDetails &&
        <>
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card">
              <span className="flex items-center gap-2 text-sm font-semibold text-muted">
                <WalletIcon className="h-4 w-4 text-simba" aria-hidden="true" />
                Current balance
              </span>
              <span className="num text-lg font-extrabold text-ink">RWF {cardBalance.toLocaleString('en-US')}</span>
            </div>

            <h2 className="mb-3 mt-6 text-base font-extrabold text-ink">How much?</h2>
            <AmountPicker preset={preset} onPreset={setPreset} other={other} onOther={setOther} />
            {!amountOk &&
          <p className="num mt-2 text-xs font-semibold text-simba-dark">
                Enter an amount between RWF {topUpLimits.min.toLocaleString('en-US')} and {topUpLimits.max.toLocaleString('en-US')}
              </p>
          }

            <h2 className="mb-3 mt-7 text-base font-extrabold text-ink">Pay with</h2>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">
              {paymentMethods.map((m) =>
            <li key={m.id}>
                  <button
                type="button"
                onClick={() => choose(m)}
                disabled={!amountOk}
                className="flex w-full items-center gap-3 p-4 text-left transition-colors duration-150 hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-50">
                
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[10px] font-black tracking-tight ${m.markCls}`}>
                      {m.mark}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold text-ink">{m.name}</span>
                      <span className="block text-xs text-muted">{m.hint}</span>
                    </span>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                  </button>
                </li>
            )}
            </ul>
          </>
        }

        {onDetails && method &&
        <>
            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card">
              <span className="text-sm font-semibold text-muted">Top up amount</span>
              <span className="num text-xl font-extrabold text-ink">RWF {amount.toLocaleString('en-US')}</span>
            </div>

            <div className="mt-6">
              {method.id === 'card' ?
            <CardInput value={account} onChange={setAccount} details={card} onDetails={setCard} saved={lastUsed.card} disabled={step === 'pending'} /> :

            <PhoneInput method={method} value={account} onChange={setAccount} isLast={account === lastUsed[method.id]} disabled={step === 'pending'} />
            }
            </div>

            <button
            type="button"
            onClick={pay}
            disabled={!accountOk || step === 'pending'}
            className="num mt-8 h-14 w-full rounded-2xl bg-simba text-base font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:opacity-60">
            
              {step === 'pending' ? method.pending : `PAY RWF ${amount.toLocaleString('en-US')}`}
            </button>
          </>
        }
      </div>
    </div>);

}