import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheckIcon,
  CoinsIcon,
  FingerprintIcon,
  GiftIcon,
  GlobeIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  MegaphoneIcon,
  MonitorIcon,
  PackageIcon,
  ReceiptIcon,
  ScanBarcodeIcon,
  SettingsIcon,
  SmartphoneIcon,
  UsersIcon } from
'lucide-react';

export type Experience = {
  name: string;
  audience: string;
  icon: LucideIcon;
  tone: string;
  items: string[];
};

export const experiences: Experience[] = [
{
  name: 'Customer app',
  audience: 'For shoppers',
  icon: SmartphoneIcon,
  tone: 'bg-simba text-white',
  items: [
  'Simba+ card with a rotating checkout code',
  'Top up by MTN MoMo, Airtel Money or bank card',
  'Earn, redeem and send points',
  'Memberships with partner offers',
  'Activity, receipts and notifications']

},
{
  name: 'Checkout POS',
  audience: 'At every Simba till',
  icon: ScanBarcodeIcon,
  tone: 'bg-ink text-canvas',
  items: [
  'Identify by checkout code or phone + OTP',
  'Membership discount applied automatically',
  'Pay with points, Simba+ card, MoMo, card or cash',
  'Points and receipt land in the app instantly']

},
{
  name: 'Management console',
  audience: 'For Simba HQ',
  icon: MonitorIcon,
  tone: 'bg-gold-bright text-ink',
  items: [
  'Create memberships and promotions',
  'Customer 360 and transaction ledger',
  'Partner offers, redemptions and payables',
  'Business rules, stores and team access']

}];


export type AppJourney = {title: string;detail: string;};

export const appJourneys: AppJourney[] = [
{ title: 'One card, two balances', detail: 'Shopping card RWF and Simba+ points, with a 60-second checkout code' },
{ title: 'Top up in seconds', detail: 'MTN MoMo, Airtel Money or a saved bank card, with any amount' },
{ title: 'Earn & redeem', detail: 'Top up the card, send to a friend, partner promos or free shipping' },
{ title: 'Memberships', detail: 'Bronze to Platinum, each with its own offers, rewards and discounts' }];


export type PosStep = {title: string;detail: string;};

export const posSteps: PosStep[] = [
{ title: 'Identify', detail: '6-digit checkout code, or phone number verified by OTP' },
{ title: 'Apply benefits', detail: "The member's discount comes off automatically" },
{ title: 'Pay', detail: 'Redeem points, use the Simba+ card, then MoMo, card or cash' },
{ title: 'Complete', detail: 'Points, receipt and new balances appear in the app' }];


export const posReceipt = [
{ label: 'Basket · 14 items', value: 'RWF 72,500' },
{ label: 'Gold discount · 5%', value: '− RWF 3,625', accent: true },
{ label: 'Simba+ card', value: 'RWF 48,500' },
{ label: 'MTN MoMo', value: 'RWF 20,375' }];


export type NavItem = {label: string;icon: LucideIcon;};

export const consoleNav: NavItem[] = [
{ label: 'Overview', icon: LayoutDashboardIcon },
{ label: 'Memberships', icon: BadgeCheckIcon },
{ label: 'Customers', icon: UsersIcon },
{ label: 'Transactions', icon: ReceiptIcon },
{ label: 'Partners', icon: HandshakeIcon },
{ label: 'Promotions', icon: MegaphoneIcon },
{ label: 'Settings', icon: SettingsIcon }];


export type HighlightGroup = {title: string;items: string[];};

export const consoleHighlights: HighlightGroup[] = [
{ title: 'Programme', items: ['Memberships: cover, price, billing', 'Promotions: discounts, rewards, offers', 'Earn rate, point value, budget ceiling'] },
{ title: 'Customers & money', items: ['Customer 360 + shopping habits', 'Transaction ledger with date filters', 'Manual or scheduled disbursements'] },
{ title: 'Partners', items: ['Partner offers per membership', 'Redemption activity with codes', 'Partner payables'] }];


export const topItems = [
{ name: 'Inyange milk 1L', share: 92 },
{ name: 'Fresh bakery bread', share: 78 },
{ name: 'Akabanga chilli oil', share: 61 },
{ name: 'Basmati rice 5kg', share: 47 },
{ name: 'Fresh produce', share: 40 }];


export const recentTransactions = [
{ date: '29 Sep', store: 'Simba Gishushu', type: 'Purchase', amount: 'RWF 72,500', points: '+725' },
{ date: '27 Sep', store: 'Simba app', type: 'Top-up · MoMo', amount: 'RWF 20,000', points: '—' },
{ date: '06 Sep', store: 'Serena Hotels', type: 'Partner offer', amount: 'RWF 4,000', points: '−4,000' }];


export type SystemItem = {label: string;icon: LucideIcon;};

export const simbaSystems: SystemItem[] = [
{ label: 'POS', icon: ScanBarcodeIcon },
{ label: 'Online Shop', icon: GlobeIcon },
{ label: 'Inventory', icon: PackageIcon }];


export const loyaltyModules: SystemItem[] = [
{ label: 'Customer ID', icon: FingerprintIcon },
{ label: 'Memberships', icon: BadgeCheckIcon },
{ label: 'Points & wallet', icon: CoinsIcon },
{ label: 'Promotions', icon: MegaphoneIcon },
{ label: 'Partners', icon: HandshakeIcon },
{ label: 'Redemptions', icon: GiftIcon }];