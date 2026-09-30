import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon } from 'lucide-react';
import { BottomSheet } from './BottomSheet';

export interface EditableField {
  key: string;
  label: string;
  value: string;
  type?: 'text' | 'tel' | 'email';
  /** When set, the field is picked from a list instead of typed. */
  options?: string[];
  hint?: string;
}

interface EditFieldSheetProps {
  field: EditableField;
  onSave: (value: string) => void;
  onClose: () => void;
}

export function EditFieldSheet({ field, onSave, onClose }: EditFieldSheetProps) {
  const [value, setValue] = useState(field.value);
  const valid = value.trim().length > 0;

  const save = () => {
    if (!valid) return;
    onSave(value.trim());
    onClose();
  };

  const target = document.getElementById('phone-overlay');
  const sheet =
  <BottomSheet title={field.label} onClose={onClose}>
      {field.options ?
    <ul className="mt-3 space-y-2" role="radiogroup" aria-label={field.label}>
          {field.options.map((opt) =>
      <li key={opt}>
              <button
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => setValue(opt)}
          className={`flex w-full items-center justify-between rounded-2xl border-2 px-4 py-3.5 text-left text-[15px] font-bold transition-colors duration-150 ${
          value === opt ? 'border-simba bg-simba-soft text-ink' : 'border-line text-ink hover:border-ink/30'}`
          }>
          
                {opt}
                {value === opt && <CheckIcon className="h-5 w-5 text-simba" aria-hidden="true" />}
              </button>
            </li>
      )}
        </ul> :

    <form
      className="mt-3"
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}>
      
          <label htmlFor={`edit-${field.key}`} className="text-sm font-semibold text-muted">
            {field.label}
          </label>
          <input
        id={`edit-${field.key}`}
        type={field.type ?? 'text'}
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        className="mt-1.5 h-14 w-full rounded-2xl border-2 border-line px-4 text-base font-semibold text-ink outline-none transition-colors duration-150 focus:border-simba" />
      
          {field.hint && <p className="mt-2 text-xs text-muted">{field.hint}</p>}
        </form>
    }
      <button
      type="button"
      onClick={save}
      disabled={!valid || value === field.value}
      className="mt-5 h-14 w-full rounded-2xl bg-simba text-base font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:bg-sand disabled:text-muted">
      
        Save
      </button>
    </BottomSheet>;

  return target ? createPortal(sheet, target) : sheet;
}