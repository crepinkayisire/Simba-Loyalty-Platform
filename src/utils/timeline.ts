import type { CardTxn } from '../data/shoppingCard';
import type { ActivityItem } from '../types/loyalty';
import { formatSignedPoints } from './format';

export interface TimelineEntry {
  id: string;
  source: 'card' | 'points';
  typeLabel: string;
  title: string;
  subtitle: string;
  value: string;
  valueTone: 'leaf' | 'ink' | 'muted';
  date: string;
}

const cardLabels: Record<CardTxn['kind'], string> = {
  topup: 'Top up',
  payment: 'Card payment',
  gift: 'Gift card',
  convert: 'Points converted',
  membership: 'Membership'
};

const pointLabels: Record<ActivityItem['kind'], string> = {
  earned: 'Points earned',
  bonus: 'Bonus points',
  redeemed: 'Points used'
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dateRank(group: string): number {
  if (group === 'Today') return 10_000;
  const [mon, day] = group.split(' ');
  return MONTHS.indexOf(mon) * 100 + Number(day);
}

function dateLabel(group: string, time: string) {
  return group === 'Today' ? `Today, ${time}` : group;
}

/** Merge shopping-card and points activity into one list, newest first. */
export function buildTimeline(cardHistory: CardTxn[], activity: ActivityItem[]): TimelineEntry[] {
  const card = cardHistory.map((t, i) => ({
    id: t.id,
    source: 'card' as const,
    typeLabel: cardLabels[t.kind],
    title: t.title,
    subtitle: t.subtitle,
    value:
    t.kind === 'gift' || t.kind === 'membership' ?
    `RWF ${t.amount.toLocaleString('en-US')}` :
    `${t.amount > 0 ? '+' : '−'}RWF ${Math.abs(t.amount).toLocaleString('en-US')}`,
    valueTone: (t.kind === 'gift' || t.kind === 'membership' ? 'muted' : t.amount > 0 ? 'leaf' : 'ink') as TimelineEntry['valueTone'],
    date: dateLabel(t.group, t.time),
    rank: dateRank(t.group),
    order: i
  }));

  const points = activity.map((a, i) => ({
    id: a.id,
    source: 'points' as const,
    typeLabel: pointLabels[a.kind],
    title: a.title,
    subtitle: a.subtitle,
    value: `${formatSignedPoints(a.points)} pts`,
    valueTone: (a.points > 0 ? 'leaf' : 'ink') as TimelineEntry['valueTone'],
    date: dateLabel(a.group, a.time),
    rank: dateRank(a.group),
    order: i + 0.5
  }));

  return [...card, ...points].
  sort((a, b) => b.rank - a.rank || a.order - b.order).
  map(({ rank: _rank, order: _order, ...entry }) => entry);
}