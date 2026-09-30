import React from 'react';
import { CrownIcon } from 'lucide-react';
import type { TierName } from '../../types/loyalty';

interface TierBadgeProps {
  tier: TierName;
  onDark?: boolean;
}

export function TierBadge({ tier, onDark = false }: TierBadgeProps) {
  const styles: Record<TierName, string> = {
    Member: onDark ? 'bg-white/15 text-white' : 'bg-sand text-ink-soft',
    Gold: onDark ? 'bg-gold-bright text-ink' : 'bg-gold-soft text-gold',
    Platinum: onDark ? 'bg-white text-platinum' : 'bg-platinum-soft text-platinum'
  };
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${styles[tier]}`}>
      {tier !== 'Member' && <CrownIcon className="h-3.5 w-3.5" aria-hidden="true" />}
      {tier} Member
    </span>);

}