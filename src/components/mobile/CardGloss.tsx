import React from 'react';

/** Glossy lacquer finish layered over a card. Place as the last child of a relative, overflow-hidden card. */
export function CardGloss() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
      {/* Soft top-down sheen, like light hitting a glossy surface */}
      <span
        className="absolute inset-0 rounded-[inherit]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 38%, rgba(255,255,255,0) 55%, rgba(0,0,0,0.08) 100%)' }} />
      
      {/* Diagonal specular streak */}
      <span
        className="absolute -inset-x-1/4 -top-1/2 h-[140%] rotate-[-18deg]"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.22) 46%, rgba(255,255,255,0.05) 54%, rgba(255,255,255,0) 64%)' }} />
      
      {/* Bright edge highlight and inner rim */}
      <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_0_0_1px_rgba(255,255,255,0.14)]" />
    </span>);

}