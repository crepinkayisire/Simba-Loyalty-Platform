import React from 'react';
import { BellIcon } from 'lucide-react';
import { MembershipCard } from '../MembershipCard';
import { LionMark } from '../../brand/LionMark';
import { memberships } from '../../../data/deck/memberships';

/** The app's Memberships tab: all four cards stacked like a wallet, Platinum in front. */
export function AppMembershipStack() {
  return (
    <div className="flex h-full flex-col px-[1.1em] pb-[1.2em] pt-[2.8em] text-ink">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-[0.35em]">
          <LionMark tone="orange" className="h-[1.6em]" />
          <span className="text-[1.05em]" style={{ fontWeight: 400, fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Simba<span className="font-sans font-extrabold text-simba">+</span>
          </span>
        </span>
        <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-white">
          <BellIcon className="h-[1em] w-[1em]" />
        </span>
      </div>

      <p className="mt-[0.9em] font-display text-[1.45em] font-bold leading-tight">Memberships</p>
      <p className="text-[0.68em] text-muted">Tap a card to see its offers</p>

      <div className="mt-[1em] flex flex-col">
        {memberships.map((m, i) =>
        <div key={m.tier} className="relative" style={{ marginTop: i === 0 ? 0 : '-42%', zIndex: i }}>
            <MembershipCard
            tier={m.tier}
            label={m.label}
            width="100%"
            holder={m.holder}
            since={m.since}
            balance={m.balance}
            points={m.points}
            code={m.code} />
          
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between rounded-[0.9em] bg-white px-[0.9em] py-[0.7em]">
        <span>
          <span className="block text-[0.6em] font-semibold text-muted">Simba+ Platinum Offers</span>
          <span className="block text-[0.78em] font-bold">Serena · Marriott · Equity</span>
        </span>
        <span className="text-[0.7em] font-bold text-simba">View →</span>
      </div>
    </div>);

}