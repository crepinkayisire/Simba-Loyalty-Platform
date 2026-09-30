import React from 'react';
import { ArrowUpIcon, ChevronRightIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { goals, loopSteps } from '../../../data/deck/program';

export function OpportunitySlide() {
  return (
    <SlideFrame page={2}>
      <SlideTitle
        section="02"
        label="The opportunity"
        title="Turn transactions into relationships."
        subtitle="Simba wants every sale to become an identifiable, long-term customer relationship." />
      

      <div className="mt-[6.5vh]">
        <ol className="relative grid grid-cols-6">
          <span aria-hidden className="absolute left-[8.33%] right-[8.33%] top-[2.9vw] h-[2px] bg-line" />
          {loopSteps.map((step, i) => {
            const Icon = step.icon;
            const isFirst = i === 0;
            const isLast = i === loopSteps.length - 1;
            return (
              <li key={step.label} className="relative flex flex-col items-center text-center">
                <span
                  className={`relative flex h-[5.8vw] w-[5.8vw] items-center justify-center rounded-full ${
                  isLast ? 'bg-simba text-white' : isFirst ? 'bg-ink text-canvas' : 'border-2 border-line bg-canvas text-ink'}`
                  }>
                  
                  <Icon className="h-[2.2vw] w-[2.2vw]" strokeWidth={1.75} />
                </span>
                <span className="mt-[2vh] font-display text-deck-body">{step.label}</span>
                <Reveal index={i}>
                  <span className="mt-[0.4vh] block text-deck-label text-muted">{step.note}</span>
                </Reveal>
                {!isLast ?
                <ChevronRightIcon aria-hidden className="absolute right-[-0.9vw] top-[2vw] h-[1.8vw] w-[1.8vw] bg-canvas text-simba" /> :
                null}
              </li>);

          })}
        </ol>

        <div className="relative mx-[8.33%] mt-[2.2vh] h-[3.4vh] rounded-b-[1.4vw] border-2 border-t-0 border-dashed border-simba/45">
          <ArrowUpIcon className="absolute -left-[1vw] -top-[1.8vh] h-[1.8vw] w-[1.8vw] text-simba" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-canvas px-[1.2vw] text-deck-label font-semibold text-simba">
            Every visit feeds the next
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <p className="mb-[2vh] text-deck-label font-semibold text-muted">Programme goals</p>
        <div className="grid grid-cols-4 gap-[2.4vw]">
          {goals.map((goal, i) => {
            const Icon = goal.icon;
            return (
              <Reveal key={goal.title} index={i + 4} className="border-t-2 border-ink pt-[2.2vh]">
                <Icon className="h-[2vw] w-[2vw] text-simba" strokeWidth={1.75} />
                <p className="mt-[1.6vh] font-display text-deck-body leading-[1.15]">{goal.title}</p>
              </Reveal>);

          })}
        </div>
      </div>
    </SlideFrame>);

}