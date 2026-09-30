import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { UserRoundIcon, ShieldCheckIcon, SlidersHorizontalIcon, StoreIcon, UsersIcon } from 'lucide-react';
import { PageHeader } from '../../components/admin/PageHeader';
import { UserProfileTab } from '../../components/admin/settings/UserProfileTab';
import { SecurityTab } from '../../components/admin/settings/SecurityTab';
import { BusinessSettingsTab } from '../../components/admin/settings/BusinessSettingsTab';
import { StoreLocationsTab } from '../../components/admin/settings/StoreLocationsTab';
import { TeamTab } from '../../components/admin/settings/TeamTab';

const tabs = [
{ id: 'profile', label: 'User profile', icon: UserRoundIcon, subtitle: 'Your own details and password' },
{ id: 'security', label: 'Security & audit logs', icon: ShieldCheckIcon, subtitle: 'Sign-in rules and every change made in the console' },
{ id: 'business', label: 'Business settings', icon: SlidersHorizontalIcon, subtitle: 'Your business profile and Simba+ business information' },
{ id: 'stores', label: 'Store locations', icon: StoreIcon, subtitle: 'Where Simba+ is live, and how well tills identify members' },
{ id: 'team', label: 'Team & permissions', icon: UsersIcon, subtitle: 'Staff accounts, their roles and store access' }] as
const;

type TabId = (typeof tabs)[number]['id'];

export function Settings() {
  const [params, setParams] = useSearchParams();
  const current = (tabs.find((t) => t.id === params.get('tab'))?.id ?? 'business') as TabId;
  const tab = tabs.find((t) => t.id === current)!;

  return (
    <div>
      <PageHeader title="Settings" subtitle={tab.subtitle} />
      <div role="tablist" aria-label="Settings sections" className="no-scrollbar -mt-2 mb-6 flex gap-1 overflow-x-auto border-b border-line">
        {tabs.map(({ id, label, icon: Icon }) =>
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={current === id}
          onClick={() => setParams({ tab: id })}
          className={`-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-bold transition-colors duration-150 ${
          current === id ? 'border-simba text-simba' : 'border-transparent text-ink-soft hover:text-ink'}`
          }>
          
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        )}
      </div>
      <div role="tabpanel" aria-label={tab.label}>
        {current === 'profile' && <UserProfileTab />}
        {current === 'security' && <SecurityTab />}
        {current === 'business' && <BusinessSettingsTab />}
        {current === 'stores' && <StoreLocationsTab />}
        {current === 'team' && <TeamTab />}
      </div>
    </div>);

}