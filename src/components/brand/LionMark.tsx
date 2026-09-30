import React, { type CSSProperties } from 'react';

export const LION_URL = "/ChatGPT_Image_Sep_30,_2026,_12_19_43_AM.png";


export type LionTone = 'orange' | 'white' | 'ink';

const TONE_COLOR: Record<LionTone, string> = {
  orange: '#D9531E',
  white: '#FFFFFF',
  ink: '#1B1714'
};

interface LionMarkProps {
  /** Named tone, or any CSS colour. */
  tone?: LionTone;
  color?: string;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

/** The Simba lion, recoloured with a mask so it can sit on any background. */
export function LionMark({ tone = 'orange', color, opacity, className = '', style }: LionMarkProps) {
  const mask = `url("${LION_URL}") center / contain no-repeat`;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none block aspect-[0.96] select-none ${className}`}
      style={{
        backgroundColor: color ?? TONE_COLOR[tone],
        opacity,
        WebkitMask: mask,
        mask,
        ...style
      }} />);


}