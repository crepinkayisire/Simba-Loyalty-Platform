/* Disbursements: cashing out top-up money from shopping cards to Simba's accounts. */

export type PayoutFrequency = 'Daily' | 'Weekly' | 'Monthly';
export type PayoutStatus = 'Paid' | 'Processing' | 'Scheduled';

export interface PayoutAccount {
  id: string;
  label: string;
  detail: string;
}

export interface Payout {
  id: string;
  date: string;
  amount: number;
  accountId: string;
  mode: 'Manual' | 'Automatic';
  status: PayoutStatus;
}

export interface PayoutSchedule {
  enabled: boolean;
  frequency: PayoutFrequency;
  /** Weekday for weekly, day of month for monthly. */
  day: string;
  accountId: string;
  /** Kept back to cover refunds and card payments in transit. */
  reserve: number;
}

/** Top-up money collected and settled, not yet paid out to Simba. */
export const availableToDisburse = 18_420_000;

export const payoutAccounts: PayoutAccount[] = [
{ id: 'bk', label: 'Bank of Kigali', detail: 'Simba Supermarket Ltd · •••• 4410' },
{ id: 'equity', label: 'Equity Bank', detail: 'Simba Supermarket Ltd · •••• 2093' },
{ id: 'momo', label: 'MTN MoMo merchant', detail: 'Merchant code 003118' }];


export const payoutSeed: Payout[] = [
{ id: 'p1', date: 'Sep 22, 2026', amount: 61_800_000, accountId: 'bk', mode: 'Automatic', status: 'Paid' },
{ id: 'p2', date: 'Sep 15, 2026', amount: 58_250_000, accountId: 'bk', mode: 'Automatic', status: 'Paid' },
{ id: 'p3', date: 'Sep 10, 2026', amount: 12_000_000, accountId: 'equity', mode: 'Manual', status: 'Paid' },
{ id: 'p4', date: 'Sep 8, 2026', amount: 55_400_000, accountId: 'bk', mode: 'Automatic', status: 'Paid' }];


export const scheduleSeed: PayoutSchedule = { enabled: true, frequency: 'Weekly', day: 'Monday', accountId: 'bk', reserve: 5_000_000 };

export const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const monthDays = ['1st', '15th', 'Last day'];