import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, XIcon } from 'lucide-react';

interface ScreenHeaderProps {
  title: string;
  backTo?: string;
  variant?: 'back' | 'close';
  action?: React.ReactNode;
  /** Overrides navigation, e.g. to step back inside a multi-step page. */
  onBack?: () => void;
}

export function ScreenHeader({ title, backTo, variant = 'back', action, onBack }: ScreenHeaderProps) {
  const navigate = useNavigate();
  const Icon = variant === 'close' ? XIcon : ChevronLeftIcon;

  return (
    <header className="sticky top-0 z-20 grid h-14 grid-cols-[44px_1fr_auto] items-center gap-2 bg-canvas px-3">
      <button
        type="button"
        onClick={() => onBack ? onBack() : backTo ? navigate(backTo) : navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-simba"
        aria-label={variant === 'close' ? 'Close' : 'Back'}>
        
        <Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <h1 className="truncate text-center text-base font-bold text-ink">{title}</h1>
      <div className="flex min-w-[44px] justify-end">{action}</div>
    </header>);

}