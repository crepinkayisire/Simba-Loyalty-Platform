import React from 'react';
import { MembershipCard } from '../MembershipCard';
import { LionMark } from '../../brand/LionMark';
import { Reveal } from '../Reveal';
import { SlideFrame } from '../SlideFrame';
import { SlideTitle } from '../SlideTitle';
import { memberships } from '../../../data/deck/memberships';
import { partners, tierBenefits } from '../../../data/benefits';

const STAGGER = ['4.5vh', '3vh', '1.5vh', '0vh'];

function MembershipPrice({ tier }: {tier: string;}) {
  const t = tierBenefits.find((b) => b.level === tier);
  if (!t || t.upgradeRWF === 0) {
    return <p className="tnum mt-[1.2vh] font-display text-deck-body leading-none">Free<span className="ml-[0.4vw] font-sans text-deck-label text-muted">for every member</span></p>;
  }
  return (
    <p className="tnum mt-[1.2vh] font-display text-deck-body leading-none">
      RWF {t.upgradeRWF.toLocaleString('en-US')}
      <span className="ml-[0.4vw] font-sans text-deck-label text-muted">/ year · or {t.upgradePoints.toLocaleString('en-US')} pts</span>
    </p>);

}

export function MembershipsSlide() {

  return (
    <SlideFrame page={5}>
      <SlideTitle section="05" label="Memberships" title="One relationship. Four levels of membership." />

      <div className="mt-[4vh] grid grid-cols-4 gap-[2vw]">
        {memberships.map((m, i) =>
        <Reveal key={m.tier} index={i} y={14} style={{ paddingTop: STAGGER[i] }}>
            <MembershipCard
            tier={m.tier}
            label={m.label}
            width="100%"
            holder={m.holder}
            since={m.since}
            balance={m.balance}
            points={m.points}
            code={m.code} />
          
          </Reveal>
        )}
      </div>

      <div className="relative mt-[3vh] grid grid-cols-4 items-start gap-[2vw]">
        <span aria-hidden className="absolute left-0 right-0 top-[0.5vw] h-[2px] bg-simba/40" />
        {memberships.map((m, i) =>
        <div key={m.tier} className="relative">
            <span
            aria-hidden
            className={`block h-[1.1vw] w-[1.1vw] rounded-full border-2 ${i === 3 ? 'border-simba bg-simba' : 'border-simba bg-canvas'}`} />
          
            <p className="mt-[1.8vh] text-deck-label font-bold tracking-[0.21vw]">{m.name.toUpperCase()}</p>
            <p className={`mt-[0.4vh] text-deck-label ${i === 3 ? 'font-semibold text-ink' : 'text-muted'}`}>{m.promise}</p>
            <MembershipPrice tier={m.tier} />
            <ul className="mt-[1.8vh] border-t border-line">
              {(tierBenefits.find((t) => t.level === m.tier)?.benefits ?? []).map((b) => {
              const partner = partners[b.partner];
              return (
                <li key={b.partner} className="flex items-center gap-[0.6vw] border-b border-line py-[0.8vh]">
                    <span className="flex h-[1.9vw] w-[1.9vw] shrink-0 items-center justify-center overflow-hidden rounded-[0.35vw] border border-line bg-white">
                      {partner?.id === 'simba' ?
                    <LionMark tone="orange" className="h-[80%]" /> :
                    partner?.logo ?
                    <img src={partner.logo} alt="" className="max-h-[80%] max-w-[80%] object-contain" /> :
                    null}
                    </span>
                    <span className="min-w-0 text-deck-label font-semibold leading-tight">
                      <span className="sr-only">{partner?.name}: </span>
                      {b.title}
                    </span>
                  </li>);

            })}
            </ul>
          </div>
        )}
      </div>

    </SlideFrame>);

}