import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRightIcon, StarIcon, WalletIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';

const journey = ['Top up', 'Pay at till', 'Earn', 'Redeem', 'Unlock'];

const screens = [
{ to: '/app', label: 'Home', hint: 'Card, balances, checkout code' },
{ to: '/app/topup', label: 'Top up card', hint: 'MoMo, Airtel or bank card' },
{ to: '/app/earn', label: 'How to earn', hint: 'Bonuses and monthly challenges' },
{ to: '/app/redeem', label: 'Redeem points', hint: 'Four ways to use points' },
{ to: '/app/activity', label: 'Activity', hint: 'Card and points, with receipts' },
{ to: '/app/offers', label: 'Memberships', hint: 'Discounts, rewards and offers' },
{ to: '/app/offers/Platinum/serena', label: 'Offer details', hint: 'Serena on Platinum' },
{ to: '/app/notifications', label: 'Notifications', hint: 'Promos, points, birthdays' },
{ to: '/app/profile', label: 'Profile', hint: 'Details and preferences' }];


export function DemoGuide() {
  const { purchased, balance, cardBalance, cardLevel } = useLoyalty();

  const step = purchased ? 3 : 1;
  const next = purchased ?
  {
    text: 'Points are in. Turn them into card credit, gift them to family or unlock a partner promo.',
    to: '/app/redeem',
    cta: 'Redeem points'
  } :
  {
    text: "Read the 6-digit code on Joseph's card to the cashier. It changes every 60 seconds, so it can't be copied.",
    to: '/pos',
    cta: 'Open checkout'
  };

  return (
    <aside className="hidden w-72 shrink-0 xl:block" aria-label="Demo guide">
      <p className="text-sm font-semibold text-muted">Simba+ customer app</p>
      <h2 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight text-ink">
        One card to pay, earn and unlock more.
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Shopping money and Simba+ points live on the same card. Every shop earns points, and points turn back into money or perks.
      </p>

      <ol className="mt-6 flex flex-wrap gap-1.5" aria-label="Customer journey">
        {journey.map((name, i) =>
        <li
          key={name}
          aria-current={i === step ? 'step' : undefined}
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
          i === step ? 'bg-simba text-white' : i < step ? 'bg-ink text-white' : 'bg-sand text-muted'}`
          }>
          
            {name}
          </li>
        )}
      </ol>

      <div className="mt-5 rounded-2xl border border-line bg-white p-4">
        <p className="text-xs font-semibold text-muted">Try next</p>
        <p className="mt-1 text-sm font-semibold text-ink">{next.text}</p>
        <div className="mt-3 flex items-center gap-4">
          <Link to={next.to} className="inline-flex items-center gap-1.5 text-sm font-bold text-simba hover:text-simba-dark">
            {next.cta}
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
          {!purchased &&
          <Link to="/app/topup" className="text-sm font-semibold text-muted hover:text-ink">
              or top up first
            </Link>
          }
        </div>
        <dl className="num mt-4 grid grid-cols-2 gap-2 border-t border-line pt-3 text-xs">
          <div>
            <dt className="flex items-center gap-1 text-muted">
              <WalletIcon className="h-3.5 w-3.5 text-simba" aria-hidden="true" />
              Card
            </dt>
            <dd className="mt-0.5 font-bold text-ink">RWF {cardBalance.toLocaleString('en-US')}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-muted">
              <StarIcon className="h-3.5 w-3.5 fill-simba text-simba" aria-hidden="true" />
              Points · {cardLevel}
            </dt>
            <dd className="mt-0.5 font-bold text-ink">{balance.toLocaleString('en-US')}</dd>
          </div>
        </dl>
      </div>

      <nav className="mt-6" aria-label="All customer screens">
        <p className="text-xs font-semibold text-muted">Jump to a screen</p>
        <ul className="mt-2 space-y-0.5">
          {screens.map((s) =>
          <li key={s.to}>
              <NavLink
              to={s.to}
              end
              className={({ isActive }) =>
              `flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors duration-150 ${
              isActive ? 'bg-white font-bold text-ink' : 'text-muted hover:text-ink'}`

              }>
              
                <span className="shrink-0">{s.label}</span>
                <span className="truncate text-right text-[11px] font-normal text-muted">{s.hint}</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>);

}