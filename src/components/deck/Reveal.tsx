import React, { type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  index?: number;
  className?: string;
  style?: CSSProperties;
  y?: number;
};

/** Subtle entrance for SECONDARY content only — headlines render immediately. */
export function Reveal({ children, index = 0, className, style, y = 10 }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>);

  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.1 + Math.min(index, 10) * 0.045, ease: [0.23, 1, 0.32, 1] }}>
      
      {children}
    </motion.div>);

}