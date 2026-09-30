import React from 'react';

const styles: Record<string, string> = {
  Active: 'bg-leaf-soft text-leaf',
  Live: 'bg-leaf-soft text-leaf',
  Published: 'bg-leaf-soft text-leaf',
  Paid: 'bg-leaf-soft text-leaf',
  Sent: 'bg-leaf-soft text-leaf',
  VIP: 'bg-gold-soft text-gold',
  Invoiced: 'bg-gold-soft text-gold',
  Automatic: 'bg-gold-soft text-gold',
  Dormant: 'bg-simba-soft text-simba',
  Pending: 'bg-simba-soft text-simba',
  Processing: 'bg-simba-soft text-simba',
  New: 'bg-platinum-soft text-platinum',
  Scheduled: 'bg-platinum-soft text-platinum',
  Completed: 'bg-sand text-ink-soft',
  Draft: 'bg-sand text-muted',
  Disabled: 'bg-sand text-muted',
  Hidden: 'bg-platinum-soft text-platinum',
  Invited: 'bg-platinum-soft text-platinum',
  Frozen: 'bg-ink text-white',
  Paused: 'bg-sand text-muted',
  Archived: 'bg-sand text-muted',
  Ended: 'bg-sand text-muted',
  Reversed: 'bg-sand text-muted',
  Flagged: 'bg-simba-soft text-simba-dark',
  'Not live': 'bg-sand text-muted'
};

export function StatusBadge({ label }: {label: string;}) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[label] ?? 'bg-sand text-ink-soft'}`}>
      {label}
    </span>);

}