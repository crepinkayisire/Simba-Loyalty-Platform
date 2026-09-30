import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftIcon, CircleAlertIcon, MessageSquareIcon } from 'lucide-react';

interface PhoneOtpStepProps {
  phoneDigits: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTP_LENGTH = 6;
const RESEND_AFTER = 30;
const MAX_ATTEMPTS = 3;

export function PhoneOtpStep({ phoneDigits, onVerified, onBack }: PhoneOtpStepProps) {
  const [otp, setOtp] = useState(generateOtp);
  const [entry, setEntry] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resendIn, setResendIn] = useState(RESEND_AFTER);
  const [showSms, setShowSms] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = window.setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendIn]);

  const locked = attempts >= MAX_ATTEMPTS;
  const masked = `+250 ${phoneDigits.slice(0, 3)} ••• ${phoneDigits.slice(6)}`;

  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    if (entry.length < OTP_LENGTH) return setError(`Enter all ${OTP_LENGTH} digits the customer received.`);
    if (entry !== otp) {
      const next = attempts + 1;
      setAttempts(next);
      setEntry('');
      inputRef.current?.focus();
      return setError(
        next >= MAX_ATTEMPTS ?
        'Too many wrong codes. Send a new code to try again.' :
        `Code doesn't match. ${MAX_ATTEMPTS - next} ${MAX_ATTEMPTS - next === 1 ? 'try' : 'tries'} left.`
      );
    }
    setError(null);
    onVerified();
  };

  const resend = () => {
    setOtp(generateOtp());
    setEntry('');
    setAttempts(0);
    setError(null);
    setResendIn(RESEND_AFTER);
    setShowSms(false);
    inputRef.current?.focus();
  };

  const formatted = entry.length > 3 ? `${entry.slice(0, 3)} ${entry.slice(3)}` : entry;

  return (
    <form onSubmit={verify} className="flex flex-1 flex-col" noValidate>
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 flex w-fit items-center gap-1.5 rounded-lg px-1 py-1 text-sm font-bold text-muted transition-colors duration-150 hover:text-ink">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Change number
      </button>

      <h2 className="mt-3 text-xl font-extrabold text-ink">Verify phone number</h2>
      <p className="mt-1 text-sm text-muted">
        We texted a {OTP_LENGTH}-digit code to <span className="num font-bold text-ink">{masked}</span>. Ask the customer to read it out.
      </p>

      <label className="mt-6 block">
        <span className="sr-only">{OTP_LENGTH}-digit verification code</span>
        <input
          ref={inputRef}
          value={formatted}
          onChange={(e) => {
            setError(null);
            setEntry(e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH));
          }}
          disabled={locked}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          placeholder="000 000"
          className={`num h-20 w-full rounded-2xl border-2 bg-white text-center text-4xl font-extrabold tracking-[0.2em] text-ink placeholder:text-line focus:outline-none disabled:bg-sand disabled:text-muted ${
          error ? 'border-simba' : 'border-line focus:border-ink'}`
          } />
        
      </label>

      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-muted">Code expires in 5 minutes</span>
        {resendIn > 0 ?
        <span className="num font-semibold text-muted">Resend in 0:{String(resendIn).padStart(2, '0')}</span> :

        <button type="button" onClick={resend} className="font-bold text-simba transition-colors duration-150 hover:text-simba-dark">
            Send a new code
          </button>
        }
      </div>

      {error &&
      <p role="alert" className="mt-3 flex items-start gap-2 rounded-xl bg-simba-soft p-3 text-sm font-semibold text-simba-dark">
          <CircleAlertIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
          {locked && resendIn > 0 && <span className="num ml-auto shrink-0">0:{String(resendIn).padStart(2, '0')}</span>}
        </p>
      }

      {showSms &&
      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-sand p-3.5" aria-live="polite">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-simba">
            <MessageSquareIcon className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="text-sm">
            <p className="text-xs font-bold text-muted">SMS to {masked} · Simba+</p>
            <p className="mt-0.5 text-ink">
              Your Simba+ checkout code is <span className="num font-extrabold">{otp}</span>. Don't share it with anyone except the Simba cashier.
            </p>
          </div>
        </div>
      }

      <div className="mt-auto pt-6">
        <button
          type="submit"
          disabled={locked}
          className="h-14 w-full rounded-2xl bg-simba text-sm font-extrabold tracking-wide text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted">
          
          VERIFY &amp; CONTINUE
        </button>
        <button
          type="button"
          onClick={() => {
            setShowSms(true);
            if (!locked) {
              setEntry(otp);
              setError(null);
            }
          }}
          className="mt-3 w-full rounded-xl border border-dashed border-line py-2.5 text-xs font-bold text-muted transition-colors duration-150 hover:border-ink/30 hover:text-ink">
          
          Demo: show the SMS Joseph received
        </button>
      </div>
    </form>);

}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}