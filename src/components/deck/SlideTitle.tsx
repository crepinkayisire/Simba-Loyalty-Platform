import React, { type ReactNode } from 'react';

type SlideTitleProps = {
  section: string;
  label: string;
  title: ReactNode;
  subtitle?: string;
  tone?: 'light' | 'dark';
};

export function SlideTitle({ section, label, title, subtitle, tone = 'light' }: SlideTitleProps) {
  const dark = tone === 'dark';
  return (
    <header className="shrink-0">
      <p className="deck-kicker flex items-center gap-[0.8vw]">
        <span className="tnum">{section}</span>
        <span aria-hidden className="h-[2px] w-[2.2vw] bg-current opacity-50" />
        <span>{label}</span>
      </p>
      <h2 className="mt-[1.8vh] font-display text-deck-h leading-[1.02]">{title}</h2>
      {subtitle ?
      <p className={`mt-[1.6vh] max-w-[64vw] text-deck-body leading-snug ${dark ? 'text-canvas/65' : 'text-muted'}`}>
          {subtitle}
        </p> :
      null}
    </header>);

}