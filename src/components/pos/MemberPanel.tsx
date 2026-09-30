import React from 'react';
import { BadgePercentIcon, StarIcon, WalletIcon } from 'lucide-react';
import { Toggle } from '../admin/Toggle';
import { MemberStrip } from './MemberStrip';
import { posMethods, posPointOptions, type PosMethodId } from '../../data/posMethods';
import { programRules } from '../../data/programRules';
import { formatRWF } from '../../utils/format';
import { CARD_PAYMENT_BONUS, type SaleBreakdown } from '../../utils/checkoutMath';
import type { CardLevel } from '../../types/loyalty';
import type { IdentifyVia } from './IdentifyPanel';

interface MemberPanelProps {
  level: CardLevel;
  cardBalance: number;
  points: number;
  via: IdentifyVia;
  sale: SaleBreakdown;
  pointsUsed: number;
  onPointsUsed: (n: number) => void;
  useCard: boolean;
  onUseCard: (v: boolean) => void;
  method: PosMethodId;
  onMethod: (m: PosMethodId) => void;
  onChangeCustomer: () => void;
  onComplete: () => void;
}

export function MemberPanel(p: MemberPanelProps) {
  const { sale } = p;
  const earned = sale.pointsEarned + sale.cardBonus;
  const newPoints = p.points - sale.pointsUsed + earned;

  return (
    <div className="flex flex-1 flex-col">
      <MemberStrip level={p.level} cardBalance={p.cardBalance} points={p.points} via={p.via} />

      <div className="mt-4 flex items-center gap-3 rounded-xl bg-leaf-soft px-3.5 py-3">
        <BadgePercentIcon className="h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />
        <p className="flex-1 text-sm font-bold text-ink">
          {p.level} benefit: {sale.tierPct}% off at checkout
        </p>
        <span className="text-xs font-extrabold text-leaf">Applied</span>
      </div>

      <fieldset className="mt-5">
        <legend className="flex w-full items-center justify-between text-sm font-extrabold text-ink">
          <span className="flex items-center gap-2">
            <StarIcon className="h-4 w-4 fill-current text-simba" aria-hidden="true" />
            Redeem points
          </span>
          <span className="num text-xs font-semibold text-muted">1 pt = RWF {programRules.pointValueRWF}</span>
        </legend>
        <div role="radiogroup" aria-label="Points to redeem" className="mt-2 grid grid-cols-4 gap-2">
          {posPointOptions.map((opt) => {
            const value = opt === null ? p.points : opt;
            const disabled = value > p.points || value > 0 && value < programRules.minRedeemPoints;
            const on = p.pointsUsed === value;
            const label = opt === 0 ? 'None' : opt === null ? 'All' : value.toLocaleString('en-US');
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={disabled}
                onClick={() => p.onPointsUsed(value)}
                className={`num h-11 rounded-xl border-2 text-sm font-extrabold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                on ? 'border-simba bg-simba-soft text-simba' : 'border-line text-ink hover:border-ink/30'}`
                }>
                
                {label}
              </button>);

          })}
        </div>
        {sale.pointsUsed > 0 &&
        <p className="num mt-2 text-xs font-semibold text-leaf">
            {sale.pointsUsed.toLocaleString('en-US')} pts = {formatRWF(sale.pointsRWF)} off this sale
          </p>
        }
      </fieldset>

      <div className="mt-5 flex items-center gap-3 rounded-xl border border-line px-3.5 py-3">
        <WalletIcon className="h-5 w-5 shrink-0 text-simba" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-ink">Pay with Simba+ card</p>
          <p className="num text-xs text-muted">
            {p.cardBalance > 0 ? `${formatRWF(p.cardBalance)} available · +${CARD_PAYMENT_BONUS} bonus pts` : 'No balance · customer can top up in the app'}
          </p>
        </div>
        <Toggle checked={p.useCard && p.cardBalance > 0} onChange={(v) => p.cardBalance > 0 && p.onUseCard(v)} label="Pay with Simba+ card" />
      </div>

      {sale.remainder > 0 &&
      <fieldset className="mt-4">
          <legend className="text-sm font-extrabold text-ink">
            {sale.cardPaid > 0 ? 'Collect the rest by' : 'Collect payment by'}
          </legend>
          <div role="radiogroup" aria-label="Payment method" className="mt-2 grid grid-cols-4 gap-2">
            {posMethods.map((m) =>
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={p.method === m.id}
            onClick={() => p.onMethod(m.id)}
            className={`h-11 whitespace-nowrap rounded-xl border-2 px-1 text-xs font-extrabold transition-colors duration-150 ${
            p.method === m.id ? 'border-ink bg-ink text-white' : 'border-line text-ink hover:border-ink/30'}`
            }>
            
                {m.label}
              </button>
          )}
          </div>
        </fieldset>
      }

      <dl className="mt-5 space-y-2 rounded-xl bg-canvas p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Points earned · RWF {sale.subtotal.toLocaleString('en-US')} basket</dt>
          <dd className="num font-extrabold text-leaf">+{sale.pointsEarned.toLocaleString('en-US')}</dd>
        </div>
        {sale.cardBonus > 0 &&
        <div className="flex justify-between">
            <dt className="text-muted">Paid with Simba+ card</dt>
            <dd className="num font-extrabold text-leaf">+{sale.cardBonus}</dd>
          </div>
        }
        {sale.pointsUsed > 0 &&
        <div className="flex justify-between">
            <dt className="text-muted">Points redeemed</dt>
            <dd className="num font-extrabold text-ink">−{sale.pointsUsed.toLocaleString('en-US')}</dd>
          </div>
        }
        <div className="flex justify-between border-t border-line pt-2">
          <dt className="font-bold text-ink">New points balance</dt>
          <dd className="num text-base font-extrabold text-ink">{newPoints.toLocaleString('en-US')} pts</dd>
        </div>
      </dl>

      <div className="mt-auto grid grid-cols-[auto_1fr] gap-3 pt-5">
        <button
          type="button"
          onClick={p.onChangeCustomer}
          className="h-14 rounded-2xl border-2 border-line px-4 text-sm font-extrabold text-ink transition-colors duration-150 hover:border-ink/30">
          
          Change
        </button>
        <button
          type="button"
          onClick={p.onComplete}
          className="num h-14 rounded-2xl bg-simba px-5 text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-simba-dark">
          
          COMPLETE SALE · {formatRWF(sale.total)}
        </button>
      </div>
    </div>);

}