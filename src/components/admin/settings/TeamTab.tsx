import React from 'react';
import { CheckIcon, EyeIcon } from 'lucide-react';
import { ModulePage } from '../module/ModulePage';
import { StatusBadge } from '../StatusBadge';
import { useCollection, useCollectionRows } from '../../../contexts/ConsoleContext';
import { stores, type StoreRow } from '../../../data/admin/stores';
import { permissionModules, permissions, roles, teamSeed, teamStatuses, type TeamMember } from '../../../data/admin/team';
import { initials } from '../../../utils/format';
import { newId } from '../../../utils/id';
import type { ColumnDef, FieldDef } from '../../../types/console';

const columns: ColumnDef<TeamMember>[] = [
{
  id: 'name',
  header: 'Member',
  cell: (m) =>
  <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">{initials(m.name || '?')}</span>
        <div>
          <p className="font-bold text-ink">{m.name}</p>
          <p className="text-xs text-muted">{m.email}</p>
        </div>
      </div>,

  sortValue: (m) => m.name
},
{ id: 'role', header: 'Role', cell: (m) => <span className="font-semibold text-ink">{m.role}</span>, sortValue: (m) => m.role },
{ id: 'stores', header: 'Store access', cell: (m) => <span className="text-ink-soft">{m.stores}</span>, hideBelow: 'md' },
{ id: 'last', header: 'Last active', cell: (m) => <span className="text-ink-soft">{m.lastActive}</span>, hideBelow: 'lg' },
{ id: 'status', header: 'Status', cell: (m) => <StatusBadge label={m.status} /> }];


/** Staff accounts, their roles and what each role can do. */
export function TeamTab() {
  const { rows, save, remove } = useCollection<TeamMember>('team', teamSeed);
  const storeNames = useCollectionRows<StoreRow>('stores', stores).map((s) => s.name.replace(/^Simba /, ''));

  const fields: FieldDef<TeamMember>[] = [
  { key: 'name', label: 'Full name', type: 'text', required: true },
  { key: 'email', label: 'Email', type: 'text', required: true, half: true },
  { key: 'phone', label: 'Phone', type: 'text', half: true },
  { key: 'role', label: 'Role', type: 'select', options: roles, half: true, help: 'See the permissions table below' },
  { key: 'status', label: 'Status', type: 'select', options: teamStatuses, half: true },
  { key: 'stores', label: 'Store access', type: 'multiselect', options: storeNames, allLabel: 'All stores', required: true }];


  return (
    <>
    <ModulePage
        hideHeader
        title="Team & permissions"
        subtitle=""
        metrics={[]}
        tableTitle="Team"
        entity="team member"
        rows={rows}
        columns={columns}
        searchKeys={['name', 'email', 'role']}
        filter={{ key: 'role', label: 'Roles', options: roles }}
        fields={fields}
        newRecord={() => ({ id: newId('u'), name: '', email: '', phone: '+250 7', role: 'Cashier', stores: storeNames[0] ?? '', status: 'Invited', lastActive: '—' })}
        onSave={save}
        onDelete={remove}
        recordLabel={(m) => m.name || 'Team member'} />
      
      <section className="mt-6 rounded-2xl bg-white shadow-card" aria-label="Role permissions">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-base font-extrabold text-ink">Role permissions</h2>
          <p className="mt-0.5 text-sm text-muted">What each role can see and change</p>
        </div>
        <div className="thin-scrollbar overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-xs font-bold text-muted">
                <th scope="col" className="px-5 py-3 text-left">Role</th>
                {permissionModules.map((m) =>
                <th key={m} scope="col" className="px-3 py-3 text-center">{m}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {roles.map((r) =>
              <tr key={r} className="border-b border-line/70 last:border-0">
                  <th scope="row" className="whitespace-nowrap px-5 py-3 text-left font-bold text-ink">{r}</th>
                  {permissionModules.map((m) => {
                  const p = permissions[r]?.[m] ?? '';
                  return (
                    <td key={m} className="px-3 py-3 text-center">
                        {p === 'edit' ?
                      <span className="inline-flex items-center gap-1 rounded-full bg-leaf-soft px-2 py-0.5 text-xs font-bold text-leaf">
                            <CheckIcon className="h-3 w-3" strokeWidth={3} aria-hidden="true" /> Edit
                          </span> :
                      p === 'view' ?
                      <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2 py-0.5 text-xs font-bold text-ink-soft">
                            <EyeIcon className="h-3 w-3" aria-hidden="true" /> View
                          </span> :

                      <span className="text-muted" aria-label="No access">—</span>
                      }
                      </td>);

                })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>);

}