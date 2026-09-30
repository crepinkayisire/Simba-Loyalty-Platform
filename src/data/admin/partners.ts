import { partners as appPartners } from '../benefits';

export interface PartnerDocument {
  name: string;
  size: string;
  uploaded: string;
}

/** A Simba+ partner business. Promotions and redemptions are linked by name / id. */
export interface PartnerRow {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactTitle: string;
  documents: PartnerDocument[];
}

const doc = (name: string, size: string, uploaded: string): PartnerDocument => ({ name, size, uploaded });
const a = appPartners;

export const partnerSeed: PartnerRow[] = [
{
  id: 'simba', name: a.simba.name, category: a.simba.category, logo: a.simba.logo,
  phone: '+250 788 300 100', email: 'loyalty@simba.rw', website: 'simba.rw',
  contactName: 'Diane Mutesi', contactEmail: 'diane.mutesi@simba.rw', contactPhone: '+250 788 300 114', contactTitle: 'Loyalty Manager',
  documents: [doc('Simba+ programme rules.pdf', '420 KB', 'Jan 5, 2026')]
},
{
  id: 'equity', name: a.equity.name, category: a.equity.category, logo: a.equity.logo,
  phone: '+250 788 190 000', email: 'partnerships@equitybank.co.rw', website: 'equitybank.co.rw',
  contactName: 'Alain Mugenzi', contactEmail: 'alain.mugenzi@equitybank.co.rw', contactPhone: '+250 788 190 212', contactTitle: 'Head of Card Partnerships',
  documents: [doc('Partnership agreement 2026.pdf', '1.2 MB', 'Dec 12, 2025'), doc('Cashback settlement terms.pdf', '310 KB', 'Dec 12, 2025')]
},
{
  id: 'serena', name: a.serena.name, category: a.serena.category, logo: a.serena.logo,
  phone: '+250 252 597 100', email: 'kigali@serena.co.rw', website: 'serenahotels.com',
  contactName: 'Linda Kamanzi', contactEmail: 'linda.kamanzi@serena.co.rw', contactPhone: '+250 788 597 130', contactTitle: 'Sales & Marketing Manager',
  documents: [doc('Serena x Simba+ MoU.pdf', '860 KB', 'Feb 20, 2026'), doc('Rate card Gold & Platinum.xlsx', '64 KB', 'Sep 1, 2026')]
},
{
  id: 'marriott', name: a.marriott.name, category: a.marriott.category, logo: a.marriott.logo,
  phone: '+250 222 111 111', email: 'reservations.kigali@marriott.com', website: 'marriott.com',
  contactName: 'Kevin Rukundo', contactEmail: 'kevin.rukundo@marriott.com', contactPhone: '+250 788 111 145', contactTitle: 'Director of Sales',
  documents: [doc('Marriott partner agreement.pdf', '1.4 MB', 'Mar 3, 2026')]
},
{
  id: 'rwandair', name: a.rwandair.name, category: a.rwandair.category, logo: a.rwandair.logo,
  phone: '+250 788 177 000', email: 'partners@rwandair.com', website: 'rwandair.com',
  contactName: 'Yvonne Uwera', contactEmail: 'yvonne.uwera@rwandair.com', contactPhone: '+250 788 177 061', contactTitle: 'Loyalty Partnerships Lead',
  documents: [doc('Fare discount agreement.pdf', '740 KB', 'Apr 15, 2026')]
},
{
  id: 'java', name: a.java.name, category: a.java.category, logo: a.java.logo,
  phone: '+250 788 380 380', email: 'rwanda@javahouseafrica.com', website: 'javahouseafrica.com',
  contactName: 'Samuel Ndoli', contactEmail: 'samuel.ndoli@javahouseafrica.com', contactPhone: '+250 788 380 322', contactTitle: 'Country Operations Manager',
  documents: [doc('Java House partner terms.pdf', '380 KB', 'Jan 28, 2026')]
},
{
  id: 'bk', name: a.bk.name, category: a.bk.category, logo: a.bk.logo,
  phone: '+250 788 143 000', email: 'partnerships@bk.rw', website: 'bk.rw',
  contactName: 'Christine Umulisa', contactEmail: 'christine.umulisa@bk.rw', contactPhone: '+250 788 143 219', contactTitle: 'Head of Retail Partnerships',
  documents: [doc('BK Diamond Partner agreement.pdf', '1.1 MB', 'Aug 4, 2026'), doc('KYC certificate.pdf', '220 KB', 'Aug 4, 2026')]
}];


export const partnerCategories = ['Groceries', 'Banking', 'Hotels', 'Travel', 'Dining', 'Retail', 'Health', 'Other'];