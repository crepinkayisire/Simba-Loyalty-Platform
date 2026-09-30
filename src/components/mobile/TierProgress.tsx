import React from 'react';
import { motion } from 'framer-motion';
import { useLoyalty } from '../../contexts/LoyaltyContext';

interface TierProgressProps {
  tone?: 'light' | 'dark';
}

export function TierProgress({ tone = 'light' }: TierProgressProps) {
  const { qualifyingPoints, platinumThreshold, pointsToPlatinum } = useLoyalty();
  const pct = Math.min(100, qualifyingPoints / platinumThreshold * 100);
  const track = tone === 'dark' ? 'bg-white/15' : 'bg-sand';
  const label = tone === 'dark' ? 'text-white/70' : 'text-muted';
  const strong = tone === 'dark' ? 'text-white' : 'text-ink';

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <p className={`font-semibold ${strong}`}>
          <span className="num font-extrabold">{pointsToPlatinum.toLocaleString('en-US')}</span> points until Platinum
        </p>
        <p className={`num text-xs font-semibold ${label}`}>
          {qualifyingPoints.toLocaleString('en-US')} / {platinumThreshold.toLocaleString('en-US')}
        </p>
      </div>
      <div
        className={`mt-2.5 h-2.5 w-full overflow-hidden rounded-full ${track}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={platinumThreshold}
        aria-valuenow={qualifyingPoints}
        aria-label="Progress to Platinum">
        
        <motion.div
          className="h-full rounded-full bg-gold-bright"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
        
      </div>
      <div className={`mt-1.5 flex justify-between text-[11px] font-bold ${label}`}>
        <span>Gold</span>
        <span>Platinum</span>
      </div>
    </div>);

}