import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheckIcon } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { MetricRow } from './MetricRow';
import { DataTable } from './DataTable';
import { RecordDrawer } from './RecordDrawer';
import type { ColumnDef, ConsoleRecord, FieldDef, Metric, TableFilter } from '../../../types/console';

interface ModulePageProps<T extends ConsoleRecord> {
  title: string;
  subtitle: string;
  metrics: Metric[];
  tableTitle: string;
  /** Singular noun used in buttons and the drawer: "tier", "offer"… */
  entity: string;
  rows: T[];
  columns: ColumnDef<T>[];
  searchKeys?: Extract<keyof T, string>[];
  filter?: TableFilter<T>;
  filters?: TableFilter<T>[];
  /** Extra table toolbar controls, e.g. a date range. */
  toolbar?: React.ReactNode;
  /** Skip the page title, e.g. when shown inside a Settings tab. */
  hideHeader?: boolean;
  /** Content between the metrics and the table. */
  children?: React.ReactNode;
  /** Fields for the create/edit drawer. Omit for a read-only table. */
  fields?: FieldDef<T>[];
  /** Blank record for "New". Omit to hide the New button. */
  newRecord?: () => T;
  onSave?: (row: T) => void;
  onDelete?: (id: string) => void;
  /** Replaces the default "New" drawer, e.g. to open a dedicated builder. */
  onNew?: () => void;
  /** Opens a detail page on row click; the pencil still edits. */
  onRowClick?: (row: T) => void;
  /** Name shown in the confirmation after saving. */
  recordLabel?: (row: T) => string;
  headerActions?: React.ReactNode;
  initialFilters?: Record<string, string>;
}

const ease = [0.23, 1, 0.32, 1] as const;

export function ModulePage<T extends ConsoleRecord>(p: ModulePageProps<T>) {
  const [editing, setEditing] = useState<{row: T;isNew: boolean;} | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const editable = Boolean(p.fields && p.onSave);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(t);
  }, [notice]);

  const label = (row: T) => p.recordLabel ? p.recordLabel(row) : p.entity;

  const onNew = p.onNew ?? (editable && p.newRecord ? () => setEditing({ row: p.newRecord!(), isNew: true }) : undefined);

  return (
    <div>
      {p.hideHeader ?
      p.headerActions && <div className="mb-4 flex flex-wrap justify-end gap-2">{p.headerActions}</div> :

      <PageHeader title={p.title} subtitle={p.subtitle} actions={p.headerActions} />
      }
      <MetricRow metrics={p.metrics} />
      {p.children}
      <DataTable
        title={p.tableTitle}
        entity={p.entity}
        rows={p.rows}
        columns={p.columns}
        searchKeys={p.searchKeys}
        filter={p.filter}
        filters={p.filters}
        toolbar={p.toolbar}
        onNew={onNew}
        onEdit={editable ? (row) => setEditing({ row, isNew: false }) : undefined}
        onRowClick={p.onRowClick}
        initialFilters={p.initialFilters} />
      

      <AnimatePresence>
        {editing && p.fields && p.onSave &&
        <RecordDrawer
          key={editing.row.id}
          entity={p.entity}
          record={editing.row}
          isNew={editing.isNew}
          fields={p.fields}
          onClose={() => setEditing(null)}
          onSave={(row) => {
            p.onSave!(row);
            setNotice(`${label(row)} ${editing.isNew ? 'created' : 'updated'}`);
            setEditing(null);
          }}
          onDelete={
          p.onDelete ?
          (id) => {
            p.onDelete!(id);
            setNotice(`${label(editing.row)} deleted`);
            setEditing(null);
          } :
          undefined
          } />

        }
      </AnimatePresence>

      <AnimatePresence>
        {notice &&
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-bold text-white shadow-lift">
          
            <CircleCheckIcon className="h-4 w-4 text-leaf-soft" aria-hidden="true" />
            {notice}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}