import React from 'react';

const known: Record<string, string> = {
  Bronze: '#9A5F3B',
  Silver: '#D5DAE0',
  Gold: '#E6B34A',
  Platinum: '#1B1714'
};

/** Tier name on the tier's own colour. Works for tiers created in the console via `color`. */
export function TierPill({ tier, color }: {tier: string;color?: string;}) {
  const bg = color ?? known[tier] ?? '#E8E1D6';
  return (
    <span
      className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-extrabold"
      style={{ backgroundColor: bg, color: isLight(bg) ? '#1B1714' : '#FFFFFF' }}>
      
      {tier}
    </span>);

}

function isLight(hex: string): boolean {
  const h = hex.replace('#', '');
  if (h.length !== 6) return true;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 150;
}