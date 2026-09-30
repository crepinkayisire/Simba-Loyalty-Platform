import React, { createContext, useContext, useState } from 'react';
import { campaignSeed, type PointsCampaign } from '../data/admin/campaigns';

interface ProgramContextValue {
  campaigns: PointsCampaign[];
  saveCampaign: (campaign: PointsCampaign) => void;
  removeCampaign: (id: string) => void;
  /** Sends the campaign to its audience; members can claim from the app. */
  publishCampaign: (id: string, reach: number) => void;
  endCampaign: (id: string) => void;
}

const ProgramContext = createContext<ProgramContextValue | null>(null);

/** Points campaigns shared by the console (publish) and the customer app (claim). */
export function ProgramProvider({ children }: {children: React.ReactNode;}) {
  const [campaigns, setCampaigns] = useState<PointsCampaign[]>(campaignSeed);

  const update = (id: string, patch: Partial<PointsCampaign>) =>
  setCampaigns((list) => list.map((c) => c.id === id ? { ...c, ...patch } : c));

  const value: ProgramContextValue = {
    campaigns,
    saveCampaign: (campaign) =>
    setCampaigns((list) => list.some((c) => c.id === campaign.id) ? list.map((c) => c.id === campaign.id ? campaign : c) : [campaign, ...list]),
    removeCampaign: (id) => setCampaigns((list) => list.filter((c) => c.id !== id)),
    publishCampaign: (id, reach) => update(id, { status: 'Published', reach, publishedOn: 'Sep 29, 2026' }),
    endCampaign: (id) => update(id, { status: 'Ended' })
  };

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
}

export function useProgram() {
  const ctx = useContext(ProgramContext);
  if (!ctx) throw new Error('useProgram must be used inside ProgramProvider');
  return ctx;
}