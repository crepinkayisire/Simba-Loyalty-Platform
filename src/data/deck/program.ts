import type { LucideIcon } from 'lucide-react';
import {
  CoinsIcon,
  CrownIcon,
  DatabaseIcon,
  GiftIcon,
  HandshakeIcon,
  LockOpenIcon,
  PercentIcon,
  RepeatIcon,
  ScanLineIcon,
  SendIcon,
  ShoppingBasketIcon,
  SparklesIcon,
  TagIcon,
  TicketIcon,
  TruckIcon,
  WalletIcon } from
'lucide-react';
import type { CardLevel } from '../../types/loyalty';

export type LoopStep = {label: string;note: string;icon: LucideIcon;};

export const loopSteps: LoopStep[] = [
{ label: 'Shop', note: 'In store or online', icon: ShoppingBasketIcon },
{ label: 'Recognize', note: 'Checkout code at the till', icon: ScanLineIcon },
{ label: 'Earn', note: 'Points on every basket', icon: CoinsIcon },
{ label: 'Unlock', note: 'Membership & partner perks', icon: LockOpenIcon },
{ label: 'Redeem', note: 'Value back on the card', icon: GiftIcon },
{ label: 'Return', note: 'The next visit', icon: RepeatIcon }];


export type Goal = {title: string;icon: LucideIcon;};

export const goals: Goal[] = [
{ title: 'Reward high-value customers', icon: CrownIcon },
{ title: 'Increase repeat shopping', icon: RepeatIcon },
{ title: 'Build first-party customer data', icon: DatabaseIcon },
{ title: 'Extend Simba benefits beyond the supermarket', icon: HandshakeIcon }];


export type TierBenefit = {label: string;detail: string;icon: LucideIcon;};
export type DeckTier = {
  id: CardLevel;
  name: string;
  audience: string;
  holder: string;
  points: string;
  balance: string;
  benefits: TierBenefit[];
};

export const tiers: DeckTier[] = [
{
  id: 'Gold',
  name: 'Simba+ Gold',
  audience: 'For loyal, high-value shoppers',
  holder: 'Joseph Mutabazi',
  points: '3,175',
  balance: '48,500',
  benefits: [
  { label: 'Offers', detail: 'Serena, Marriott & Equity partner offers', icon: TagIcon },
  { label: 'Rewards', detail: 'Points per visit + per RWF 1,000', icon: SparklesIcon },
  { label: 'Discounts', detail: '5% off at Simba checkout', icon: PercentIcon }]

},
{
  id: 'Platinum',
  name: 'Simba+ Platinum',
  audience: "For Simba's most valuable customers",
  holder: 'Jean-Paul Habimana',
  points: '86,410',
  balance: '215,000',
  benefits: [
  { label: 'Offers', detail: 'Premium partners incl. RwandAir & BK', icon: TagIcon },
  { label: 'Rewards', detail: 'Same earn rate, bigger bonuses', icon: SparklesIcon },
  { label: 'Discounts', detail: 'Deepest Simba checkout discount', icon: PercentIcon }]

}];


export const tierPath: CardLevel[] = ['Bronze', 'Silver', 'Gold', 'Platinum'];

export type DeckPartner = {name: string;sector: string;};

export const partners: DeckPartner[] = [
{ name: 'Equity Bank', sector: 'Banking' },
{ name: 'Bank of Kigali', sector: 'Banking' },
{ name: 'Serena Hotels', sector: 'Hotels & dining' },
{ name: 'Kigali Marriott', sector: 'Hotels & stays' },
{ name: 'RwandAir', sector: 'Travel' },
{ name: 'Java House', sector: 'Cafés' }];


export type BasketBonus = {basket: string;points: number;};

export const basketBonuses: BasketBonus[] = [
{ basket: 'RWF 50K', points: 100 },
{ basket: 'RWF 100K', points: 300 },
{ basket: 'RWF 250K', points: 1000 }];


export const bonusWays = ['Featured products', 'Double Points Day', 'Referrals', 'Birthdays', 'Monthly challenges'];

export type DeckRedeemOption = {title: string;icon: LucideIcon;};

export const redeemOptions: DeckRedeemOption[] = [
{ title: 'Simba+ card top up', icon: WalletIcon },
{ title: 'Send to a friend', icon: SendIcon },
{ title: 'Partner promo codes', icon: TicketIcon },
{ title: 'Simba free shipping', icon: TruckIcon }];