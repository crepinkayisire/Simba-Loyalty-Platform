import React from 'react';
import { BellIcon, ShoppingBagIcon, StarIcon, WalletIcon } from 'lucide-react';
import { MembershipCard } from '../MembershipCard';

const ACTIVITY = [
{ title: 'Simba Gishushu', detail: 'Purchase · RWF 72,500', value: '+725', icon: StarIcon },
{ title: 'Card top-up', detail: 'MTN MoMo', value: '+RWF 20,000', icon: WalletIcon },
{ title: 'Simba+ card payment', detail: 'Simba Kacyiru', value: '−RWF 12,400', icon: ShoppingBagIcon }];


export function AppHomeScreen() {
  return (
    <div className="flex h-full flex-col px-[1.1em] pb-[1.2em] pt-[2.8em] text-ink">
      <div className="flex items-center justify-between">
        <p className="font-display text-[1.35em] font-bold leading-tight">Hello Joseph 👋</p>
        <span className="relative flex h-[2.2em] w-[2.2em] items-center justify-center rounded-full bg-white">
          <BellIcon className="h-[1.1em] w-[1.1em]" />
          <span className="absolute right-[0.35em] top-[0.35em] h-[0.5em] w-[0.5em] rounded-full bg-simba" />
        </span>
      </div>

      <MembershipCard tier="Gold" width="100%" className="mt-[0.9em]" />

      <div className="mt-[0.9em] grid grid-cols-2 gap-[0.5em] text-[0.72em] font-bold">
        <span className="rounded-[0.9em] bg-simba py-[0.8em] text-center text-white">Top up card</span>
        <span className="rounded-[0.9em] border border-simba bg-white py-[0.8em] text-center text-simba">Redeem points</span>
      </div>
      <p className="mt-[0.6em] text-center text-[0.66em] font-semibold text-muted">How to earn points →</p>

      <p className="mt-[1em] text-[0.72em] font-semibold text-muted">Recent activity</p>
      <ul className="mt-[0.3em] flex flex-col">
        {ACTIVITY.map(({ title, detail, value, icon: Icon }) =>
        <li key={title} className="flex items-center gap-[0.6em] border-b border-line py-[0.55em] last:border-0">
            <span className="flex h-[2em] w-[2em] shrink-0 items-center justify-center rounded-full bg-simba-soft">
              <Icon className="h-[1em] w-[1em] text-simba" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.74em] font-semibold">{title}</span>
              <span className="block text-[0.6em] text-muted">{detail}</span>
            </span>
            <span className="tnum text-[0.72em] font-bold">{value}</span>
          </li>
        )}
      </ul>
    </div>);

}