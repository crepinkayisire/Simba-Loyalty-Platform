import React from 'react';
import type { Reward } from '../../types/loyalty';

interface RewardVisualProps {
  reward: Reward;
  size: 'thumb' | 'tile' | 'hero';
}

export function RewardVisual({ reward, size }: RewardVisualProps) {
  const box =
  size === 'thumb' ? 'h-16 w-16 rounded-xl' : size === 'tile' ? 'h-28 w-full rounded-2xl' : 'aspect-[1.6] w-full rounded-3xl';

  if (reward.category === 'vouchers') {
    const amount = reward.valueRWF.toLocaleString('en-US');
    if (size === 'thumb') {
      return (
        <div className={`${box} flex shrink-0 flex-col items-center justify-center bg-simba text-white`} aria-hidden="true">
          <span className="text-[9px] font-bold opacity-80">RWF</span>
          <span className="num text-sm font-extrabold leading-none">{amount}</span>
        </div>);

    }
    return (
      <div className={`${box} relative flex flex-col justify-between overflow-hidden bg-simba p-4 text-white`} aria-hidden={size !== 'hero'}>
        {size === 'hero' &&
        <>
            <span className="absolute -right-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-canvas" />
            <span className="absolute -left-6 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full bg-canvas" />
          </>
        }
        <span className={`font-extrabold tracking-tight ${size === 'hero' ? 'text-lg' : 'text-xs'}`}>SIMBA</span>
        <div>
          <p className={`num font-extrabold leading-none ${size === 'hero' ? 'text-5xl' : 'text-2xl'}`}>
            <span className={`mr-1 font-bold ${size === 'hero' ? 'text-2xl' : 'text-xs'}`}>RWF</span>
            {amount}
          </p>
          <p className={`mt-2 font-bold tracking-[0.14em] opacity-85 ${size === 'hero' ? 'text-sm' : 'text-[9px]'}`}>
            SHOPPING VOUCHER
          </p>
        </div>
      </div>);

  }

  return (
    <div className={`${box} shrink-0 overflow-hidden bg-sand`}>
      <img src={reward.image} alt={size === 'hero' ? reward.title : ''} className="h-full w-full object-cover" />
    </div>);

}