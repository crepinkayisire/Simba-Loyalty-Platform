import React from 'react';
import {
  ShoppingBasketIcon,
  SparklesIcon,
  Repeat2Icon,
  ReceiptIcon,
  UserPlusIcon,
  CakeIcon,
  UserRoundCheckIcon,
  CalendarCheckIcon,
  TrendingUpIcon,
  StarIcon } from
'lucide-react';
import { ScreenHeader } from '../../components/mobile/ScreenHeader';
import { programRules } from '../../data/programRules';
import {
  basketBonuses,
  challengeResetLabel,
  earnExample,
  everyShop,
  extraBonuses,
  monthlyChallenges,
  type EarnChallenge,
  type EarnIcon,
  type EarnRule } from
'../../data/earnRules';

const icons: Record<EarnIcon, React.ComponentType<{className?: string;}>> = {
  basket: ShoppingBasketIcon,
  featured: SparklesIcon,
  double: Repeat2Icon,
  receipt: ReceiptIcon,
  friend: UserPlusIcon,
  cake: CakeIcon,
  profile: UserRoundCheckIcon,
  visits: CalendarCheckIcon,
  spend: TrendingUpIcon
};

export function EarnPoints() {
  const total = earnExample.shoppingPoints + earnExample.basketBonus;

  return (
    <div className="pb-8">
      <ScreenHeader title="How to Earn Points" backTo="/app" />

      <div className="px-5">
        <p className="pt-1 text-[22px] font-extrabold leading-tight tracking-tight text-ink">Shop, earn and get rewarded.</p>

        <section aria-label="Example purchase" className="mt-5 rounded-3xl bg-white p-5 shadow-card">
          <p className="text-xs font-bold text-muted">For example</p>
          <p className="num mt-1 text-lg font-extrabold text-ink">RWF {earnExample.purchase.toLocaleString('en-US')} purchase</p>
          <dl className="num mt-3 space-y-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Shopping points</dt>
              <dd className="font-bold text-ink">+{earnExample.shoppingPoints}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Basket bonus · RWF 50,000+</dt>
              <dd className="font-bold text-ink">+{earnExample.basketBonus}</dd>
            </div>
          </dl>
          <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
            <p className="text-sm font-extrabold text-ink">Points earned</p>
            <p className="num flex items-center gap-1.5 text-3xl font-extrabold text-simba">
              <StarIcon className="h-6 w-6 fill-current" aria-hidden="true" />
              {total}
            </p>
          </div>
          <p className="num mt-2 text-right text-xs font-semibold text-muted">
            Worth RWF {(total * programRules.pointValueRWF).toLocaleString('en-US')} on your card
          </p>
        </section>

        <RuleSection title="Every time you shop" rules={everyShop} />
        <RuleSection title="Big basket bonus" note="Per single purchase" rules={basketBonuses} />

        <section className="mt-7" aria-labelledby="monthly-heading">
          <div className="flex items-baseline justify-between">
            <h2 id="monthly-heading" className="text-base font-extrabold text-ink">Monthly challenges</h2>
            <span className="text-xs font-semibold text-muted">{challengeResetLabel}</span>
          </div>
          <ul className="mt-3 divide-y divide-line rounded-3xl bg-white px-4 shadow-card">
            {monthlyChallenges.map((c) =>
            <RuleRow key={c.id} rule={c} />
            )}
          </ul>
        </section>

        <RuleSection title="Extra bonuses" rules={extraBonuses} />
      </div>
    </div>);

}

function RuleSection({ title, note, rules }: {title: string;note?: string;rules: (EarnRule | EarnChallenge)[];}) {
  return (
    <section className="mt-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-extrabold text-ink">{title}</h2>
        {note && <span className="text-xs font-semibold text-muted">{note}</span>}
      </div>
      <ul className="mt-3 divide-y divide-line rounded-3xl bg-white px-4 shadow-card">
        {rules.map((r) =>
        <RuleRow key={r.id} rule={r} />
        )}
      </ul>
    </section>);

}

function RuleRow({ rule }: {rule: EarnRule | EarnChallenge;}) {
  const Icon = icons[rule.icon];
  const challenge = 'target' in rule ? rule : null;
  const pct = challenge ? Math.min(100, Math.round(challenge.current / challenge.target * 100)) : 0;
  const done = challenge ? challenge.current >= challenge.target : false;

  return (
    <li className="py-3.5">
      <div className="flex items-center gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-simba-soft text-simba">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-snug text-ink">{rule.title}</span>
          {rule.detail && <span className="block text-sm text-muted">{rule.detail}</span>}
        </span>
        <span className="num shrink-0 whitespace-nowrap text-sm font-extrabold text-simba">{rule.reward}</span>
      </div>
      {challenge &&
      <div className="mt-2.5 pl-[54px]">
          <div
          className="h-2 overflow-hidden rounded-full bg-sand"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={challenge.target}
          aria-valuenow={challenge.current}
          aria-label={`${rule.title} progress`}>
          
            <div className={`h-full rounded-full ${done ? 'bg-leaf' : 'bg-simba'}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="num mt-1.5 text-xs font-semibold text-muted">{progressLabel(challenge)}</p>
        </div>
      }
    </li>);

}

function progressLabel(c: EarnChallenge): string {
  if (c.unit === 'visits') return `${c.current} of ${c.target} visits · ${c.target - c.current} to go`;
  if (c.unit === 'steps') return `${c.current} of ${c.target} details added`;
  const left = Math.max(0, c.target - c.current);
  return `RWF ${c.current.toLocaleString('en-US')} of ${c.target.toLocaleString('en-US')} · RWF ${left.toLocaleString('en-US')} to go`;
}