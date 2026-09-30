import React from 'react';
import { Reveal } from '../Reveal';
import { SimbaWordmark } from '../SimbaWordmark';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { closingLines, nextSteps } from '../../../data/deck/delivery';

export function NextStepsSlide() {
  return (
    <SlideFrame page={11} tone="dark">
      <SlideTitle section="11" label="Next steps" title="From approval to launch" tone="dark" />

      <ol className="relative mt-[6vh] grid grid-cols-6 gap-[1.5vw]">
        <span aria-hidden className="absolute left-[1.7vw] right-[10%] top-[1.7vw] h-px bg-canvas/25" />
        {nextSteps.map((step, i) =>
        <Reveal key={step.label} index={i} className="relative">
            <li>
              <span
              className={`relative flex h-[3.4vw] w-[3.4vw] items-center justify-center rounded-full font-display text-deck-body ${
              i === 0 ? 'bg-gold-bright text-ink' : 'border border-canvas/30 bg-ink text-canvas'}`
              }>
              
                {i + 1}
              </span>
              <p className="mt-[2.2vh] font-display text-deck-body leading-tight">{step.label}</p>
              <p className={`mt-[0.6vh] text-deck-label ${i === 0 ? 'font-semibold text-gold-bright' : 'text-canvas/60'}`}>{step.when}</p>
            </li>
          </Reveal>
        )}
      </ol>

      <div className="mt-auto flex items-end justify-between gap-[3vw]">
        <div className="font-display text-deck-h leading-[1.02]">
          {closingLines.map((line, i) =>
          <p key={line} className={i === closingLines.length - 1 ? 'text-gold-bright' : ''}>
              {line}
            </p>
          )}
        </div>
        <div className="shrink-0 pb-[0.8vh] text-right">
          <p className="flex items-baseline justify-end gap-[0.6vw] text-deck-body">
            <SimbaWordmark tone="light" />
            <span className="font-display font-bold text-canvas/60">× Kayko</span>
          </p>
          <p className="mt-[0.8vh] text-deck-label text-canvas/60">Thank you</p>
        </div>
      </div>
    </SlideFrame>);

}