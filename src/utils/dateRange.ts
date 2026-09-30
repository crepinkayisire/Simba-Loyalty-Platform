/** The demo runs on this day. */
export const DEMO_TODAY = '2026-09-29';
const DEMO_NOW = `${DEMO_TODAY}T15:00`;

export type RangePreset = 'all' | 'today' | '7d' | '30d' | 'month' | 'custom';

export interface DateRange {
  preset: RangePreset;
  /** 'YYYY-MM-DDTHH:mm', inclusive. */
  from: string;
  to: string;
}

export const allTime: DateRange = { preset: 'all', from: '', to: '' };

export const presetLabels: Record<RangePreset, string> = {
  all: 'All time',
  today: 'Today',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  month: 'This month',
  custom: 'Custom range'
};

function daysAgo(n: number): string {
  const d = new Date(`${DEMO_TODAY}T00:00`);
  d.setDate(d.getDate() - n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00`;
}

export function rangeForPreset(preset: RangePreset): DateRange {
  const end = `${DEMO_TODAY}T23:59`;
  switch (preset) {
    case 'today':
      return { preset, from: `${DEMO_TODAY}T00:00`, to: end };
    case '7d':
      return { preset, from: daysAgo(6), to: end };
    case '30d':
      return { preset, from: daysAgo(29), to: end };
    case 'month':
      return { preset, from: `${DEMO_TODAY.slice(0, 8)}01T00:00`, to: end };
    case 'custom':
      return { preset, from: daysAgo(6), to: end };
    default:
      return allTime;
  }
}

/** True when an ISO-like 'YYYY-MM-DDTHH:mm' timestamp falls inside the range. */
export function inRange(at: string, range: DateRange): boolean {
  if (range.preset === 'all') return true;
  if (range.from && at < range.from) return false;
  if (range.to && at > range.to) return false;
  return true;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "Today, 14:32" / "Sep 29, 14:32" / "Aug 30, 2026 · 09:10" from 'YYYY-MM-DDTHH:mm'. */
export function formatAt(at: string): string {
  const [date, time = ''] = at.split('T');
  const [y, m, d] = date.split('-').map(Number);
  const yesterday = daysAgo(1).slice(0, 10);
  const day = date === DEMO_TODAY ? 'Today' : date === yesterday ? 'Yesterday' : `${months[m - 1]} ${d}${y !== 2026 ? `, ${y}` : ''}`;
  return time ? `${day}, ${time}` : day;
}

/**
 * Turns the app's display labels ("Just now", "Today, 14:32", "Yesterday",
 * "Sep 27", "Sep 27, 2026") into a comparable timestamp.
 */
export function parseDisplayDate(label: string): string {
  const s = label.trim();
  if (/^just now/i.test(s)) return DEMO_NOW;
  const time = s.match(/(\d{1,2}):(\d{2})/);
  const hhmm = time ? `${pad(Number(time[1]))}:${time[2]}` : '12:00';
  if (/^today/i.test(s)) return `${DEMO_TODAY}T${hhmm}`;
  if (/^yesterday/i.test(s)) return `${daysAgo(1).slice(0, 10)}T${hhmm}`;
  const md = s.match(/^([A-Z][a-z]{2})\s+(\d{1,2})(?:,\s*(\d{4}))?/);
  if (md) {
    const m = months.indexOf(md[1]);
    if (m >= 0) return `${md[3] ?? '2026'}-${pad(m + 1)}-${pad(Number(md[2]))}T${hhmm}`;
  }
  return DEMO_NOW;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}