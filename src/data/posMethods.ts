export type PosMethodId = 'mtn' | 'airtel' | 'card' | 'cash';

export const posMethods: {id: PosMethodId;label: string;}[] = [
{ id: 'mtn', label: 'MTN MoMo' },
{ id: 'airtel', label: 'Airtel Money' },
{ id: 'card', label: 'Bank card' },
{ id: 'cash', label: 'Cash' }];


export const posStore = { name: 'Simba Kigali Heights', till: 'Till 04', cashier: 'Aline Uwase' };

/** Quick choices for points redeemed at the till. `null` means "all available". */
export const posPointOptions: (number | null)[] = [0, 500, 1000, null];