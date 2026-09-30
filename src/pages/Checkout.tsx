import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreIcon, UserRoundIcon, BadgePercentIcon, StarIcon, WalletIcon } from 'lucide-react';
import { useLoyalty } from '../contexts/LoyaltyContext';
import { SimbaLogo } from '../components/brand/SimbaLogo';
import { IdentifyPanel, type IdentifyVia } from '../components/pos/IdentifyPanel';
import { MemberPanel } from '../components/pos/MemberPanel';
import { SaleComplete } from '../components/pos/SaleComplete';
import { customer, todaysPurchase } from '../data/customer';
import { posMethods, posStore, type PosMethodId } from '../data/posMethods';
import { computeSale, simbaDiscountPct, type SaleBreakdown } from '../utils/checkoutMath';
import { currentCode } from '../utils/checkoutCode';
import { formatRWF } from '../utils/format';

type Stage = 'identify' | 'identified' | 'done';

const ease = [0.23, 1, 0.32, 1] as const;
const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2, ease }
};

export function Checkout() {
  const [params] = useSearchParams();
  const { purchased, balance, cardBalance, cardLevel, checkoutSale } = useLoyalty();

  const [stage, setStage] = useState<Stage>(purchased ? 'done' : 'identify');
  const [via, setVia] = useState<IdentifyVia>('code');
  const [pointsUsed, setPointsUsed] = useState(0);
  const [useCard, setUseCard] = useState(cardBalance > 0);
  const [method, setMethod] = useState<PosMethodId>('mtn');
  const [completed, setCompleted] = useState<{sale: SaleBreakdown;methodLabel: string;} | null>(null);

  // Demo reset from the top bar: start a fresh sale.
  useEffect(() => {
    if (!purchased && stage === 'done') {
      setStage('identify');
      setCompleted(null);
      setPointsUsed(0);
    }
  }, [purchased, stage]);

  const identified = stage !== 'identify';
  const subtotal = todaysPurchase.items.reduce((s, i) => s + i.price, 0);
  const live = computeSale({
    subtotal,
    tierPct: identified ? simbaDiscountPct(cardLevel) : 0,
    pointsUsed: identified ? pointsUsed : 0,
    useCard: identified && useCard,
    cardBalance
  });
  const sale = completed?.sale ?? live;
  const methodLabel = posMethods.find((m) => m.id === method)?.label ?? 'MTN MoMo';

  const complete = () => {
    checkoutSale({ pointsUsed: live.pointsUsed, pointsRWF: live.pointsRWF, cardPaid: live.cardPaid, cardBonus: live.cardBonus });
    setCompleted({ sale: live, methodLabel });
    setStage('done');
  };

  const initialCode = params.get('scan') === 'card' ? currentCode(customer.name) : '';
  const showBreakdown = identified && (stage !== 'done' || completed);

  return (
    <div className="flex w-full flex-1 flex-col bg-sand">
      <div className="flex h-14 items-center justify-between bg-ink px-5 text-white">
        <div className="flex items-center gap-4">
          <SimbaLogo tone="white" size="sm" withPlus />
          <span className="hidden items-center gap-1.5 text-sm text-white/70 sm:flex">
            <StoreIcon className="h-4 w-4" aria-hidden="true" />
            {posStore.name} · {posStore.till}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70">
          <span className="hidden items-center gap-1.5 md:flex">
            <UserRoundIcon className="h-4 w-4" aria-hidden="true" />
            Cashier: {posStore.cashier}
          </span>
          <span className="num font-bold text-white">14:32</span>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl flex-1 gap-5 p-4 md:p-6 lg:grid-cols-[1fr_460px]">
        <section className="flex flex-col rounded-3xl bg-white p-6 shadow-card" aria-label="Current sale">
          <div className="flex items-baseline justify-between">
            <h1 className="flex items-center gap-2.5 text-xl font-extrabold text-ink">
              Current sale
              {stage === 'done' && <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-xs font-extrabold text-leaf">Paid</span>}
            </h1>
            <span className="num text-sm text-muted">Receipt {todaysPurchase.receipt}</span>
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs font-bold text-muted">
                <th className="pb-2 font-bold">Item</th>
                <th className="pb-2 font-bold">Qty</th>
                <th className="pb-2 text-right font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {todaysPurchase.items.map((item) =>
              <tr key={item.name} className="border-b border-line/60">
                  <td className="py-2.5 font-semibold text-ink">{item.name}</td>
                  <td className="py-2.5 text-muted">{item.qty}</td>
                  <td className="num py-2.5 text-right font-semibold text-ink">{item.price.toLocaleString('en-US')}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-auto pt-6">
            <div className="flex justify-between text-sm text-muted">
              <span>Subtotal · {todaysPurchase.items.length} items</span>
              <span className="num font-semibold text-ink">{formatRWF(sale.subtotal)}</span>
            </div>

            <AnimatePresence initial={false}>
              {showBreakdown && sale.tierDiscount > 0 &&
              <DiscountLine key="tier" icon={BadgePercentIcon} label={`Simba+ ${cardLevel} · ${sale.tierPct}% off`} amount={sale.tierDiscount} />
              }
              {showBreakdown && sale.pointsRWF > 0 &&
              <DiscountLine key="points" icon={StarIcon} label={`${sale.pointsUsed.toLocaleString('en-US')} points redeemed`} amount={sale.pointsRWF} />
              }
            </AnimatePresence>

            <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
              <div>
                <p className="text-sm font-bold text-ink">Total to pay</p>
                <p className="text-xs text-muted">{identified ? 'VAT included · Simba+ member' : 'VAT included · identify member for benefits'}</p>
              </div>
              <p className="num text-4xl font-extrabold text-ink">{formatRWF(sale.total)}</p>
            </div>

            {showBreakdown &&
            <div className="num mt-3 space-y-1.5 rounded-xl bg-canvas px-4 py-3 text-sm">
                {sale.cardPaid > 0 &&
              <div className="flex justify-between">
                    <span className="flex items-center gap-2 text-ink-soft">
                      <WalletIcon className="h-4 w-4 text-simba" aria-hidden="true" />
                      Simba+ card
                    </span>
                    <span className="font-bold text-ink">{formatRWF(sale.cardPaid)}</span>
                  </div>
              }
                {sale.remainder > 0 &&
              <div className="flex justify-between">
                    <span className="text-ink-soft">{completed?.methodLabel ?? methodLabel}</span>
                    <span className="font-bold text-ink">{formatRWF(sale.remainder)}</span>
                  </div>
              }
              </div>
            }
          </div>
        </section>

        <section className="flex flex-col rounded-3xl bg-white shadow-card" aria-label="Simba+" aria-live="polite">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <SimbaLogo size="sm" withPlus />
            <span className="text-xs font-semibold text-muted">
              {stage === 'identify' ? 'Member lookup' : stage === 'identified' ? 'Member benefits & payment' : 'Complete'}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <AnimatePresence mode="wait" initial={false}>
              {stage === 'identify' &&
              <motion.div key="identify" {...fade} className="flex flex-1 flex-col">
                  <IdentifyPanel
                  initialCode={initialCode}
                  onIdentified={(v) => {
                    setVia(v);
                    setUseCard(cardBalance > 0);
                    setStage('identified');
                  }} />
                
                </motion.div>
              }
              {stage === 'identified' &&
              <motion.div key="identified" {...fade} className="flex flex-1 flex-col">
                  <MemberPanel
                  level={cardLevel}
                  cardBalance={cardBalance}
                  points={balance}
                  via={via}
                  sale={live}
                  pointsUsed={pointsUsed}
                  onPointsUsed={setPointsUsed}
                  useCard={useCard}
                  onUseCard={setUseCard}
                  method={method}
                  onMethod={setMethod}
                  onChangeCustomer={() => {
                    setPointsUsed(0);
                    setStage('identify');
                  }}
                  onComplete={complete} />
                
                </motion.div>
              }
              {stage === 'done' &&
              <motion.div key="done" {...fade} className="flex flex-1 flex-col">
                  <SaleComplete sale={completed?.sale ?? null} methodLabel={completed?.methodLabel ?? methodLabel} cardBalance={cardBalance} points={balance} />
                </motion.div>
              }
            </AnimatePresence>
          </div>
          <p className="border-t border-line px-6 py-3 text-center text-xs text-muted">Loyalty infrastructure powered by Kayko</p>
        </section>
      </div>
    </div>);

}

function DiscountLine({ icon: Icon, label, amount }: {icon: React.ComponentType<{className?: string;}>;label: string;amount: number;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease }}
      className="mt-2 flex justify-between rounded-lg bg-leaf-soft px-3 py-2 text-sm font-bold text-leaf">
      
      <span className="flex items-center gap-1.5">
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </span>
      <span className="num">− {formatRWF(amount)}</span>
    </motion.div>);

}