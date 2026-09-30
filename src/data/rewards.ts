import type { Reward, RewardCategory } from '../types/loyalty';

export const rewardCategories: {id: RewardCategory;label: string;}[] = [
{ id: 'vouchers', label: 'Shopping Vouchers' },
{ id: 'products', label: 'Free Products' },
{ id: 'discounts', label: 'Discounts' },
{ id: 'delivery', label: 'Delivery Rewards' }];


const voucherTerms = [
'Valid on a single purchase at any Simba Supermarket in Rwanda.',
'Cannot be exchanged for cash or combined with another voucher.',
'Redemption code expires 10 minutes after it is generated.'];


export const rewards: Reward[] = [
{
  id: 'voucher-5000',
  title: 'RWF 5,000 Simba Voucher',
  subtitle: 'Shopping voucher',
  points: 1000,
  category: 'vouchers',
  valueRWF: 5000,
  terms: voucherTerms
},
{
  id: 'milk-2l',
  title: 'Free 2L Milk',
  subtitle: 'Inyange fresh milk',
  points: 350,
  category: 'products',
  valueRWF: 2400,
  image: "/383a56c2-fb84-4a02-b0ad-fe7e4245df77.jpg",
  terms: ['One 2L bottle per redemption.', 'Subject to stock at your store.']
},
{
  id: 'household-10',
  title: '10% Off Household Products',
  subtitle: 'Cleaning & laundry',
  points: 500,
  category: 'discounts',
  valueRWF: 3000,
  image: "/bc842c3d-c5a7-4fae-a4ee-dc094a3ef081.jpg",
  terms: ['Maximum discount RWF 5,000.', 'Applies to household category only.']
},
{
  id: 'voucher-10000',
  title: 'RWF 10,000 Simba Voucher',
  subtitle: 'Shopping voucher',
  points: 2000,
  category: 'vouchers',
  valueRWF: 10000,
  terms: voucherTerms
},
{
  id: 'delivery-free',
  title: 'Free Home Delivery',
  subtitle: 'Kigali, orders over RWF 30,000',
  points: 600,
  category: 'delivery',
  valueRWF: 3000,
  image: "/823b1afd-32e3-4345-9983-d55a48804f91.jpg",
  terms: ['Valid for Kigali deliveries only.', 'Minimum order RWF 30,000.']
},
{
  id: 'voucher-25000',
  title: 'RWF 25,000 Simba Voucher',
  subtitle: 'Shopping voucher',
  points: 5000,
  category: 'vouchers',
  valueRWF: 25000,
  terms: voucherTerms
}];


export const homeRewardIds = ['voucher-5000', 'milk-2l', 'household-10'];