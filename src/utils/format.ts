export function formatNumber(value: number): string {
  return value.toLocaleString('en-US');
}

export function formatRWF(value: number): string {
  return `RWF ${value.toLocaleString('en-US')}`;
}

export function formatRWFCompact(value: number): string {
  const trim = (n: number, digits: number) => n.toFixed(digits).replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
  if (value >= 1_000_000_000) return `RWF ${trim(value / 1_000_000_000, 2)}B`;
  if (value >= 1_000_000) return `RWF ${trim(value / 1_000_000, 1)}M`;
  if (value >= 1_000) return `RWF ${trim(value / 1_000, 0)}K`;
  return `RWF ${value}`;
}

export function formatSignedPoints(points: number): string {
  const sign = points > 0 ? '+' : '−';
  return `${sign}${Math.abs(points).toLocaleString('en-US')}`;
}

export function initials(name: string): string {
  return name.
  split(' ').
  map((part) => part[0]).
  slice(0, 2).
  join('').
  toUpperCase();
}