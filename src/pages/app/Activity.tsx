import React from 'react';
import { ActivityFeed } from '../../components/mobile/ActivityFeed';
import { TabTopBar } from '../../components/mobile/TabTopBar';

export function Activity() {
  return (
    <div className="px-5 pb-10">
      <TabTopBar />
      <div className="pt-2">
        <h1 className="text-[26px] font-extrabold tracking-tight text-ink">Activity</h1>
        <p className="mt-0.5 text-sm text-muted">Your card payments, top-ups and Simba+ points</p>
      </div>
      <ActivityFeed />
    </div>);

}