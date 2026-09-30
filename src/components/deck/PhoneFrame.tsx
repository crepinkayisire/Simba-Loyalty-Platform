import React, { type CSSProperties, type ReactNode } from 'react';

type PhoneFrameProps = {
  children: ReactNode;
  heightVh: number;
  className?: string;
  style?: CSSProperties;
};

/** Phone mockup; its font-size scales with height so screens can size in `em`. */
export function PhoneFrame({ children, heightVh, className = '', style }: PhoneFrameProps) {
  return (
    <div
      className={className}
      style={{ height: `${heightVh}vh`, width: `${heightVh * 0.49}vh`, fontSize: `${heightVh * 0.021}vh`, ...style }}>
      
      <div className="deck-ui h-full w-full rounded-[2.6em] bg-ink p-[0.5em] shadow-[0_3vh_6vh_-2vh_rgba(28,23,20,0.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.15em] bg-canvas">
          <div aria-hidden className="absolute left-1/2 top-[0.6em] z-20 h-[1.4em] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
          {children}
        </div>
      </div>
    </div>);

}