export type TierName = 'Member' | 'Gold' | 'Platinum';

export type CardLevel = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export type RewardCategory = 'vouchers' | 'products' | 'discounts' | 'delivery';

export interface Reward {
  id: string;
  title: string;
  subtitle: string;
  points: number;
  category: RewardCategory;
  valueRWF: number;
  image?: string;
  terms: string[];
}

export type OfferSection = 'for-you' | 'this-week' | 'exclusive';

export interface Offer {
  id: string;
  section: OfferSection;
  headline: string;
  title: string;
  description: string;
  validity: string;
  expiresLabel: string;
  image: string;
  reason?: string;
  availableAt: string;
  howItWorks: string[];
  terms: string[];
}

export type ActivityKind = 'earned' | 'redeemed' | 'bonus';

export interface ActivityItem {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  points: number;
  kind: ActivityKind;
  time: string;
}

export type NotificationKind = 'earned' | 'tier' | 'offer' | 'reward' | 'birthday' | 'promo' | 'announcement';

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  kind: NotificationKind;
  link: string;
}

export interface TierRule {
  id: string;
  name: TierName;
  qualifyPoints: number;
  bonusMultiplier: number;
  benefits: string[];
}

export interface Redemption {
  rewardId: string;
  status: 'pending' | 'redeemed';
  code: string;
}