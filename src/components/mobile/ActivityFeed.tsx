import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WalletIcon, StarIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { buildTimeline } from '../../utils/timeline';
import { ActivityDetailSheet, type FeedRow } from './ActivityDetailSheet';

const sourceStyle = {
  card: { icon: WalletIcon, cls: 'bg-simba-soft text-simba' },
  points: { icon: StarIcon, cls: 'bg-simba-soft text-simba' }
};

const toneCls = { leaf: 'text-leaf', ink: 'text-ink', muted: 'text-muted' };

interface ActivityFeedProps {
  /** Show only the latest N items with a "See more" link to the full Activity screen. */
  limit?: number;
}

export function ActivityFeed({ limit }: ActivityFeedProps) {
  const { cardHistory, activity } = useLoyalty();
  const [open, setOpen] = useState<FeedRow | null>(null);

  const allRows: FeedRow[] = buildTimeline(cardHistory, activity).map((e) => ({
    ...e,
    icon: sourceStyle[e.source].icon,
    iconCls: sourceStyle[e.source].cls
  }));
  const rows = limit ? allRows.slice(0, limit) : allRows;

  return (
    <section className={limit ? 'mt-8' : 'mt-2'} aria-labelledby={limit ? 'home-activity' : undefined} aria-label={limit ? undefined : 'All activity'}>
      {limit &&
      <div className="flex items-center justify-between">
          <h2 id="home-activity" className="text-lg font-extrabold text-ink">Activity</h2>
          <Link to="/app/activity" className="text-sm font-bold text-simba hover:text-simba-dark">
            See more
          </Link>
        </div>
      }

      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <li key={row.id}>
              <button
                type="button"
                onClick={() => setOpen(row)}
                className="flex w-full items-center gap-3.5 p-4 text-left transition-colors duration-150 hover:bg-canvas">
                
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${row.iconCls}`}
                  aria-label={row.source === 'card' ? 'Card' : 'Points'}>
                  
                  <Icon className={`h-5 w-5 ${row.source === 'points' ? 'fill-current' : ''}`} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold text-ink">{row.title}</span>
                  <span className="block truncate text-sm text-muted">{row.subtitle}</span>
                </span>
                <span className="shrink-0 text-right">
                  <span className={`num block text-[15px] font-extrabold ${toneCls[row.valueTone]}`}>{row.value}</span>
                  <span className="block text-xs text-muted">{row.date}</span>
                </span>
              </button>
            </li>);

        })}
      </ul>

      <AnimatePresence>{open && <ActivityDetailSheet row={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>);

}