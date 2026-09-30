import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { StarIcon, CrownIcon } from 'lucide-react';
import { BottomSheet, SheetSuccess } from './BottomSheet';
import { MoMoRow } from './MoMoRow';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import type { TierBenefits } from '../../data/benefits';

interface UpgradeSheetProps {
  tier: TierBenefits;
  method: 'points' | 'buy';
  onClose: () => void;
}

export function UpgradeSheet({ tier, method, onClose }: UpgradeSheetProps) {
  const { balance, upgradeTier } = useLoyalty();
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle');
  const cost = method === 'points' ? tier.upgradePoints : tier.upgradeRWF;

  const confirm = () => {
    if (method === 'points') {
      upgradeTier(tier.level, 'points', cost);
      setStatus('done');
      return;
    }
    setStatus('pending');
    window.setTimeout(() => {
      upgradeTier(tier.level, 'buy', cost);
      setStatus('done');
    }, 900);
  };

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={status === 'done' ? `Welcome to ${tier.level}` : `Upgrade to Simba+ ${tier.level}`} onClose={onClose}>
      {status === 'done' ?
    <SheetSuccess
      title={`You're Simba+ ${tier.level}`}
      text={`Your ${tier.level} benefits are active now for 12 months. Just show your card at checkout.`}
      onDone={onClose} /> :


    <>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-canvas p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-gold">
              <CrownIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex-1 text-sm">
              <p className="font-bold text-ink">{tier.benefits.length} partner benefits</p>
              <p className="text-muted">Valid for 12 months</p>
            </div>
          </div>

          {method === 'points' ?
      <dl className="mt-4 space-y-2 rounded-2xl border border-line p-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Your points</dt><dd className="num font-bold text-ink">{balance.toLocaleString('en-US')}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Upgrade cost</dt><dd className="num font-bold text-simba">−{cost.toLocaleString('en-US')}</dd></div>
              <div className="flex justify-between border-t border-line pt-2"><dt className="font-bold text-ink">Points after</dt><dd className="num font-extrabold text-ink">{(balance - cost).toLocaleString('en-US')}</dd></div>
            </dl> :

      <MoMoRow />
      }

          <button
        type="button"
        onClick={confirm}
        disabled={status === 'pending'}
        className="num mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-simba text-base font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:opacity-70">
        
            {method === 'points' && <StarIcon className="h-5 w-5 fill-current" aria-hidden="true" />}
            {status === 'pending' ?
        'Confirm on your phone…' :
        method === 'points' ?
        `USE ${cost.toLocaleString('en-US')} POINTS` :
        `PAY RWF ${cost.toLocaleString('en-US')}`}
          </button>
        </>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}