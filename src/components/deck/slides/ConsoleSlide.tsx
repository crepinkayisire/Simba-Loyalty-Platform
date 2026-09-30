import React from 'react';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { ConsoleMockup } from '../mockups/ConsoleMockup';
import { consoleHighlights } from '../../../data/deck/platform';

export function ConsoleSlide() {
  return (
    <SlideFrame page={8}>
      <div className="flex min-h-0 flex-1 gap-[3.5vw]">
        <div className="min-w-0 flex-1">
          <ConsoleMockup />
        </div>

        <div className="flex w-[24vw] shrink-0 flex-col">
          <SlideTitle section="08" label="Experience 3 · Management console" title="Run the programme from one place" />
          <div className="mt-auto flex flex-col gap-[3vh]">
            {consoleHighlights.map((group, gi) =>
            <Reveal key={group.title} index={gi + 1}>
                <p className="border-b border-ink pb-[0.8vh] text-deck-label font-semibold text-muted">{group.title}</p>
                <ul className="mt-[1vh] flex flex-col gap-[0.9vh]">
                  {group.items.map((item) =>
                <li key={item} className="flex items-center gap-[0.7vw] text-deck-label font-medium">
                      <span aria-hidden className="h-[0.45vw] w-[0.45vw] shrink-0 rounded-full bg-simba" />
                      {item}
                    </li>
                )}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </SlideFrame>);

}