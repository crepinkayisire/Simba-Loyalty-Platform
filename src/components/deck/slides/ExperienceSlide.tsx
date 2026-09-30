import React from 'react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { experiences } from '../../../data/deck/platform';

export function ExperienceSlide() {
  return (
    <SlideFrame page={3}>
      <SlideTitle
        section="03"
        label="The Simba+ experience"
        title="Three connected experiences"
        subtitle="One member record — felt by shoppers, used at the till, run by Simba HQ." />
      

      <div className="relative mt-[5vh] grid min-h-0 flex-1 grid-cols-3 gap-[2.4vw]">
        {experiences.map((exp, i) => {
          const Icon = exp.icon;
          return (
            <Reveal key={exp.name} index={i} className="flex flex-col border-t-2 border-ink pt-[3vh]">
              <div className="flex items-center gap-[1vw]">
                <span className={`flex h-[3.8vw] w-[3.8vw] items-center justify-center rounded-[0.9vw] ${exp.tone}`}>
                  <Icon className="h-[1.8vw] w-[1.8vw]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-deck-body leading-tight">{exp.name}</p>
                  <p className="text-deck-label font-medium text-muted">{exp.audience}</p>
                </div>
              </div>
              <ul className="mt-[3vh]">
                {exp.items.map((item) =>
                <li key={item} className="flex gap-[0.7vw] border-b border-line py-[1.5vh] text-deck-label font-medium leading-snug">
                    <span aria-hidden className="mt-[0.9vh] h-[0.45vw] w-[0.45vw] shrink-0 rounded-full bg-simba" />
                    {item}
                  </li>
                )}
              </ul>
            </Reveal>);

        })}
      </div>

      <div className="mt-[3vh] flex items-center justify-center gap-[1vw] rounded-full bg-cream py-[1.6vh] text-deck-label font-semibold">
        <span>A top-up in the app, a sale at the till, a promotion from HQ</span>
        <span className="text-simba">→ updates everywhere in real time</span>
      </div>
    </SlideFrame>);

}