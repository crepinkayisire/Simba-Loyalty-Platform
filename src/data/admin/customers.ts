import type { CardLevel } from '../../types/loyalty';

export type CustomerStatus = 'Active' | 'Dormant' | 'Frozen' | 'Archived';

export const customerStatuses: CustomerStatus[] = ['Active', 'Dormant', 'Frozen', 'Archived'];
export const genders = ['Female', 'Male', 'Prefer not to say'];
export const languages = ['Kinyarwanda', 'English', 'Français', 'Kiswahili'];
export const countries = ['Rwanda', 'Uganda', 'Kenya', 'Tanzania', 'Burundi', 'DR Congo'];
export const provinces = ['Kigali City', 'Northern Province', 'Southern Province', 'Eastern Province', 'Western Province'];
export const addressDistricts = ['Gasabo', 'Kicukiro', 'Nyarugenge', 'Rubavu', 'Musanze', 'Huye'];

export interface CustomerRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** 'YYYY-MM-DD' */
  dob: string;
  gender: string;
  country: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  street: string;
  /** Favourite store, without the "Simba " prefix. */
  store: string;
  language: string;
  /** Highest membership; drives the card colour. */
  tier: CardLevel;
  /** All memberships held, comma list. */
  memberships: string;
  cardBalance: number;
  points: number;
  spend: number;
  visits: number;
  lastVisit: string;
  status: CustomerStatus;
  customerSince: string;
}

export const JOSEPH_ID = 'joseph-mutabazi';

export const customers: CustomerRow[] = [
{ id: JOSEPH_ID, name: 'Joseph Mutabazi', phone: '+250 788 412 095', email: 'joseph.mutabazi@example.com', dob: '1988-09-19', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Nyarutarama', street: 'KG 9 Ave, No. 14', store: 'Kigali Heights', language: 'English', tier: 'Gold', memberships: 'Gold', cardBalance: 48_500, points: 3175, spend: 1_420_000, visits: 18, lastVisit: 'Today', status: 'Active', customerSince: '03/2024' },
{ id: 'aline-uwase', name: 'Aline Uwase', phone: '+250 783 220 614', email: 'aline.uwase@example.com', dob: '1994-03-02', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Kimironko', cell: 'Bibare', street: 'KG 11 Ave, No. 3', store: 'Kimironko', language: 'Kinyarwanda', tier: 'Silver', memberships: 'Silver', cardBalance: 12_300, points: 820, spend: 380_000, visits: 7, lastVisit: '4 days ago', status: 'Active', customerSince: '11/2024' },
{ id: 'jean-paul-habimana', name: 'Jean-Paul Habimana', phone: '+250 788 901 337', email: 'jeanpaul.habimana@example.com', dob: '1979-11-24', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Nyarutarama', street: 'KG 5 Ave, No. 40', store: 'Nyarutarama', language: 'Français', tier: 'Platinum', memberships: 'Gold, Platinum', cardBalance: 186_000, points: 9210, spend: 4_800_000, visits: 42, lastVisit: 'Yesterday', status: 'Active', customerSince: '06/2023' },
{ id: 'diane-mukamana', name: 'Diane Mukamana', phone: '+250 722 145 870', email: 'diane.mukamana@example.com', dob: '1990-06-10', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Nyabisindu', street: 'KG 17 Ave, No. 8', store: 'Gishushu', language: 'English', tier: 'Gold', memberships: 'Gold', cardBalance: 64_200, points: 4120, spend: 1_960_000, visits: 24, lastVisit: '2 days ago', status: 'Active', customerSince: '01/2024' },
{ id: 'eric-niyonzima', name: 'Eric Niyonzima', phone: '+250 785 330 219', email: 'eric.niyonzima@example.com', dob: '1998-01-15', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Rukiri I', street: 'KG 201 St, No. 12', store: 'Remera', language: 'Kinyarwanda', tier: 'Bronze', memberships: 'Bronze', cardBalance: 5_000, points: 390, spend: 214_000, visits: 3, lastVisit: '12 days ago', status: 'Active', customerSince: '09/2026' },
{ id: 'claudine-ingabire', name: 'Claudine Ingabire', phone: '+250 788 671 402', email: 'claudine.ingabire@example.com', dob: '1983-07-28', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Kimihurura', cell: 'Rugando', street: 'KG 7 Ave, No. 22', store: 'Kigali Heights', language: 'English', tier: 'Platinum', memberships: 'Platinum', cardBalance: 142_800, points: 7480, spend: 3_650_000, visits: 36, lastVisit: 'Today', status: 'Active', customerSince: '04/2023' },
{ id: 'patrick-mugisha', name: 'Patrick Mugisha', phone: '+250 789 014 556', email: 'patrick.mugisha@example.com', dob: '1986-04-03', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Kicukiro', sector: 'Niboye', cell: 'Gatare', street: 'KK 15 Rd, No. 9', store: 'Kicukiro', language: 'Kiswahili', tier: 'Gold', memberships: 'Gold', cardBalance: 21_700, points: 2260, spend: 1_180_000, visits: 15, lastVisit: '38 days ago', status: 'Dormant', customerSince: '08/2024' },
{ id: 'grace-uwimana', name: 'Grace Uwimana', phone: '+250 781 552 908', email: 'grace.uwimana@example.com', dob: '1996-12-08', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Kimironko', cell: 'Kibagabaga', street: 'KG 44 St, No. 5', store: 'Kimironko', language: 'Kinyarwanda', tier: 'Silver', memberships: 'Silver', cardBalance: 73_400, points: 1040, spend: 520_000, visits: 9, lastVisit: '6 days ago', status: 'Active', customerSince: '02/2025' },
{ id: 'olivier-nshimiyimana', name: 'Olivier Nshimiyimana', phone: '+250 787 229 641', email: 'olivier.nshimiyimana@example.com', dob: '2000-08-19', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Nyarugenge', sector: 'Nyarugenge', cell: 'Kiyovu', street: 'KN 3 Rd, No. 17', store: 'Town', language: 'English', tier: 'Bronze', memberships: 'Bronze', cardBalance: 0, points: 190, spend: 96_000, visits: 2, lastVisit: '9 days ago', status: 'Archived', customerSince: '09/2026' },
{ id: 'sandrine-iradukunda', name: 'Sandrine Iradukunda', phone: '+250 788 340 772', email: 'sandrine.iradukunda@example.com', dob: '1992-02-14', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Nyabisindu', street: 'KG 19 Ave, No. 31', store: 'Gishushu', language: 'Français', tier: 'Gold', memberships: 'Silver, Gold', cardBalance: 38_900, points: 860, spend: 1_540_000, visits: 21, lastVisit: '3 days ago', status: 'Active', customerSince: '05/2024' },
{ id: 'emmanuel-hakizimana', name: 'Emmanuel Hakizimana', phone: '+250 784 118 093', email: 'emmanuel.hakizimana@example.com', dob: '1981-10-05', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Remera', cell: 'Rukiri II', street: 'KG 125 St, No. 2', store: 'Remera', language: 'Kinyarwanda', tier: 'Silver', memberships: 'Silver', cardBalance: 9_800, points: 1280, spend: 640_000, visits: 11, lastVisit: '45 days ago', status: 'Dormant', customerSince: '10/2024' },
{ id: 'josiane-umutoni', name: 'Josiane Umutoni', phone: '+250 786 903 265', email: 'josiane.umutoni@example.com', dob: '1995-05-21', gender: 'Female', country: 'Rwanda', province: 'Kigali City', district: 'Gasabo', sector: 'Kimihurura', cell: 'Kamukina', street: 'KG 8 Ave, No. 6', store: 'Kigali Heights', language: 'English', tier: 'Gold', memberships: 'Gold', cardBalance: 27_600, points: 2890, spend: 1_310_000, visits: 17, lastVisit: 'Yesterday', status: 'Active', customerSince: '07/2024' },
{ id: 'fabrice-ndayisaba', name: 'Fabrice Ndayisaba', phone: '+250 788 776 120', email: 'fabrice.ndayisaba@example.com', dob: '1989-03-30', gender: 'Male', country: 'Rwanda', province: 'Kigali City', district: 'Nyarugenge', sector: 'Nyarugenge', cell: 'Kiyovu', street: 'KN 4 Ave, No. 11', store: 'Town', language: 'Kiswahili', tier: 'Bronze', memberships: 'Bronze', cardBalance: 412_000, points: 610, spend: 290_000, visits: 4, lastVisit: 'Today', status: 'Frozen', customerSince: '08/2026' }];


/** Customer ID shown on the profile, e.g. SM0123456. */
export function customerIdFor(id: string, index: number): string {
  if (id === JOSEPH_ID) return 'SM0123456';
  return `SM0${(123456 + Math.max(0, index) * 1117).toString().padStart(6, '0')}`;
}

/** Shopping habits shown on the customer profile. Shared sample for the demo. */
export const profileExtras = {
  spendByMonth: [
  { month: 'Apr', spend: 180_000 },
  { month: 'May', spend: 210_000 },
  { month: 'Jun', spend: 195_000 },
  { month: 'Jul', spend: 240_000 },
  { month: 'Aug', spend: 228_000 },
  { month: 'Sep', spend: 262_000 }],

  topItems: [
  { name: 'Inyange Fresh Milk 1L', times: 16, spend: 24_000 },
  { name: 'Akabanga Chili Oil 20ml', times: 11, spend: 16_500 },
  { name: 'Mahwi Rice 5kg', times: 6, spend: 54_000 },
  { name: 'Blue Band Margarine 500g', times: 6, spend: 15_600 },
  { name: 'Nido Fortified Milk 900g', times: 4, spend: 46_000 }],

  usualTime: 'Saturday mornings',
  contact: { app: true, sms: true, whatsapp: true, email: false, promos: true }
};