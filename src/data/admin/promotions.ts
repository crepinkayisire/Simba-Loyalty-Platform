export type PromotionType = 'Discount' | 'Reward' | 'Offer';
export type PromotionStatus = 'Active' | 'Disabled' | 'Archived';
export type Recurrence = 'Does not repeat' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
export type ReduceBy = 'Percentage' | 'Amount';
export type ConversionType = 'RWF per point' | '% per point';

/**
 * One promotion attached to one or more memberships.
 * Discount: money off a Simba basket. Reward: points for visits or spend.
 * Offer: a partner benefit, optionally paid for with points.
 * Numeric fields not used by a type are 0.
 */
export interface PromotionRow {
  id: string;
  name: string;
  description: string;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  recurring: Recurrence;
  /** "All memberships" or a comma list, e.g. "Gold, Platinum". */
  memberships: string;
  type: PromotionType;
  // Discount + Offer
  reduceBy: ReduceBy;
  reduceValue: number;
  // Discount
  minBasket: number;
  maxBasket: number;
  minVisits: number;
  maxVisits: number;
  // Reward
  pointsPerVisit: number;
  pointsPerBasket: number;
  /** pointsPerBasket are given for every this many RWF spent. */
  basketStep: number;
  // Offer
  /** Partner name, as in the Partners module. */
  partner: string;
  conversionType: ConversionType;
  conversionValue: number;
  redemptions30d: number;
}

export const ALL_MEMBERSHIPS = 'All memberships';

const blank = {
  reduceBy: 'Percentage' as ReduceBy,
  reduceValue: 0,
  minBasket: 0,
  maxBasket: 0,
  minVisits: 0,
  maxVisits: 0,
  pointsPerVisit: 0,
  pointsPerBasket: 0,
  basketStep: 1_000,
  partner: '',
  conversionType: 'RWF per point' as ConversionType,
  conversionValue: 0
};

const year = { startDate: '2026-01-01', endDate: '2026-12-31', recurring: 'Does not repeat' as Recurrence };

export const promotionSeed: PromotionRow[] = [
// Discounts at Simba checkout
{ ...blank, ...year, id: 'pr-disc-bronze', name: '2% off at checkout', description: 'On every shop at Simba Supermarket', status: 'Active', memberships: 'Bronze', type: 'Discount', reduceValue: 2, redemptions30d: 18_400 },
{ ...blank, ...year, id: 'pr-disc-silver', name: '3% off at checkout', description: 'Plus member-only weekly prices', status: 'Active', memberships: 'Silver', type: 'Discount', reduceValue: 3, redemptions30d: 11_900 },
{ ...blank, ...year, id: 'pr-disc-gold', name: '5% off at checkout', description: 'Plus free delivery on orders over RWF 50,000', status: 'Active', memberships: 'Gold', type: 'Discount', reduceValue: 5, redemptions30d: 7_260 },
{ ...blank, ...year, id: 'pr-disc-platinum', name: '8% off at checkout', description: 'Free delivery on every order, priority tills', status: 'Active', memberships: 'Platinum', type: 'Discount', reduceValue: 8, redemptions30d: 2_140 },
{ ...blank, id: 'pr-disc-bigbasket', name: 'RWF 5,000 off big baskets', description: 'Every weekend on baskets of RWF 100,000 or more', status: 'Active', startDate: '2026-09-01', endDate: '2026-12-31', recurring: 'Weekly', memberships: 'Gold, Platinum', type: 'Discount', reduceBy: 'Amount', reduceValue: 5_000, minBasket: 100_000, redemptions30d: 1_380 },
{ ...blank, id: 'pr-disc-loyal', name: '10% off your 8th visit', description: 'Shop 8 times in a month and the 8th basket is 10% off, up to RWF 150,000', status: 'Disabled', startDate: '2026-10-01', endDate: '2026-12-31', recurring: 'Monthly', memberships: ALL_MEMBERSHIPS, type: 'Discount', reduceValue: 10, maxBasket: 150_000, minVisits: 8, maxVisits: 8, redemptions30d: 0 },

// Rewards: points for visits and spend
{ ...blank, ...year, id: 'pr-rew-base', name: '10 points per RWF 1,000', description: 'On every eligible purchase at Simba', status: 'Active', memberships: ALL_MEMBERSHIPS, type: 'Reward', pointsPerBasket: 10, basketStep: 1_000, redemptions30d: 96_400 },
{ ...blank, ...year, id: 'pr-rew-visit-silver', name: '20 points per visit', description: 'Every time you shop, whatever you spend', status: 'Active', memberships: 'Silver', type: 'Reward', pointsPerVisit: 20, redemptions30d: 21_600 },
{ ...blank, ...year, id: 'pr-rew-visit', name: '50 points per visit', description: 'Every time you shop, whatever you spend', status: 'Active', memberships: 'Gold, Platinum', type: 'Reward', pointsPerVisit: 50, redemptions30d: 14_800 },
{ ...blank, id: 'pr-rew-double', name: 'Double Points Day', description: '+10 extra points per RWF 1,000 every Saturday', status: 'Active', startDate: '2026-09-05', endDate: '2026-12-26', recurring: 'Weekly', memberships: 'Silver, Gold, Platinum', type: 'Reward', pointsPerBasket: 10, basketStep: 1_000, redemptions30d: 9_120 },

// Partner offers
{ ...blank, ...year, id: 'pr-off-java-b', name: 'Free pastry with coffee', description: 'Once a month at any Kigali Java House', status: 'Active', memberships: 'Bronze', type: 'Offer', partner: 'Java House', reduceBy: 'Amount', reduceValue: 2_500, conversionValue: 1, redemptions30d: 1_240 },
{ ...blank, ...year, id: 'pr-off-bk-b', name: '1% cashback at Simba', description: 'When you pay with any Bank of Kigali card', status: 'Active', memberships: 'Bronze', type: 'Offer', partner: 'Bank of Kigali', reduceValue: 1, redemptions30d: 3_900 },
{ ...blank, ...year, id: 'pr-off-equity-s', name: '1% cashback', description: 'When you pay at Simba with your Equity Infinity Card', status: 'Active', memberships: 'Silver', type: 'Offer', partner: 'Equity Bank Infinity Card', reduceValue: 1, redemptions30d: 2_100 },
{ ...blank, ...year, id: 'pr-off-java-s', name: '10% off your bill', description: 'Dine-in and takeaway', status: 'Active', memberships: 'Silver', type: 'Offer', partner: 'Java House', reduceValue: 10, conversionValue: 1, redemptions30d: 1_860 },
{ ...blank, ...year, id: 'pr-off-bk-s', name: '2% cashback at Simba', description: 'Pay with your BK card or BK App (MobiCash)', status: 'Active', memberships: 'Silver', type: 'Offer', partner: 'Bank of Kigali', reduceValue: 2, redemptions30d: 2_480 },
{ ...blank, ...year, id: 'pr-off-equity-g', name: '2% cashback', description: 'On Simba purchases with your Equity Infinity Card', status: 'Active', memberships: 'Gold', type: 'Offer', partner: 'Equity Bank Infinity Card', reduceValue: 2, redemptions30d: 1_720 },
{ ...blank, ...year, id: 'pr-off-serena-g', name: '15% off dining & spa', description: 'Kigali Serena and Lake Kivu Serena', status: 'Active', memberships: 'Gold', type: 'Offer', partner: 'Serena Hotels', reduceValue: 15, conversionType: 'RWF per point', conversionValue: 1, redemptions30d: 640 },
{ ...blank, ...year, id: 'pr-off-marriott-g', name: '10% off weekend stays', description: 'Kigali Marriott, subject to availability', status: 'Active', memberships: 'Gold', type: 'Offer', partner: 'Kigali Marriott Hotel', reduceValue: 10, conversionValue: 1, redemptions30d: 210 },
{ ...blank, ...year, id: 'pr-off-java-g', name: '15% off your bill', description: 'Dine-in and takeaway', status: 'Active', memberships: 'Gold', type: 'Offer', partner: 'Java House', reduceValue: 15, conversionValue: 1, redemptions30d: 1_310 },
{ ...blank, ...year, id: 'pr-off-equity-p', name: '3% cashback + lounge access', description: 'Equity Infinity Card holders at Kigali International', status: 'Active', memberships: 'Platinum', type: 'Offer', partner: 'Equity Bank Infinity Card', reduceValue: 3, redemptions30d: 390 },
{ ...blank, ...year, id: 'pr-off-serena-p', name: '20% off stays & dining', description: 'All Serena Hotels in Rwanda and East Africa', status: 'Active', memberships: 'Platinum', type: 'Offer', partner: 'Serena Hotels', reduceValue: 20, conversionValue: 1, redemptions30d: 280 },
{ ...blank, ...year, id: 'pr-off-marriott-p', name: 'Room upgrade + late checkout', description: 'Kigali Marriott, every stay', status: 'Active', memberships: 'Platinum', type: 'Offer', partner: 'Kigali Marriott Hotel', reduceBy: 'Amount', reduceValue: 40_000, conversionValue: 1, redemptions30d: 120 },
{ ...blank, ...year, id: 'pr-off-rwandair-p', name: '10% off regional fares', description: 'Book with your Simba+ number', status: 'Active', memberships: 'Platinum', type: 'Offer', partner: 'RwandAir', reduceValue: 10, conversionType: '% per point', conversionValue: 0.1, redemptions30d: 160 },
{ ...blank, ...year, id: 'pr-off-bk-p', name: '4% cashback + zero card fees', description: 'Bank of Kigali Diamond cardholders, every Simba shop', status: 'Active', memberships: 'Platinum', type: 'Offer', partner: 'Bank of Kigali', reduceValue: 4, redemptions30d: 540 },
{ ...blank, id: 'pr-off-serena-summer', name: 'Lake Kivu weekend: 1 point = RWF 100', description: 'Pay for a Lake Kivu Serena weekend with points at a boosted rate', status: 'Archived', startDate: '2026-06-01', endDate: '2026-08-31', recurring: 'Does not repeat', memberships: 'Gold, Platinum', type: 'Offer', partner: 'Serena Hotels', reduceValue: 0, conversionType: 'RWF per point', conversionValue: 100, redemptions30d: 0 }];


export const promotionTypes: PromotionType[] = ['Discount', 'Reward', 'Offer'];
export const promotionStatuses: PromotionStatus[] = ['Active', 'Disabled', 'Archived'];
export const recurrences: Recurrence[] = ['Does not repeat', 'Daily', 'Weekly', 'Monthly', 'Yearly'];
export const reduceByOptions: ReduceBy[] = ['Percentage', 'Amount'];
export const conversionTypes: ConversionType[] = ['RWF per point', '% per point'];

/** One-line summary of what the promotion gives, e.g. "5% off · baskets RWF 100,000+". */
export function promotionValue(p: PromotionRow): string {
  const off = p.reduceBy === 'Amount' ? `RWF ${p.reduceValue.toLocaleString('en-US')} off` : `${p.reduceValue}% off`;
  if (p.type === 'Discount') {
    const parts = [off];
    if (p.minBasket) parts.push(`baskets RWF ${p.minBasket.toLocaleString('en-US')}+`);
    if (p.minVisits) parts.push(`from visit ${p.minVisits}`);
    return parts.join(' · ');
  }
  if (p.type === 'Reward') {
    const parts: string[] = [];
    if (p.pointsPerVisit) parts.push(`${p.pointsPerVisit} pts per visit`);
    if (p.pointsPerBasket) parts.push(`${p.pointsPerBasket} pts per RWF ${p.basketStep.toLocaleString('en-US')}`);
    return parts.join(' + ') || '—';
  }
  const conv = p.conversionValue ?
  p.conversionType === 'RWF per point' ?
  `1 pt = RWF ${p.conversionValue.toLocaleString('en-US')}` :
  `1 pt = ${p.conversionValue}%` :
  '';
  return [p.reduceValue ? off : '', conv].filter(Boolean).join(' · ') || '—';
}