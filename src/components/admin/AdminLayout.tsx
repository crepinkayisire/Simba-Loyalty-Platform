import React, { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboardIcon, UsersIcon, ArrowLeftRightIcon, CrownIcon, HandshakeIcon, TicketPercentIcon, Settings2Icon } from 'lucide-react';
import { LionMark } from '../brand/LionMark';

const nav = [
{ to: '/admin', label: 'Overview', icon: LayoutDashboardIcon, end: true },
{ to: '/admin/memberships', label: 'Memberships', icon: CrownIcon },
{ to: '/admin/customers', label: 'Customers', icon: UsersIcon },
{ to: '/admin/transactions', label: 'Transactions', icon: ArrowLeftRightIcon },
{ to: '/admin/partners', label: 'Partners', icon: HandshakeIcon },
{ to: '/admin/promotions', label: 'Promotions', icon: TicketPercentIcon },
{ to: '/admin/settings', label: 'Settings', icon: Settings2Icon }];


export function AdminLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex w-full flex-1">
      <aside className="sticky top-12 hidden h-[calc(100vh-48px)] w-60 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <div className="px-5 py-5">
          <div className="flex items-center gap-2">
            <LionMark tone="orange" className="h-11 shrink-0" />
            <div>
              <p className="text-2xl font-bold leading-none tracking-tight text-simba" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                Simba<span className="ml-0.5 font-sans font-extrabold">+</span>
              </p>
              <p className="mt-1 text-xs font-semibold leading-none text-muted">Management console</p>
            </div>
          </div>
        </div>
        <nav aria-label="Console" className="thin-scrollbar flex-1 overflow-y-auto px-3">
          <ul className="space-y-0.5">
            {nav.map(({ to, label, icon: Icon, end }) =>
            <li key={to}>
                <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors duration-150 ${
                isActive ? 'bg-simba-soft text-simba' : 'text-ink-soft hover:bg-canvas hover:text-ink'}`

                }>
                
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                  <span className="truncate">{label}</span>
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="border-t border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">DM</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">Diane Mutesi</p>
              <p className="text-xs text-muted">Loyalty Manager</p>
            </div>
          </div>
          <p className="mt-4 text-[11px] font-semibold text-muted/80">Powered by Kayko</p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <nav aria-label="Console" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-line bg-white px-3 py-2 lg:hidden">
          {nav.map(({ to, label, end }) =>
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
            `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-bold ${isActive ? 'bg-simba-soft text-simba' : 'text-ink-soft'}`
            }>
            
              {label}
            </NavLink>
          )}
        </nav>
        <div className="mx-auto w-full max-w-[1320px] px-4 py-6 md:px-8 md:py-8">
          <Outlet />
        </div>
      </div>
    </div>);

}