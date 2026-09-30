export type TeamStatus = 'Active' | 'Invited' | 'Disabled';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  /** "All stores" or a comma list. */
  stores: string;
  status: TeamStatus;
  lastActive: string;
}

export const roles = ['Owner', 'Loyalty Manager', 'Finance', 'Store Manager', 'Cashier', 'Partner Manager', 'Viewer'];
export const teamStatuses: TeamStatus[] = ['Active', 'Invited', 'Disabled'];

export const teamSeed: TeamMember[] = [
{ id: 'u1', name: 'Diane Mutesi', email: 'diane.mutesi@simba.rw', phone: '+250 788 300 114', role: 'Loyalty Manager', stores: 'All stores', status: 'Active', lastActive: 'Now' },
{ id: 'u2', name: 'Teddy Kayitesi', email: 'teddy.kayitesi@simba.rw', phone: '+250 788 300 101', role: 'Owner', stores: 'All stores', status: 'Active', lastActive: 'Today, 09:12' },
{ id: 'u3', name: 'Robert Gasana', email: 'robert.gasana@simba.rw', phone: '+250 788 300 120', role: 'Finance', stores: 'All stores', status: 'Active', lastActive: 'Yesterday' },
{ id: 'u4', name: 'Chantal Mukeshimana', email: 'chantal.m@simba.rw', phone: '+250 788 300 145', role: 'Store Manager', stores: 'Kigali Heights', status: 'Active', lastActive: 'Today, 13:40' },
{ id: 'u5', name: 'Innocent Habiyaremye', email: 'innocent.h@simba.rw', phone: '+250 788 300 162', role: 'Store Manager', stores: 'Nyarutarama, Gishushu', status: 'Active', lastActive: 'Today, 11:05' },
{ id: 'u6', name: 'Alice Ishimwe', email: 'alice.ishimwe@simba.rw', phone: '+250 788 300 188', role: 'Cashier', stores: 'Kigali Heights', status: 'Active', lastActive: 'Today, 14:32' },
{ id: 'u7', name: 'Pacifique Niyomugabo', email: 'pacifique.n@simba.rw', phone: '+250 788 300 191', role: 'Partner Manager', stores: 'All stores', status: 'Invited', lastActive: '—' },
{ id: 'u8', name: 'Jean Bosco Nkurunziza', email: 'jb.nkurunziza@simba.rw', phone: '+250 788 300 133', role: 'Cashier', stores: 'Town', status: 'Disabled', lastActive: 'Aug 14' }];


export const permissionModules = ['Overview', 'Memberships', 'Customers', 'Transactions', 'Partners', 'Promotions', 'Settings'];

/** What each role can do per module: 'edit', 'view' or none. */
export const permissions: Record<string, Record<string, 'edit' | 'view' | ''>> = {
  Owner: { Overview: 'edit', Memberships: 'edit', Customers: 'edit', Transactions: 'edit', Partners: 'edit', Promotions: 'edit', Settings: 'edit' },
  'Loyalty Manager': { Overview: 'view', Memberships: 'edit', Customers: 'edit', Transactions: 'edit', Partners: 'edit', Promotions: 'edit', Settings: 'view' },
  Finance: { Overview: 'view', Memberships: 'view', Customers: 'view', Transactions: 'edit', Partners: 'edit', Promotions: 'view', Settings: 'edit' },
  'Store Manager': { Overview: 'view', Memberships: '', Customers: 'edit', Transactions: 'view', Partners: '', Promotions: 'view', Settings: '' },
  Cashier: { Overview: '', Memberships: '', Customers: 'view', Transactions: 'view', Partners: '', Promotions: '', Settings: '' },
  'Partner Manager': { Overview: 'view', Memberships: 'view', Customers: '', Transactions: 'view', Partners: 'edit', Promotions: 'edit', Settings: '' },
  Viewer: { Overview: 'view', Memberships: 'view', Customers: 'view', Transactions: 'view', Partners: 'view', Promotions: 'view', Settings: '' }
};