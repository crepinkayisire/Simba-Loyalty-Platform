import { useCallback, useState, type RefObject } from 'react';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

/** Time for the slide cross-fade and secondary reveals to finish before capturing. */
const SETTLE_MS = 900;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

type ExportState = {status: 'idle';} | {status: 'exporting';current: number;} | {status: 'error';};

/**
 * Walks through every slide on screen, captures each one exactly as presented,
 * and saves them as a single landscape PDF (one slide per page).
 */
export function useDeckPdfExport(stageRef: RefObject<HTMLElement>, total: number, showSlide: (i: number) => void) {
  const [state, setState] = useState<ExportState>({ status: 'idle' });

  const exportPdf = useCallback(
    async (returnTo: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [width, height], hotfixes: ['px_scaling'], compress: true });

      try {
        await document.fonts?.ready;
        for (let i = 0; i < total; i += 1) {
          setState({ status: 'exporting', current: i + 1 });
          showSlide(i);
          await wait(SETTLE_MS);
          const image = await toJpeg(stage, {
            quality: 0.92,
            pixelRatio: 2,
            width,
            height,
            cacheBust: true,
            filter: (node) => !(node instanceof HTMLElement && node.dataset.exportHide === 'true')
          });
          if (i > 0) pdf.addPage([width, height], 'landscape');
          pdf.addImage(image, 'JPEG', 0, 0, width, height);
        }
        pdf.save('Simba-Digital-Loyalty-System.pdf');
        setState({ status: 'idle' });
      } catch {
        setState({ status: 'error' });
      } finally {
        showSlide(returnTo);
      }
    },
    [stageRef, total, showSlide]
  );

  return { state, exportPdf, dismissError: () => setState({ status: 'idle' }) };
}