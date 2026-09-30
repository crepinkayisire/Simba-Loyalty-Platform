import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronDownIcon, CircleCheckIcon, LockIcon, StarIcon, CreditCardIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { PartnerLogo } from '../../components/mobile/PartnerLogo';
import { UpgradeSheet } from '../../components/mobile/UpgradeSheet';
import { tierBenefits, partners, levelOrder, howToUse, partnerTerms } from '../../data/benefits';

const ease = [0.23, 1, 0.32, 1] as const;

export function OfferDetail() {
  const { level = '', partnerId = '' } = useParams();
  const navigate = useNavigate();
  const { balance, cardLevel } = useLoyalty();
  const [termsOpen, setTermsOpen] = useState(false);
  const [upgrade, setUpgrade] = useState<'points' | 'buy' | null>(null);

  const tier = tierBenefits.find((t) => t.level === level);
  const benefit = tier?.benefits.find((b) => b.partner === partnerId);
  const partner = partners[partnerId];
  if (!tier || !benefit || !partner) return <Navigate to="/app/offers" replace />;

  const included = levelOrder.indexOf(tier.level) <= levelOrder.indexOf(cardLevel);
  const needed = Math.max(0, tier.upgradePoints - balance);
  const progress = tier.upgradePoints ? Math.min(1, balance / tier.upgradePoints) : 1;

  // What the same partner gives on the member's current tier, for comparison.
  const currentTier = tierBenefits.find((t) => t.level === cardLevel);
  const currentBenefit = currentTier?.benefits.find((b) => b.partner === partnerId);

  return (
    <div className="flex min-h-full flex-col pb-8">
      <div className="flex h-14 items-center px-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand"
          aria-label="Back">
          
          <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div className="px-5">
        <div className="flex items-center gap-3">
          <PartnerLogo partner={partner} />
          <div>
            <p className="text-sm font-bold text-ink">{partner.name}</p>
            <p className="text-xs font-semibold text-muted">{partner.category} · Simba+ {tier.level}</p>
          </div>
        </div>
        <h1 className="mt-4 text-[30px] font-extrabold leading-tight tracking-tight text-ink">{benefit.title}</h1>
        <p className="mt-1 text-base text-ink-soft">{benefit.detail}</p>

        {included ?
        <section className="mt-5 rounded-3xl bg-leaf-soft p-5" aria-label="Your access">
            <p className="flex items-center gap-2 text-sm font-extrabold text-leaf">
              <CircleCheckIcon className="h-5 w-5" aria-hidden="true" />
              {tier.level === cardLevel ? `Active on your ${cardLevel} card` : `Included in your ${cardLevel} tier`}
            </p>
            <p className="mt-2 text-sm text-ink-soft">Just show your Simba+ card. No code or points needed.</p>
          </section> :

        <section className="mt-5 rounded-3xl bg-ink p-5 text-white" aria-label="Unlock this benefit">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/70">
              <LockIcon className="h-4 w-4" aria-hidden="true" />
              Unlocks with Simba+ {tier.level}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="num text-3xl font-extrabold leading-none">
                {balance.toLocaleString('en-US')}
                <span className="ml-1 text-sm font-bold text-white/60">/ {tier.upgradePoints.toLocaleString('en-US')} pts</span>
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Points toward upgrade">
              <div className="h-full rounded-full bg-gold-bright" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="num mt-2 text-sm text-white/75">
              {needed > 0 ?
            `${needed.toLocaleString('en-US')} more points to upgrade. That's about RWF ${(needed * 100).toLocaleString('en-US')} of shopping.` :
            'You have enough points to upgrade now.'}
            </p>
            {currentBenefit &&
          <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-white/80">
                On {cardLevel} today: <span className="font-bold text-white">{currentBenefit.title}</span>
              </p>
          }
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
              type="button"
              disabled={needed > 0}
              onClick={() => setUpgrade('points')}
              className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-white text-sm font-extrabold text-ink transition-colors duration-150 hover:bg-sand disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/50">
              
                <StarIcon className="h-4 w-4 fill-current" aria-hidden="true" />
                Use points
              </button>
              <button
              type="button"
              onClick={() => setUpgrade('buy')}
              className="num flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-simba text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark">
              
                <CreditCardIcon className="h-4 w-4" aria-hidden="true" />
                RWF {tier.upgradeRWF.toLocaleString('en-US')}
              </button>
            </div>
          </section>
        }

        <section className="mt-6" aria-labelledby="offer-how">
          <h2 id="offer-how" className="text-base font-extrabold text-ink">How to use it</h2>
          <ol className="mt-3 space-y-3">
            {(howToUse[partnerId] ?? []).map((step, i) =>
            <li key={step} className="flex gap-3 text-sm text-ink-soft">
                <span className="num flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sand text-xs font-extrabold text-ink">{i + 1}</span>
                {step}
              </li>
            )}
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-line">
          <button
            type="button"
            onClick={() => setTermsOpen((o) => !o)}
            aria-expanded={termsOpen}
            className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-ink">
            
            Terms and conditions
            <ChevronDownIcon className={`h-5 w-5 text-muted transition-transform duration-200 ${termsOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          <AnimatePresence initial={false}>
            {termsOpen &&
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease }}
              className="overflow-hidden px-4 text-xs leading-relaxed text-ink-soft">
              
                {partnerTerms.map((t) =>
              <li key={t} className="pb-2 last:pb-4">• {t}</li>
              )}
              </motion.ul>
            }
          </AnimatePresence>
        </section>
      </div>

      <AnimatePresence>
        {upgrade && <UpgradeSheet key={upgrade} tier={tier} method={upgrade} onClose={() => setUpgrade(null)} />}
      </AnimatePresence>
    </div>);

}