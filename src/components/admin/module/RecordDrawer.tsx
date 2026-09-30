import React, { useState } from 'react';
import { Trash2Icon, CheckIcon } from 'lucide-react';
import { Drawer } from '../Drawer';
import { Toggle } from '../Toggle';
import type { ConsoleRecord, FieldDef } from '../../../types/console';

interface RecordDrawerProps<T extends ConsoleRecord> {
  entity: string;
  record: T;
  isNew: boolean;
  fields: FieldDef<T>[];
  onSave: (row: T) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}

const inputCls =
'h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-semibold text-ink placeholder:font-normal placeholder:text-muted focus:border-ink focus:outline-none disabled:bg-canvas disabled:text-muted';

export function RecordDrawer<T extends ConsoleRecord>({ entity, record, isNew, fields, onSave, onDelete, onClose }: RecordDrawerProps<T>) {
  const [draft, setDraft] = useState<T>(record);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (key: keyof T, value: unknown) => setDraft((d) => ({ ...d, [key]: value }));

  const shown = fields.filter((f) => !f.showWhen || f.showWhen(draft));
  const missing = shown.filter((f) => f.required && !f.readOnly && (draft[f.key] === '' || draft[f.key] === undefined || draft[f.key] === null));
  const cap = entity.charAt(0).toUpperCase() + entity.slice(1);

  const footer =
  <div className="flex items-center gap-2">
      {!isNew && onDelete &&
    <button
      type="button"
      onClick={() => confirmDelete ? onDelete(record.id) : setConfirmDelete(true)}
      className={`flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-bold transition-colors duration-150 ${
      confirmDelete ? 'bg-simba text-white hover:bg-simba-dark' : 'text-simba-dark hover:bg-simba-soft'}`
      }>
      
          <Trash2Icon className="h-4 w-4" aria-hidden="true" />
          {confirmDelete ? 'Confirm delete' : 'Delete'}
        </button>
    }
      <button type="button" onClick={onClose} className="ml-auto h-11 rounded-xl px-4 text-sm font-bold text-ink-soft transition-colors duration-150 hover:bg-sand">
        Cancel
      </button>
      <button
      type="button"
      disabled={missing.length > 0}
      onClick={() => onSave(draft)}
      className="h-11 rounded-xl bg-simba px-5 text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark disabled:cursor-not-allowed disabled:opacity-50">
      
        {isNew ? `Create ${entity}` : 'Save changes'}
      </button>
    </div>;


  return (
    <Drawer title={isNew ? `New ${entity}` : `Edit ${entity}`} subtitle={isNew ? `Fill in the details to add a ${entity}.` : undefined} onClose={onClose} footer={footer}>
      <form
        className="grid grid-cols-2 gap-x-3 gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (missing.length === 0) onSave(draft);
        }}>
        
        {shown.map((f) => {
          const value = draft[f.key] as unknown;
          const id = `field-${f.key}`;
          const span = f.half ? 'col-span-1' : 'col-span-2';
          const heading = f.section ?
          <h3 key={`${f.key}-section`} className="col-span-2 -mb-1 mt-2 border-t border-line pt-4 text-sm font-extrabold text-ink first:mt-0 first:border-0 first:pt-0">
              {f.section}
            </h3> :
          null;
          return (
            <React.Fragment key={f.key}>
              {heading}
              {renderField()}
            </React.Fragment>);


          function renderField() {
            if (f.type === 'custom' && f.render) {
              return (
                <div key={f.key} className={span}>
                {f.render({ draft, set, isNew })}
              </div>);

            }

            if (f.type === 'multiselect') {
              const options = f.options ?? [];
              const raw = String(value ?? '');
              const picked = raw === f.allLabel ? [...options] : raw.split(',').map((s) => s.trim()).filter(Boolean);
              const toggle = (o: string) => {
                const next = picked.includes(o) ? picked.filter((p) => p !== o) : options.filter((x) => x === o || picked.includes(x));
                set(f.key, f.allLabel && next.length === options.length ? f.allLabel : next.join(', '));
              };
              const all = picked.length === options.length;
              return (
                <fieldset key={f.key} className={span}>
                <legend className="mb-1.5 block text-xs font-bold text-muted">
                  {f.label}
                  {f.required && <span className="text-simba"> *</span>}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {f.allLabel &&
                    <button
                      type="button"
                      aria-pressed={all}
                      onClick={() => set(f.key, all ? '' : f.allLabel)}
                      className={`flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold transition-colors duration-150 ${
                      all ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink-soft hover:border-ink/40'}`
                      }>
                      
                      {all && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                      {f.allLabel}
                    </button>
                    }
                  {options.map((o) => {
                      const on = picked.includes(o);
                      return (
                        <button
                          key={o}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(o)}
                          className={`flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-sm font-bold transition-colors duration-150 ${
                          on ? 'border-simba bg-simba-soft text-simba' : 'border-line bg-white text-ink-soft hover:border-ink/40'}`
                          }>
                          
                        {on && <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                        {o}
                      </button>);

                    })}
                </div>
                {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
              </fieldset>);

            }

            if (f.type === 'toggle') {
              return (
                <div key={f.key} className={`${span} flex items-center justify-between rounded-xl border border-line px-3 py-2.5`}>
                <span>
                  <span className="block text-sm font-bold text-ink">{f.label}</span>
                  {f.help && <span className="block text-xs text-muted">{f.help}</span>}
                </span>
                <Toggle checked={Boolean(value)} onChange={(v) => set(f.key, v)} label={f.label} />
              </div>);

            }

            return (
              <div key={f.key} className={span}>
              <label htmlFor={id} className="mb-1.5 block text-xs font-bold text-muted">
                {f.label}
                {f.required && !f.readOnly && <span className="text-simba"> *</span>}
              </label>
              {f.type === 'select' ?
                <select id={id} disabled={f.readOnly} value={String(value ?? '')} onChange={(e) => set(f.key, e.target.value)} className={inputCls}>
                  {!(f.options ?? []).includes(String(value ?? '')) &&
                  <option value={String(value ?? '')} disabled>
                      {value ? String(value) : `Select ${f.label.toLowerCase()}`}
                    </option>
                  }
                  {(f.options ?? []).map((o) =>
                  <option key={o} value={o}>
                      {o}
                    </option>
                  )}
                </select> :
                f.type === 'textarea' ?
                <textarea
                  id={id}
                  disabled={f.readOnly}
                  rows={3}
                  value={String(value ?? '')}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={`${inputCls} h-auto py-2.5 font-normal`} /> :

                f.type === 'color' ?
                <span className="flex items-center gap-2">
                  <input
                    id={id}
                    type="color"
                    disabled={f.readOnly}
                    value={String(value ?? '#D9531E')}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="h-11 w-14 cursor-pointer rounded-xl border border-line bg-white p-1" />
                  
                  <span className="num text-sm font-semibold uppercase text-ink-soft">{String(value ?? '')}</span>
                </span> :

                <span className="relative flex items-center">
                  {f.prefix && <span className="pointer-events-none absolute left-3 text-sm font-bold text-muted">{f.prefix}</span>}
                  <input
                    id={id}
                    type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                    disabled={f.readOnly}
                    placeholder={f.placeholder}
                    value={String(value ?? '')}
                    onChange={(e) => set(f.key, f.type === 'number' ? e.target.value === '' ? '' : Number(e.target.value) : e.target.value)}
                    className={`${inputCls} ${f.type === 'number' ? 'num' : ''} ${f.prefix ? 'pl-12' : ''} ${f.suffix ? 'pr-16' : ''}`} />
                  
                  {f.suffix && <span className="pointer-events-none absolute right-3 text-xs font-bold text-muted">{f.suffix}</span>}
                </span>
                }
              {f.help && <p className="mt-1 text-xs text-muted">{f.help}</p>}
            </div>);

          }
        })}
        <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
      </form>
      {missing.length > 0 &&
      <p className="mt-4 text-xs font-semibold text-muted">
          Required: {missing.map((f) => f.label).join(', ')}. {cap} can be saved once these are filled in.
        </p>
      }
    </Drawer>);

}