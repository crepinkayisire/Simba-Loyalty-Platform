import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TimerIcon, MonitorSmartphoneIcon, TicketXIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';
import { ScreenHeader } from '../../components/mobile/ScreenHeader';
import { ScanCode } from '../../components/codes/ScanCode';

const START_SECONDS = 9 * 60 + 42;

export function RedemptionCode() {
  const navigate = useNavigate();
  const { redemption, getReward, cancelRedemption, startRedemption } = useLoyalty();
  const [seconds, setSeconds] = useState(START_SECONDS);
  const reward = redemption ? getReward(redemption.rewardId) : undefined;

  useEffect(() => {
    if (redemption?.status === 'redeemed') navigate('/app/redeem/success', { replace: true });
  }, [redemption, navigate]);

  useEffect(() => {
    setSeconds(START_SECONDS);
  }, [redemption?.code]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  if (!redemption || !reward) {
    return (
      <div>
        <ScreenHeader title="Redemption" backTo="/app" />
        <div className="flex flex-col items-center px-8 pt-20 text-center">
          <TicketXIcon className="h-10 w-10 text-muted" aria-hidden="true" />
          <p className="mt-4 text-lg font-extrabold text-ink">No active code</p>
          <p className="mt-1 text-sm text-muted">Redeem your Simba+ points from Home.</p>
          <Link to="/app" className="mt-6 rounded-2xl bg-simba px-6 py-3 text-sm font-extrabold text-white">
            Go to Home
          </Link>
        </div>
      </div>);

  }

  const expired = seconds <= 0;
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="flex min-h-full flex-col pb-6">
      <ScreenHeader title="Redemption code" backTo="/app" variant="close" />
      <div className="flex-1 px-5">
        <div className="text-center">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold tracking-[0.14em] ${expired ? 'bg-sand text-muted' : 'bg-leaf-soft text-leaf'}`}>
            {expired ? 'CODE EXPIRED' : 'READY TO REDEEM'}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{reward.title}</h2>
        </div>

        <section className="mt-5 rounded-[28px] bg-white px-6 pb-6 pt-5 shadow-card" aria-label="Redemption code">
          <div className={expired ? 'opacity-20' : ''}>
            <ScanCode value={redemption.code} label={redemption.code} qrSize={196} />
          </div>
          <p className="mt-5 text-center text-[15px] font-semibold text-ink">Ask the cashier to scan this code.</p>
        </section>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-ink px-5 py-4 text-white" aria-live="polite">
          <span className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <TimerIcon className="h-5 w-5" aria-hidden="true" />
            Expires in
          </span>
          <span className="num text-2xl font-extrabold">{mm}:{ss}</span>
        </div>

        {expired ?
        <button
          type="button"
          onClick={() => startRedemption(reward.id)}
          className="mt-4 h-14 w-full rounded-2xl bg-simba text-base font-extrabold text-white hover:bg-simba-dark">
          
            GENERATE NEW CODE
          </button> :

        <Link
          to="/pos"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-dashed border-muted/50 py-3 text-sm font-bold text-muted transition-colors duration-150 hover:border-ink hover:text-ink">
          
            <MonitorSmartphoneIcon className="h-4 w-4" aria-hidden="true" />
            Demo: cashier scans this code
          </Link>
        }
      </div>

      <div className="px-5 pt-4 text-center">
        <button
          type="button"
          onClick={() => {
            cancelRedemption();
            navigate('/app');
          }}
          className="text-sm font-bold text-simba hover:text-simba-dark">
          
          Cancel Redemption
        </button>
        <p className="mt-1 text-xs text-muted">Your points stay untouched until the code is scanned.</p>
      </div>
    </div>);

}