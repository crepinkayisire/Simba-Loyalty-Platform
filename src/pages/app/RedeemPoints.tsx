import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StarIcon, WalletIcon, SendIcon, TruckIcon, ChevronRightIcon } from 'lucide-react';
import { ScreenHeader } from '../../components/mobile/ScreenHeader';
import { PartnerLogo } from '../../components/mobile/PartnerLogo';
import { ConvertPointsSheet } from '../../components/mobile/ConvertPointsSheet';
import { GiftPointsSheet } from '../../components/mobile/redeem/GiftPointsSheet';
import { PartnerPromoSheet } from '../../components/mobile/redeem/PartnerPromoSheet';
import { FreeShippingSheet } from '../../components/mobile/redeem/FreeShippingSheet';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { partners } from '../../data/benefits';
import { freeShipping, giftMinPoints, partnerPromos, type PartnerPromo } from '../../data/redeemOptions';
import { programRules } from '../../data/programRules';

type Sheet = {kind: 'topup';} | {kind: 'gift';} | {kind: 'promo';promo: PartnerPromo;} | {kind: 'shipping';} | null;

export function RedeemPoints() {
  const { balance } = useLoyalty();
  const [sheet, setSheet] = useState<Sheet>(null);
  const close = () => setSheet(null);

  return (
    <div className="pb-8">
      <ScreenHeader title="Redeem Points" backTo="/app" />

      <div className="px-5">
        <section aria-label="Your balance" className="pt-2 text-center">
          <p className="num flex items-center justify-center gap-2 text-[44px] font-extrabold leading-none tracking-tight text-ink">
            <StarIcon className="h-8 w-8 fill-current text-simba" aria-hidden="true" />
            {balance.toLocaleString('en-US')}
          </p>
          <p className="mt-1.5 text-sm font-bold text-ink">Simba Points</p>
          <p className="mt-1 text-sm text-muted">Pick what to redeem, then choose how many points.</p>
        </section>

        <OptionGroup title="Simba+ card & friends">
          <OptionRow
            leading={<IconTile icon={WalletIcon} cls="bg-simba text-white" />}
            title="Simba+ card top up"
            detail={`1 point = RWF ${programRules.pointValueRWF} on your shopping card`}
            trailing={`From ${programRules.minRedeemPoints}`}
            disabled={balance < programRules.minRedeemPoints}
            onClick={() => setSheet({ kind: 'topup' })} />
          
          <OptionRow
            leading={<IconTile icon={SendIcon} cls="bg-leaf-soft text-leaf" />}
            title="Send to a friend"
            detail="Gift points to any Rwandan phone number"
            trailing={`From ${giftMinPoints}`}
            disabled={balance < giftMinPoints}
            onClick={() => setSheet({ kind: 'gift' })} />
          
        </OptionGroup>

        <OptionGroup title="Partner promos">
          {partnerPromos.map((p) =>
          <OptionRow
            key={p.id}
            leading={<PartnerLogo partner={partners[p.partnerId]} />}
            title={p.title}
            detail={p.detail}
            trailing={p.points.toLocaleString('en-US')}
            disabled={balance < p.points}
            onClick={() => setSheet({ kind: 'promo', promo: p })} />

          )}
        </OptionGroup>

        <OptionGroup title="Simba online">
          <OptionRow
            leading={<IconTile icon={TruckIcon} cls="bg-gold-soft text-gold" />}
            title="Free shipping"
            detail="On your next Simba online order"
            trailing={freeShipping.points.toLocaleString('en-US')}
            disabled={balance < freeShipping.points}
            onClick={() => setSheet({ kind: 'shipping' })} />
          
        </OptionGroup>
      </div>

      <AnimatePresence>
        {sheet?.kind === 'topup' && <ConvertPointsSheet key="topup" onClose={close} />}
        {sheet?.kind === 'gift' && <GiftPointsSheet key="gift" onClose={close} />}
        {sheet?.kind === 'promo' && <PartnerPromoSheet key={sheet.promo.id} initialPromo={sheet.promo} onClose={close} />}
        {sheet?.kind === 'shipping' && <FreeShippingSheet key="shipping" onClose={close} />}
      </AnimatePresence>
    </div>);

}

function OptionGroup({ title, children }: {title: string;children: React.ReactNode;}) {
  return (
    <section className="mt-6" aria-label={title}>
      <h2 className="px-1 text-sm font-extrabold text-ink">{title}</h2>
      <ul className="mt-2 divide-y divide-line overflow-hidden rounded-2xl bg-white shadow-card">{children}</ul>
    </section>);

}

function IconTile({ icon: Icon, cls }: {icon: React.ComponentType<{className?: string;}>;cls: string;}) {
  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cls}`}>
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>);

}

interface OptionRowProps {
  leading: React.ReactNode;
  title: string;
  detail: string;
  /** Points needed, shown with a star. */
  trailing: string;
  disabled?: boolean;
  onClick: () => void;
}

function OptionRow({ leading, title, detail, trailing, disabled, onClick }: OptionRowProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white">
        
        {leading}
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold leading-snug text-ink">{title}</span>
          <span className="block truncate text-xs text-muted">{detail}</span>
        </span>
        <span className="num flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-extrabold text-simba">
          <StarIcon className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          {trailing}
        </span>
        <ChevronRightIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
      </button>
    </li>);

}