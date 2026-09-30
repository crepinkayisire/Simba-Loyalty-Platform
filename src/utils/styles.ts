export const inputClass =
'h-11 w-full rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-muted/70 transition-colors duration-150 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10';

export const labelClass = 'mb-1.5 block text-xs font-bold text-ink-soft';

export const chartColors = {
  simba: '#D9531E',
  peach: '#F2A06B',
  ink: '#1B1714',
  muted: '#6E655B',
  grid: '#EFE9DF',
  gold: '#E3B34C',
  leaf: '#1E7048',
  sand: '#E8E1D6'
};

export const tierChartColor: Record<string, string> = {
  Bronze: '#9A5F3B',
  Silver: '#B9C0C8',
  Gold: '#E6B34A',
  Platinum: '#1B1714'
};

export const chartAxis = {
  tick: { fill: '#6E655B', fontSize: 12, fontWeight: 600 },
  axisLine: false,
  tickLine: false
};

export const buttonPrimary =
'inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-simba px-4 text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-simba focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted';

export const buttonSecondary =
'inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-sm font-bold text-ink transition-colors duration-150 hover:bg-canvas focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/20';

export const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: '1px solid #E8E1D6',
    boxShadow: '0 6px 20px rgba(27,23,20,0.08)',
    fontFamily: 'Manrope',
    fontSize: 12,
    fontWeight: 600
  },
  cursor: { fill: 'rgba(27,23,20,0.04)' }
};