import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BottomSheet } from './BottomSheet';
import { ConfirmSummary } from './redeem/ConfirmSummary';
import { RedeemSuccess } from './redeem/RedeemSuccess';
import { ConfirmButtons } from './redeem/ConfirmButtons';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { convertPointOptions } from '../../data/shoppingCard';
import { programRules } from '../../data/programRules';

interface ConvertPointsSheetProps {
  onClose: () => void;
}

type Step = 'choose' | 'confirm' | 'done';

export function ConvertPointsSheet({ onClose }: ConvertPointsSheetProps) {
  const { balance, cardBalance, convertPoints } = useLoyalty();
  const options = [...convertPointOptions.filter((p) => p < balance), balance];
  const [points, setPoints] = useState(options.includes(1000) ? 1000 : options[0]);
  const [step, setStep] = useState<Step>('choose');
  const [added, setAdded] = useState(0);
  const rwf = points * programRules.pointValueRWF;
  const canConvert = balance >= programRules.minRedeemPoints && points >= programRules.minRedeemPoints;

  const title = step === 'done' ? 'Card topped up' : step === 'confirm' ? 'Confirm top up' : 'Simba+ card top up';

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={title} onClose={onClose}>
      {step === 'done' &&
    <RedeemSuccess
      title={`RWF ${added.toLocaleString('en-US')} added`}
      text={`Your shopping card balance is now RWF ${cardBalance.toLocaleString('en-US')}.`}
      onDone={onClose} />

    }

      {step === 'choose' &&
    <>
          <p className="num mt-1 text-sm font-bold text-ink">
            1,000 points = RWF {(1000 * programRules.pointValueRWF).toLocaleString('en-US')} · 1 point = RWF {programRules.pointValueRWF}
          </p>
          <p className="num mt-1 text-sm text-muted">
            Available: {balance.toLocaleString('en-US')} points. You can add up to RWF {(balance * programRules.pointValueRWF).toLocaleString('en-US')} to your Shopping Card.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5" role="radiogroup" aria-label="Points to convert">
            {options.map((p) =>
        <button
          key={p}
          type="button"
          role="radio"
          aria-checked={points === p}
          onClick={() => setPoints(p)}
          className={`num flex h-16 flex-col items-center justify-center rounded-2xl border-2 transition-colors duration-150 ${
          points === p ? 'border-simba bg-simba-soft text-simba' : 'border-line text-ink hover:border-ink/30'}`
          }>
          
                <span className="text-base font-extrabold">{p === balance ? `All · ${p.toLocaleString('en-US')}` : `${p.toLocaleString('en-US')} pts`}</span>
                <span className="text-xs font-semibold text-muted">RWF {(p * programRules.pointValueRWF).toLocaleString('en-US')}</span>
              </button>
        )}
          </div>
          <button
        type="button"
        disabled={!canConvert}
        onClick={() => setStep('confirm')}
        className="num mt-5 h-14 w-full rounded-2xl bg-simba text-base font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted">
        
            {canConvert ? 'CONTINUE' : `MINIMUM ${programRules.minRedeemPoints} POINTS`}
          </button>
        </>
    }

      {step === 'confirm' &&
    <>
          <ConfirmSummary rows={[{ label: 'Added to shopping card', value: `RWF ${rwf.toLocaleString('en-US')}` }]} points={points} />
          <ConfirmButtons
        label={`TOP UP RWF ${rwf.toLocaleString('en-US')}`}
        onBack={() => setStep('choose')}
        onConfirm={() => {
          setAdded(convertPoints(points));
          setStep('done');
        }} />
      
        </>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}