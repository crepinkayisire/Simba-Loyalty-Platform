export type EarnIcon = 'basket' | 'featured' | 'double' | 'receipt' | 'friend' | 'cake' | 'profile' | 'visits' | 'spend';

export interface EarnRule {
  id: string;
  icon: EarnIcon;
  title: string;
  detail: string;
  reward: string;
}

export interface EarnChallenge extends EarnRule {
  current: number;
  target: number;
  /** How to show progress, e.g. "3 of 4 visits". */
  unit: 'visits' | 'rwf' | 'steps';
}

export const everyShop: EarnRule[] = [
{ id: 'shop', icon: 'basket', title: 'Shop at Simba', detail: 'Same rate on every tier · 1 point = RWF 1', reward: '10 pts / RWF 1,000' },
{ id: 'featured', icon: 'featured', title: 'Featured products', detail: 'Look for the Simba+ tag on the shelf', reward: '+50 pts' },
{ id: 'double', icon: 'double', title: 'Double Points Day', detail: 'Extra points on selected days', reward: '+10 / RWF 1,000' }];


export const basketBonuses: EarnRule[] = [
{ id: 'b50', icon: 'receipt', title: 'Spend RWF 50,000+', detail: 'In a single purchase', reward: '+100 pts' },
{ id: 'b100', icon: 'receipt', title: 'Spend RWF 100,000+', detail: 'In a single purchase', reward: '+300 pts' },
{ id: 'b250', icon: 'receipt', title: 'Spend RWF 250,000+', detail: 'In a single purchase', reward: '+1,000 pts' }];


/** Joseph's progress for September 2026. */
export const monthlyChallenges: EarnChallenge[] = [
{ id: 'visits', icon: 'visits', title: 'Shop 4 times this month', detail: '', reward: '+500 pts', current: 3, target: 4, unit: 'visits' },
{ id: 'spend500', icon: 'spend', title: 'Spend RWF 500,000 this month', detail: '', reward: '+2,000 pts', current: 312000, target: 500000, unit: 'rwf' },
{ id: 'spend1m', icon: 'spend', title: 'Spend RWF 1,000,000 this month', detail: '', reward: '+5,000 pts', current: 312000, target: 1000000, unit: 'rwf' }];


export const challengeResetLabel = 'Resets 1 October';

export const extraBonuses: (EarnRule | EarnChallenge)[] = [
{ id: 'refer', icon: 'friend', title: 'Refer a friend', detail: 'When they make their first Simba purchase', reward: '+500 pts' },
{ id: 'birthday', icon: 'cake', title: 'Birthday bonus', detail: 'Added in your birthday month', reward: '+1,000 pts' },
{ id: 'profile', icon: 'profile', title: 'Complete your profile', detail: '', reward: '+200 pts', current: 4, target: 5, unit: 'steps' }];


export const earnExample = {
  purchase: 72500,
  shoppingPoints: 725,
  basketBonus: 100
};