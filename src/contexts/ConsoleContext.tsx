import React, { createContext, useCallback, useContext, useState } from 'react';
import type { ConsoleRecord } from '../types/console';

interface ConsoleContextValue {
  collections: Record<string, ConsoleRecord[]>;
  setCollection: (key: string, rows: ConsoleRecord[]) => void;
}

const ConsoleContext = createContext<ConsoleContextValue | null>(null);

/** Holds every console module's editable table so edits survive moving between modules. */
export function ConsoleProvider({ children }: {children: React.ReactNode;}) {
  const [collections, setCollections] = useState<Record<string, ConsoleRecord[]>>({});
  const setCollection = useCallback((key: string, rows: ConsoleRecord[]) => {
    setCollections((c) => ({ ...c, [key]: rows }));
  }, []);
  return <ConsoleContext.Provider value={{ collections, setCollection }}>{children}</ConsoleContext.Provider>;
}

export interface Collection<T extends ConsoleRecord> {
  rows: T[];
  save: (row: T) => void;
  remove: (id: string) => void;
}

export function useCollection<T extends ConsoleRecord>(key: string, seed: T[]): Collection<T> {
  const ctx = useContext(ConsoleContext);
  if (!ctx) throw new Error('useCollection must be used inside ConsoleProvider');
  const rows = ctx.collections[key] as T[] | undefined ?? seed;
  return {
    rows,
    save: (row) => {
      const exists = rows.some((r) => r.id === row.id);
      ctx.setCollection(key, exists ? rows.map((r) => r.id === row.id ? row : r) : [...rows, row]);
    },
    remove: (id) => ctx.setCollection(key, rows.filter((r) => r.id !== id))
  };
}

/** Read another module's rows (e.g. tier names for a select), falling back to its seed. */
export function useCollectionRows<T extends ConsoleRecord>(key: string, seed: T[]): T[] {
  const ctx = useContext(ConsoleContext);
  return ctx?.collections[key] as T[] | undefined ?? seed;
}