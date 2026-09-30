import React from 'react';
import { motion } from 'framer-motion';
import { XIcon, CheckIcon } from 'lucide-react';

const ease = [0.23, 1, 0.32, 1] as const;

interface BottomSheetProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ title, onClose, children }: BottomSheetProps) {
  return (
    <motion.div
      className="pointer-events-auto absolute inset-0 flex items-end bg-ink/40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}>
      
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25, ease }}
        className="max-h-[90%] w-full overflow-y-auto rounded-t-[28px] bg-white px-5 pb-7 pt-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-muted hover:bg-sand hover:text-ink" aria-label="Close">
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>);

}

export function SheetSuccess({ title, text, onDone }: {title: string;text: string;onDone: () => void;}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <motion.span
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-leaf text-white">
        
        <CheckIcon className="h-7 w-7" strokeWidth={3} aria-hidden="true" />
      </motion.span>
      <p className="num mt-4 text-2xl font-extrabold text-ink">{title}</p>
      <p className="mt-1 text-sm text-muted">{text}</p>
      <button type="button" onClick={onDone} className="mt-6 h-12 w-full rounded-2xl bg-ink text-sm font-extrabold text-white">
        Done
      </button>
    </div>);

}