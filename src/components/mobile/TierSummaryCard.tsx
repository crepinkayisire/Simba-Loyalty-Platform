import React from 'react';
import { ArrowRightIcon, CircleCheckIcon, LockIcon, StarIcon } from 'lucide-react';
import { PartnerLogo } from './PartnerLogo';
import { partners, type TierBenefits } from '../../data/benefits';
import { tierTheme } from '../../utils/tierTheme';
import { CardGloss } from './CardGloss';
import { LionMark } from '../brand/LionMark';

export const TIER_CARD_HEIGHT = 236;

interface TierSummaryCardProps {
  tier: TierBenefits;
  status: 'current' | 'included' | 'locked';
  balance: number;
  expanded: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

const theme = tierTheme;

export function TierSummaryCard({ tier, status, balance, expanded, onSelect, onOpen }: TierSummaryCardProps) {
  const t = theme[tier.level];
  const headline = tier.benefits.find((b) => b.partner === 'simba');
  const partnerBenefits = tier.benefits.filter((b) => b.partner !== 'simba');
  const ctaText =
  status === 'current' ?
  'Your tier' :
  status === 'included' ?
  'Included in your tier' :
  `Unlock with ${tier.upgradePoints.toLocaleString('en-US')} pts`;
  const canAfford = balance >= tier.upgradePoints;

  return (
    <button
      type="button"
      onClick={expanded ? onOpen : onSelect}
      aria-expanded={expanded}
      aria-label={expanded ? `Open Simba+ ${tier.level} offers` : `Show Simba+ ${tier.level} summary`}
      className={`relative isolate flex w-full flex-col overflow-hidden rounded-[22px] px-5 pb-4 pt-4 text-left shadow-lift ${t.bg} ${t.text}`}
      style={{ height: TIER_CARD_HEIGHT }}>
      
      <LionMark
        color={t.watermark.color}
        opacity={t.watermark.opacity}
        className="absolute -right-14 top-1/2 -z-10 h-[150%] -translate-y-[46%]" />
      
      <div className="flex h-8 items-center justify-between gap-2">
        <p className="text-lg font-extrabold">
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif' }} className="font-bold">Simba+</span> {tier.level}
        </p>
        {status === 'locked' ?
        <LockIcon className={`h-4 w-4 ${t.sub}`} aria-label="Locked" /> :

        <CircleCheckIcon className="h-4 w-4" aria-label="Active" />
        }
      </div>

      <div className="mt-3 flex flex-1 gap-4">
        {headline &&
        <p className="text-[28px] font-extrabold leading-none tracking-tight">
            {headline.title.replace(' at checkout', '')}
            <span className={`mt-1 block text-xs font-semibold tracking-normal ${t.sub}`}>at Simba checkout</span>
          </p>
        }
        <ul className={`min-w-0 flex-1 space-y-1 pt-0.5 text-[13px] leading-snug ${t.sub}`}>
          {partnerBenefits.slice(0, 3).map((b) =>
          <li key={b.partner} className="truncate">
              {b.title}
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col items-start gap-3">
        <span className="flex -space-x-2">
          {partnerBenefits.slice(0, 5).map((b) =>
          <PartnerLogo key={b.partner} partner={partners[b.partner]} size="sm" />
          )}
        </span>
        <span className={`num flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-extrabold ${t.pill}`}>
          {status === 'locked' && canAfford && <StarIcon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />}
          {ctaText}
          <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <CardGloss />
    </button>);

}