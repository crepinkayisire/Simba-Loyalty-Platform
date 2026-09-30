import { type ComponentType } from 'react';
import { ArchitectureSlide } from './slides/ArchitectureSlide';
import { CheckoutSlide } from './slides/CheckoutSlide';
import { ConsoleSlide } from './slides/ConsoleSlide';
import { CoverSlide } from './slides/CoverSlide';
import { CustomerAppSlide } from './slides/CustomerAppSlide';
import { EarnRedeemSlide } from './slides/EarnRedeemSlide';
import { ExperienceSlide } from './slides/ExperienceSlide';
import { MembershipsSlide } from './slides/MembershipsSlide';
import { NeedsSlide } from './slides/NeedsSlide';
import { NextStepsSlide } from './slides/NextStepsSlide';
import { OpportunitySlide } from './slides/OpportunitySlide';

export type DeckSlide = {id: string;title: string;component: ComponentType;};

export const deckSlides: DeckSlide[] = [
{ id: 'cover', title: 'Simba Supermarket Digital Loyalty System', component: CoverSlide },
{ id: 'opportunity', title: 'Turn transactions into relationships.', component: OpportunitySlide },
{ id: 'experiences', title: 'Three connected experiences', component: ExperienceSlide },
{ id: 'customer-app', title: 'Simba+ in every shopper’s pocket', component: CustomerAppSlide },
{ id: 'memberships', title: 'One relationship. Four levels of membership.', component: MembershipsSlide },
{ id: 'earn-redeem', title: 'Earn at the till. Redeem in the app.', component: EarnRedeemSlide },
{ id: 'checkout', title: 'Recognised at the till in seconds', component: CheckoutSlide },
{ id: 'console', title: 'Run the programme from one place', component: ConsoleSlide },
{ id: 'architecture', title: 'How it connects', component: ArchitectureSlide },
{ id: 'needs', title: 'What we need from Simba', component: NeedsSlide },
{ id: 'next-steps', title: 'From approval to launch', component: NextStepsSlide }];