import type { CardLevel } from '../types/loyalty';

export interface TierTheme {
  bg: string;
  text: string;
  sub: string;
  pill: string;
  divider: string;
  dark: boolean;
  /** Solid colour for SVG fills (pie timer). */
  fg: string;
  fgFaint: string;
  /** Large lion watermark: white on dark cards, ink on light cards. */
  watermark: {color: string;opacity: number;};
  /** Small lion beside "Simba+". */
  lion: 'white' | 'ink';
}

/** One watermark opacity for every tier; only the colour flips between light and dark cards. */
const WATERMARK_OPACITY = 0.1;
const lightMark = { color: '#1B1714', opacity: WATERMARK_OPACITY };
const darkMark = { color: '#FFFFFF', opacity: WATERMARK_OPACITY };

export const tierTheme: Record<CardLevel, TierTheme> = {
  Bronze: {
    bg: 'bg-[#9A5F3B]',
    text: 'text-white',
    sub: 'text-white/75',
    pill: 'bg-white/20 text-white',
    divider: 'divide-white/25',
    dark: true,
    fg: '#FFFFFF',
    fgFaint: 'rgba(255,255,255,0.25)',
    watermark: darkMark,
    lion: 'white'
  },
  Silver: {
    bg: 'bg-[#D5DAE0]',
    text: 'text-ink',
    sub: 'text-ink/65',
    pill: 'bg-ink/10 text-ink',
    divider: 'divide-ink/15',
    dark: false,
    fg: '#1B1714',
    fgFaint: 'rgba(27,23,20,0.15)',
    watermark: lightMark,
    lion: 'ink'
  },
  Gold: {
    bg: 'bg-[#E6B34A]',
    text: 'text-ink',
    sub: 'text-ink/70',
    pill: 'bg-ink text-white',
    divider: 'divide-ink/15',
    dark: false,
    fg: '#1B1714',
    fgFaint: 'rgba(27,23,20,0.15)',
    watermark: lightMark,
    lion: 'ink'
  },
  Platinum: {
    bg: 'bg-ink',
    text: 'text-white',
    sub: 'text-white/70',
    pill: 'bg-white/15 text-white',
    divider: 'divide-white/25',
    dark: true,
    fg: '#FFFFFF',
    fgFaint: 'rgba(255,255,255,0.25)',
    watermark: darkMark,
    lion: 'white'
  }
};