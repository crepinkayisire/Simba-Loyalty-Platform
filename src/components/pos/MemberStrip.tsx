import React from 'react';
import { KeyRoundIcon, SmartphoneIcon } from 'lucide-react';
import { LionMark } from '../brand/LionMark';
import { CardGloss } from '../mobile/CardGloss';
import { customer } from '../../data/customer';
import { tierTheme } from '../../utils/tierTheme';
import type { CardLevel } from '../../types/loyalty';
import type { IdentifyVia } from './IdentifyPanel';

interface MemberStripProps {
  level: CardLevel;
  cardBalance: number;
  points: number;
  via: IdentifyVia;
}

/** Compact version of the customer's Simba+ card, in their tier colour, as the cashier sees it. */
export function MemberStrip({ level, cardBalance, points, via }: MemberStripProps) {
  const t = tierTheme[level];
  const ViaIcon = via === 'code' ? KeyRoundIcon : SmartphoneIcon;
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 shadow-card ${t.bg} ${t.text}`}>
      <LionMark
        color={t.watermark.color}
        opacity={t.watermark.opacity}
        className="absolute -right-8 top-1/2 h-[160%] -translate-y-1/2" />
      
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-extrabold leading-tight">{customer.name}</p>
          <p className={`num mt-0.5 text-xs font-semibold ${t.sub}`}>Customer since {customer.customerSince}</p>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.16em] ${t.pill}`}>
          {level.toUpperCase()}
        </span>
      </div>
      <div className={`relative mt-4 grid grid-cols-2 divide-x ${t.divider}`}>
        <div className="pr-3">
          <p className="num text-xl font-extrabold leading-tight">
            {cardBalance.toLocaleString('en-US')}
            <span className={`ml-1 text-xs font-bold ${t.sub}`}>RWF</span>
          </p>
          <p className={`mt-0.5 text-[10px] font-medium tracking-[0.2em] ${t.sub}`}>CARD BALANCE</p>
        </div>
        <div className="pl-3">
          <p className="num text-xl font-extrabold leading-tight">
            {points.toLocaleString('en-US')}
            <span className={`ml-1 text-xs font-bold ${t.sub}`}>pts</span>
          </p>
          <p className={`mt-0.5 text-[10px] font-medium tracking-[0.2em] ${t.sub}`}>SIMBA+ POINTS</p>
        </div>
      </div>
      <p className={`relative mt-3 flex items-center gap-1.5 text-[11px] font-bold ${t.sub}`}>
        <ViaIcon className="h-3.5 w-3.5" aria-hidden="true" />
        Identified by {via === 'code' ? 'checkout code' : 'phone number'}
      </p>
      <CardGloss />
    </div>);

}