import type { ActivityItem, NotificationItem } from '../types/loyalty';

export const baseActivity: ActivityItem[] = [
{
  id: 'a-card-purchase',
  group: 'Sep 28',
  title: 'Purchased using shopping card',
  subtitle: 'Simba Kigali Heights',
  points: 10,
  kind: 'earned',
  time: '18:10'
},
{
  id: 'a-hh-bonus',
  group: 'Sep 27',
  title: 'Household Products Bonus',
  subtitle: 'Bonus points campaign',
  points: 250,
  kind: 'bonus',
  time: '16:20'
},
{
  id: 'a-redeem-checkout',
  group: 'Sep 26',
  title: 'Redeemed points at checkout',
  subtitle: 'Simba Gishushu',
  points: -20,
  kind: 'redeemed',
  time: '13:45'
},
{
  id: 'a-gift-card',
  group: 'Sep 24',
  title: 'Bought shopping card for a friend',
  subtitle: 'Gift for Aline Uwase',
  points: 10,
  kind: 'bonus',
  time: '12:40'
},
{
  id: 'a-voucher-sep22',
  group: 'Sep 22',
  title: 'Simba Shopping Voucher',
  subtitle: 'RWF 5,000 voucher · Simba Kimironko',
  points: -1000,
  kind: 'redeemed',
  time: '11:05'
},
{
  id: 'a-birthday',
  group: 'Sep 19',
  title: 'Birthday Bonus',
  subtitle: 'Happy birthday from Simba',
  points: 200,
  kind: 'bonus',
  time: '08:00'
},
{
  id: 'a-kimironko',
  group: 'Sep 18',
  title: 'Simba Kimironko',
  subtitle: 'RWF 48,000 purchase',
  points: 480,
  kind: 'earned',
  time: '18:42'
},
{
  id: 'a-kh-sep11',
  group: 'Sep 11',
  title: 'Simba Kigali Heights',
  subtitle: 'RWF 96,300 purchase',
  points: 963,
  kind: 'earned',
  time: '17:15'
}];


export const baseNotifications: NotificationItem[] = [
{
  id: 'n-serena',
  title: 'New partner: Serena Hotels',
  body: 'Gold members now get 15% off dining & spa at Kigali Serena and Lake Kivu Serena.',
  time: 'Today',
  kind: 'announcement',
  link: '/app/offers/Gold/serena'
},
{
  id: 'n-double',
  title: 'Double Points Weekend starts Friday',
  body: 'Earn 2× Simba+ points on all fresh produce, 2–4 October, at every Simba store.',
  time: 'Yesterday',
  kind: 'promo',
  link: '/app/offers'
},
{
  id: 'n-equity',
  title: 'Pay with Equity, earn 2% back',
  body: 'Use your Equity Infinity Card at Simba checkout and get 2% cashback as a Gold member.',
  time: 'Yesterday',
  kind: 'promo',
  link: '/app/offers/Gold/equity'
},
{
  id: 'n-expiry',
  title: '500 points expire on 31 October',
  body: 'Redeem them into RWF on your Simba+ card before they expire.',
  time: '2 days ago',
  kind: 'reward',
  link: '/app'
},
{
  id: 'n-bonus',
  title: '+250 bonus points added',
  body: 'Thanks for buying household products this month. Your bonus is on your card.',
  time: 'Sep 27',
  kind: 'reward',
  link: '/app/activity'
},
{
  id: 'n-store',
  title: 'Simba Gishushu is open until 22:00',
  body: 'Extended opening hours start this week, every day including Sunday.',
  time: 'Sep 24',
  kind: 'announcement',
  link: '/app'
},
{
  id: 'n-birthday',
  title: 'Happy birthday, Joseph',
  body: '200 birthday bonus points have been added to your card.',
  time: 'Sep 19',
  kind: 'birthday',
  link: '/app'
}];