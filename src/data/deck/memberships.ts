import type { CardLevel } from '../../types/loyalty';

export type DeckMembership = {
  tier: CardLevel;
  name: string;
  /** Pill text on the card; '' hides it for the everyday Simba+ card. */
  label: string;
  promise: string;
  holder: string;
  since: string;
  balance: string;
  points: string;
  code: string;
};

export const memberships: DeckMembership[] = [
{ tier: 'Bronze', name: 'Bronze', label: 'Bronze', promise: 'Everyday membership', holder: 'Aline Uwase', since: '01/2025', balance: '12,300', points: '640', code: '215 804' },
{ tier: 'Silver', name: 'Silver', label: 'Silver', promise: 'More rewards', holder: 'Eric Nshuti', since: '08/2024', balance: '26,900', points: '1,420', code: '903 117' },
{ tier: 'Gold', name: 'Gold', label: 'Gold', promise: 'Premium benefits', holder: 'Joseph Mutabazi', since: '03/2024', balance: '48,500', points: '3,175', code: '482 913' },
{ tier: 'Platinum', name: 'Platinum', label: 'Platinum', promise: 'The highest level of recognition', holder: 'Jean-Paul Habimana', since: '06/2023', balance: '215,000', points: '86,410', code: '730 214' }];


/** Partner ids from the app's partner catalogue, shown on the deck's partner strip. */
export const deckPartnerIds = ['equity', 'serena', 'marriott'];