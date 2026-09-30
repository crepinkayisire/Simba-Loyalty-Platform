import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoyaltyProvider } from './contexts/LoyaltyContext';
import { ProgramProvider } from './contexts/ProgramContext';
import { DemoBar } from './components/DemoBar';
import { MobileLayout } from './components/mobile/MobileLayout';
import { AdminLayout } from './components/admin/AdminLayout';
import { Home } from './pages/app/Home';
import { RedemptionCode } from './pages/app/RedemptionCode';
import { RedemptionSuccess } from './pages/app/RedemptionSuccess';
import { Offers } from './pages/app/Offers';
import { EarnPoints } from './pages/app/EarnPoints';
import { TopUpCard } from './pages/app/TopUpCard';
import { RedeemPoints } from './pages/app/RedeemPoints';
import { OfferDetail } from './pages/app/OfferDetail';
import { Activity } from './pages/app/Activity';
import { Notifications } from './pages/app/Notifications';
import { Profile } from './pages/app/Profile';
import { Checkout } from './pages/Checkout';
import { Overview } from './pages/admin/Overview';
import { Customers } from './pages/admin/Customers';
import { Customer360 } from './pages/admin/Customer360';
import { Transactions } from './pages/admin/Transactions';
import { Memberships } from './pages/admin/Memberships';
import { Promotions } from './pages/admin/Promotions';
import { ConsoleProvider } from './contexts/ConsoleContext';
import { Partners } from './pages/admin/Partners';
import { PartnerDetail } from './pages/admin/PartnerDetail';
import { Settings } from './pages/admin/Settings';
import { ExecutiveDeck } from './pages/ExecutiveDeck';

interface AppProps {
  /** Start the demo before Joseph's RWF 72,500 shop (2,450 pts) or right after it (3,175 pts). */
  demoStart?: 'before-checkout' | 'after-checkout';
}

export function App({ demoStart = 'before-checkout' }: AppProps) {
  return (
    <BrowserRouter>
      <LoyaltyProvider startAfterCheckout={demoStart === 'after-checkout'}>
        <ProgramProvider>
          <ConsoleProvider>
          <div className="flex min-h-full w-full flex-col bg-canvas">
            <DemoBar />
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/app" element={<MobileLayout />}>
                <Route index element={<Home />} />
                <Route path="redeem/code" element={<RedemptionCode />} />
                <Route path="redeem/success" element={<RedemptionSuccess />} />
                <Route path="earn" element={<EarnPoints />} />
                <Route path="topup" element={<TopUpCard />} />
                <Route path="redeem" element={<RedeemPoints />} />
                <Route path="offers" element={<Offers />} />
                <Route path="offers/:level/:partnerId" element={<OfferDetail />} />
                <Route path="activity" element={<Activity />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="profile" element={<Profile />} />
              </Route>
              <Route path="/pos" element={<Checkout />} />
              <Route path="/deck" element={<ExecutiveDeck />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Overview />} />
                <Route path="memberships" element={<Memberships />} />
                <Route path="customers" element={<Customers />} />
                <Route path="customers/:customerId" element={<Customer360 />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="partners" element={<Partners />} />
                <Route path="partners/:partnerId" element={<PartnerDetail />} />
                <Route path="promotions" element={<Promotions />} />
                <Route path="settings" element={<Settings />} />
                {/* Old module paths */}
                <Route path="tiers" element={<Navigate to="/admin/memberships" replace />} />
                <Route path="wallet" element={<Navigate to="/admin/transactions" replace />} />
                <Route path="points" element={<Navigate to="/admin/promotions" replace />} />
                <Route path="rewards" element={<Navigate to="/admin/promotions" replace />} />
                <Route path="campaigns" element={<Navigate to="/admin/promotions" replace />} />
                <Route path="stores" element={<Navigate to="/admin/settings?tab=stores" replace />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
              <Route path="*" element={<Navigate to="/app" replace />} />
            </Routes>
          </div>
          </ConsoleProvider>
        </ProgramProvider>
      </LoyaltyProvider>
    </BrowserRouter>);

}