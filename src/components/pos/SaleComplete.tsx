import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, BellRingIcon } from 'lucide-react';
import { formatRWF } from '../../utils/format';
import type { SaleBreakdown } from '../../utils/checkoutMath';

interface SaleCompleteProps {
  /** Missing when the page is opened after the demo sale already happened. */
  sale: SaleBreakdown | null;
  methodLabel: string;
  cardBalance: number;
  points: number;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function SaleComplete({ sale, methodLabel, cardBalance, points }: SaleCompleteProps) {
  const earned = sale ? sale.pointsEarned + sale.cardBonus : 0;
  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease }}
        className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-white">
        
        <CheckIcon className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
      </motion.span>
      <h2 className="mt-4 text-2xl font-extrabold text-ink">Sale complete</h2>
      {sale ?
      <p className="num mt-1 text-base text-ink-soft">
          <span className="font-extrabold text-leaf">+{earned.toLocaleString('en-US')} points</span> added to Joseph's card
        </p> :

      <p className="mt-1 text-sm text-muted">Today's sale for Joseph has already been completed. Use Reset demo to run it again.</p>
      }

      {sale &&
      <dl className="num mt-5 w-full space-y-2 rounded-2xl border border-line p-4 text-left text-sm">
          {sale.cardPaid > 0 &&
        <div className="flex justify-between">
              <dt className="text-muted">Simba+ card</dt>
              <dd className="font-bold text-ink">{formatRWF(sale.cardPaid)}</dd>
            </div>
        }
          {sale.remainder > 0 &&
        <div className="flex justify-between">
              <dt className="text-muted">{methodLabel}</dt>
              <dd className="font-bold text-ink">{formatRWF(sale.remainder)}</dd>
            </div>
        }
          <div className="flex justify-between border-t border-line pt-2">
            <dt className="font-bold text-ink">Customer saved</dt>
            <dd className="font-extrabold text-leaf">{formatRWF(sale.tierDiscount + sale.pointsRWF)}</dd>
          </div>
        </dl>
      }

      <div className="mt-3 grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl bg-canvas p-4 text-left">
          <p className="text-xs font-bold text-muted">Card balance</p>
          <p className="num text-xl font-extrabold text-ink">{formatRWF(cardBalance)}</p>
        </div>
        <div className="rounded-2xl bg-canvas p-4 text-left">
          <p className="text-xs font-bold text-muted">Simba+ points</p>
          <p className="num text-xl font-extrabold text-ink">{points.toLocaleString('en-US')} pts</p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink-soft">
        <BellRingIcon className="h-4 w-4 text-simba" aria-hidden="true" />
        Receipt and points sent to the Simba+ app
      </p>

      <Link
        to="/app"
        className="mt-auto flex h-12 w-full items-center justify-center rounded-xl bg-ink text-sm font-extrabold text-white transition-colors duration-150 hover:bg-ink-soft">
        
        Back to customer app
      </Link>
    </div>);

}