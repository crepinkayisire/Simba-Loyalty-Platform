import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { tierTheme } from '../../utils/tierTheme';
import { LionMark } from '../brand/LionMark';
import { codeFor, CODE_PERIOD } from '../../utils/checkoutCode';
import type { CardLevel } from '../../types/loyalty';

interface DebitCardProps {
  name: string;
  level: CardLevel;
  /** Formatted as MM/YYYY. */
  customerSince: string;
  cardBalance: number;
  points: number;
}

const PERIOD = CODE_PERIOD;
// Hollow countdown ring: thin track, with only the remaining segment stroked.
const RING_R = 8.5;
const RING = 2 * Math.PI * RING_R;

/** Live Simba+ card. Same layout as the deck's MembershipCard, sized in em off the card width. */
export function DebitCard({ name, level, customerSince, cardBalance, points }: DebitCardProps) {
  const [now, setNow] = useState(() => Date.now());
  const t = tierTheme[level];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = now / 1000;
  const code = codeFor(name, Math.floor(seconds / PERIOD));
  const remaining = Math.ceil(PERIOD - seconds % PERIOD);
  const elapsed = seconds % PERIOD / PERIOD;

  return (
    <section aria-label={`${level} Simba+ card for ${name}`} className="w-full" style={{ aspectRatio: '1.586', containerType: 'inline-size' }}>
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden shadow-lift transition-colors duration-200 ${t.bg} ${t.text}`}
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
              <span
                className={`mt-[0.6em] inline-block rounded-full px-[0.9em] py-[0.35em] font-semibold leading-none tracking-[0.18em] ${t.pill}`}
                style={{ fontSize: '0.7em' }}>
                
                {level.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end pt-[0.1em]">
            <p className="font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              CHECKOUT CODE
            </p>
            <div className="mt-[0.4em] flex items-center gap-[0.4em]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={code}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="num font-extrabold leading-none tracking-[-0.01em]"
                  style={{ fontSize: '1.57em' }}
                  aria-live="polite">
                  
                  {code}
                </motion.p>
              </AnimatePresence>
              <span className="flex h-[1.6em] w-[1.6em] shrink-0" role="img" aria-label={`New code in ${remaining} seconds`}>
                <svg viewBox="0 0 20 20" className="h-full w-full -rotate-90" aria-hidden="true">
                  <circle cx="10" cy="10" r={RING_R} fill="none" stroke={t.fg} strokeOpacity="0.85" strokeWidth="1" />
                  <circle
                    cx="10"
                    cy="10"
                    r={RING_R}
                    fill="none"
                    stroke={t.fg}
                    strokeWidth="2.25"
                    strokeDasharray={RING}
                    strokeDashoffset={RING * elapsed} />
                  
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-auto">
          <p className="truncate font-extrabold leading-tight tracking-[0.12em]" style={{ fontSize: '1.43em' }}>
            {name.toUpperCase()}
          </p>
          <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
            CUSTOMER SINCE {customerSince}
          </p>
        </div>

        <div className="relative mt-[1.15em] grid grid-cols-2">
          <div className="pr-[0.85em]">
            <p className="num flex items-baseline font-extrabold leading-none tracking-[-0.02em]" style={{ fontSize: '1.93em' }}>
              {cardBalance.toLocaleString('en-US')}
              <span className="ml-[0.25em] font-semibold tracking-normal" style={{ fontSize: '0.48em' }}>
                RWF
              </span>
            </p>
            <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              CARD BALANCE
            </p>
          </div>
          <div className="relative pl-[1.15em]">
            <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-current opacity-60" />
            <p className="num flex items-baseline font-extrabold leading-none tracking-[-0.02em]" style={{ fontSize: '1.93em' }}>
              {points.toLocaleString('en-US')}
              <span className="ml-[0.25em] font-semibold tracking-normal" style={{ fontSize: '0.48em' }}>
                pts
              </span>
            </p>
            <p className="mt-[0.5em] font-medium leading-none tracking-[0.24em] opacity-85" style={{ fontSize: '0.64em' }}>
              SIMBA+ POINTS
            </p>
          </div>
        </div>

        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_45%)]" />
      </div>
    </section>);

}