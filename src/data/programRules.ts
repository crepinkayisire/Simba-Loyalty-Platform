import type { TierRule } from '../types/loyalty';

// Current program configuration. These values are managed in
// Program Settings and are never hard-coded into customer copy.
export const programRules = {
  rwfPerPoint: 100,
  /** 10 pts per RWF 1,000 × RWF 1 per point = 1% base reward rate. */
  pointValueRWF: 1,
  /** Maximum loyalty cost, including bonuses, as a share of eligible sales. */
  budgetCeilingPct: 1.5,
  expiryMonths: 12,
  qualificationWindowMonths: 12,
  minRedeemPoints: 200,
  redemptionCodeMinutes: 10
};

export const tierRules: TierRule[] = [
{
  id: 'member',
  name: 'Member',
  qualifyPoints: 0,
  bonusMultiplier: 1,
  benefits: ['Earn Simba Points', 'Member-only prices', 'Birthday reward', 'Weekly offers']
},
{
  id: 'gold',
  name: 'Gold',
  qualifyPoints: 1500,
  bonusMultiplier: 1,
  benefits: [
  'Everything in Member',
  'Partner benefits',
  'Exclusive Gold offers',
  'Bonus vouchers',
  'Early promotion access']

},
{
  id: 'platinum',
  name: 'Platinum',
  qualifyPoints: 4000,
  bonusMultiplier: 1,
  benefits: [
  'Everything in Gold',
  'Exclusive partner codes',
  'Premium birthday reward',
  'Free or discounted delivery',
  'Platinum-only offers',
  'Special shopping events']

}];