import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { StarIcon } from 'lucide-react';
import { BottomSheet } from '../BottomSheet';
import { PartnerLogo } from '../PartnerLogo';
import { ConfirmSummary } from './ConfirmSummary';
import { ConfirmButtons } from './ConfirmButtons';
import { RedeemSuccess } from './RedeemSuccess';
import { useLoyalty } from '../../../contexts/LoyaltyContext';
import { partners } from '../../../data/benefits';
import { partnerPromos, promoValidDays, type PartnerPromo } from '../../../data/redeemOptions';

type Step = 'choose' | 'confirm' | 'done';

interface PartnerPromoSheetProps {
  onClose: () => void;
  /** Opens straight on this promo's confirm step. */
  initialPromo?: PartnerPromo;
}

export function PartnerPromoSheet({ onClose, initialPromo }: PartnerPromoSheetProps) {
  const { balance, spendPoints } = useLoyalty();
  const [promo, setPromo] = useState<PartnerPromo | null>(initialPromo ?? null);
  const [code, setCode] = useState('');
  const [step, setStep] = useState<Step>(initialPromo ? 'confirm' : 'choose');

  const title = step === 'done' ? 'Promo unlocked' : step === 'confirm' ? 'Confirm promo' : 'Partner promo codes';

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={title} onClose={onClose}>
      {step === 'done' && promo &&
    <RedeemSuccess
      title={promo.title}
      text={`Show this code at ${partners[promo.partnerId].name}. Valid for ${promoValidDays} days.`}
      code={code}
      onDone={onClose} />

    }

      {step === 'choose' &&
    <>
          <p className="mt-1 text-sm text-muted">Unlock an exclusive offer and get a code to use with the partner.</p>
          <ul className="mt-4 space-y-2.5">
            {partnerPromos.map((p) => {
          const partner = partners[p.partnerId];
          const short = p.points > balance;
          return (
            <li key={p.id}>
                  <button
                type="button"
                disabled={short}
                onClick={() => {
                  setPromo(p);
                  setStep('confirm');
                }}
                className="flex w-full items-center gap-3 rounded-2xl border-2 border-line p-3 text-left transition-colors duration-150 hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-50">
                
                    <PartnerLogo partner={partner} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-bold leading-snug text-ink">{p.title}</span>
                      <span className="block truncate text-xs text-muted">{p.detail}</span>
                    </span>
                    <span className="num flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-extrabold text-simba">
                      <StarIcon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                      {p.points.toLocaleString('en-US')}
                    </span>
                  </button>
                </li>);

        })}
          </ul>
        </>
    }

      {step === 'confirm' && promo &&
    <>
          <div className="mt-3 flex items-center gap-3">
            <PartnerLogo partner={partners[promo.partnerId]} />
            <div>
              <p className="text-base font-extrabold text-ink">{promo.title}</p>
              <p className="text-xs text-muted">{promo.detail}</p>
            </div>
          </div>
          <ConfirmSummary rows={[{ label: 'Valid for', value: `${promoValidDays} days` }]} points={promo.points} />
          <ConfirmButtons
        label={`UNLOCK FOR ${promo.points.toLocaleString('en-US')} PTS`}
        onBack={() => initialPromo ? onClose() : setStep('choose')}
        onConfirm={() => {
          setCode(`${promo.codePrefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
          spendPoints(promo.points, `${partners[promo.partnerId].name} promo`, promo.title);
          setStep('done');
        }} />
      
        </>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}