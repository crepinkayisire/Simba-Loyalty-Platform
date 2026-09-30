export type CampaignStatus = 'Draft' | 'Published' | 'Ended';

/** A points drop: members in the audience see it in their app and tap to claim. */
export interface PointsCampaign {
  id: string;
  name: string;
  /** Shown to members in the app. */
  message: string;
  points: number;
  /** "All members", "Gold only" or "Gold and above". */
  audience: string;
  /** Last day members can claim, YYYY-MM-DD. */
  claimBy: string;
  status: CampaignStatus;
  /** Members the campaign was sent to at publish time. */
  reach: number;
  claimed: number;
  publishedOn: string;
}

export const campaignStatuses: CampaignStatus[] = ['Draft', 'Published', 'Ended'];

export const campaignSeed: PointsCampaign[] = [
{
  id: 'cp-gold-thanks',
  name: 'Gold thank-you weekend',
  message: 'Thanks for shopping with us, Gold member. Claim 500 bonus points before Sunday.',
  points: 500,
  audience: 'Gold and above',
  claimBy: '2026-10-05',
  status: 'Published',
  reach: 4_130,
  claimed: 1_920,
  publishedOn: 'Sep 26, 2026'
},
{
  id: 'cp-back-to-school',
  name: 'Back to school',
  message: 'School is back. Here are 200 points towards the next shop.',
  points: 200,
  audience: 'All members',
  claimBy: '2026-09-30',
  status: 'Published',
  reach: 24_820,
  claimed: 6_140,
  publishedOn: 'Sep 8, 2026'
},
{
  id: 'cp-platinum-anniv',
  name: 'Platinum anniversary',
  message: 'One year of Platinum. 1,000 points on us.',
  points: 1_000,
  audience: 'Platinum only',
  claimBy: '2026-08-31',
  status: 'Ended',
  reach: 820,
  claimed: 702,
  publishedOn: 'Aug 1, 2026'
},
{
  id: 'cp-october',
  name: 'October kick-off',
  message: 'A new month at Simba. Claim 300 points and start October ahead.',
  points: 300,
  audience: 'All members',
  claimBy: '2026-10-10',
  status: 'Draft',
  reach: 0,
  claimed: 0,
  publishedOn: ''
},
{
  id: 'cp-silver-boost',
  name: 'Silver boost',
  message: 'You are close to Gold. Claim 250 points to get there faster.',
  points: 250,
  audience: 'Silver only',
  claimBy: '2026-10-20',
  status: 'Draft',
  reach: 0,
  claimed: 0,
  publishedOn: ''
}];