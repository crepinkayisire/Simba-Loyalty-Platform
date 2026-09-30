import React, { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ScanCodeProps {
  value: string;
  label: string;
  qrSize?: number;
  showBarcode?: boolean;
}

export function ScanCode({ value, label, qrSize = 188, showBarcode = true }: ScanCodeProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl bg-white p-3" role="img" aria-label={`QR code for ${label}`}>
        <QRCodeSVG value={value} size={qrSize} level="M" fgColor="#1B1714" bgColor="#FFFFFF" />
      </div>
      {showBarcode &&
      <div className="mt-4 w-full">
          <Barcode value={value} />
          <p className="num mt-2 text-center text-sm font-bold tracking-[0.2em] text-ink">{label}</p>
        </div>
      }
    </div>);

}

function Barcode({ value }: {value: string;}) {
  const bars = useMemo(() => {
    const out: {x: number;w: number;}[] = [];
    let x = 0;
    const seed = value.split('').map((c) => c.charCodeAt(0));
    for (let i = 0; i < 64; i++) {
      const n = seed[i % seed.length] + i * 7;
      const w = n % 3 + 1;
      if (i % 2 === 0) out.push({ x, w });
      x += w + (n >> 2) % 2 + 1;
    }
    return { out, width: x };
  }, [value]);

  return (
    <svg viewBox={`0 0 ${bars.width} 40`} preserveAspectRatio="none" className="h-14 w-full" aria-hidden="true">
      {bars.out.map((b, i) =>
      <rect key={i} x={b.x} y={0} width={b.w} height={40} fill="#1B1714" />
      )}
    </svg>);

}