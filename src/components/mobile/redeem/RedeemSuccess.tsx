import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CopyIcon, StarIcon } from 'lucide-react';
import { useLoyalty } from '../../../contexts/LoyaltyContext';

interface RedeemSuccessProps {
  title: string;
  text: string;
  /** Optional promo or shipping code to show and copy. */
  code?: string;
  onDone: () => void;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function RedeemSuccess({ title, text, code, onDone }: RedeemSuccessProps) {
  const { balance } = useLoyalty();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!code) return;
    navigator.clipboard?.writeText(code).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex flex-col items-center pb-1 pt-5 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-white">
        
        <CheckIcon className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
      </motion.span>
      <p className="num mt-4 text-2xl font-extrabold text-ink">{title}</p>
      <p className="mt-1 max-w-[280px] text-sm text-muted">{text}</p>

      {code &&
      <button
        type="button"
        onClick={copy}
        className="mt-5 flex w-full items-center justify-between rounded-2xl border-2 border-dashed border-simba bg-simba-soft px-4 py-3.5 transition-colors duration-150 hover:bg-simba-soft/70"
        aria-label={`Copy code ${code}`}>
        
          <span className="num text-xl font-extrabold tracking-[0.12em] text-ink">{code}</span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-simba">
            <CopyIcon className="h-4 w-4" aria-hidden="true" />
            {copied ? 'Copied' : 'Copy'}
          </span>
        </button>
      }

      <div className="mt-4 flex w-full items-center justify-between rounded-2xl bg-canvas px-4 py-3.5">
        <span className="text-sm font-semibold text-muted">New balance</span>
        <span className="num flex items-center gap-1.5 text-lg font-extrabold text-ink">
          <StarIcon className="h-4 w-4 fill-current text-simba" aria-hidden="true" />
          {balance.toLocaleString('en-US')} Simba Points
        </span>
      </div>

      <button type="button" onClick={onDone} className="mt-5 h-14 w-full rounded-2xl bg-ink text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-ink-soft">
        DONE
      </button>
    </div>);

}