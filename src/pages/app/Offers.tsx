import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { CircleCheckIcon, LockIcon, StarIcon, CreditCardIcon, ChevronLeftIcon } from 'lucide-react';
import { TierSummaryCard, TIER_CARD_HEIGHT } from '../../components/mobile/TierSummaryCard';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { useCollectionRows } from '../../contexts/ConsoleContext';
import { UpgradeSheet } from '../../components/mobile/UpgradeSheet';
import { TabTopBar } from '../../components/mobile/TabTopBar';
import { MembershipPromoList } from '../../components/mobile/MembershipPromoList';
import { tierBenefits, levelOrder } from '../../data/benefits';
import { membershipSeed, type MembershipRow } from '../../data/admin/memberships';
import { promotionSeed, type PromotionRow } from '../../data/admin/promotions';
import { partnerSeed, type PartnerRow } from '../../data/admin/partners';
import { matchesFilter } from '../../types/console';
import type { CardLevel } from '../../types/loyalty';

// How much of each collapsed card shows above the next one in the stack.
const PEEK = 60;

/** Customer-facing "Memberships" tab: every Simba+ membership and what it unlocks. */
export function Offers() {
  const { cardLevel, balance } = useLoyalty();
  const memberships = useCollectionRows<MembershipRow>('memberships', membershipSeed);
  const promotions = useCollectionRows<PromotionRow>('promotions', promotionSeed);
  const partnerRows = useCollectionRows<PartnerRow>('partners', partnerSeed);
  // Memberships disabled, hidden or archived in the console drop out of the app (the member's own always shows).
  const visibleTiers = tierBenefits.filter((t) => {
    const m = memberships.find((x) => x.name === t.level);
    return t.level === cardLevel || !m || m.status === 'Active';
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [upgrade, setUpgrade] = useState<'points' | 'buy' | null>(null);
  const [expanded, setExpanded] = useState<CardLevel>(cardLevel);

  const fromUrl = searchParams.get('tier');
  const selected = levelOrder.includes(fromUrl as CardLevel) ? fromUrl as CardLevel : null;
  const setSelected = (level: CardLevel) => setSearchParams({ tier: level });
  const statusOf = (level: CardLevel) =>
  level === cardLevel ? 'current' : levelOrder.indexOf(level) < levelOrder.indexOf(cardLevel) ? 'included' : 'locked';

  if (!selected) {
    return (
      <div className="pb-10">
        <div className="px-5">
          <TabTopBar />
          <h1 className="mt-2 text-[26px] font-extrabold tracking-tight text-ink">Memberships</h1>
          <p className="mt-0.5 text-sm text-muted">Every Simba+ membership comes with its own discounts, rewards and partner offers.</p>
        </div>
        <div className="mx-5 mt-5">
          {visibleTiers.map((t, i) => {
            const prevExpanded = i > 0 && visibleTiers[i - 1].level === expanded;
            return (
              <motion.div
                key={t.level}
                initial={false}
                animate={{ marginTop: i === 0 ? 0 : prevExpanded ? 12 : -(TIER_CARD_HEIGHT - PEEK) }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="relative"
                style={{ zIndex: i }}>
                
                <TierSummaryCard
                  tier={t}
                  status={statusOf(t.level)}
                  balance={balance}
                  expanded={expanded === t.level || i === visibleTiers.length - 1}
                  onSelect={() => setExpanded(t.level)}
                  onOpen={() => setSelected(t.level)} />
                
              </motion.div>);

          })}
        </div>
        <p className="mx-5 mt-4 text-xs text-muted">Tap a card to preview, tap again to see its discounts, rewards and offers. Upgrade any time with points or buy 12 months of access.</p>
      </div>);

  }

  const tier = tierBenefits.find((t) => t.level === selected)!;
  const included = statusOf(selected) !== 'locked';
  const current = selected === cardLevel;
  const canUsePoints = balance >= tier.upgradePoints;

  const forTier = promotions.filter((p) => p.status === 'Active' && matchesFilter(p.memberships, selected));
  const offers = forTier.filter((p) => p.type === 'Offer');
  const rewardList = forTier.filter((p) => p.type === 'Reward');
  // Only two rewards: points for visiting, and the everyday points per RWF 1,000.
  const rewards = [
  rewardList.find((p) => p.pointsPerVisit > 0),
  rewardList.find((p) => p.pointsPerBasket > 0 && p.recurring === 'Does not repeat') ?? rewardList.find((p) => p.pointsPerBasket > 0)].
  filter((p): p is PromotionRow => Boolean(p));
  const discounts = forTier.filter((p) => p.type === 'Discount').slice(0, 1);

  return (
    <div className="pb-10">
      <div className="flex items-center gap-1 px-3 pt-2">
        <button
          type="button"
          onClick={() => setSearchParams({})}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
          aria-label="Back to all tiers">
          
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-[22px] font-extrabold tracking-tight text-ink">Simba+ {selected} Offers</h1>
      </div>


      <div className="mt-4 px-5">
        {included ?
        <p className="flex items-center gap-2 rounded-2xl bg-leaf-soft px-4 py-3 text-sm font-bold text-leaf">
            <CircleCheckIcon className="h-5 w-5" aria-hidden="true" />
            {current ? `Your tier · Simba+ ${selected}` : `Included in your ${cardLevel} tier`}
          </p> :

        <section className="rounded-3xl bg-ink p-5 text-white" aria-label={`Upgrade to ${selected}`}>
            <p className="flex items-center gap-2 text-sm font-semibold text-white/70">
              <LockIcon className="h-4 w-4" aria-hidden="true" />
              Unlock Simba+ {selected}
            </p>
            <p className="mt-1 text-xl font-extrabold">Upgrade for 12 months</p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
              type="button"
              disabled={!canUsePoints}
              onClick={() => setUpgrade('points')}
              className="flex flex-col items-start rounded-2xl bg-white/10 p-3 text-left transition-colors duration-150 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50">
              
                <StarIcon className="h-5 w-5 fill-current text-gold-bright" aria-hidden="true" />
                <span className="mt-2 text-xs font-semibold text-white/70">Use points</span>
                <span className="num text-base font-extrabold">{tier.upgradePoints.toLocaleString('en-US')} pts</span>
                {!canUsePoints &&
              <span className="num mt-0.5 text-[11px] text-white/60">{(tier.upgradePoints - balance).toLocaleString('en-US')} more needed</span>
              }
              </button>
              <button
              type="button"
              onClick={() => setUpgrade('buy')}
              className="flex flex-col items-start rounded-2xl bg-simba p-3 text-left transition-colors duration-150 hover:bg-simba-dark">
              
                <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
                <span className="mt-2 text-xs font-semibold text-white/85">Buy access</span>
                <span className="num text-base font-extrabold">RWF {tier.upgradeRWF.toLocaleString('en-US')}</span>
                <span className="mt-0.5 text-[11px] text-white/80">per year</span>
              </button>
            </div>
          </section>
        }
      </div>

      <MembershipPromoList title="Offers" hint="From Simba+ partners" promos={offers} partners={partnerRows} dimmed={!included} />
      <MembershipPromoList title="Rewards" hint="Extra points" promos={rewards} partners={partnerRows} dimmed={!included} />
      <MembershipPromoList title="Discounts" hint="Off your Simba basket" promos={discounts} partners={partnerRows} dimmed={!included} />
      {forTier.length === 0 && <p className="mx-5 mt-6 text-sm text-muted">No promotions on this membership yet.</p>}
      <p className="mx-5 mt-4 text-xs text-muted">More partners are joining Simba+ every month. Partner terms apply.</p>

      <AnimatePresence>
        {upgrade && <UpgradeSheet key={upgrade} tier={tier} method={upgrade} onClose={() => setUpgrade(null)} />}
      </AnimatePresence>
    </div>);

}