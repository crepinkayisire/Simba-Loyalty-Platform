import { useCollectionRows } from '../contexts/ConsoleContext';
import { useLoyalty } from '../contexts/LoyaltyContext';
import { customers, JOSEPH_ID, type CustomerRow } from '../data/admin/customers';

type DirectoryCustomer = Omit<CustomerRow, 'tier'> & {tier: string;};

/** Console customers, with Joseph's balances mirrored live from the customer app. */
export function useCustomerDirectory() {
  const loyalty = useLoyalty();
  const rows = useCollectionRows<DirectoryCustomer>('customers', customers);
  const list = rows.map((c) =>
  c.id === JOSEPH_ID ? { ...c, points: loyalty.balance, cardBalance: loyalty.cardBalance, tier: loyalty.cardLevel } : c
  );
  const find = (name: string) => list.find((c) => c.name === name);
  return { list, find };
}