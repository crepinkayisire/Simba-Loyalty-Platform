import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  legend?: {label: string;color: string;}[];
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, legend, children, className = '' }: ChartCardProps) {
  return (
    <section aria-label={title} className={`rounded-2xl bg-white p-5 shadow-card ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-ink">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
        </div>
        {legend &&
        <ul className="flex flex-wrap gap-3">
            {legend.map((l) =>
          <li key={l.label} className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: l.color }} aria-hidden="true" />
                {l.label}
              </li>
          )}
          </ul>
        }
      </div>
      <div className="mt-4">{children}</div>
    </section>);

}