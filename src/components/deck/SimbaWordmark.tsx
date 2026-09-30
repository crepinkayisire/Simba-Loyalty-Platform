import React from 'react';
import { LionMark } from '../brand/LionMark';

type SimbaWordmarkProps = {
  className?: string;
  tone?: 'brand' | 'light' | 'ink';
};

/** Deck brand lock-up: the orange Simba lion beside "Simba Supermarket". */
export function SimbaWordmark({ className = '', tone = 'brand' }: SimbaWordmarkProps) {
  const color = tone === 'light' ? 'text-canvas' : tone === 'ink' ? 'text-ink' : 'text-simba';
  return (
    <span aria-label="Simba Supermarket" className={`inline-flex items-center gap-[0.45em] whitespace-nowrap font-display leading-none ${color} ${className}`}>
      <LionMark tone="orange" className="h-[1.35em]" />
      <span aria-hidden="true">Simba Supermarket</span>
    </span>);

}