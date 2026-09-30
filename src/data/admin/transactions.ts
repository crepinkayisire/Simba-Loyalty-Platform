export type TxnType =
'Purchase' |
'Top-up' |
'Points to card' |
'Partner redemption' |
'Gift points' |
'Gift card' |
'Membership' |
'Bonus points' |
'Refund' |
'Adjustment';

export type TxnStatus = 'Completed' | 'Pending' | 'Flagged' | 'Reversed';
export type PaymentMethod = 'Cash' | 'Bank transfer' | 'Mobile money' | 'Bank card' | 'Points' | 'Simba+ card';

/** One row in the ledger. A purchase can move money and points at once. */
export interface LedgerTxn {
  id: string;
  /** 'YYYY-MM-DDTHH:mm' */
  at: string;
  customer: string;
  type: TxnType;
  /** Points earned (+) or redeemed (−). 0 when no points moved. */
  points: number;
  /** RWF in (+) or out (−) of the shopping card, or the basket value for purchases. */
  amount: number;
  /** Store, partner, "Simba app" or "HQ". */
  location: string;
  method: PaymentMethod;
  membership: string;
  /** Shopping card balance right after this transaction. */
  balanceAfter: number;
  status: TxnStatus;
  note: string;
}

export const transactionKpis = {
  balanceHeld: 312_000_000,
  cardsWithBalance: 17_940,
  topupsThisMonth: 271_000_000
};

export const ledgerSeed: LedgerTxn[] = [
{ id: 't1', at: '2026-09-29T14:32', customer: 'Joseph Mutabazi', type: 'Purchase', points: 725, amount: -72_500, location: 'Kigali Heights', method: 'Simba+ card', membership: 'Gold', balanceAfter: 48_500, status: 'Completed', note: '' },
{ id: 't2', at: '2026-09-29T14:29', customer: 'Aline Uwase', type: 'Points to card', points: -1_000, amount: 1_000, location: 'Simba app', method: 'Points', membership: 'Silver', balanceAfter: 12_300, status: 'Completed', note: '' },
{ id: 't3', at: '2026-09-29T14:24', customer: 'Grace Uwimana', type: 'Top-up', points: 0, amount: 50_000, location: 'Simba app', method: 'Mobile money', membership: 'Silver', balanceAfter: 73_400, status: 'Completed', note: '' },
{ id: 't4', at: '2026-09-29T13:58', customer: 'Claudine Ingabire', type: 'Gift card', points: 10, amount: 30_000, location: 'Simba app', method: 'Bank card', membership: 'Platinum', balanceAfter: 142_800, status: 'Completed', note: 'For Alice K.' },
{ id: 't5', at: '2026-09-29T13:41', customer: 'Diane Mukamana', type: 'Top-up', points: 0, amount: 20_000, location: 'Simba app', method: 'Mobile money', membership: 'Gold', balanceAfter: 64_200, status: 'Completed', note: '' },
{ id: 't6', at: '2026-09-29T13:12', customer: 'Josiane Umutoni', type: 'Refund', points: 0, amount: 4_800, location: 'Kigali Heights', method: 'Cash', membership: 'Gold', balanceAfter: 27_600, status: 'Completed', note: 'Damaged item returned' },
{ id: 't7', at: '2026-09-29T12:47', customer: 'Jean-Paul Habimana', type: 'Purchase', points: 2_148, amount: -214_800, location: 'Nyarutarama', method: 'Simba+ card', membership: 'Platinum', balanceAfter: 186_000, status: 'Completed', note: '' },
{ id: 't8', at: '2026-09-29T11:04', customer: 'Fabrice Ndayisaba', type: 'Top-up', points: 0, amount: 50_000, location: 'Simba app', method: 'Mobile money', membership: 'Bronze', balanceAfter: 412_000, status: 'Flagged', note: '8 top-ups in 20 minutes from 3 numbers' },
{ id: 't9', at: '2026-09-29T10:18', customer: 'Sandrine Iradukunda', type: 'Purchase', points: 468, amount: -46_800, location: 'Gishushu', method: 'Mobile money', membership: 'Gold', balanceAfter: 38_900, status: 'Completed', note: '' },
{ id: 't10', at: '2026-09-28T19:40', customer: 'Olivier Nshimiyimana', type: 'Gift card', points: 10, amount: 120_000, location: 'Simba app', method: 'Bank card', membership: 'Bronze', balanceAfter: 0, status: 'Flagged', note: 'Gift cards to 6 numbers never seen before' },
{ id: 't11', at: '2026-09-28T16:02', customer: 'Patrick Mugisha', type: 'Top-up', points: 0, amount: 100_000, location: 'HQ', method: 'Bank transfer', membership: 'Gold', balanceAfter: 21_700, status: 'Pending', note: 'Awaiting bank confirmation' },
{ id: 't12', at: '2026-09-28T09:30', customer: 'Emmanuel Hakizimana', type: 'Gift points', points: -500, amount: 0, location: 'Simba app', method: 'Points', membership: 'Silver', balanceAfter: 9_800, status: 'Completed', note: 'To +250 788 552 120' },
{ id: 't13', at: '2026-09-27T17:40', customer: 'Diane Mukamana', type: 'Purchase', points: 912, amount: -91_200, location: 'Gishushu', method: 'Simba+ card', membership: 'Gold', balanceAfter: 44_200, status: 'Completed', note: '' },
{ id: 't14', at: '2026-09-27T11:15', customer: 'Joseph Mutabazi', type: 'Bonus points', points: 250, amount: 0, location: 'Kigali Heights', method: 'Points', membership: 'Gold', balanceAfter: 121_000, status: 'Completed', note: 'Household Products Bonus' },
{ id: 't15', at: '2026-09-25T15:20', customer: 'Eric Niyonzima', type: 'Membership', points: 0, amount: -10_000, location: 'Simba app', method: 'Mobile money', membership: 'Silver', balanceAfter: 5_000, status: 'Completed', note: 'Bought Silver, 12 months' },
{ id: 't16', at: '2026-09-22T09:10', customer: 'Joseph Mutabazi', type: 'Top-up', points: 0, amount: 50_000, location: 'Simba app', method: 'Mobile money', membership: 'Gold', balanceAfter: 121_000, status: 'Completed', note: '' },
{ id: 't17', at: '2026-09-19T08:00', customer: 'Joseph Mutabazi', type: 'Bonus points', points: 200, amount: 0, location: 'Simba app', method: 'Points', membership: 'Gold', balanceAfter: 71_000, status: 'Completed', note: 'Birthday bonus' },
{ id: 't18', at: '2026-09-12T18:25', customer: 'Claudine Ingabire', type: 'Purchase', points: 1_564, amount: -156_400, location: 'Kigali Heights', method: 'Bank card', membership: 'Platinum', balanceAfter: 112_800, status: 'Completed', note: '' },
{ id: 't19', at: '2026-09-03T13:05', customer: 'Grace Uwimana', type: 'Adjustment', points: 300, amount: 0, location: 'HQ', method: 'Points', membership: 'Silver', balanceAfter: 23_400, status: 'Completed', note: 'Missing points from Aug 28 till outage' },
{ id: 't20', at: '2026-08-28T10:40', customer: 'Fabrice Ndayisaba', type: 'Purchase', points: 0, amount: -18_300, location: 'Town', method: 'Simba+ card', membership: 'Bronze', balanceAfter: 362_000, status: 'Reversed', note: 'Duplicate charge' }];


export const txnTypes: TxnType[] = ['Purchase', 'Top-up', 'Points to card', 'Partner redemption', 'Gift points', 'Gift card', 'Membership', 'Bonus points', 'Refund', 'Adjustment'];
export const txnStatuses: TxnStatus[] = ['Completed', 'Pending', 'Flagged', 'Reversed'];
export const paymentMethods: PaymentMethod[] = ['Cash', 'Bank transfer', 'Mobile money', 'Bank card', 'Points', 'Simba+ card'];
/** Non-store locations; store names are added from Settings → Store locations. */
export const baseLocations = ['Simba app', 'HQ'];