import React from 'react';

interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Panel({ title, subtitle, action, className = '', children }: PanelProps) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-card ${className}`}>
      {(title || action) &&
      <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-extrabold text-ink">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      }
      {children}
    </section>);

}