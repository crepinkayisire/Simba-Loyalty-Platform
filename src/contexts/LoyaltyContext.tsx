import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { baseActivity, baseNotifications } from '../data/activity';
import { baseBalance, baseQualifyingPoints, todaysPurchase } from '../data/customer';
import { rewards } from '../data/rewards';
import { baseCardHistory, giftPoints, type CardTxn } from '../data/shoppingCard';
import { customer } from '../data/customer';
import { tierRules, programRules } from '../data/programRules';
import type { ActivityItem, CardLevel, NotificationItem, Redemption, Reward } from '../types/loyalty';

interface CompletedRedemption {
  rewardId: string;
  code: string;
}

interface LoyaltyContextValue {
  balance: number;
  qualifyingPoints: number;
  pointsToPlatinum: number;
  platinumThreshold: number;
  purchased: boolean;
  redemption: Redemption | null;
  lastCompleted: CompletedRedemption | null;
  activity: ActivityItem[];
  notifications: NotificationItem[];
  unreadIds: string[];
  activatedOffers: string[];
  cardBalance: number;
  cardHistory: CardTxn[];
  /** `via` describes the payment method shown in card history, e.g. "Airtel Money · +250 733 …". */
  topUpCard: (amount: number, via?: string) => void;
  giftCard: (friend: string, amount: number) => void;
  convertPoints: (points: number) => number;
  /** Deducts points for a redemption (gift, partner promo, free shipping) and logs it in Activity. */
  spendPoints: (points: number, title: string, subtitle: string) => void;
  cardLevel: CardLevel;
  /** Ids of console points campaigns Joseph has claimed. */
  claimedCampaigns: string[];
  claimCampaign: (id: string, points: number, name: string) => void;
  upgradeTier: (level: CardLevel, method: 'points' | 'buy', cost: number) => void;
  completePurchase: () => void;
  /** Completes today's sale at the till: earns points, applies redeemed points and card payment. */
  checkoutSale: (sale: CheckoutSale) => void;
  startRedemption: (rewardId: string) => void;
  cancelRedemption: () => void;
  confirmRedemption: () => void;
  activateOffer: (offerId: string) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  reset: () => void;
  getReward: (id: string) => Reward | undefined;
}

export interface CheckoutSale {
  pointsUsed: number;
  pointsRWF: number;
  cardPaid: number;
  cardBonus: number;
}

const LoyaltyContext = createContext<LoyaltyContextValue | null>(null);

interface LoyaltyProviderProps {
  startAfterCheckout: boolean;
  children: React.ReactNode;
}

export function LoyaltyProvider({ startAfterCheckout, children }: LoyaltyProviderProps) {
  const [purchased, setPurchased] = useState(startAfterCheckout);
  const [redemption, setRedemption] = useState<Redemption | null>(null);
  const [completed, setCompleted] = useState<CompletedRedemption[]>([]);
  const [activatedOffers, setActivatedOffers] = useState<string[]>([]);
  const [readIds, setReadIds] = useState<string[]>(startAfterCheckout ? [] : ['n-birthday']);
  const [cardBalance, setCardBalance] = useState(customer.cardBalanceRWF);
  const [cardEvents, setCardEvents] = useState<CardTxn[]>([]);
  const [pointEvents, setPointEvents] = useState<ActivityItem[]>([]);
  const [cardLevel, setCardLevel] = useState<CardLevel>(customer.cardLevel);
  const [claimedCampaigns, setClaimedCampaigns] = useState<string[]>([]);

  const getReward = useCallback((id: string) => rewards.find((r) => r.id === id), []);

  const platinumThreshold = tierRules.find((t) => t.name === 'Platinum')?.qualifyPoints ?? 4000;
  const redeemedPoints = completed.reduce((sum, c) => sum + (getReward(c.rewardId)?.points ?? 0), 0);
  const extraPoints = pointEvents.reduce((sum, e) => sum + e.points, 0);
  const balance = baseBalance + (purchased ? todaysPurchase.points : 0) - redeemedPoints + extraPoints;
  const qualifyingPoints = baseQualifyingPoints + (purchased ? todaysPurchase.points : 0);
  const pointsToPlatinum = Math.max(0, platinumThreshold - qualifyingPoints);

  const activity = useMemo<ActivityItem[]>(() => {
    const today: ActivityItem[] = [];
    [...completed].reverse().forEach((c, i) => {
      const reward = getReward(c.rewardId);
      if (!reward) return;
      today.push({
        id: `a-redeem-${i}-${c.code}`,
        group: 'Today',
        title: reward.title,
        subtitle: `Redeemed · ${todaysPurchase.store}`,
        points: -reward.points,
        kind: 'redeemed',
        time: 'Just now'
      });
    });
    if (purchased) {
      today.push({
        id: 'a-today-kh',
        group: 'Today',
        title: todaysPurchase.store,
        subtitle: 'RWF 72,500 purchase',
        points: todaysPurchase.points,
        kind: 'earned',
        time: '14:32'
      });
    }
    return [...pointEvents, ...today, ...baseActivity];
  }, [completed, purchased, getReward, pointEvents]);

  const notifications = useMemo<NotificationItem[]>(() => {
    const dynamic: NotificationItem[] = [];
    [...completed].reverse().forEach((c) => {
      const reward = getReward(c.rewardId);
      if (!reward) return;
      dynamic.push({
        id: `n-redeemed-${c.code}`,
        title: `${reward.title} redeemed`,
        body: `You saved RWF ${reward.valueRWF.toLocaleString('en-US')}. ${reward.points.toLocaleString('en-US')} points used.`,
        time: 'Just now',
        kind: 'reward',
        link: '/app'
      });
    });
    if (purchased) {
      dynamic.push(
        {
          id: 'n-earned',
          title: 'You earned 725 Simba Points',
          body: `RWF 72,500 at Simba Kigali Heights. New balance: ${balance.toLocaleString('en-US')} points.`,
          time: 'Today',
          kind: 'earned',
          link: '/app'
        },
        {
          id: 'n-platinum',
          title: `Only ${pointsToPlatinum.toLocaleString('en-US')} points until Platinum`,
          body: 'Keep shopping to unlock free delivery and Platinum-only offers.',
          time: 'Today',
          kind: 'tier',
          link: '/app/offers'
        }
      );
    }
    return [...dynamic, ...baseNotifications];
  }, [completed, purchased, pointsToPlatinum, getReward, balance]);

  const unreadIds = notifications.filter((n) => !readIds.includes(n.id)).map((n) => n.id);

  const value: LoyaltyContextValue = {
    balance,
    qualifyingPoints,
    pointsToPlatinum,
    platinumThreshold,
    purchased,
    redemption,
    lastCompleted: completed.length ? completed[completed.length - 1] : null,
    activity,
    notifications,
    unreadIds,
    activatedOffers,
    cardBalance,
    cardHistory: [...cardEvents, ...baseCardHistory],
    topUpCard: (amount, via) => {
      setCardBalance((b) => b + amount);
      setCardEvents((list) => [
      { id: `c-top-${Date.now()}`, group: 'Today', title: 'Top up', subtitle: via ?? `MTN MoMo · ${customer.phone}`, amount, kind: 'topup', time: 'Just now' },
      ...list]
      );
    },
    giftCard: (friend, amount) => {
      const stamp = Date.now();
      setCardEvents((list) => [
      { id: `c-gift-${stamp}`, group: 'Today', title: `Shopping card for ${friend}`, subtitle: 'Gift · paid with MTN MoMo', amount, kind: 'gift', time: 'Just now' },
      ...list]
      );
      setPointEvents((list) => [
      { id: `a-gift-${stamp}`, group: 'Today', title: 'Bought shopping card for a friend', subtitle: `Gift for ${friend}`, points: giftPoints, kind: 'bonus', time: 'Just now' },
      ...list]
      );
    },
    convertPoints: (points) => {
      const rwf = points * programRules.pointValueRWF;
      const stamp = Date.now();
      setCardBalance((b) => b + rwf);
      setCardEvents((list) => [
      { id: `c-conv-${stamp}`, group: 'Today', title: 'Converted Simba Points', subtitle: `${points.toLocaleString('en-US')} points`, amount: rwf, kind: 'convert', time: 'Just now' },
      ...list]
      );
      setPointEvents((list) => [
      { id: `a-conv-${stamp}`, group: 'Today', title: 'Converted to shopping card', subtitle: `RWF ${rwf.toLocaleString('en-US')} added`, points: -points, kind: 'redeemed', time: 'Just now' },
      ...list]
      );
      return rwf;
    },
    spendPoints: (points, title, subtitle) => {
      setPointEvents((list) => [
      { id: `a-spend-${Date.now()}`, group: 'Today', title, subtitle, points: -points, kind: 'redeemed', time: 'Just now' },
      ...list]
      );
    },
    cardLevel,
    claimedCampaigns,
    claimCampaign: (id, points, name) => {
      if (claimedCampaigns.includes(id)) return;
      setClaimedCampaigns((list) => [...list, id]);
      setPointEvents((list) => [
      { id: `a-claim-${id}`, group: 'Today', title: name, subtitle: 'Bonus points claimed', points, kind: 'bonus', time: 'Just now' },
      ...list]
      );
    },
    upgradeTier: (level, method, cost) => {
      const stamp = Date.now();
      setCardLevel(level);
      if (method === 'points') {
        setPointEvents((list) => [
        { id: `a-upg-${stamp}`, group: 'Today', title: `Upgraded to Simba+ ${level}`, subtitle: 'Paid with points', points: -cost, kind: 'redeemed', time: 'Just now' },
        ...list]
        );
      } else {
        setCardEvents((list) => [
        { id: `c-upg-${stamp}`, group: 'Today', title: `Simba+ ${level} access`, subtitle: '12 months · paid with MTN MoMo', amount: cost, kind: 'membership', time: 'Just now' },
        ...list]
        );
      }
    },
    completePurchase: () => setPurchased(true),
    checkoutSale: ({ pointsUsed, pointsRWF, cardPaid, cardBonus }) => {
      if (purchased) return;
      setPurchased(true);
      if (cardPaid > 0) {
        setCardBalance((b) => b - cardPaid);
        setCardEvents((list) => [
        { id: 'c-today-kh', group: 'Today', title: todaysPurchase.store, subtitle: 'Paid with shopping card', amount: -cardPaid, kind: 'payment', time: '14:32' },
        ...list]
        );
      }
      const events: ActivityItem[] = [];
      if (cardBonus > 0) {
        events.push({ id: 'a-today-cardbonus', group: 'Today', title: 'Purchased using shopping card', subtitle: todaysPurchase.store, points: cardBonus, kind: 'bonus', time: '14:32' });
      }
      if (pointsUsed > 0) {
        events.push({ id: 'a-today-redeem', group: 'Today', title: 'Redeemed points at checkout', subtitle: `RWF ${pointsRWF.toLocaleString('en-US')} off · ${todaysPurchase.store}`, points: -pointsUsed, kind: 'redeemed', time: '14:32' });
      }
      if (events.length) setPointEvents((list) => [...events, ...list]);
    },
    startRedemption: (rewardId) =>
    setRedemption({ rewardId, status: 'pending', code: `RDM-${Math.floor(100000 + Math.random() * 899999)}` }),
    cancelRedemption: () => setRedemption(null),
    confirmRedemption: () => {
      if (!redemption || redemption.status !== 'pending') return;
      setCompleted((list) => [...list, { rewardId: redemption.rewardId, code: redemption.code }]);
      setRedemption({ ...redemption, status: 'redeemed' });
    },
    activateOffer: (offerId) =>
    setActivatedOffers((list) => list.includes(offerId) ? list : [...list, offerId]),
    markRead: (id) => setReadIds((list) => list.includes(id) ? list : [...list, id]),
    markAllRead: () => setReadIds(notifications.map((n) => n.id)),
    reset: () => {
      setPurchased(startAfterCheckout);
      setRedemption(null);
      setCompleted([]);
      setActivatedOffers([]);
      setCardBalance(customer.cardBalanceRWF);
      setCardEvents([]);
      setPointEvents([]);
      setCardLevel(customer.cardLevel);
      setClaimedCampaigns([]);
      setReadIds(startAfterCheckout ? [] : ['n-birthday']);
    },
    getReward
  };

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error('useLoyalty must be used inside LoyaltyProvider');
  return ctx;
}