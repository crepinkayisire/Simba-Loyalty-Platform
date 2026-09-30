import React from 'react';
import { CheckCircle2Icon, ScanBarcodeIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { posReceipt, posSteps } from '../../../data/deck/platform';

export function CheckoutSlide() {
  return (
    <SlideFrame page={7}>
      <SlideTitle
        section="07"
        label="Experience 2 · Checkout POS"
        title="Recognised at the till in seconds"
        subtitle="The cashier identifies the member, benefits apply automatically, and the app updates before the receipt prints." />
      

      <div className="mt-[4.5vh] grid min-h-0 flex-1 grid-cols-[1fr_30vw] gap-[4vw]">
        <ol className="relative flex flex-col justify-between">
          <span aria-hidden className="absolute bottom-[4vh] left-[1.7vw] top-[4vh] w-[2px] bg-line" />
          {posSteps.map((step, i) =>
          <Reveal key={step.title} index={i} className="relative flex items-center gap-[1.6vw]">
              <span
              className={`relative flex h-[3.4vw] w-[3.4vw] shrink-0 items-center justify-center rounded-full font-display text-deck-body ${
              i === posSteps.length - 1 ? 'bg-simba text-white' : 'bg-ink text-canvas'}`
              }>
              
                {i + 1}
              </span>
              <span>
                <span className="block font-display text-deck-body leading-tight">{step.title}</span>
                <span className="block text-deck-label text-muted">{step.detail}</span>
              </span>
            </Reveal>
          )}
        </ol>

        <Reveal index={4} className="flex flex-col rounded-[1.4vw] bg-white p-[2vw] shadow-[0_3vh_6vh_-3vh_rgba(28,23,20,0.35)]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[0.6vw] text-[1vw] font-semibold text-muted">
              <ScanBarcodeIcon className="h-[1.2vw] w-[1.2vw]" /> Till 04 · Simba Gishushu
            </span>
            <span className="tnum rounded-full bg-leaf-soft px-[0.8vw] py-[0.4vh] text-[0.9vw] font-bold text-leaf">482 913 ✓</span>
          </div>

          <div className="mt-[2vh] flex items-center gap-[0.9vw] rounded-[0.9vw] bg-[#E6B34A] px-[1vw] py-[1.4vh]">
            <span className="flex h-[2.6vw] w-[2.6vw] items-center justify-center rounded-full bg-ink font-display text-[0.95vw] font-bold text-white">JM</span>
            <span>
              <span className="block font-display text-[1.25vw] font-bold leading-tight">Joseph Mutabazi</span>
              <span className="block text-[0.9vw] text-ink/70">Simba+ Gold · 3,175 pts · Card RWF 48,500</span>
            </span>
          </div>

          <ul className="mt-[2vh]">
            {posReceipt.map((row) =>
            <li key={row.label} className="tnum flex justify-between border-b border-line py-[1.1vh] text-[1.05vw]">
                <span className="text-muted">{row.label}</span>
                <span className={`font-semibold ${row.accent ? 'text-leaf' : ''}`}>{row.value}</span>
              </li>
            )}
          </ul>

          <div className="mt-auto flex items-center justify-between rounded-[0.9vw] bg-ink px-[1.2vw] py-[1.8vh] text-canvas">
            <span className="flex items-center gap-[0.6vw] text-[1vw] font-semibold">
              <CheckCircle2Icon className="h-[1.3vw] w-[1.3vw] text-gold-bright" /> Sale complete
            </span>
            <span className="tnum font-display text-[1.5vw] font-bold text-gold-bright">+735 pts</span>
          </div>
        </Reveal>
      </div>
    </SlideFrame>);

}