import { useCollectionRows } from '../contexts/ConsoleContext';
import { promotionSeed, type PromotionRow } from '../data/admin/promotions';
import { partnerRedemptions } from '../data/admin/partnerRedemptions';
import type { PartnerRow } from '../data/admin/partners';

/** Promotions, offers and redemptions for partners, from the live console data. */
export function usePartnerStats() {
  const promotions = useCollectionRows<PromotionRow>('promotions', promotionSeed);

  return (p: PartnerRow) => {
    const promos = p.id === 'simba' ? promotions.filter((x) => x.type !== 'Offer') : promotions.filter((x) => x.partner === p.name);
    const activeOffers = promos.filter((x) => x.status === 'Active');
    const redemptions = partnerRedemptions.filter((r) => r.partnerId === p.id);
    const points = redemptions.reduce((s, r) => s + r.points, 0);
    const payable = redemptions.filter((r) => r.status !== 'Paid').reduce((s, r) => s + r.payable, 0);
    return { promos, activeOffers, redemptions, points, payable };
  };
}