import React from 'react';
import { PhoneFrame } from '../PhoneFrame';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { AppHomeScreen } from '../mockups/AppHomeScreen';
import { AppMembershipsScreen } from '../mockups/AppMembershipsScreen';
import { appJourneys } from '../../../data/deck/platform';

export function CustomerAppSlide() {
  return (
    <SlideFrame page={4}>
      <div className="flex min-h-0 flex-1 gap-[4vw]">
        <div className="relative w-[32vw] shrink-0">
          <Reveal index={2} className="absolute bottom-0 left-0">
            <PhoneFrame heightVh={60}>
              <AppMembershipsScreen />
            </PhoneFrame>
          </Reveal>
          <PhoneFrame heightVh={74} className="absolute right-0 top-[1vh]">
            <AppHomeScreen />
          </PhoneFrame>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <SlideTitle
            section="04"
            label="Experience 1 · Customer app"
            title="Simba+ in every shopper’s pocket"
            subtitle="The card, the wallet and the rewards — in one app." />
          

          <ol className="mt-auto">
            {appJourneys.map((j, i) =>
            <Reveal key={j.title} index={i + 1}>
                <li className="grid grid-cols-[3vw_1fr] items-baseline gap-[1vw] border-t border-line py-[2.2vh]">
                  <span className="tnum font-display text-deck-body text-simba">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display text-deck-body leading-tight">{j.title}</span>
                    <span className="mt-[0.4vh] block text-deck-label text-muted">{j.detail}</span>
                  </span>
                </li>
              </Reveal>
            )}
          </ol>
        </div>
      </div>
    </SlideFrame>);

}