import type { LucideIcon } from 'lucide-react';
import { HandshakeIcon, ServerIcon, SlidersHorizontalIcon, UsersIcon } from 'lucide-react';

export type NeedGroup = {group: string;icon: LucideIcon;tone: string;items: string[];};

export const needs: NeedGroup[] = [
{ group: 'Technical', icon: ServerIcon, tone: 'bg-ink text-canvas', items: ['POS / API access', 'Test environment', 'Product catalogue', 'Store list', 'Transaction format'] },
{ group: 'Program', icon: SlidersHorizontalIcon, tone: 'bg-simba text-white', items: ['Gold / Platinum rules', 'Points economics', 'Redemption rules'] },
{ group: 'Partners', icon: HandshakeIcon, tone: 'bg-gold-bright text-ink', items: ['Partner offers', 'Settlement rules', 'Branding'] },
{ group: 'Team', icon: UsersIcon, tone: 'bg-cream text-ink', items: ['IT lead', 'Commercial owner', 'Pilot stores'] }];


export const weeks = [
{ label: 'W1', date: '5 Oct' },
{ label: 'W2', date: '12 Oct' },
{ label: 'W3', date: '19 Oct' },
{ label: 'W4', date: '26 Oct' },
{ label: 'W5', date: '2 Nov' },
{ label: 'W6', date: '9 Nov' },
{ label: 'W7', date: '16 Nov' },
{ label: 'W8', date: '23 Nov' },
{ label: 'W9', date: '30 Nov' }];


export type TimelineKind = 'plan' | 'build' | 'integrate' | 'test' | 'pilot' | 'launch';
export type TimelineRow = {task: string;start: number;end: number;kind: TimelineKind;};

export const timeline: TimelineRow[] = [
{ task: 'Discovery & technical audit', start: 1, end: 1, kind: 'plan' },
{ task: 'UX & product design', start: 1, end: 2, kind: 'plan' },
{ task: 'Loyalty core', start: 2, end: 4, kind: 'build' },
{ task: 'Customer app', start: 3, end: 5, kind: 'build' },
{ task: 'Management console', start: 3, end: 6, kind: 'build' },
{ task: 'Checkout POS integration', start: 2, end: 6, kind: 'integrate' },
{ task: 'Testing & UAT', start: 6, end: 7, kind: 'test' },
{ task: 'Pilot', start: 8, end: 8, kind: 'pilot' },
{ task: 'Launch', start: 9, end: 9, kind: 'launch' }];


export type CostLine = {label: string;amount: number;};

/** One-time implementation build-up, in RWF millions. */
export const implementationLines: CostLine[] = [
{ label: 'Discovery, solution architecture & UX', amount: 5 },
{ label: 'Customer app & digital membership', amount: 8 },
{ label: 'Loyalty & membership engine', amount: 10 },
{ label: 'Management console', amount: 8 },
{ label: 'Promotions & rewards engine', amount: 5 },
{ label: 'Partner & redemption/payables module', amount: 5 },
{ label: 'POS & backend integration', amount: 10 },
{ label: 'Testing, deployment & training', amount: 4 }];


export const implementationContingency = 5;

export const platformGroups = [
{ title: 'Loyalty infrastructure', detail: 'Memberships, points, rewards & transaction ledger' },
{ title: 'Management platform', detail: 'Customers, promotions, partners & reporting' },
{ title: 'Infrastructure', detail: 'Hosting, database, APIs & monitoring' },
{ title: 'Maintenance', detail: 'Bug fixes, upgrades & platform improvements' },
{ title: 'Support', detail: 'Operational and technical support' }];


export const nextSteps = [
{ label: 'Approve product direction', when: 'Today' },
{ label: 'Proposal approved', when: 'Within 1 week' },
{ label: 'Technical discovery', when: 'Week 1' },
{ label: 'Build & integrate', when: 'Weeks 2–7' },
{ label: 'Pilot', when: 'Week 8' },
{ label: 'Launch', when: 'Early December 2026' }];


export const closingLines = ['Prove the experience.', 'Validate the economics.', 'Scale across Simba.'];