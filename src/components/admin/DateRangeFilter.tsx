import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarRangeIcon, ChevronDownIcon } from 'lucide-react';
import { presetLabels, rangeForPreset, type DateRange, type RangePreset } from '../../utils/dateRange';

interface DateRangeFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const presets: RangePreset[] = ['all', 'today', '7d', '30d', 'month', 'custom'];
const inputCls = 'num h-10 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink focus:border-ink focus:outline-none';

/** Preset + custom date/time range picker for tables and timelines. */
export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  const label =
  value.preset === 'custom' && value.from && value.to ?
  `${value.from.replace('T', ' ')} → ${value.to.replace('T', ' ')}` :
  presetLabels[value.preset];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 max-w-[300px] items-center gap-2 rounded-xl border px-3 text-sm font-semibold transition-colors duration-150 ${
        value.preset === 'all' ? 'border-line bg-canvas text-ink' : 'border-simba bg-simba-soft text-simba'}`
        }>
        
        <CalendarRangeIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="num truncate">{label}</span>
        <ChevronDownIcon className="h-4 w-4 shrink-0 opacity-60" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          role="dialog"
          aria-label="Date and time range"
          initial={{ opacity: 0, y: -4, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="absolute right-0 z-30 mt-2 w-[300px] origin-top-right rounded-2xl border border-line bg-white p-3 shadow-lift">
          
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((p) =>
            <button
              key={p}
              type="button"
              aria-pressed={value.preset === p}
              onClick={() => {
                onChange(rangeForPreset(p));
                if (p !== 'custom') setOpen(false);
              }}
              className={`h-9 rounded-lg text-sm font-bold transition-colors duration-150 ${
              value.preset === p ? 'bg-ink text-white' : 'bg-canvas text-ink-soft hover:text-ink'}`
              }>
              
                  {presetLabels[p]}
                </button>
            )}
            </div>
            {value.preset === 'custom' &&
          <div className="mt-3 space-y-2 border-t border-line pt-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-muted">From</span>
                  <input type="datetime-local" value={value.from} onChange={(e) => onChange({ ...value, from: e.target.value })} className={inputCls} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-muted">To</span>
                  <input type="datetime-local" value={value.to} onChange={(e) => onChange({ ...value, to: e.target.value })} className={inputCls} />
                </label>
                <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-1 h-9 w-full rounded-lg bg-simba text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark">
              
                  Apply
                </button>
              </div>
          }
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}