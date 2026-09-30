import React, { type CSSProperties } from 'react';
import { tierTheme } from '../../utils/tierTheme';
import { LionMark } from '../brand/LionMark';
import type { CardLevel } from '../../types/loyalty';

type MembershipCardProps = {
  tier: CardLevel;
  width: string;
  holder?: string;
  since?: string;
  balance?: string;
  points?: string;
  code?: string;
  /** Tier pill text; defaults to the tier name. Pass '' to hide the pill (the everyday Simba+ membership). */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

const RING_R = 8.5;
const RING = 2 * Math.PI * RING_R;

/** Static replica of the app's Simba+ card, sized in em so it scales with its width. */
export function MembershipCard({
  tier,
  width,
  holder = 'Joseph Mutabazi',
  since = '03/2024',
  balance = '48,500',
  points = '3,175',
  code = '482 913',
  label,
  className = '',
  style
}: MembershipCardProps) {
  const t = tierTheme[tier];
  return (
    <div className={`deck-ui ${className}`} style={{ width, aspectRatio: '1.586', containerType: 'inline-size', ...style }}>
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden shadow-[0_2vh_4vh_-1.6vh_rgba(28,23,20,0.45)] ${t.bg} ${t.text}`}
        style={{ borderRadius: '6cqw', fontSize: '4cqw', padding: '1.7em 1.7em 1.4em' }}>
        
        <LionMark
          color={t.watermark.color}
          opacity={t.watermark.opacity}
          className="absolute -right-[12%] top-1/2 h-[125%] -translate-y-1/2" />
        

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-[0.85em]">
            <LionMark tone={t.lion} className="h-[3.4em] shrink-0" />
            <div>
              <p className="leading-none" style={{ fontSize: '1.75em', fontWeight: 400, fontFamily: '"DM Serif Display", Georgia, serif' }}>
                Simba+
              </p>
              {label !== '' ?
              <span className={`mt-[0.6em] inline-block rounded-full px-[0.9em] py-[0.35em] font-semibold leading-none tracking-[0.18em] ${t.pill}`} style={{ fontSize: '0.7em' }}>
                  {(label ?? tier).toUpperCase()}
                </span> :
              null}
            </div>
          </div>
          <div className="flex flex-col items-end pt-[0.1em]">
            <p className="font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              CHECKOUT CODE
            </p>
            <div className="mt-[0.4em] flex items-center gap-[0.4em]">
              <p className="tnum font-extrabold leading-none tracking-[-0.01em]" style={{ fontSize: '1.57em' }}>
                {code}
              </p>
              <svg viewBox="0 0 20 20" className="h-[1.6em] w-[1.6em] -rotate-90" aria-hidden>
                <circle cx="10" cy="10" r={RING_R} fill="none" stroke={t.fg} strokeOpacity="0.85" strokeWidth="1" />
                <circle cx="10" cy="10" r={RING_R} fill="none" stroke={t.fg} strokeWidth="2.25" strokeDasharray={RING} strokeDashoffset={RING * 0.75} />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative mt-auto">
          <p className="truncate font-extrabold leading-tight tracking-[0.12em]" style={{ fontSize: '1.43em' }}>
            {holder.toUpperCase()}
          </p>
          <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
            CUSTOMER SINCE {since}
          </p>
        </div>

        <div className="relative mt-[1.15em] grid grid-cols-2">
          <div className="pr-[0.85em]">
            <p className="tnum flex items-baseline font-extrabold leading-none tracking-[-0.02em]" style={{ fontSize: '1.93em' }}>
              {balance}
              <span className="ml-[0.25em] font-semibold tracking-normal" style={{ fontSize: '0.48em' }}>
                RWF
              </span>
            </p>
            <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              CARD BALANCE
            </p>
          </div>
          <div className="relative pl-[1.15em]">
            <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-current opacity-60" />
            <p className="tnum flex items-baseline font-extrabold leading-none tracking-[-0.02em]" style={{ fontSize: '1.93em' }}>
              {points}
              <span className="ml-[0.25em] font-semibold tracking-normal" style={{ fontSize: '0.48em' }}>
                pts
              </span>
            </p>
            <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              SIMBA+ POINTS
            </p>
          </div>
        </div>

        <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_45%)]" />
      </div>
    </div>);

}