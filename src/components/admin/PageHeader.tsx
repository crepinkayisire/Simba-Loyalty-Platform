import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, eyebrow, actions }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="mb-2 text-sm font-semibold text-muted">{eyebrow}</div>}
        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>);

}