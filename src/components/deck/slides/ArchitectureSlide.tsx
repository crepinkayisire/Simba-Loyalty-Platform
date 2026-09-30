import React from 'react';
import { ArrowUpDownIcon, ArrowDownIcon, MonitorIcon, ScanBarcodeIcon, SmartphoneIcon } from 'lucide-react';
import { Reveal } from '../Reveal';
import { SimbaWordmark } from '../SimbaWordmark';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { loyaltyModules, simbaSystems } from '../../../data/deck/platform';

const CHANNELS = [
{ title: 'Customer app', caption: 'For shoppers', icon: SmartphoneIcon },
{ title: 'Checkout POS', caption: 'For cashiers', icon: ScanBarcodeIcon },
{ title: 'Management console', caption: 'For Simba HQ', icon: MonitorIcon }];


export function ArchitectureSlide() {
  return (
    <SlideFrame page={9}>
      <div className="flex min-h-0 flex-1 gap-[5vw]">
        <div className="flex w-[27vw] shrink-0 flex-col">
          <SlideTitle section="09" label="Architecture" title="How it connects" />
          <blockquote className="mt-auto font-serif text-deck-value italic leading-[1.1]">
            “Add the loyalty layer without replacing Simba’s core systems.”
          </blockquote>
          <p className="mb-[2vh] mt-[2.4vh] text-deck-label leading-snug text-muted">POS, online shop and inventory stay exactly as they are.</p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="rounded-[1.2vw] border border-line bg-white px-[1.8vw] py-[2.2vh]">
            <div className="flex items-baseline justify-between">
              <SimbaWordmark className="text-deck-body" />
              <span className="text-deck-label text-muted">Core systems · unchanged</span>
            </div>
            <div className="mt-[1.8vh] grid grid-cols-3 gap-[0.7vw]">
              {simbaSystems.map(({ label, icon: Icon }) =>
              <span key={label} className="flex items-center gap-[0.7vw] rounded-[0.7vw] bg-cream px-[1vw] py-[1.4vh] text-deck-label font-semibold">
                  <Icon className="h-[1.3vw] w-[1.3vw] text-muted" /> {label}
                </span>
              )}
            </div>
          </div>

          <Connector icon="down" label="Sales, products & stores" />

          <Reveal index={1} className="rounded-[1.2vw] bg-simba px-[1.8vw] py-[2.4vh] text-white">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-deck-body">Kayko loyalty layer</span>
              <span className="text-deck-label text-white/75">One member record</span>
            </div>
            <div className="mt-[1.8vh] grid grid-cols-3 gap-[0.7vw]">
              {loyaltyModules.map(({ label, icon: Icon }) =>
              <span key={label} className="flex items-center gap-[0.7vw] rounded-[0.7vw] bg-white/[0.14] px-[1vw] py-[1.3vh] text-deck-label font-semibold">
                  <Icon className="h-[1.25vw] w-[1.25vw]" /> {label}
                </span>
              )}
            </div>
          </Reveal>

          <Connector icon="both" label="Identify, earn, redeem & manage in real time" />

          <Reveal index={2} className="grid grid-cols-3 gap-[1vw]">
            {CHANNELS.map(({ title, caption, icon: Icon }) =>
            <div key={title} className="flex items-center gap-[0.9vw] rounded-[1.2vw] border border-line bg-white px-[1.2vw] py-[1.8vh]">
                <span className="flex h-[2.8vw] w-[2.8vw] shrink-0 items-center justify-center rounded-[0.7vw] bg-ink text-canvas">
                  <Icon className="h-[1.4vw] w-[1.4vw]" />
                </span>
                <span>
                  <span className="block whitespace-nowrap font-display text-deck-label leading-tight">{title}</span>
                  <span className="block text-deck-label text-muted">{caption}</span>
                </span>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </SlideFrame>);

}

function Connector({ icon, label }: {icon: 'down' | 'both';label: string;}) {
  const Icon = icon === 'down' ? ArrowDownIcon : ArrowUpDownIcon;
  return (
    <div className="flex items-center justify-center gap-[0.7vw] py-[1.6vh] text-deck-label text-muted">
      <Icon className="h-[1.6vw] w-[1.6vw] text-simba" strokeWidth={2.2} />
      <span>{label}</span>
    </div>);

}