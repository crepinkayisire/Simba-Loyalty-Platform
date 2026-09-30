import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon, Loader2Icon, MaximizeIcon, MinimizeIcon, XIcon } from 'lucide-react';
import { deckSlides } from '../components/deck/deckSlides';
import { useDeckPdfExport } from '../hooks/useDeckPdfExport';

const control =
'flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors duration-150 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-30 disabled:hover:bg-transparent';

export function ExecutiveDeck() {
  const total = deckSlides.length;
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const { state: exportState, exportPdf, dismissError } = useDeckPdfExport(stageRef, total, setIndex);
  const exporting = exportState.status === 'exporting';
  const current = exportState.status === 'exporting' ? exportState.current : 0;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => Math.min(total - 1, Math.max(0, i + dir))), [total]);

  useEffect(() => {
    if (exporting) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(-1);
      } else if (e.key === 'Home') setIndex(0);else
      if (e.key === 'End') setIndex(total - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, total, exporting]);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();else
    void document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  const Slide = deckSlides[index].component;

  return (
    <main ref={stageRef} aria-label="Simba+ executive presentation" className="deck fixed inset-0 z-50 overflow-hidden bg-canvas">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.3 } }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${total}: ${deckSlides[index].title}`}>
          
          <Slide />
        </motion.div>
      </AnimatePresence>

      <nav
        data-export-hide="true"
        aria-label="Presentation controls"
        className={`absolute right-4 top-4 z-10 flex items-center gap-0.5 rounded-full bg-ink/80 p-1 shadow-lift backdrop-blur transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100 ${
        exporting ? 'opacity-100' : 'opacity-40'}`
        }>
        
        <button type="button" onClick={() => go(-1)} disabled={index === 0 || exporting} className={control} aria-label="Previous slide">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="tnum min-w-[3.5rem] text-center text-xs font-semibold text-white" aria-live="polite">
          {index + 1} / {total}
        </span>
        <button type="button" onClick={() => go(1)} disabled={index === total - 1 || exporting} className={control} aria-label="Next slide">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
        <span aria-hidden className="mx-1 h-4 w-px bg-white/20" />
        <button
          type="button"
          onClick={() => void exportPdf(index)}
          disabled={exporting}
          className={`${control} ${exporting ? 'w-auto gap-1.5 px-2.5' : ''}`}
          aria-label={exporting ? `Preparing PDF, slide ${current} of ${total}` : 'Download as PDF'}
          title="Download as PDF">
          
          {exporting ?
          <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              <span className="tnum text-xs font-semibold">PDF {current}/{total}</span>
            </> :

          <DownloadIcon className="h-4 w-4" />
          }
        </button>
        <button type="button" onClick={toggleFullscreen} disabled={exporting} className={control} aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}>
          {isFullscreen ? <MinimizeIcon className="h-4 w-4" /> : <MaximizeIcon className="h-4 w-4" />}
        </button>
        <Link to="/app" className={control} aria-label="Exit presentation">
          <XIcon className="h-4 w-4" />
        </Link>
      </nav>

      {exportState.status === 'error' ?
      <div
        data-export-hide="true"
        role="alert"
        className="absolute right-4 top-16 z-10 flex max-w-xs items-start gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-lift">
        
          <p>The PDF couldn’t be created. Please try again.</p>
          <button type="button" onClick={dismissError} className="shrink-0 font-semibold text-white/80 hover:text-white">
            Dismiss
          </button>
        </div> :
      null}
    </main>);

}