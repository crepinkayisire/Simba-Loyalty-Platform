import React, { useState } from 'react';
import { Panel } from '../Panel';
import { Toggle } from '../Toggle';
import { DataTable } from '../module/DataTable';
import { DateRangeFilter } from '../DateRangeFilter';
import { auditModules, auditSeed, type AuditEntry } from '../../../data/admin/auditLog';
import { allTime, formatAt, inRange, type DateRange } from '../../../utils/dateRange';
import { inputClass, labelClass } from '../../../utils/styles';
import type { ColumnDef } from '../../../types/console';

const columns: ColumnDef<AuditEntry>[] = [
{ id: 'at', header: 'Date & time', cell: (a) => <span className="num text-ink-soft">{formatAt(a.at)}</span>, sortValue: (a) => a.at },
{ id: 'user', header: 'User', cell: (a) => <span className="font-bold">{a.user}</span>, sortValue: (a) => a.user },
{ id: 'module', header: 'Module', cell: (a) => <span className="text-ink-soft">{a.module}</span>, sortValue: (a) => a.module },
{ id: 'action', header: 'Action', cell: (a) => <span className={a.action.startsWith('Failed') ? 'font-bold text-simba-dark' : 'text-ink'}>{a.action}</span> },
{ id: 'detail', header: 'Detail', cell: (a) => <span className="block max-w-[340px] truncate text-ink-soft">{a.detail}</span>, hideBelow: 'md' },
{ id: 'ip', header: 'IP address', cell: (a) => <span className="num text-muted">{a.ip}</span>, hideBelow: 'xl' }];


/** Sign-in rules and the full audit trail of staff actions. */
export function SecurityTab() {
  const [rules, setRules] = useState({ twoStep: true, approval: true, newDevice: true, ipLock: false });
  const [timeout, setTimeoutValue] = useState('30 minutes');
  const [range, setRange] = useState<DateRange>(allTime);

  const items: {key: keyof typeof rules;label: string;help: string;}[] = [
  { key: 'twoStep', label: 'Require two-step verification', help: 'SMS or authenticator code at every sign-in' },
  { key: 'approval', label: 'Second approval for large adjustments', help: 'Points over 5,000 or RWF over 100,000' },
  { key: 'newDevice', label: 'Alert on new device sign-in', help: 'Email the user and the owner' },
  { key: 'ipLock', label: 'Office network only', help: 'Block sign-in from outside Simba IP addresses' }];


  return (
    <div className="space-y-5">
      <Panel title="Security" subtitle="Applies to everyone on the team">
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((i) =>
          <div key={i.key} className="flex items-center justify-between gap-3 rounded-xl border border-line px-4 py-3">
              <span>
                <span className="block text-sm font-bold text-ink">{i.label}</span>
                <span className="block text-xs text-muted">{i.help}</span>
              </span>
              <Toggle checked={rules[i.key]} onChange={(v) => setRules((r) => ({ ...r, [i.key]: v }))} label={i.label} />
            </div>
          )}
          <div className="rounded-xl border border-line px-4 py-3">
            <label htmlFor="session-timeout" className={labelClass}>
              Sign out after inactivity
            </label>
            <select id="session-timeout" value={timeout} onChange={(e) => setTimeoutValue(e.target.value)} className={inputClass}>
              {['15 minutes', '30 minutes', '1 hour', '4 hours'].map((t) =>
              <option key={t}>{t}</option>
              )}
            </select>
          </div>
        </div>
      </Panel>

      <DataTable
        title="Audit log"
        entity="entry"
        rows={auditSeed.filter((a) => inRange(a.at, range))}
        columns={columns}
        searchKeys={['user', 'action', 'detail']}
        filter={{ key: 'module', label: 'Modules', options: auditModules }}
        toolbar={<DateRangeFilter value={range} onChange={setRange} />} />
      
    </div>);

}