export type MembershipStatus = 'Active' | 'Disabled' | 'Hidden' | 'Archived';
export type BillingPeriod = 'Monthly' | 'Annually' | 'One Time';

/** Card artwork from the customer app a membership can use as its cover. */
export const coverArtworks = ['Bronze', 'Silver', 'Gold', 'Platinum'] as const;
export type CoverArtwork = (typeof coverArtworks)[number];

/** Solid colour behind each artwork, also used for membership pills. */
export const artworkColors: Record<CoverArtwork, string> = {
  Bronze: '#9A5F3B',
  Silver: '#D5DAE0',
  Gold: '#E6B34A',
  Platinum: '#1B1714'
};

/**
 * A Simba+ membership. Every membership earns the same base rate; what each
 * one unlocks (discounts, rewards, partner offers) is set up in Promotions.
 */
export interface MembershipRow {
  id: string;
  name: string;
  /** 1 = entry membership. */
  rank: number;
  /** A card artwork name, or an uploaded image URL. */
  cover: string;
  /** Derived from the cover, used for pills. */
  color: string;
  status: MembershipStatus;
  buyWithPoints: boolean;
  purchasePoints: number;
  buyWithAmount: boolean;
  purchaseAmount: number;
  billingPeriod: BillingPeriod;
  /** Renew automatically from the member's card at the end of each period. */
  autoDeduct: boolean;
  members: number;
  upgradesThisMonth: number;
}

export const membershipSeed: MembershipRow[] = [
{ id: 'tier-bronze', name: 'Bronze', rank: 1, cover: 'Bronze', color: artworkColors.Bronze, status: 'Active', buyWithPoints: false, purchasePoints: 0, buyWithAmount: false, purchaseAmount: 0, billingPeriod: 'One Time', autoDeduct: false, members: 14_210, upgradesThisMonth: 0 },
{ id: 'tier-silver', name: 'Silver', rank: 2, cover: 'Silver', color: artworkColors.Silver, status: 'Active', buyWithPoints: true, purchasePoints: 1_000, buyWithAmount: true, purchaseAmount: 10_000, billingPeriod: 'Annually', autoDeduct: true, members: 6_480, upgradesThisMonth: 142 },
{ id: 'tier-gold', name: 'Gold', rank: 3, cover: 'Gold', color: artworkColors.Gold, status: 'Active', buyWithPoints: true, purchasePoints: 2_500, buyWithAmount: true, purchaseAmount: 25_000, billingPeriod: 'Annually', autoDeduct: true, members: 3_310, upgradesThisMonth: 118 },
{ id: 'tier-platinum', name: 'Platinum', rank: 4, cover: 'Platinum', color: artworkColors.Platinum, status: 'Active', buyWithPoints: true, purchasePoints: 6_000, buyWithAmount: true, purchaseAmount: 60_000, billingPeriod: 'Annually', autoDeduct: false, members: 820, upgradesThisMonth: 50 }];


export const membershipStatuses: MembershipStatus[] = ['Active', 'Disabled', 'Hidden', 'Archived'];
export const billingPeriods: BillingPeriod[] = ['Monthly', 'Annually', 'One Time'];

export const isArtwork = (cover: string): cover is CoverArtwork => (coverArtworks as readonly string[]).includes(cover);