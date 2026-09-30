import React from 'react';
import { CoinsIcon, GiftIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { basketBonuses, bonusWays, redeemOptions } from '../../../data/deck/program';

const MAX_BONUS = 1000;

export function EarnRedeemSlide() {
  return (
    <SlideFrame page={6}>
      <SlideTitle section="06" label="Earn & redeem" title="Earn at the till. Redeem in the app." />

      <div className="mt-[4.5vh] grid min-h-0 flex-1 grid-cols-2 gap-[4vw]">
        <div className="flex flex-col">
          <p className="flex items-center gap-[0.6vw] text-deck-label font-semibold text-simba">
            <CoinsIcon className="h-[1.4vw] w-[1.4vw]" /> Earn
          </p>
          <div className="mt-[1.5vh] flex items-end gap-[1.2vw]">
            <span className="tnum font-display text-deck-hero leading-[0.85] text-simba">10</span>
            <span className="pb-[0.6vh]">
              <span className="block font-display text-deck-value leading-none">points</span>
              <span className="block text-deck-label text-muted">per RWF 1,000 spent</span>
            </span>
          </div>

          <p className="mt-[4.5vh] text-deck-label font-semibold text-muted">Basket bonuses</p>
          <ul className="mt-[1.2vh] flex flex-col gap-[1.4vh]">
            {basketBonuses.map((b, i) =>
            <li key={b.basket} className="grid grid-cols-[7.5vw_1fr] items-center gap-[1vw]">
                <span className="tnum text-deck-label font-semibold">{b.basket}</span>
                <Reveal index={i}>
                  <div className="flex items-center gap-[0.8vw]">
                    <span className="block h-[3.6vh] rounded-[0.4vw] bg-simba" style={{ width: `${Math.max(10, b.points / MAX_BONUS * 72)}%` }} />
                    <span className="tnum whitespace-nowrap font-display text-deck-body">+{b.points.toLocaleString('en-US')} pts</span>
                  </div>
                </Reveal>
              </li>
            )}
          </ul>

          <div className="mt-auto">
            <p className="text-deck-label font-semibold text-muted">Plus bonus points for</p>
            <div className="mt-[1.2vh] flex flex-wrap gap-[0.6vw]">
              {bonusWays.map((w) =>
              <span key={w} className="rounded-full border border-line bg-white px-[1.1vw] py-[0.9vh] text-deck-label font-medium">
                  {w}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-[1.6vw] bg-ink px-[2.8vw] py-[4vh] text-canvas">
          <p className="flex items-center gap-[0.6vw] text-deck-label font-semibold text-gold-bright">
            <GiftIcon className="h-[1.4vw] w-[1.4vw]" /> Redeem
          </p>
          <div className="mt-[3vh] grid grid-cols-2 gap-x-[2vw] gap-y-[3.4vh]">
            {redeemOptions.map((o, i) => {
              const Icon = o.icon;
              return (
                <Reveal key={o.title} index={i + 3}>
                  <span className="flex h-[3.4vw] w-[3.4vw] items-center justify-center rounded-[0.8vw] bg-gold-bright text-ink">
                    <Icon className="h-[1.6vw] w-[1.6vw]" strokeWidth={1.9} />
                  </span>
                  <p className="mt-[1.4vh] font-display text-deck-body leading-tight">{o.title}</p>
                </Reveal>);

            })}
          </div>

          <div className="mt-auto border-t border-canvas/15 pt-[3vh]">
            <p className="text-deck-label font-semibold text-canvas/60">Proposed base conversion</p>
            <p className="mt-[0.8vh] font-display text-deck-h leading-none">
              <span className="text-gold-bright">1 point</span> = RWF 1
            </p>
            <p className="mt-[0.8vh] text-deck-label text-canvas/70">≈ 1% base reward on eligible spend · set in the console</p>
          </div>
        </div>
      </div>
    </SlideFrame>);

}