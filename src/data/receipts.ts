import { todaysPurchase } from './customer';

export interface ReceiptLine {
  name: string;
  qty: string;
  price: number;
}

export interface Receipt {
  store: string;
  dateTime: string;
  payment: string;
  reference: string;
  items: ReceiptLine[];
  points: number;
}

const sep28: Receipt = {
  store: 'Simba Kigali Heights',
  dateTime: 'Sep 28, 2026 · 18:10',
  payment: 'Simba+ card',
  reference: 'KH-0928-02231',
  points: 10,
  items: [
  { name: 'Basmati rice', qty: '5 kg', price: 14500 },
  { name: 'Sunflower cooking oil', qty: '3 L', price: 9800 },
  { name: 'Fresh tomatoes', qty: '2 kg', price: 3600 },
  { name: 'Simba bakery bread', qty: '× 2', price: 2600 },
  { name: 'Sweet bananas', qty: '1 bunch', price: 1000 }]

};

const sep20: Receipt = {
  store: 'Simba Gishushu',
  dateTime: 'Sep 20, 2026 · 17:02',
  payment: 'Simba+ card',
  reference: 'GS-0920-00814',
  points: 184,
  items: [
  { name: 'Rwanda arabica coffee', qty: '500 g', price: 7500 },
  { name: 'Inyange fresh milk 2L', qty: '× 2', price: 4800 },
  { name: 'Farm eggs', qty: '1 tray', price: 4500 },
  { name: 'Sweet bananas', qty: '1 bunch', price: 1600 }]

};

const today: Receipt = {
  store: todaysPurchase.store,
  dateTime: 'Today · 14:32',
  payment: 'Simba+ card · MTN MoMo',
  reference: todaysPurchase.receipt,
  points: todaysPurchase.points,
  items: todaysPurchase.items
};

const sep18: Receipt = {
  store: 'Simba Kimironko',
  dateTime: 'Sep 18, 2026 · 18:42',
  payment: 'Visa •••• 2210',
  reference: 'KM-0918-03377',
  points: 480,
  items: [
  { name: 'Basmati rice', qty: '5 kg', price: 14500 },
  { name: 'Chicken breast', qty: '1.5 kg', price: 11200 },
  { name: 'Laundry detergent', qty: '3 kg', price: 8900 },
  { name: 'Toilet tissue', qty: '10 pack', price: 6600 },
  { name: 'Fresh tomatoes', qty: '2 kg', price: 3800 },
  { name: 'Hass avocados', qty: '× 6', price: 3000 }]

};

const sep11: Receipt = {
  store: 'Simba Kigali Heights',
  dateTime: 'Sep 11, 2026 · 17:15',
  payment: 'MTN MoMo',
  reference: 'KH-0911-01902',
  points: 963,
  items: [
  { name: 'Baby diapers', qty: '64 pack', price: 18600 },
  { name: 'Nido milk powder', qty: '900 g', price: 14800 },
  { name: 'Basmati rice', qty: '5 kg', price: 14500 },
  { name: 'Sunflower cooking oil', qty: '3 L', price: 9800 },
  { name: 'Beef fillet', qty: '1 kg', price: 9500 },
  { name: 'Laundry detergent', qty: '3 kg', price: 8900 },
  { name: 'Rwanda arabica coffee', qty: '500 g', price: 7500 },
  { name: 'Mango juice 2L', qty: '× 3', price: 7500 },
  { name: 'Simba bakery bread', qty: '× 2', price: 2600 },
  { name: 'Fresh tomatoes', qty: '1.5 kg', price: 2600 }]

};

// Keyed by activity id so card and points entries for the same visit open the same receipt.
export const receipts: Record<string, Receipt> = {
  c1: sep28,
  'a-card-purchase': sep28,
  c4: sep20,
  'a-today-kh': today,
  'c-today-kh': today,
  'a-today-cardbonus': today,
  'a-today-redeem': today,
  'a-kimironko': sep18,
  'a-kh-sep11': sep11
};