/** Seconds each checkout code stays valid on the customer's Simba+ card. */
export const CODE_PERIOD = 60;

/** Deterministic 6-digit code for a member and 60-second window, formatted "XXX XXX". */
export function codeFor(seedKey: string, windowIndex: number): string {
  let h = 2166136261;
  const seed = `${seedKey}-${windowIndex}`;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const s = String(Math.abs(h) % 900000 + 100000);
  return `${s.slice(0, 3)} ${s.slice(3)}`;
}

export function windowAt(now: number): number {
  return Math.floor(now / 1000 / CODE_PERIOD);
}

export function currentCode(seedKey: string, now: number = Date.now()): string {
  return codeFor(seedKey, windowAt(now));
}

/** Accepts the current code and the one just before it, so a code read out as it flips still works. */
export function isValidCode(seedKey: string, input: string, now: number = Date.now()): boolean {
  const digits = input.replace(/\D/g, '');
  const w = windowAt(now);
  return [w, w - 1].some((i) => codeFor(seedKey, i).replace(' ', '') === digits);
}