import { useCollectionRows } from '../contexts/ConsoleContext';
import { membershipSeed, type MembershipRow } from '../data/admin/memberships';

/** Memberships as currently configured in the console, including ones created there. */
export function useTierOptions() {
  const tiers = [...useCollectionRows<MembershipRow>('memberships', membershipSeed)].sort((a, b) => a.rank - b.rank);
  const names = tiers.filter((t) => t.status !== 'Archived').map((t) => t.name);
  const colorOf = (name: string) => tiers.find((t) => t.name === name)?.color;
  return { tiers, names, colorOf };
}