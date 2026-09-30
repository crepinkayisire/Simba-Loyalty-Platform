import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon, CrownIcon, TagIcon, GiftIcon, CakeIcon, BellOffIcon, MegaphoneIcon, PercentIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { ScreenHeader } from '../../components/mobile/ScreenHeader';
import type { NotificationKind } from '../../types/loyalty';

type Filter = 'all' | 'promos' | 'points' | 'birthdays' | 'news';

const kindStyle: Record<NotificationKind, {icon: typeof StarIcon;cls: string;filter: Filter;}> = {
  earned: { icon: StarIcon, cls: 'bg-gold-soft text-gold', filter: 'points' },
  reward: { icon: GiftIcon, cls: 'bg-gold-soft text-gold', filter: 'points' },
  tier: { icon: CrownIcon, cls: 'bg-gold-soft text-gold', filter: 'points' },
  offer: { icon: TagIcon, cls: 'bg-simba-soft text-simba', filter: 'promos' },
  promo: { icon: PercentIcon, cls: 'bg-simba-soft text-simba', filter: 'promos' },
  birthday: { icon: CakeIcon, cls: 'bg-leaf-soft text-leaf', filter: 'birthdays' },
  announcement: { icon: MegaphoneIcon, cls: 'bg-sand text-ink', filter: 'news' }
};

const filters: {id: Filter;label: string;}[] = [
{ id: 'all', label: 'All' },
{ id: 'promos', label: 'Promos' },
{ id: 'points', label: 'Points' },
{ id: 'birthdays', label: 'Birthdays' },
{ id: 'news', label: 'Announcements' }];


export function Notifications() {
  const navigate = useNavigate();
  const { notifications: allNotifications, unreadIds, markRead, markAllRead } = useLoyalty();
  const [filter, setFilter] = useState<Filter>('all');
  const notifications = filter === 'all' ? allNotifications : allNotifications.filter((n) => kindStyle[n.kind].filter === filter);

  return (
    <div className="pb-10">
      <ScreenHeader
        title="Notifications"
        action={
        unreadIds.length > 0 ?
        <button type="button" onClick={markAllRead} className="whitespace-nowrap px-1 text-sm font-bold text-simba">
              Mark all read
            </button> :
        null
        } />
      
      <div className="flex gap-2 overflow-x-auto px-5 pb-3 pt-1 [scrollbar-width:none]" role="tablist" aria-label="Notification type">
        {filters.map((f) =>
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={filter === f.id}
          onClick={() => setFilter(f.id)}
          className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors duration-150 ${
          filter === f.id ? 'bg-ink text-white' : 'bg-white text-ink-soft shadow-card hover:text-ink'}`
          }>
          
            {f.label}
          </button>
        )}
      </div>
      {notifications.length === 0 ?
      <div className="flex flex-col items-center px-8 pt-16 text-center">
          <BellOffIcon className="h-10 w-10 text-muted" aria-hidden="true" />
          <p className="mt-4 font-bold text-ink">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">We'll let you know when there's something new.</p>
        </div> :

      <ul className="mx-5 mt-2 divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">
          {notifications.map((n) => {
          const unread = unreadIds.includes(n.id);
          const { icon: Icon, cls } = kindStyle[n.kind];
          return (
            <li key={n.id}>
                <button
                type="button"
                onClick={() => {
                  markRead(n.id);
                  navigate(n.link);
                }}
                className={`flex w-full gap-3.5 p-4 text-left transition-colors duration-150 hover:bg-canvas ${unread ? 'bg-simba-soft/40' : ''}`}>
                
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${cls}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className={`text-[15px] leading-snug text-ink ${unread ? 'font-extrabold' : 'font-semibold'}`}>{n.title}</span>
                      {unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-simba" aria-label="Unread" />}
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-soft">{n.body}</span>
                    <span className="mt-1 block text-xs font-semibold text-muted">{n.time}</span>
                  </span>
                </button>
              </li>);

        })}
        </ul>
      }
    </div>);

}