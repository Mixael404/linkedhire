type WithDate = { finish_date: string | null; is_current: boolean };

/**
 * Sorts items so the most recent comes first.
 * is_current=true (no finish_date) is treated as the furthest future date.
 */
export function sortByFinishDateDesc<T extends WithDate>(items: T[]): T[] {
   return [...items].sort((a, b) => {
      if (a.is_current && !b.is_current) return -1;
      if (!a.is_current && b.is_current) return 1;
      const dateA = a.finish_date ? new Date(a.finish_date).getTime() : 0;
      const dateB = b.finish_date ? new Date(b.finish_date).getTime() : 0;
      return dateB - dateA;
   });
}
