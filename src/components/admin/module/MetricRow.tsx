import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUpIcon, TrendingDownIcon, ArrowUpRightIcon } from 'lucide-react';
import type { Metric } from '../../../types/console';

const colsFor: Record<number, string> = { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' };

export function MetricRow({ metrics }: {metrics: Metric[];}) {
  if (!metrics.length) return null;
  return (
    <section aria-label="Key metrics" className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line shadow-card ${colsFor[metrics.length] ?? 'md:grid-cols-4'}`}>
      {metrics.map((m) => {
        const body =
        <>
            <p className="flex items-center justify-between gap-2 text-xs font-bold text-muted">
              <span className="truncate">{m.label}</span>
              {m.to && <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-simba" aria-hidden="true" />}
            </p>
            <p className="num mt-1 truncate text-[26px] font-extrabold leading-tight tracking-tight text-ink">{m.value}</p>
            {m.hint &&
          <p
            className={`mt-1 flex items-center gap-1 truncate text-xs font-semibold ${
            m.tone === 'up' ? 'text-leaf' : m.tone === 'down' ? 'text-simba-dark' : 'text-muted'}`
            }>
            
                {m.tone === 'up' && <TrendingUpIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                {m.tone === 'down' && <TrendingDownIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                <span className="truncate">{m.hint}</span>
              </p>
          }
          </>;

        return m.to ?
        <Link key={m.label} to={m.to} className="block bg-white px-5 py-4 transition-colors duration-150 hover:bg-canvas">
            {body}
          </Link> :

        <div key={m.label} className="bg-white px-5 py-4">
            {body}
          </div>;

      })}
    </section>);

}