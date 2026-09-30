import type { CardLevel } from '../types/loyalty';

export interface Partner {
  id: string;
  name: string;
  short: string;
  color: string;
  category: string;
  /** Full logo URL. Falls back to the initials tile if it fails to load. */
  logo: string;
}

const favicon = (domain: string) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

export const partners: Record<string, Partner> = {
  simba: {
    id: 'simba',
    name: 'Simba Supermarket',
    short: 'S+',
    color: '#D9531E',
    category: 'Groceries',
    logo: "/image-removebg-preview_-_2026-09-29T171118.423.png"
  },
  equity: {
    id: 'equity',
    name: 'Equity Bank Infinity Card',
    short: 'EQ',
    color: '#8E1F1E',
    category: 'Banking',
    logo: "/image.png"
  },
  serena: {
    id: 'serena',
    name: 'Serena Hotels',
    short: 'SH',
    color: '#F58A1F',
    category: 'Hotels',
    logo: "/image-1.png"
  },
  marriott: {
    id: 'marriott',
    name: 'Kigali Marriott Hotel',
    short: 'M',
    color: '#A6093D',
    category: 'Hotels',
    logo: "/image-2.png"
  },
  rwandair: { id: 'rwandair', name: 'RwandAir', short: 'WB', color: '#0A4F8F', category: 'Travel', logo: favicon('rwandair.com') },
  java: { id: 'java', name: 'Java House', short: 'JH', color: '#5B3A29', category: 'Dining', logo: favicon('javahouseafrica.com') },
  bk: {
    id: 'bk',
    name: 'Bank of Kigali',
    short: 'BK',
    color: '#2352A0',
    category: 'Banking',
    logo: "/image-3.png"
  }
};

export interface Benefit {
  partner: keyof typeof partners;
  title: string;
  detail: string;
}

export interface TierBenefits {
  level: CardLevel;
  upgradePoints: number;
  upgradeRWF: number;
  benefits: Benefit[];
}

export const tierBenefits: TierBenefits[] = [
{
  level: 'Bronze',
  upgradePoints: 0,
  upgradeRWF: 0,
  benefits: [
  { partner: 'simba', title: '2% off at checkout', detail: 'On every shop at Simba Supermarket' },
  { partner: 'java', title: 'Free pastry with coffee', detail: 'Once a month at any Kigali Java House' },
  { partner: 'bk', title: '1% cashback at Simba', detail: 'When you pay with any Bank of Kigali card' }]

},
{
  level: 'Silver',
  upgradePoints: 1000,
  upgradeRWF: 10000,
  benefits: [
  { partner: 'simba', title: '3% off at checkout', detail: 'Plus member-only weekly prices' },
  { partner: 'equity', title: '1% cashback', detail: 'When you pay at Simba with your Equity Infinity Card' },
  { partner: 'java', title: '10% off your bill', detail: 'Dine-in and takeaway' },
  { partner: 'bk', title: '2% cashback at Simba', detail: 'Pay with your BK card or BK App (MobiCash)' }]

},
{
  level: 'Gold',
  upgradePoints: 2500,
  upgradeRWF: 25000,
  benefits: [
  { partner: 'simba', title: '5% off at checkout', detail: 'Plus free delivery on orders over RWF 50,000' },
  { partner: 'equity', title: '2% cashback', detail: 'On Simba purchases with your Equity Infinity Card' },
  { partner: 'serena', title: '15% off dining & spa', detail: 'Kigali Serena and Lake Kivu Serena' },
  { partner: 'marriott', title: '10% off weekend stays', detail: 'Kigali Marriott, subject to availability' },
  { partner: 'java', title: '15% off your bill', detail: 'Dine-in and takeaway' }]

},
{
  level: 'Platinum',
  upgradePoints: 6000,
  upgradeRWF: 60000,
  benefits: [
  { partner: 'simba', title: '8% off at checkout', detail: 'Free delivery on every order, priority tills' },
  { partner: 'equity', title: '3% cashback + lounge access', detail: 'Equity Infinity Card holders at Kigali International' },
  { partner: 'serena', title: '20% off stays & dining', detail: 'All Serena Hotels in Rwanda and East Africa' },
  { partner: 'marriott', title: 'Room upgrade + late checkout', detail: 'Kigali Marriott, every stay' },
  { partner: 'rwandair', title: '10% off regional fares', detail: 'Book with your Simba+ number' },
  { partner: 'bk', title: '4% cashback + zero card fees', detail: 'Bank of Kigali Diamond cardholders, every Simba shop' }]

}];


export const levelOrder: CardLevel[] = ['Bronze', 'Silver', 'Gold', 'Platinum'];

/** How the benefit is claimed at each partner's checkout. */
export const howToUse: Record<string, string[]> = {
  simba: ['Shop at any Simba Supermarket', 'Give the checkout code on your Simba+ card to the cashier', 'The discount is applied and points are added automatically'],
  equity: ['Link your Equity Infinity Card in the Equity app', 'Pay at Simba with the card and give your Simba+ checkout code', 'Cashback lands in your Equity account within 48 hours'],
  serena: ['Book a table, spa or room with Serena', 'Show your Simba+ card at the front desk or restaurant', 'The discount is taken off your final bill'],
  marriott: ['Book directly with Kigali Marriott', 'Mention Simba+ and show your card at check-in', 'Your benefit is applied to the stay'],
  rwandair: ['Book on rwandair.com', 'Add your Simba+ number in the promo field', 'The fare discount shows before you pay'],
  java: ['Order at any Kigali Java House', 'Show your Simba+ card before paying', 'The discount is taken off your bill'],
  bk: ['Pay at Simba with your Bank of Kigali card or the BK App', 'Give the checkout code on your Simba+ card to the cashier', 'Cashback lands in your BK account within 48 hours']
};

export const partnerTerms = [
'Benefit applies while your Simba+ tier is active.',
'Cannot be combined with other partner promotions unless stated.',
'Partners may change or withdraw benefits with 14 days notice.',
'Simba+ card must be presented before payment.'];