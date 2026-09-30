export type PaymentMethodId = 'mtn' | 'airtel' | 'card';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  /** Short description shown in the method list. */
  hint: string;
  /** Tile background and text classes for the method's mark. */
  markCls: string;
  mark: string;
  /** Message shown while the payment is pending. */
  pending: string;
  /** The account last used with this method: 9 phone digits for mobile money, last 4 digits for cards. */
  lastUsed: string;
}

export const paymentMethods: PaymentMethod[] = [
{ id: 'mtn', name: 'MTN Mobile Money', hint: 'Pay from your MoMo wallet', markCls: 'bg-[#FFCC00] text-ink', mark: 'MTN', pending: 'Approve on your phone…', lastUsed: '788412095' },
{ id: 'airtel', name: 'Airtel Money', hint: 'Pay from your Airtel wallet', markCls: 'bg-[#E40000] text-white', mark: 'airtel', pending: 'Approve on your phone…', lastUsed: '733412095' },
{ id: 'card', name: 'Bank card', hint: 'Visa or Mastercard', markCls: 'bg-[#1A1F71] text-white', mark: 'VISA', pending: 'Confirming with your bank…', lastUsed: '4821' }];


/** Custom top-up limits, matching the console's top-up limit rule. */
export const topUpLimits = { min: 1000, max: 500000 };