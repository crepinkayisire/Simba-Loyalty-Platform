export type CardTxnKind = 'topup' | 'payment' | 'gift' | 'convert' | 'membership';

export interface CardTxn {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  amount: number;
  kind: CardTxnKind;
  time: string;
}

export const baseCardHistory: CardTxn[] = [
{ id: 'c1', group: 'Sep 28', title: 'Simba Kigali Heights', subtitle: 'Paid with shopping card', amount: -31500, kind: 'payment', time: '18:10' },
{ id: 'c2', group: 'Sep 27', title: 'Top up', subtitle: 'MTN MoMo · +250 788 412 095', amount: 50000, kind: 'topup', time: '09:24' },
{ id: 'c3', group: 'Sep 24', title: 'Shopping card for Aline Uwase', subtitle: 'Gift · paid with MTN MoMo', amount: 20000, kind: 'gift', time: '12:40' },
{ id: 'c4', group: 'Sep 20', title: 'Simba Gishushu', subtitle: 'Paid with shopping card', amount: -18400, kind: 'payment', time: '17:02' },
{ id: 'c5', group: 'Sep 19', title: 'Top up', subtitle: 'MTN MoMo · +250 788 412 095', amount: 30000, kind: 'topup', time: '08:15' }];


export const convertPointOptions = [500, 1000, 2000];

export const topUpAmounts = [10000, 20000, 50000, 100000];

export const giftPoints = 10;