import React from 'react';
import { LionMark, LION_URL } from './LionMark';

/** Kept for places that need an image URL (e.g. the console's business logo field). */
export const SIMBA_LOGO_URL = LION_URL;

interface SimbaLogoProps {
  tone?: 'red' | 'white' | 'ink';
  size?: 'sm' | 'md' | 'lg';
  /** Show the "Simba+" app name beside the lion mark. */
  withPlus?: boolean;
}

export function SimbaLogo({ tone = 'red', size = 'md', withPlus = false }: SimbaLogoProps) {
  const color = tone === 'red' ? 'text-simba' : tone === 'white' ? 'text-white' : 'text-ink';
  const plusColor = tone === 'white' ? 'text-white' : 'text-simba';
  const text = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const mark = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-11';
  const lionTone = tone === 'white' ? 'white' : tone === 'ink' ? 'ink' : 'orange';

  return (
    <span className={`inline-flex items-center gap-2 ${color}`} aria-label={withPlus ? 'Simba+' : 'Simba'}>
      <LionMark tone={lionTone} className={`${mark} shrink-0`} />
      <span
        className={`${text} font-bold leading-none tracking-tight`}
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        aria-hidden="true">
        
        Simba
        {withPlus && <span className={`ml-0.5 font-sans font-extrabold ${plusColor}`}>+</span>}
      </span>
    </span>);

}