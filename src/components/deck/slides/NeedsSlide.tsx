import React from 'react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { needs } from '../../../data/deck/delivery';

export function NeedsSlide() {
  return (
    <SlideFrame page={10}>
      <SlideTitle section="10" label="Inputs" title="What we need from Simba" subtitle="Four inputs let discovery start in week one." />

      <div className="mt-[6vh] grid grid-cols-4 divide-x divide-line">
        {needs.map((need, i) => {
          const Icon = need.icon;
          return (
            <Reveal key={need.group} index={i} className="px-[2vw] first:pl-0 last:pr-0">
              <span className={`flex h-[4.4vw] w-[4.4vw] items-center justify-center rounded-[1vw] ${need.tone}`}>
                <Icon className="h-[2vw] w-[2vw]" strokeWidth={1.75} />
              </span>
              <p className="mt-[3vh] font-display text-deck-body">{need.group}</p>
              <ul className="mt-[2.2vh]">
                {need.items.map((item) =>
                <li key={item} className="border-t border-line py-[1.5vh] text-deck-label font-medium">
                    {item}
                  </li>
                )}
              </ul>
            </Reveal>);

        })}
      </div>
    </SlideFrame>);

}