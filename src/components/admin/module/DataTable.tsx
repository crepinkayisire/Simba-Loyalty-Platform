import React, { useMemo, useState } from 'react';
import { SearchIcon, PlusIcon, PencilIcon, ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { matchesFilter, type ColumnDef, type ConsoleRecord, type TableFilter } from '../../../types/console';

interface DataTableProps<T extends ConsoleRecord> {
  title: string;
  entity: string;
  rows: T[];
  columns: ColumnDef<T>[];
  searchKeys?: Extract<keyof T, string>[];
  filter?: TableFilter<T>;
  /** Extra dropdown filters beside the main one. */
  filters?: TableFilter<T>[];
  /** Extra controls in the toolbar, e.g. a date range. */
  toolbar?: React.ReactNode;
  onNew?: () => void;
  onEdit?: (row: T) => void;
  onRowClick?: (row: T) => void;
  /** Filter values to start with, keyed by filter key, e.g. { partner: 'Serena Hotels' }. */
  initialFilters?: Record<string, string>;
}

const hideCls = { md: 'hidden md:table-cell', lg: 'hidden lg:table-cell', xl: 'hidden xl:table-cell' };

export function DataTable<T extends ConsoleRecord>({ title, entity, rows, columns, searchKeys = [], filter, filters = [], toolbar, onNew, onEdit, onRowClick, initialFilters }: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const allFilters = useMemo(() => filter ? [filter, ...filters] : filters, [filter, filters]);
  const [values, setValues] = useState<Record<string, string>>(initialFilters ?? {});
  const [sort, setSort] = useState<{id: string;dir: 1 | -1;} | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = rows.filter((r) => {
      for (const f of allFilters) {
        const v = values[f.key] ?? 'All';
        if (v !== 'All' && !matchesFilter(r[f.key], v)) return false;
      }
      if (!q) return true;
      return searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(q));
    });
    const col = sort && columns.find((c) => c.id === sort.id);
    if (col?.sortValue) {
      const get = col.sortValue;
      list = [...list].sort((a, b) => {
        const av = get(a);
        const bv = get(b);
        return (av > bv ? 1 : av < bv ? -1 : 0) * sort!.dir;
      });
    }
    return list;
  }, [rows, query, allFilters, values, searchKeys, sort, columns]);

  const toggleSort = (id: string) =>
  setSort((s) => s?.id !== id ? { id, dir: -1 } : s.dir === -1 ? { id, dir: 1 } : null);

  const open = onRowClick ?? onEdit;

  return (
    <section className="mt-6 rounded-2xl bg-white shadow-card" aria-label={title}>
      <div className="flex flex-col gap-3 border-b border-line px-5 py-4 md:flex-row md:items-center">
        <h2 className="text-base font-extrabold text-ink md:mr-auto">
          {title} <span className="num ml-1 text-sm font-bold text-muted">{rows.length}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {searchKeys.length > 0 &&
          <label className="relative">
              <span className="sr-only">Search {title.toLowerCase()}</span>
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-10 w-52 rounded-xl border border-line bg-canvas pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-ink focus:bg-white focus:outline-none" />
            
            </label>
          }
          {allFilters.map((f) =>
          <label key={f.key}>
              <span className="sr-only">{f.label}</span>
              <select
              value={values[f.key] ?? 'All'}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="h-10 rounded-xl border border-line bg-canvas px-3 text-sm font-semibold text-ink focus:border-ink focus:outline-none">
              
                <option value="All">All {f.label.toLowerCase()}</option>
                {f.options.map((o) =>
              <option key={o} value={o}>
                    {o}
                  </option>
              )}
              </select>
            </label>
          )}
          {toolbar}
          {onNew &&
          <button
            type="button"
            onClick={onNew}
            className="flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-simba px-4 text-sm font-extrabold text-white transition-colors duration-150 hover:bg-simba-dark">
            
              <PlusIcon className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              New {entity}
            </button>
          }
        </div>
      </div>

      <div className="thin-scrollbar overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-bold text-muted">
              {columns.map((c) => {
                const active = sort?.id === c.id;
                const SortIcon = !active ? ArrowUpDownIcon : sort!.dir === -1 ? ArrowDownIcon : ArrowUpIcon;
                return (
                  <th
                    key={c.id}
                    scope="col"
                    aria-sort={active ? sort!.dir === 1 ? 'ascending' : 'descending' : undefined}
                    className={`whitespace-nowrap px-5 py-3 font-bold ${c.align === 'right' ? 'text-right' : 'text-left'} ${c.hideBelow ? hideCls[c.hideBelow] : ''}`}>
                    
                    {c.sortValue ?
                    <button type="button" onClick={() => toggleSort(c.id)} className={`inline-flex items-center gap-1 hover:text-ink ${active ? 'text-ink' : ''}`}>
                        {c.header}
                        <SortIcon className="h-3 w-3" aria-hidden="true" />
                      </button> :

                    c.header
                    }
                  </th>);

              })}
              {onEdit && <th scope="col" className="w-14 px-3 py-3"><span className="sr-only">Actions</span></th>}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) =>
            <tr
              key={row.id}
              onClick={open ? () => open(row) : undefined}
              className={`border-b border-line/70 last:border-0 ${open ? 'cursor-pointer transition-colors duration-150 hover:bg-canvas' : ''}`}>
              
                {columns.map((c) =>
              <td
                key={c.id}
                className={`whitespace-nowrap px-5 py-3.5 text-ink ${c.align === 'right' ? 'num text-right' : ''} ${c.hideBelow ? hideCls[c.hideBelow] : ''}`}>
                
                    {c.cell(row)}
                  </td>
              )}
                {onEdit &&
              <td className="px-3 py-2 text-right">
                    <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                  aria-label={`Edit ${entity}`}
                  className="rounded-lg p-2 text-muted transition-colors duration-150 hover:bg-sand hover:text-ink">
                  
                      <PencilIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
              }
              </tr>
            )}
          </tbody>
        </table>
        {visible.length === 0 &&
        <div className="px-5 py-12 text-center">
            <p className="text-sm font-bold text-ink">No {entity}s match</p>
            <p className="mt-1 text-sm text-muted">Try a different search or filter.</p>
          </div>
        }
      </div>
      {visible.length > 0 &&
      <p className="num border-t border-line px-5 py-3 text-xs font-semibold text-muted">
          Showing {visible.length} of {rows.length}
        </p>
      }
    </section>);

}