import React from 'react';
import { PercentIcon, StarIcon } from 'lucide-react';
import { PartnerLogo } from './PartnerLogo';
import { toLogo } from '../admin/partners/partnerFields';
import type { PromotionRow } from '../../data/admin/promotions';
import type { PartnerRow } from '../../data/admin/partners';

interface MembershipPromoListProps {
  title: string;
  hint: string;
  promos: PromotionRow[];
  partners: PartnerRow[];
  dimmed: boolean;
}

/** One informational group (Offers, Rewards or Discounts) inside a membership. Rows are not tappable. */
export function MembershipPromoList({ title, hint, promos, partners, dimmed }: MembershipPromoListProps) {
  if (!promos.length) return null;

  return (
    <section className="mx-5 mt-6" aria-label={title}>
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-extrabold text-ink">{title}</h2>
        <span className="text-xs font-semibold text-muted">{hint}</span>
      </div>
      <ul className="mt-2 divide-y divide-line rounded-2xl bg-white shadow-card">
        {promos.map((p) => {
          const partner = p.type === 'Offer' ? partners.find((x) => x.name === p.partner) : undefined;
          return (
            <li key={p.id} className="flex items-center gap-3.5 p-4">
              {partner ?
              <PartnerLogo partner={toLogo(partner)} /> :

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-simba-soft text-simba">
                  {p.type === 'Reward' ? <StarIcon className="h-5 w-5 fill-simba" aria-hidden="true" /> : <PercentIcon className="h-5 w-5" strokeWidth={2.6} aria-hidden="true" />}
                </span>
              }
              <div className={`min-w-0 flex-1 ${dimmed ? 'opacity-70' : ''}`}>
                <p className="text-xs font-semibold text-muted">{partner ? `${partner.name} · ${partner.category}` : 'Simba Supermarket'}</p>
                <p className="text-[15px] font-extrabold text-ink">{p.name}</p>
                {p.description && <p className="text-sm text-ink-soft">{p.description}</p>}
              </div>
            </li>);

        })}
      </ul>
    </section>);

}