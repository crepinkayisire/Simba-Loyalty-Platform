import type { ReactNode } from 'react';

export interface ConsoleRecord {
  id: string;
}

export type FieldType = 'text' | 'number' | 'select' | 'multiselect' | 'toggle' | 'date' | 'textarea' | 'color' | 'custom';

/** Renders a bespoke input for a 'custom' field. */
export type FieldRender<T> = (ctx: {draft: T;set: (key: keyof T, value: unknown) => void;isNew: boolean;}) => ReactNode;

/** One editable field in a module's create/edit drawer. */
export interface FieldDef<T> {
  key: Extract<keyof T, string>;
  label: string;
  type: FieldType;
  options?: readonly string[];
  required?: boolean;
  prefix?: string;
  suffix?: string;
  help?: string;
  /** Render at half width so two fields share a row. */
  half?: boolean;
  /** Shown but not editable (e.g. computed stats). */
  readOnly?: boolean;
  /** For 'multiselect': the value saved when every option is picked, e.g. "All tiers". */
  allLabel?: string;
  /** For 'custom': draws the field. */
  render?: FieldRender<T>;
  /** Only show (and require) this field when the draft matches, e.g. promotion type = Discount. */
  showWhen?: (draft: T) => boolean;
  /** Starts a new titled group in the drawer, e.g. "Contact person". */
  section?: string;
  /** Placeholder text for text/number inputs. */
  placeholder?: string;
}

/** One column in a module table. */
export interface ColumnDef<T> {
  id: string;
  header: string;
  cell: (row: T) => ReactNode;
  align?: 'left' | 'right';
  /** Enables sorting on this column. */
  sortValue?: (row: T) => number | string;
  /** Hide below this breakpoint to keep the table readable on smaller screens. */
  hideBelow?: 'md' | 'lg' | 'xl';
}

export interface Metric {
  label: string;
  value: string;
  hint?: string;
  tone?: 'up' | 'down' | 'neutral';
  /** Makes the metric a link to this route. */
  to?: string;
}

export interface TableFilter<T> {
  key: Extract<keyof T, string>;
  label: string;
  options: readonly string[];
}

/** Matches a filter value against a cell that may hold a comma list ("Gold, Platinum") or "All …". */
export function matchesFilter(cell: unknown, value: string): boolean {
  const s = String(cell ?? '');
  if (s === value) return true;
  if (s.startsWith('All ')) return true;
  return s.split(',').map((x) => x.trim()).includes(value);
}