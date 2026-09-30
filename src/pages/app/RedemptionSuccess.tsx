import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { useLoyalty } from '../../contexts/LoyaltyContext';

export function RedemptionSuccess() {
  const { lastCompleted, getReward, balance } = useLoyalty();
  const reward = lastCompleted ? getReward(lastCompleted.rewardId) : undefined;

  if (!reward) return <Navigate to="/app" replace />;

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-16">
      <div className="flex flex-1 flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-leaf text-white">
          
          <CheckIcon className="h-10 w-10" strokeWidth={3} aria-hidden="true" />
        </motion.div>
        <p className="mt-6 text-xs font-extrabold tracking-[0.16em] text-leaf">REWARD REDEEMED</p>
        <h1 className="mt-6 text-base font-semibold text-muted">You saved</h1>
        <p className="num mt-1 text-6xl font-extrabold leading-none text-ink">
          <span className="mr-2 align-top text-2xl font-bold">RWF</span>
          {reward.valueRWF.toLocaleString('en-US')}
        </p>
        <p className="num mt-4 text-sm font-semibold text-muted">{reward.points.toLocaleString('en-US')} points used · Simba Kigali Heights</p>

        <div className="mt-10 w-full rounded-2xl bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-muted">New balance</p>
          <p className="num mt-1 text-3xl font-extrabold text-ink">
            {balance.toLocaleString('en-US')} <span className="text-base font-bold text-ink-soft">Simba Points</span>
          </p>
        </div>
      </div>

      <Link
        to="/app"
        className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-simba text-base font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-simba-dark">
        
        DONE
      </Link>
      <Link to="/app" className="mt-3 text-center text-sm font-bold text-ink-soft hover:text-ink">
        View in Activity
      </Link>
    </div>);

}