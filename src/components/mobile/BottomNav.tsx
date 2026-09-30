import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ReceiptTextIcon, CrownIcon, UserRoundIcon } from 'lucide-react';

const items = [
{ to: '/app', label: 'Home', icon: HomeIcon },
{ to: '/app/activity', label: 'Activity', icon: ReceiptTextIcon },
{ to: '/app/offers', label: 'Memberships', icon: CrownIcon },
{ to: '/app/profile', label: 'Profile', icon: UserRoundIcon }];


export function BottomNav() {
  return (
    <nav aria-label="Primary" className="shrink-0 border-t border-line bg-white pb-3 pt-2 md:pb-5">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon }) =>
        <li key={to}>
            <NavLink
            to={to}
            end
            className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1 text-[11px] font-bold transition-colors duration-150 ${
            isActive ? 'text-simba' : 'text-muted hover:text-ink'}`

            }>
            
              {({ isActive }) =>
            <>
                  <Icon className="h-6 w-6" strokeWidth={isActive ? 2.4 : 1.8} aria-hidden="true" />
                  {label}
                </>
            }
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}