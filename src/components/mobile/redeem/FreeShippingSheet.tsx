import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { TruckIcon } from 'lucide-react';
import { BottomSheet } from '../BottomSheet';
import { ConfirmSummary } from './ConfirmSummary';
import { ConfirmButtons } from './ConfirmButtons';
import { RedeemSuccess } from './RedeemSuccess';
import { useLoyalty } from '../../../contexts/LoyaltyContext';
import { freeShipping } from '../../../data/redeemOptions';

export function FreeShippingSheet({ onClose }: {onClose: () => void;}) {
  const { spendPoints } = useLoyalty();
  const [code, setCode] = useState<string | null>(null);

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={code ? 'Free shipping unlocked' : 'Simba free shipping'} onClose={onClose}>
      {code ?
    <RedeemSuccess
      title="Free shipping ready"
      text={`Enter this code at checkout on ${freeShipping.where.replace('Your next order on ', '')}. Valid for ${freeShipping.validDays} days.`}
      code={code}
      onDone={onClose} /> :


    <>
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-gold-soft p-4">
            <TruckIcon className="h-7 w-7 shrink-0 text-gold" aria-hidden="true" />
            <p className="text-sm font-semibold text-ink">{freeShipping.where}, anywhere in Kigali.</p>
          </div>
          <ConfirmSummary rows={[{ label: 'Valid for', value: `${freeShipping.validDays} days` }]} points={freeShipping.points} />
          <ConfirmButtons
        label={`REDEEM ${freeShipping.points} POINTS`}
        onBack={onClose}
        onConfirm={() => {
          setCode(`FREESHIP-${Math.random().toString(36).slice(2, 6).toUpperCase()}`);
          spendPoints(freeShipping.points, 'Simba free shipping', 'Next online order');
        }} />
      
        </>
    }
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}