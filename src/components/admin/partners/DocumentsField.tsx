import React, { useRef } from 'react';
import { FileTextIcon, UploadIcon, XIcon } from 'lucide-react';
import type { PartnerDocument } from '../../../data/admin/partners';

interface DocumentsFieldProps {
  value: PartnerDocument[];
  onChange: (docs: PartnerDocument[]) => void;
}

function sizeOf(bytes: number): string {
  return bytes > 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1_000))} KB`;
}

/** Agreements, KYC and rate cards attached to a partner. */
export function DocumentsField({ value, onChange }: DocumentsFieldProps) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p className="mb-1.5 text-xs font-bold text-muted">Documents</p>
      {value.length > 0 &&
      <ul className="mb-2 divide-y divide-line rounded-xl border border-line">
          {value.map((d, i) =>
        <li key={`${d.name}-${i}`} className="flex items-center gap-3 px-3 py-2.5">
              <FileTextIcon className="h-4 w-4 shrink-0 text-simba" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-bold text-ink">{d.name}</span>
                <span className="num block text-xs text-muted">
                  {d.size} · {d.uploaded}
                </span>
              </span>
              <button
            type="button"
            onClick={() => onChange(value.filter((_, j) => j !== i))}
            aria-label={`Remove ${d.name}`}
            className="rounded-full p-1 text-muted transition-colors duration-150 hover:bg-sand hover:text-ink">
            
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
        )}
        </ul>
      }
      <button
        type="button"
        onClick={() => input.current?.click()}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line text-sm font-bold text-ink-soft transition-colors duration-150 hover:border-ink/40 hover:text-ink">
        
        <UploadIcon className="h-4 w-4" aria-hidden="true" />
        Upload document
      </button>
      <input
        ref={input}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length) onChange([...value, ...files.map((f) => ({ name: f.name, size: sizeOf(f.size), uploaded: 'Today' }))]);
          e.target.value = '';
        }} />
      
      <p className="mt-1 text-xs text-muted">Agreements, KYC certificates, rate cards</p>
    </div>);

}