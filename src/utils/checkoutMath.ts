import { programRules } from '../data/programRules';
import { tierBenefits } from '../data/benefits';
import type { CardLevel } from '../types/loyalty';

/** Extra points for paying with the Simba+ card balance (matches "Purchased using shopping card +10"). */
export const CARD_PAYMENT_BONUS = 10;

/** The Simba checkout discount for a tier, read from the same benefits the customer sees on Offers. */
export function simbaDiscountPct(level: CardLevel): number {
  const tier = tierBenefits.find((t) => t.level === level);
  const simba = tier?.benefits.find((b) => b.partner === 'simba');
  const pct = simba ? parseFloat(simba.title) : 0;
  return Number.isFinite(pct) ? pct : 0;
}

export interface SaleInput {
  subtotal: number;
  tierPct: number;
  pointsUsed: number;
  useCard: boolean;
  cardBalance: number;
}

export interface SaleBreakdown {
  subtotal: number;
  tierPct: number;
  tierDiscount: number;
  pointsUsed: number;
  pointsRWF: number;
  /** Amount due after tier discount and points. */
  total: number;
  cardPaid: number;
  /** Left to collect by MoMo, Airtel, bank card or cash. */
  remainder: number;
  pointsEarned: number;
  cardBonus: number;
}

export function computeSale({ subtotal, tierPct, pointsUsed, useCard, cardBalance }: SaleInput): SaleBreakdown {
  const tierDiscount = Math.round(subtotal * tierPct / 100);
  const afterTier = subtotal - tierDiscount;
  const pointsRWF = Math.min(pointsUsed * programRules.pointValueRWF, afterTier);
  const total = afterTier - pointsRWF;
  const cardPaid = useCard ? Math.min(Math.max(cardBalance, 0), total) : 0;
  const remainder = total - cardPaid;
  return {
    subtotal,
    tierPct,
    tierDiscount,
    pointsUsed,
    pointsRWF,
    total,
    cardPaid,
    remainder,
    // Points are earned on the eligible basket value, before discounts.
    pointsEarned: Math.floor(subtotal / programRules.rwfPerPoint),
    cardBonus: cardPaid > 0 ? CARD_PAYMENT_BONUS : 0
  };
}