export interface AuditEntry {
  id: string;
  /** 'YYYY-MM-DDTHH:mm' */
  at: string;
  user: string;
  module: string;
  action: string;
  detail: string;
  ip: string;
}

export const auditModules = ['Memberships', 'Customers', 'Transactions', 'Partners', 'Promotions', 'Settings', 'Sign-in'];

export const auditSeed: AuditEntry[] = [
{ id: 'a1', at: '2026-09-29T14:40', user: 'Diane Mutesi', module: 'Promotions', action: 'Updated', detail: 'Double Points Day · end date to Dec 26', ip: '41.186.22.14' },
{ id: 'a2', at: '2026-09-29T13:12', user: 'Chantal Mukeshimana', module: 'Transactions', action: 'Refund', detail: 'Josiane Umutoni · RWF 4,800 to card', ip: '41.186.30.2' },
{ id: 'a3', at: '2026-09-29T11:20', user: 'Robert Gasana', module: 'Transactions', action: 'Flagged', detail: 'Fabrice Ndayisaba · 8 top-ups in 20 minutes', ip: '41.186.22.19' },
{ id: 'a4', at: '2026-09-29T09:12', user: 'Teddy Kayitesi', module: 'Sign-in', action: 'Signed in', detail: 'Two-step verification by SMS', ip: '102.22.140.8' },
{ id: 'a5', at: '2026-09-28T17:05', user: 'Diane Mutesi', module: 'Partners', action: 'Uploaded', detail: 'Serena Hotels · Rate card Gold & Platinum.xlsx', ip: '41.186.22.14' },
{ id: 'a6', at: '2026-09-28T10:30', user: 'Robert Gasana', module: 'Settings', action: 'Approved', detail: 'Loyalty budget ceiling 1.5%', ip: '41.186.22.19' },
{ id: 'a7', at: '2026-09-27T15:48', user: 'Diane Mutesi', module: 'Customers', action: 'Froze card', detail: 'Fabrice Ndayisaba', ip: '41.186.22.14' },
{ id: 'a8', at: '2026-09-25T12:02', user: 'Pacifique Niyomugabo', module: 'Sign-in', action: 'Invite sent', detail: 'Partner Manager role', ip: '41.186.22.14' },
{ id: 'a9', at: '2026-09-22T09:00', user: 'System', module: 'Transactions', action: 'Disbursed', detail: 'RWF 61.8M to Bank of Kigali •••• 4410', ip: '—' },
{ id: 'a10', at: '2026-09-18T16:20', user: 'Diane Mutesi', module: 'Memberships', action: 'Updated', detail: 'Platinum purchase amount RWF 60,000 / year', ip: '41.186.22.14' },
{ id: 'a11', at: '2026-09-10T08:44', user: 'Unknown', module: 'Sign-in', action: 'Failed sign-in', detail: '3 wrong passwords for jb.nkurunziza@simba.rw', ip: '197.157.3.61' }];