export const overviewKpis = {
  memberSales: 1_280_000_000,
  memberSalesChange: 8.4,
  memberShareOfSales: 61,
  totalMembers: 24_820,
  newMembers: 1_420,
  activeMembers: 9_640,
  cardBalanceHeld: 312_000_000,
  pointsOutstanding: 48_600_000,
  avgBasket: 51_600,
  avgBasketNonMember: 34_200
};

/** Member sales per month, RWF millions. */
export const memberSalesTrend = [
{ month: 'Apr', sales: 860 },
{ month: 'May', sales: 915 },
{ month: 'Jun', sales: 980 },
{ month: 'Jul', sales: 1_030 },
{ month: 'Aug', sales: 1_180 },
{ month: 'Sep', sales: 1_280 }];


/** RWF millions per month. */
export const topupsVsSpend = [
{ month: 'Apr', topups: 178, spend: 162 },
{ month: 'May', topups: 196, spend: 184 },
{ month: 'Jun', topups: 214, spend: 205 },
{ month: 'Jul', topups: 232, spend: 221 },
{ month: 'Aug', topups: 252, spend: 244 },
{ month: 'Sep', topups: 271, spend: 262 }];


/** Millions of points per month. */
export const pointsIssuedRedeemed = [
{ month: 'Apr', issued: 11.2, redeemed: 5.1 },
{ month: 'May', issued: 11.9, redeemed: 5.8 },
{ month: 'Jun', issued: 12.6, redeemed: 6.4 },
{ month: 'Jul', issued: 13.1, redeemed: 7.2 },
{ month: 'Aug', issued: 14.0, redeemed: 8.1 },
{ month: 'Sep', issued: 15.3, redeemed: 9.0 }];


/** How members used points this month, matching the four Redeem Points options in the app. */
export const redemptionsByOption = [
{ option: 'Top up shopping card', points: 6_900_000 },
{ option: 'Partner promo codes', points: 1_140_000 },
{ option: 'Simba free shipping', points: 1_070_000 },
{ option: 'Gift points', points: 520_000 }];


/** How tills identified members this month. */
export const tillIdentification = {
  identifiedShare: 61,
  checkoutCode: 82,
  phoneOtp: 18,
  otpSuccess: 94,
  failedCodes24h: 211
};

export type FeedKind = 'Identified' | 'Redeemed' | 'Top-up' | 'Upgrade' | 'Claimed';

export interface FeedItem {
  id: string;
  time: string;
  store: string;
  customer: string;
  kind: FeedKind;
  detail: string;
}

export const liveFeed: FeedItem[] = [
{ id: 'f1', time: '14:32', store: 'Kigali Heights', customer: 'Joseph Mutabazi', kind: 'Identified', detail: 'Checkout code · RWF 72,500 · +725 pts' },
{ id: 'f2', time: '14:29', store: 'App', customer: 'Aline Uwase', kind: 'Redeemed', detail: '1,000 pts → RWF 1,000 on card' },
{ id: 'f3', time: '14:27', store: 'Nyarutarama', customer: 'Jean-Paul Habimana', kind: 'Identified', detail: 'Phone + OTP · RWF 214,800 · +2,148 pts' },
{ id: 'f4', time: '14:24', store: 'App', customer: 'Grace Uwimana', kind: 'Top-up', detail: 'RWF 50,000 · MTN MoMo' },
{ id: 'f5', time: '14:22', store: 'App', customer: 'Diane Mukamana', kind: 'Claimed', detail: 'Gold thank-you weekend · +500 pts' },
{ id: 'f6', time: '14:18', store: 'App', customer: 'Sandrine Iradukunda', kind: 'Upgrade', detail: 'Upgraded to Gold · 2,500 pts' },
{ id: 'f7', time: '14:15', store: 'App', customer: 'Patrick Mugisha', kind: 'Redeemed', detail: 'Free shipping · 500 pts' }];