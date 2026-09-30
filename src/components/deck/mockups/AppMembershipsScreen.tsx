import React from 'react';
import { tierTheme } from '../../../utils/tierTheme';
import type { CardLevel } from '../../../types/loyalty';

const STACK: CardLevel[] = ['Bronze', 'Silver', 'Gold'];

const GROUPS = [
{ group: 'Offers', title: 'Serena Hotels', detail: '15% off dining & spa' },
{ group: 'Rewards', title: 'Points for visiting', detail: '50 pts per store visit' },
{ group: 'Discounts', title: 'Simba checkout', detail: '5% off every basket' }];


export function AppMembershipsScreen() {
  return (
    <div className="flex h-full flex-col px-[1.1em] pb-[1.2em] pt-[2.8em] text-ink">
      <p className="font-display text-[1.35em] font-bold">Memberships</p>

      <div className="mt-[0.8em] flex flex-col">
        {STACK.map((level, i) => {
          const t = tierTheme[level];
          const open = i === STACK.length - 1;
          return (
            <div
              key={level}
              className={`flex flex-col rounded-[0.9em] px-[0.9em] py-[0.7em] shadow-[0_-0.3em_0.8em_rgba(27,23,20,0.12)] ${t.bg} ${t.text}`}
              style={{ marginTop: i === 0 ? 0 : '-0.6em', height: open ? '6.6em' : '2.8em' }}>
              
              <div className="flex items-center justify-between text-[0.72em] font-bold">
                <span>Simba+ {level}</span>
                <span className={`rounded-full px-[0.6em] py-[0.1em] text-[0.85em] ${t.pill}`}>{open ? 'Your tier' : 'Included'}</span>
              </div>
              {open ?
              <>
                  <p className="mt-[0.4em] font-display text-[1.3em] font-extrabold leading-none">5% off</p>
                  <p className={`mt-auto text-[0.62em] font-semibold ${t.sub}`}>Serena · Marriott · Equity</p>
                </> :
              null}
            </div>);

        })}
      </div>

      <p className="mt-[1.1em] text-[0.8em] font-bold">Simba+ Gold Offers</p>
      <div className="mt-[0.4em] flex flex-col gap-[0.6em]">
        {GROUPS.map((g) =>
        <div key={g.group}>
            <p className="text-[0.6em] font-semibold text-muted">{g.group}</p>
            <div className="mt-[0.2em] rounded-[0.8em] bg-white px-[0.8em] py-[0.55em]">
              <p className="text-[0.74em] font-semibold">{g.title}</p>
              <p className="text-[0.6em] text-muted">{g.detail}</p>
            </div>
          </div>
        )}
      </div>
    </div>);

}