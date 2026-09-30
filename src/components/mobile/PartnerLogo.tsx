import React, { useState } from 'react';
import type { Partner } from '../../data/benefits';
import { LionMark } from '../brand/LionMark';

interface PartnerLogoProps {
  partner: Partner;
  size?: 'sm' | 'md';
}

const sizes = {
  sm: { box: 'h-8 w-8 rounded-lg p-1 text-[10px]', ring: 'ring-2 ring-white' },
  md: { box: 'h-12 w-12 rounded-xl p-1.5 text-sm', ring: '' }
};

export function PartnerLogo({ partner, size = 'md' }: PartnerLogoProps) {
  const [failed, setFailed] = useState(false);
  const s = sizes[size];

  if (partner.id === 'simba') {
    return (
      <span className={`flex shrink-0 items-center justify-center overflow-hidden border border-line bg-white ${s.box} ${s.ring}`}>
        <LionMark tone="orange" className="h-full" />
        <span className="sr-only">{partner.name} logo</span>
      </span>);

  }

  if (failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center font-extrabold text-white ${s.box} ${s.ring}`}
        style={{ backgroundColor: partner.color }}
        aria-hidden="true">
        
        {partner.short}
      </span>);

  }

  return (
    <span className={`flex shrink-0 items-center justify-center overflow-hidden border border-line bg-white ${s.box} ${s.ring}`}>
      <img
        src={partner.logo}
        alt={`${partner.name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain" />
      
    </span>);

}