import React from 'react';
import { NavLink } from 'react-router-dom';
import { RotateCcwIcon } from 'lucide-react';
import { SimbaLogo } from './brand/SimbaLogo';
import { useLoyalty } from '../contexts/LoyaltyContext';

const links = [
{ to: '/deck', label: 'Executive', short: 'Exec' },
{ to: '/app', label: 'Customer', short: 'Customer' },
{ to: '/pos', label: 'Cashier', short: 'Cashier' },
{ to: '/admin', label: 'Manager', short: 'Manager' }];


export function DemoBar() {
  const { reset } = useLoyalty();

  return (
    <header className="sticky top-0 z-40 flex h-12 w-full shrink-0 items-center justify-between gap-3 border-b border-line bg-white px-3 sm:px-5">
      <div className="flex items-center gap-3">
        <SimbaLogo size="sm" withPlus />
        <span className="hidden rounded-md bg-sand px-2 py-0.5 text-xs font-semibold text-muted md:inline">Prototype</span>
      </div>
      <nav aria-label="Experiences" className="flex items-center gap-1 rounded-xl bg-sand p-1">
        {links.map((link) =>
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
          `whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-bold transition-colors duration-150 sm:px-3 sm:text-sm ${
          isActive ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}`

          }>
          
            <span className="sm:hidden">{link.short}</span>
            <span className="hidden sm:inline">{link.label}</span>
          </NavLink>
        )}
      </nav>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-muted transition-colors duration-150 hover:bg-sand hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-simba sm:text-sm">
        
        <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Reset demo</span>
      </button>
    </header>);

}