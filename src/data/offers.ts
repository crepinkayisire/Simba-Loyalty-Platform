import type { Offer, OfferSection } from '../types/loyalty';

export const offerSections: {id: OfferSection;label: string;note: string;}[] = [
{ id: 'for-you', label: 'For you', note: 'Picked from what you buy most' },
{ id: 'this-week', label: 'This week', note: 'In every Simba store' },
{ id: 'exclusive', label: 'Member exclusives', note: 'Gold members only' }];


export const offers: Offer[] = [
{
  id: 'double-points',
  section: 'for-you',
  headline: 'Double Points Weekend',
  title: '2× points on all fresh produce',
  description: 'Earn 2× Simba Points on all fresh produce — fruit, vegetables and herbs — this weekend.',
  validity: '2–4 October',
  expiresLabel: 'Fri–Sun',
  image: "/93d2c7be-372d-4d5f-98c6-8b79ea55295f.jpg",
  reason: 'You buy fresh produce on most visits',
  availableAt: 'All Simba Supermarket locations',
  howItWorks: [
  'Tap Use Offer to add it to your Simba Card.',
  'Shop fresh produce between Friday and Sunday.',
  'Show your card at checkout — bonus points post instantly.'],

  terms: [
  'Applies to items in the Fresh Produce category only.',
  'Bonus points are calculated on the amount paid after discounts.',
  'Valid 2–4 October 2026 at all Simba Supermarket stores in Rwanda.',
  'Maximum 2,000 bonus points per member during the offer period.',
  'Simba may amend or withdraw this offer at any time.']

},
{
  id: 'nido-15',
  section: 'for-you',
  headline: '15% off Nido',
  title: 'On your usual 900g tin',
  description: 'A special price on a product you buy regularly. Save 15% on Nido full cream milk powder.',
  validity: 'Until 12 October',
  expiresLabel: '13 days left',
  image: "/b8e23609-4b12-40cc-8911-9c42a6f6b08f.jpg",
  reason: 'Based on products you love',
  availableAt: 'All Simba Supermarket locations',
  howItWorks: ['Add the offer to your card.', 'Buy Nido 900g at any Simba store.', 'The discount applies when your card is scanned.'],
  terms: ['Limit of 2 tins per member.', 'Cannot be combined with other Nido promotions.']
},
{
  id: 'b2g1',
  section: 'this-week',
  headline: 'Buy 2 Get 1 Free',
  title: 'Selected household products',
  description: 'Mix and match detergents, dish soap and cleaning essentials. The lowest-priced item is free.',
  validity: 'Until 5 October',
  expiresLabel: 'Ends Sunday',
  image: "/bc842c3d-c5a7-4fae-a4ee-dc094a3ef081.jpg",
  availableAt: 'All Simba Supermarket locations',
  howItWorks: ['Add the offer to your card.', 'Pick any 3 selected household items.', 'The cheapest one is free at checkout.'],
  terms: ['Look for the yellow "Buy 2 Get 1" shelf labels.', 'Lowest-priced item is free.']
},
{
  id: 'yoghurt-bonus',
  section: 'this-week',
  headline: '+300 bonus points',
  title: 'On Inyange dairy over RWF 10,000',
  description: 'Collect 300 extra Simba Points when you spend RWF 10,000 or more on Inyange dairy.',
  validity: 'Until 5 October',
  expiresLabel: 'Ends Sunday',
  image: "/383a56c2-fb84-4a02-b0ad-fe7e4245df77.jpg",
  availableAt: 'All Simba Supermarket locations',
  howItWorks: ['Add the offer to your card.', 'Spend RWF 10,000+ on Inyange dairy in one visit.', 'Bonus points post with your purchase.'],
  terms: ['One bonus per member.', 'Qualifying spend calculated after discounts.']
},
{
  id: 'rwf5000-off',
  section: 'exclusive',
  headline: 'RWF 5,000 off',
  title: 'When you spend RWF 50,000 or more',
  description: 'A Gold member thank-you. Take RWF 5,000 off a single shop of RWF 50,000 or more.',
  validity: 'Until Sunday, 4 October',
  expiresLabel: 'Valid until Sunday',
  image: "/823b1afd-32e3-4345-9983-d55a48804f91.jpg",
  availableAt: 'All Simba Supermarket locations',
  howItWorks: ['Add the offer to your card.', 'Spend RWF 50,000 or more in one visit.', 'RWF 5,000 comes off your total at checkout.'],
  terms: ['Gold and Platinum members only.', 'Excludes airtime, tobacco and alcohol.', 'One use per member.']
}];


export const homeOfferIds = ['double-points', 'b2g1', 'nido-15'];