import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface DrawerProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function Drawer({ title, subtitle, onClose, footer, children }: DrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end bg-ink/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}>
      
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        initial={{ x: 32, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 32, opacity: 0 }}
        transition={{ duration: 0.25, ease }}
        className="flex h-full w-full max-w-md flex-col bg-white shadow-lift">
        
        <header className="flex items-start justify-between gap-3 border-b border-line px-6 py-5">
          <div>
            <h2 className="text-lg font-extrabold text-ink">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-muted transition-colors duration-150 hover:bg-sand hover:text-ink" aria-label="Close">
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>
        <div className="thin-scrollbar flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <footer className="border-t border-line px-6 py-4">{footer}</footer>}
      </motion.aside>
    </motion.div>);

}