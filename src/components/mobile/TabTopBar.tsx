import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { SimbaLogo } from '../brand/SimbaLogo';

/** Logo and notification bell shown at the top of every bottom-nav screen. */
export function TabTopBar() {
  const { unreadIds } = useLoyalty();
  const badge = unreadIds.length;

  return (
    <div className="flex h-14 items-center justify-between">
      <SimbaLogo size="sm" withPlus />
      <Link
        to="/app/notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
        aria-label={`Notifications, ${badge} unread`}>
        
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        {badge > 0 &&
        <span className="num absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-simba px-1 text-[10px] font-bold text-white">
            {badge}
          </span>
        }
      </Link>
    </div>);

}