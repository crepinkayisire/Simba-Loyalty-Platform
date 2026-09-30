import type { CardLevel } from '../types/loyalty';

export const customer = {
  firstName: 'Joseph',
  name: 'Joseph Mutabazi',
  cardLevel: 'Gold' as CardLevel,
  cardLast4: '8495',
  customerSince: '03/2024',
  customerId: 'SM0123456',
  tier: 'Gold' as const,
  memberId: 'SIM-00128495',
  preferredStore: 'Simba Kigali Heights',
  phone: '+250 788 412 095',
  email: 'joseph.mutabazi@example.com',
  birthday: '19 September',
  memberSince: 'March 2024',
  // Prepaid amount loaded on the Simba shopping card.
  cardBalanceRWF: 48500
};

// Balance before today's shop at Simba Kigali Heights.
export const baseBalance = 2450;
export const baseQualifyingPoints = 2450;

export const todaysPurchase = {
  store: 'Simba Kigali Heights',
  amount: 72500,
  points: 725,
  receipt: 'KH-0929-04417',
  items: [
  { name: 'Fresh tomatoes', qty: '2 kg', price: 3600 },
  { name: 'Hass avocados', qty: '× 6', price: 3000 },
  { name: 'Inyange fresh milk 2L', qty: '× 2', price: 4800 },
  { name: 'Basmati rice', qty: '5 kg', price: 14500 },
  { name: 'Sunflower cooking oil', qty: '3 L', price: 9800 },
  { name: 'Chicken breast', qty: '1.5 kg', price: 11200 },
  { name: 'Laundry detergent', qty: '3 kg', price: 8900 },
  { name: 'Simba bakery bread', qty: '× 2', price: 2600 },
  { name: 'Rwanda arabica coffee', qty: '500 g', price: 7500 },
  { name: 'Toilet tissue', qty: '10 pack', price: 6600 }]

};

export const redemptionVisit = {
  store: 'Simba Kigali Heights',
  receipt: 'KH-1002-01288',
  items: [
  { name: 'Basmati rice', qty: '5 kg', price: 14500 },
  { name: 'Chicken breast', qty: '1.5 kg', price: 11200 },
  { name: 'Sunflower cooking oil', qty: '3 L', price: 9800 },
  { name: 'Rwanda arabica coffee', qty: '500 g', price: 7500 },
  { name: 'Inyange fresh milk 2L', qty: '× 2', price: 4800 },
  { name: 'Fresh tomatoes', qty: '2 kg', price: 3600 },
  { name: 'Hass avocados', qty: '× 6', price: 3000 },
  { name: 'Simba bakery bread', qty: '× 2', price: 2600 },
  { name: 'Sweet bananas', qty: '1 bunch', price: 1400 }]

};