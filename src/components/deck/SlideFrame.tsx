import React, { type ReactNode } from 'react';
import { SimbaWordmark } from './SimbaWordmark';

const TOTAL_SLIDES = 13;

type SlideFrameProps = {
  children: ReactNode;
  page: number;
  tone?: 'light' | 'dark';
};

export function SlideFrame({ children, page, tone = 'light' }: SlideFrameProps) {
  const dark = tone === 'dark';
  return (
    <section
      className={`relative flex h-full w-full flex-col overflow-hidden px-[6vw] pb-[9vh] pt-[6.5vh] ${
      dark ? 'bg-ink text-canvas' : 'bg-canvas text-ink'}`
      }>
      
      {children}
      <footer
        className={`absolute inset-x-[6vw] bottom-[3.4vh] flex items-center justify-between text-deck-label ${
        dark ? 'text-canvas/55' : 'text-muted'}`
        }>
        
        <span className="flex items-center gap-[0.6vw]">
          <SimbaWordmark className="text-deck-label" tone={dark ? 'light' : 'brand'} />
          <span>Membership & Loyalty</span>
        </span>
        <span className="tnum">
          Kayko · {String(page).padStart(2, '0')} / {TOTAL_SLIDES}
        </span>
      </footer>
    </section>);

}