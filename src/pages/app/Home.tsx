import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XIcon, CircleCheckIcon, PlusIcon, StarIcon, SparklesIcon, ChevronRightIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { DebitCard } from '../../components/mobile/DebitCard';
import { ActivityFeed } from '../../components/mobile/ActivityFeed';
import { TabTopBar } from '../../components/mobile/TabTopBar';

import { customer } from '../../data/customer';

export function Home() {
  const { balance, cardBalance, cardLevel, unreadIds, markRead } = useLoyalty();
  const navigate = useNavigate();
  const showEarned = unreadIds.includes('n-earned');

  return (
    <div className="px-5 pb-8">
      <TabTopBar />

      <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight text-ink">
        Hello {customer.firstName} <span role="img" aria-label="waving hand">👋</span>
      </h1>

      {showEarned &&
      <button
        type="button"
        onClick={() => markRead('n-earned')}
        aria-label="Dismiss: you earned 725 Simba+ points"
        className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-leaf-soft p-3.5 text-left transition-colors duration-150 hover:bg-leaf/15">
        
          <CircleCheckIcon className="h-6 w-6 shrink-0 text-leaf" aria-hidden="true" />
          <span className="flex-1 text-sm">
            <span className="block font-bold text-ink">You earned 725 Simba+ points</span>
            <span className="text-ink-soft">RWF 72,500 at Simba Kigali Heights</span>
          </span>
          <XIcon className="h-5 w-5 text-leaf" aria-hidden="true" />
        </button>
      }

      <div className="mt-5">
        <DebitCard
          name={customer.name}
          level={cardLevel}
          customerSince={customer.customerSince}
          cardBalance={cardBalance}
          points={balance} />
        
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => navigate('/app/topup')}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-simba text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark">
          
          <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          Top up card
        </button>
        <button
          type="button"
          onClick={() => navigate('/app/redeem')}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white text-sm font-extrabold text-ink shadow-card transition-colors duration-150 hover:bg-canvas">
          
          <StarIcon className="h-[18px] w-[18px] fill-current text-simba" aria-hidden="true" />
          Redeem points
        </button>
      </div>

      <button
        type="button"
        onClick={() => navigate('/app/earn')}
        className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-card transition-colors duration-150 hover:bg-canvas">
        
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-simba-soft text-simba">
          <SparklesIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold text-ink">How to earn points</span>
          <span className="block truncate text-sm text-muted">Shopping, basket bonuses, challenges and more</span>
        </span>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
      </button>

      <ActivityFeed limit={4} />
    </div>);

}