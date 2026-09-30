import React from 'react';
import { tierTheme } from '../../../utils/tierTheme';
import { isArtwork } from '../../../data/admin/memberships';
import { CardGloss } from '../../mobile/CardGloss';

import { LionMark } from '../../brand/LionMark';

interface MembershipCoverProps {
  /** Artwork name ("Gold") or an uploaded image URL. */
  cover: string;
  /** Membership name printed on the card. */
  name: string;
  size?: 'sm' | 'md';
}

/** Miniature of the customer-app membership card, used as a membership's cover image. */
export function MembershipCover({ cover, name, size = 'md' }: MembershipCoverProps) {
  const box = size === 'sm' ? 'h-9 w-[57px] rounded-md' : 'aspect-[1.586] w-full rounded-xl';

  if (!isArtwork(cover)) {
    return cover ?
    <img src={cover} alt={`${name} cover`} className={`${box} shrink-0 object-cover shadow-card`} /> :

    <span className={`${box} flex shrink-0 items-center justify-center bg-sand text-[10px] font-bold text-muted`}>No cover</span>;

  }

  const t = tierTheme[cover];
  return (
    <span className={`${box} relative isolate flex shrink-0 overflow-hidden shadow-card ${t.bg} ${t.text}`} role="img" aria-label={`${name} card cover`}>
      <LionMark
        color={t.watermark.color}
        opacity={t.watermark.opacity}
        className="absolute -right-[18%] top-1/2 -z-10 h-[170%] -translate-y-[46%]" />
      
      {size === 'md' &&
      <span className="flex items-center gap-1.5 p-3">
          <LionMark tone={t.lion} className="h-6 shrink-0" />
          <span className="flex flex-col">
            <span className="text-sm font-bold leading-none" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              Simba+
            </span>
            <span className={`mt-1 self-start rounded-full px-1.5 py-px text-[8px] font-extrabold tracking-[0.14em] ${t.pill}`}>{(name || cover).toUpperCase()}</span>
          </span>
        </span>
      }
      <CardGloss />
    </span>);

}