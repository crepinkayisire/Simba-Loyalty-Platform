export interface CardDetails {
  name: string;
  expiry: string; // MMYY digits
  cvv: string;
  save: boolean;
}

export const emptyCard: CardDetails = { name: '', expiry: '', cvv: '', save: true };

export function cardBrand(num: string): string {
  if (num.length === 4) return 'Visa';
  if (num.startsWith('4')) return 'Visa';
  if (/^5[1-5]|^2[2-7]/.test(num)) return 'Mastercard';
  return 'Card';
}

export function expiryValid(mmyy: string): boolean {
  if (mmyy.length !== 4) return false;
  const mm = Number(mmyy.slice(0, 2));
  const yy = Number(mmyy.slice(2));
  if (mm < 1 || mm > 12) return false;
  // Prototype date: September 2026.
  return yy > 26 || yy === 26 && mm >= 9;
}

/** A saved card only needs its CVV; a new card needs number, name, expiry and CVV. */
export function cardValid(num: string, d: CardDetails, saved: string): boolean {
  if (num === saved) return d.cvv.length === 3;
  return num.length === 16 && d.name.trim().length > 1 && expiryValid(d.expiry) && d.cvv.length === 3;
}

export function formatPhone(digits: string): string {
  return `+250 ${digits.replace(/(\d{3})(?=\d)/g, '$1 ')}`;
}