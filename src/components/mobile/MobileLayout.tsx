import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SignalIcon, WifiIcon, BatteryFullIcon } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { DemoGuide } from './DemoGuide';

const navRoutes = ['/app', '/app/activity', '/app/offers', '/app/profile'];

export function MobileLayout() {
  const { pathname } = useLocation();
  const scrollRef = useRef<HTMLElement>(null);
  const showNav = navRoutes.includes(pathname.replace(/\/$/, ''));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex w-full flex-1 items-start justify-center gap-12 md:px-6 md:py-6">
      <DemoGuide />
      <div className="relative flex h-[calc(100dvh-48px)] w-full flex-col overflow-hidden bg-canvas md:h-[min(844px,calc(100dvh-96px))] md:min-h-[640px] md:w-[390px] md:rounded-[52px] md:border-[10px] md:border-ink md:shadow-device">
        <div className="hidden h-11 shrink-0 items-center justify-between bg-canvas px-7 text-ink md:flex" aria-hidden="true">
          <span className="text-sm font-bold">14:41</span>
          <span className="h-6 w-24 rounded-full bg-ink" />
          <span className="flex items-center gap-1">
            <SignalIcon className="h-3.5 w-3.5" />
            <WifiIcon className="h-3.5 w-3.5" />
            <BatteryFullIcon className="h-4 w-4" />
          </span>
        </div>
        <main ref={scrollRef} className="no-scrollbar relative flex-1 overflow-y-auto">
          <Outlet />
        </main>
        {showNav && <BottomNav />}
        <div id="phone-overlay" className="pointer-events-none absolute inset-0 z-40" />
      </div>
    </div>);

}